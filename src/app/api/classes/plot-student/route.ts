import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Akses ditolak" }, { status: 401 });
    }

    const { studentId, targetClassId, action } = await req.json();

    if (!studentId) {
      return NextResponse.json({ success: false, error: "ID Siswa wajib diisi" }, { status: 400 });
    }

    if (action === "REMOVE") {
      // Remove student from class
      await prisma.$executeRawUnsafe(
        `UPDATE "siswa" SET "id_kelas" = NULL, "nama_kelas" = '-' WHERE "id" = $1`,
        studentId
      );
      return NextResponse.json({ success: true, message: "Siswa berhasil dikeluarkan dari kelas" });
    }

    // Add or Move student to target class
    if (!targetClassId) {
      return NextResponse.json({ success: false, error: "ID Kelas Tujuan wajib diisi" }, { status: 400 });
    }

    const targetClass: any[] = await prisma.$queryRawUnsafe(
      `SELECT id, nama_kelas FROM "kelas" WHERE "id" = $1 LIMIT 1`,
      targetClassId
    );

    if (targetClass.length === 0) {
      return NextResponse.json({ success: false, error: "Kelas tujuan tidak ditemukan" }, { status: 404 });
    }

    const className = targetClass[0].nama_kelas;

    await prisma.$executeRawUnsafe(
      `UPDATE "siswa" SET "id_kelas" = $1, "nama_kelas" = $2 WHERE "id" = $3`,
      targetClassId,
      className,
      studentId
    );

    return NextResponse.json({
      success: true,
      message: `Siswa berhasil di-plot ke ${className}`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
