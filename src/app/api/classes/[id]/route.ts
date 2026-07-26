import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Akses ditolak" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    await prisma.$executeRawUnsafe(
      `UPDATE "kelas" SET "nama_kelas" = $1, "tingkat" = $2, "tahun_ajaran" = $3, "kapasitas" = $4, "id_guru_wali" = $5, "nama_guru_wali" = $6, "diperbarui_pada" = NOW() WHERE "id" = $7`,
      body.name,
      body.gradeLevel,
      body.academicYear,
      Number(body.capacity) || 20,
      body.homeroomTeacherId || null,
      body.homeroomTeacherName || null,
      id
    );

    if (body.homeroomTeacherId) {
      await prisma.$executeRawUnsafe(
        `UPDATE "guru" SET "id_kelas" = $1, "kelas_ditugaskan" = $2 WHERE "id" = $3`,
        id,
        body.name,
        body.homeroomTeacherId
      );
    }

    return NextResponse.json({ success: true, data: { id, ...body } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Akses ditolak" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.$executeRawUnsafe(`DELETE FROM "kelas" WHERE "id" = $1`, id);

    return NextResponse.json({ success: true, message: "Master kelas berhasil dihapus" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
