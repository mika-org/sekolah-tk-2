import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

const isSuperAdmin = (role?: string) => {
  if (!role) return false;
  const upper = role.toUpperCase();
  return upper === "SUPER_ADMIN" || upper === "ADMIN_PUSAT" || upper === "ADMIN_CABANG";
};

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin || !isSuperAdmin(admin.role)) {
      return NextResponse.json(
        { success: false, error: "Hanya Super Admin / Admin Cabang yang dapat mengubah data user admin" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { username, password, name, role, schoolId, classId, assignedClass } = body;

    const existingUsers: any[] = await prisma.$queryRawUnsafe(
      `SELECT id, nama_pengguna, peran FROM "pengguna_admin" WHERE "id" = $1 LIMIT 1`,
      id
    );

    if (existingUsers.length === 0) {
      return NextResponse.json(
        { success: false, error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    const existingUser = existingUsers[0];
    let newPasswordHash: string | null = null;
    if (password && password.trim() !== "") {
      newPasswordHash = await bcrypt.hash(password, 10);
    }

    const targetRole = role || existingUser.peran;
    const targetSchoolId = schoolId === "ALL" || !schoolId ? null : schoolId;

    if (newPasswordHash) {
      await prisma.$executeRawUnsafe(
        `UPDATE "pengguna_admin" SET "nama_pengguna" = $1, "kata_sandi_hash" = $2, "nama" = $3, "peran" = $4, "id_sekolah" = $5, "id_kelas" = $6, "kelas_ditugaskan" = $7, "diperbarui_pada" = NOW() WHERE "id" = $8`,
        username || existingUser.nama_pengguna,
        newPasswordHash,
        name,
        targetRole,
        targetSchoolId,
        classId || null,
        assignedClass || null,
        id
      );
    } else {
      await prisma.$executeRawUnsafe(
        `UPDATE "pengguna_admin" SET "nama_pengguna" = $1, "nama" = $2, "peran" = $3, "id_sekolah" = $4, "id_kelas" = $5, "kelas_ditugaskan" = $6, "diperbarui_pada" = NOW() WHERE "id" = $7`,
        username || existingUser.nama_pengguna,
        name,
        targetRole,
        targetSchoolId,
        classId || null,
        assignedClass || null,
        id
      );
    }

    return NextResponse.json({ success: true, data: { id, name, username, role: targetRole } });
  } catch (error: any) {
    console.error("PUT admin-user error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui user admin" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin || !isSuperAdmin(admin.role)) {
      return NextResponse.json(
        { success: false, error: "Hanya Super Admin / Admin Cabang yang dapat menghapus user admin" },
        { status: 403 }
      );
    }

    const { id } = await params;

    if (admin.id === id) {
      return NextResponse.json(
        { success: false, error: "Anda tidak dapat menghapus akun Anda sendiri" },
        { status: 400 }
      );
    }

    await prisma.$executeRawUnsafe(`DELETE FROM "pengguna_admin" WHERE "id" = $1`, id);

    return NextResponse.json({ success: true, message: "User admin berhasil dihapus" });
  } catch (error: any) {
    console.error("DELETE admin-user error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menghapus user admin" },
      { status: 500 }
    );
  }
}
