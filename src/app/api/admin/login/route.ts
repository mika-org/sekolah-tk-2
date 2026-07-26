import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signAdminToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawUsername = body?.username ?? "";
    const rawPassword = body?.password ?? "";

    const usernameStr = String(rawUsername).trim();
    const passwordStr = String(rawPassword).trim();

    if (!usernameStr || !passwordStr) {
      return NextResponse.json(
        { success: false, error: "Username/Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    // 1. Search in pengguna_admin by username OR email
    const admins: any[] = await prisma.$queryRawUnsafe(
      `SELECT u.id, u."id_sekolah" as "schoolId", u."id_kelas" as "classId", u."nama_pengguna" as username, u."kata_sandi_hash" as "passwordHash", u."nama" as name, u."peran" as role, u."kelas_ditugaskan" as "assignedClass", u."telepon" as phone, u."email" as email, s.nama as "schoolName", s.kode as "schoolCode" FROM "pengguna_admin" u LEFT JOIN "sekolah" s ON u."id_sekolah" = s.id WHERE LOWER(u."nama_pengguna") = LOWER($1) OR LOWER(u."email") = LOWER($1) LIMIT 1`,
      usernameStr
    );

    if (admins.length > 0) {
      const admin = admins[0];
      const isMatch = await bcrypt.compare(passwordStr, admin.passwordHash);
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

      const response = NextResponse.json({
        success: true,
        message: "Login berhasil",
        admin: {
          id: admin.id,
          username: admin.username,
          name: admin.name,
          role: admin.role,
          schoolId: admin.schoolId,
          schoolName: admin.schoolName || "TK Smart Kids",
          schoolCode: admin.schoolCode || "dekeraton",
          assignedClass: admin.assignedClass || null,
          phone: admin.phone || null,
          email: admin.email || null,
        },
      });

      response.cookies.set({
        name: "admin_token",
        value: token,
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return response;
    }

    // 2. Fallback: Search in siswa table by username or nisn
    const students: any[] = await prisma.$queryRawUnsafe(
      `SELECT st.id, st."id_sekolah" as "schoolId", st."nama_pengguna" as username, st."nisn" as nisn, st."kata_sandi_hash" as "passwordHash", st."nama" as name, st."nama_kelas" as "className", st."nama_orang_tua" as "parentName", st."telepon_orang_tua" as "parentPhone", s.nama as "schoolName", s.kode as "schoolCode" FROM "siswa" st LEFT JOIN "sekolah" s ON st."id_sekolah" = s.id WHERE LOWER(st."nama_pengguna") = LOWER($1) OR st."nisn" = $1 LIMIT 1`,
      usernameStr
    );

    if (students.length > 0 && students[0].passwordHash) {
      const student = students[0];
      const isMatch = await bcrypt.compare(passwordStr, student.passwordHash);
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
            schoolName: student.schoolName || "TK Smart Kids",
            schoolCode: student.schoolCode || "dekeraton",
            assignedClass: student.className,
            parentName: student.parentName,
            parentPhone: student.parentPhone,
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
