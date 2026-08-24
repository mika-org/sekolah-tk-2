import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";
import { hashPassword } from "@/lib/password";

const isSuperAdmin = (role?: string) => {
  if (!role) return false;
  const upper = role.toUpperCase();
  return upper === "SUPER_ADMIN" || upper === "ADMIN_PUSAT" || upper === "ADMIN_CABANG";
};

export async function GET(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Tidak memiliki akses" },
        { status: 401 }
      );
    }

    let query = `
      SELECT 
        u.id, 
        u."id_sekolah" as "schoolId", 
        u."id_kelas" as "classId",
        u."nama_pengguna" as username, 
        u."nama" as name, 
        u."peran" as role, 
        u."kelas_ditugaskan" as "assignedClass",
        u."telepon" as phone,
        u."email" as email,
        u."dibuat_pada" as "createdAt", 
        u."diperbarui_pada" as "updatedAt",
        json_build_object('id', s.id, 'code', s.kode, 'name', s.nama) as school
      FROM "pengguna_admin" u
      LEFT JOIN "sekolah" s ON u."id_sekolah" = s.id
      ORDER BY u."dibuat_pada" DESC
    `;

    const users: any[] = await prisma.$queryRawUnsafe(query);
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    console.error("GET admin-users error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data user admin" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin || !isSuperAdmin(admin.role)) {
      return NextResponse.json(
        { success: false, error: "Hanya Super Admin / Admin Cabang yang dapat membuat akun admin baru" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { username, password, name, role, schoolId, classId, assignedClass } = body;
    const passwordStr = typeof password === "string" ? password : "";

    if (!username || !passwordStr || !name) {
      return NextResponse.json(
        { success: false, error: "Username, password, dan nama wajib diisi" },
        { status: 400 }
      );
    }

    if (passwordStr.length < 8) {
      return NextResponse.json(
        { success: false, error: "Password minimal 8 karakter" },
        { status: 400 }
      );
    }

    const existingUsers: any[] = await prisma.$queryRawUnsafe(
      `SELECT id FROM "pengguna_admin" WHERE "nama_pengguna" = $1 LIMIT 1`,
      username
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { success: false, error: "Username sudah digunakan oleh user lain" },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(passwordStr);
    const validRole = role || "BELUM_MASUK";

    const res: any[] = await prisma.$queryRawUnsafe(
      `INSERT INTO "pengguna_admin" ("id", "id_sekolah", "id_kelas", "nama_pengguna", "kata_sandi_hash", "nama", "peran", "kelas_ditugaskan", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING id`,
      schoolId === "ALL" || !schoolId ? null : schoolId,
      classId || null,
      username,
      passwordHash,
      name,
      validRole,
      assignedClass || null
    );

    return NextResponse.json({
      success: true,
      data: {
        id: res[0].id,
        username,
        name,
        role: validRole,
        schoolId,
      },
    });
  } catch (error: any) {
    console.error("POST admin-users error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal membuat user admin baru" },
      { status: 500 }
    );
  }
}
