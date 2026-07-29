import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Akses ditolak" }, { status: 401 });
    }

    const { id } = await params;

    const teacherList: any[] = await prisma.$queryRawUnsafe(
      `SELECT g.id, g.nama as name, g.jabatan as role, g.kelas_ditugaskan as "assignedClass", g.email, g.telepon as phone, g.kode_qr as "qrCode", g.id_sekolah as "schoolId", s.nama as "schoolName" 
       FROM "guru" g 
       LEFT JOIN "sekolah" s ON g.id_sekolah = s.id 
       WHERE g.id = $1 LIMIT 1`,
      id
    );

    if (teacherList.length === 0) {
      return NextResponse.json({ success: false, error: "Data guru tidak ditemukan" }, { status: 404 });
    }

    const teacher = teacherList[0];
    const cleanUsername = `guru_${teacher.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
    const defaultPassword = `guru123`;

    let adminUser: any[] = await prisma.$queryRawUnsafe(
      `SELECT id, "nama_pengguna" as username, "kata_sandi_hash" as "password" FROM "pengguna_admin" WHERE "nama" = $1 OR "nama_pengguna" = $2 LIMIT 1`,
      teacher.name,
      cleanUsername
    );

    let credentials;

    if (adminUser.length === 0) {
      // Auto create AdminUser account for teacher
      await prisma.$executeRawUnsafe(
        `INSERT INTO "pengguna_admin" ("id", "id_sekolah", "nama", "nama_pengguna", "kata_sandi_hash", "peran", "kelas_ditugaskan", "email", "telepon", "dibuat_pada", "diperbarui_pada") 
         VALUES (gen_random_uuid()::text, $1, $2, $3, $4, 'GURU', $5, $6, $7, NOW(), NOW())`,
        teacher.schoolId,
        teacher.name,
        cleanUsername,
        defaultPassword,
        teacher.assignedClass || null,
        teacher.email || null,
        teacher.phone || null
      );
      credentials = { username: cleanUsername, password: defaultPassword };
    } else {
      credentials = {
        username: adminUser[0].username,
        password: adminUser[0].password || defaultPassword,
      };
    }

    return NextResponse.json({
      success: true,
      data: {
        teacherId: teacher.id,
        teacherName: teacher.name,
        role: teacher.role,
        assignedClass: teacher.assignedClass || "Guru Pengajar",
        email: teacher.email || "-",
        phone: teacher.phone || "-",
        schoolName: teacher.schoolName || "TK Smart Kids",
        username: credentials.username,
        password: credentials.password,
        qrCode: teacher.qrCode || `TEACHER:${teacher.id}`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Akses ditolak" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const newPassword = body?.newPassword || `guru${Math.floor(100 + Math.random() * 900)}`;

    const teacherList: any[] = await prisma.$queryRawUnsafe(
      `SELECT g.id, g.nama as name, g.id_sekolah as "schoolId", g.kelas_ditugaskan as "assignedClass", g.email, g.telepon as phone FROM "guru" g WHERE g.id = $1 LIMIT 1`,
      id
    );

    if (teacherList.length === 0) {
      return NextResponse.json({ success: false, error: "Data guru tidak ditemukan" }, { status: 404 });
    }

    const teacher = teacherList[0];
    const cleanUsername = `guru_${teacher.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`;

    let adminUser: any[] = await prisma.$queryRawUnsafe(
      `SELECT id FROM "pengguna_admin" WHERE "nama" = $1 OR "nama_pengguna" = $2 LIMIT 1`,
      teacher.name,
      cleanUsername
    );

    if (adminUser.length > 0) {
      await prisma.$executeRawUnsafe(
        `UPDATE "pengguna_admin" SET "kata_sandi_hash" = $1, "email" = $2, "telepon" = $3, "diperbarui_pada" = NOW() WHERE "id" = $4`,
        newPassword,
        teacher.email || null,
        teacher.phone || null,
        adminUser[0].id
      );
    } else {
      await prisma.$executeRawUnsafe(
        `INSERT INTO "pengguna_admin" ("id", "id_sekolah", "nama", "nama_pengguna", "kata_sandi_hash", "peran", "kelas_ditugaskan", "email", "telepon", "dibuat_pada", "diperbarui_pada") 
         VALUES (gen_random_uuid()::text, $1, $2, $3, $4, 'GURU', $5, $6, $7, NOW(), NOW())`,
        teacher.schoolId,
        teacher.name,
        cleanUsername,
        newPassword,
        teacher.assignedClass || null,
        teacher.email || null,
        teacher.phone || null
      );
    }

    return NextResponse.json({
      success: true,
      message: "Akun login guru berhasil diperbarui/di-reset!",
      data: {
        username: cleanUsername,
        password: newPassword,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
