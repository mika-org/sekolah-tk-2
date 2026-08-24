import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signAdminToken } from "@/lib/auth";
import { hashPassword, verifyPassword } from "@/lib/password";

export async function POST(req: Request) {
  try {
    let body: any = {};
    try {
      const text = await req.text();
      body = text ? JSON.parse(text) : {};
    } catch {
      body = {};
    }

    const rawUsername = body?.username ?? "";
    const rawPassword = body?.password ?? "";

    const usernameStr = String(rawUsername).trim();
    const passwordStr = String(rawPassword);

    if (!usernameStr || !passwordStr.trim()) {
      return NextResponse.json(
        { success: false, error: "Username/Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    // Auto-seed if database empty
    const checkCount: any[] = await prisma.$queryRawUnsafe(`SELECT COUNT(*)::int as cnt FROM "pengguna_admin"`);
    if (checkCount.length > 0 && checkCount[0].cnt === 0) {
      const defaultHash = await hashPassword("password123");
      const schoolRes: any[] = await prisma.$queryRawUnsafe(
        `INSERT INTO "sekolah" ("id", "kode", "nama", "jenjang", "alamat", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, 'sadjati', 'Smart Kids Sadjati', 'TK', 'Sadjati', NOW(), NOW()) RETURNING id`
      );
      const schoolId = schoolRes[0]?.id;
      await prisma.$executeRawUnsafe(
        `INSERT INTO "pengguna_admin" ("id", "id_sekolah", "nama_pengguna", "kata_sandi_hash", "nama", "peran", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, 'admin', $2, 'Super Admin', 'SUPER_ADMIN', NOW(), NOW())`,
        schoolId,
        defaultHash
      );
    }

    const lowerInput = usernameStr.toLowerCase();

    // 1. Search in pengguna_admin by username, email, phone, or role alias
    const admins: any[] = await prisma.$queryRawUnsafe(
      `SELECT u.id, u."id_sekolah" as "schoolId", u."id_kelas" as "classId", u."nama_pengguna" as username, u."kata_sandi_hash" as "passwordHash", u."nama" as name, u."peran" as role, u."kelas_ditugaskan" as "assignedClass", u."telepon" as phone, u."email" as email, s.nama as "schoolName", s.kode as "schoolCode" 
       FROM "pengguna_admin" u 
       LEFT JOIN "sekolah" s ON u."id_sekolah" = s.id 
       WHERE LOWER(u."nama_pengguna") = $1 
          OR LOWER(u."email") = $1 
          OR u."telepon" = $2 
       ORDER BY u."dibuat_pada" ASC LIMIT 1`,
      lowerInput,
      usernameStr
    );

    if (admins.length > 0) {
      const admin = admins[0];
      const isMatch = await verifyPassword(passwordStr, admin.passwordHash);

      if (!isMatch) {
        return NextResponse.json(
          { success: false, error: "Username/Email atau password salah" },
          { status: 401 }
        );
      }

      const token = signAdminToken({
        id: admin.id,
        username: admin.username,
        name: admin.name,
        role: admin.role,
        schoolId: admin.schoolId,
      });

      let extraData: any = {};
      if (admin.role === "GURU") {
        try {
          const teachers: any[] = await prisma.$queryRawUnsafe(
            `SELECT "id" as nip, "url_foto" as "avatarUrl", "bio", "pendidikan" as education FROM "guru" WHERE LOWER("nama") = $1 OR "id_kelas" = $2 OR "kelas_ditugaskan" = $3 LIMIT 1`,
            String(admin.name).toLowerCase(),
            admin.classId || "",
            admin.assignedClass || ""
          );
          if (teachers.length > 0) {
            extraData = {
              nip: teachers[0].nip,
              avatarUrl: teachers[0].avatarUrl,
              bio: teachers[0].bio,
              education: teachers[0].education,
            };
          }
        } catch (_) {}
      } else if (admin.role === "ORANG_TUA") {
        try {
          const students: any[] = await prisma.$queryRawUnsafe(
            `SELECT "nisn" as nip, "nama_orang_tua" as "parentName", "telepon_orang_tua" as "parentPhone", "email_orang_tua" as "parentEmail", "alamat" as address, "url_avatar" as "avatarUrl" FROM "siswa" WHERE "telepon_orang_tua" = $1 OR LOWER("nama_orang_tua") = $2 LIMIT 1`,
            admin.phone || "",
            String(admin.name).toLowerCase()
          );
          if (students.length > 0) {
            extraData = {
              parentName: students[0].parentName,
              parentPhone: students[0].parentPhone,
              email: students[0].parentEmail || admin.email,
              address: students[0].address,
              avatarUrl: students[0].avatarUrl,
              nip: students[0].nip,
            };
          }
        } catch (_) {}
      }

      const response = NextResponse.json({
        success: true,
        message: "Login berhasil",
        admin: {
          id: admin.id,
          username: admin.username,
          name: admin.name,
          role: admin.role,
          schoolId: admin.schoolId,
          classId: admin.classId || null,
          schoolName: admin.schoolName || "Smart Kids Sadjati",
          schoolCode: admin.schoolCode || "sadjati",
          assignedClass: admin.assignedClass || null,
          phone: admin.phone || null,
          email: admin.email || null,
          ...extraData,
        },
      });

      response.cookies.set({
        name: "admin_token",
        value: token,
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
      });

      return response;
    }

    // 2. Fallback: Search in siswa table by username, nisn, parentPhone, or ortu alias
    const students: any[] = await prisma.$queryRawUnsafe(
      `SELECT st.id, st."id_sekolah" as "schoolId", st."id_kelas" as "classId", st."nama_pengguna" as username, st."nisn" as nisn, st."kata_sandi_hash" as "passwordHash", st."nama" as name, st."nama_kelas" as "className", st."nama_orang_tua" as "parentName", st."telepon_orang_tua" as "parentPhone", st."alamat" as address, st."url_avatar" as "avatarUrl", st."email_orang_tua" as email, s.nama as "schoolName", s.kode as "schoolCode" 
       FROM "siswa" st 
       LEFT JOIN "sekolah" s ON st."id_sekolah" = s.id 
       WHERE LOWER(st."nama_pengguna") = $1 
          OR st."nisn" = $2 
          OR st."telepon_orang_tua" = $2
       ORDER BY st."dibuat_pada" ASC LIMIT 1`,
      lowerInput,
      usernameStr
    );

    if (students.length > 0) {
      const student = students[0];
      const isMatch = await verifyPassword(passwordStr, student.passwordHash);

      if (isMatch) {
        const token = signAdminToken({
          id: student.id,
          username: student.username || student.nisn,
          name: student.name,
          role: "ORANG_TUA",
          schoolId: student.schoolId,
        });

        const response = NextResponse.json({
          success: true,
          message: "Login siswa/ortu berhasil",
          admin: {
            id: student.id,
            username: student.username || student.nisn,
            name: student.name,
            role: "ORANG_TUA",
            schoolId: student.schoolId,
            classId: student.classId || null,
            schoolName: student.schoolName || "Smart Kids Sadjati",
            schoolCode: student.schoolCode || "sadjati",
            assignedClass: student.className,
            parentName: student.parentName,
            parentPhone: student.parentPhone,
            nip: student.nisn || "-",
            avatarUrl: student.avatarUrl || "https://i.pravatar.cc/150?img=12",
            address: student.address || "Sadjati, Karawang",
            email: student.email || null,
            phone: student.parentPhone || null,
          },
        });

        response.cookies.set({
          name: "admin_token",
          value: token,
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60,
        });

        return response;
      }
    }

    return NextResponse.json(
      { success: false, error: "Username/Email atau password salah" },
      { status: 401 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Terjadi kesalahan server saat login" },
      { status: 500 }
    );
  }
}

