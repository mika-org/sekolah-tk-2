import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Akses ditolak" }, { status: 401 });
    }

    const { id } = await params;
    const data = await req.json();

    const parentName = data.parentName || data.nama_orang_tua || "-";
    const parentPhone = data.parentPhone || data.telepon_orang_tua || "-";
    const parentEmail = data.parentEmail || data.email_orang_tua || null;
    const address = data.address || data.alamat || "-";
    const className = data.className || data.nama_kelas || "Kelas TK A";
    const classId = data.classId || data.id_kelas || null;

    // 1. Update Student table (siswa)
    await prisma.$executeRawUnsafe(
      `UPDATE "siswa" SET 
        "nama" = $1, 
        "nisn" = $2, 
        "nama_kelas" = $3, 
        "id_kelas" = $4,
        "jenis_kelamin" = $5, 
        "url_avatar" = $6, 
        "tempat_tanggal_lahir" = $7, 
        "nama_orang_tua" = $8, 
        "telepon_orang_tua" = $9, 
        "email_orang_tua" = $10,
        "alamat" = $11, 
        "persentase_kehadiran" = $12, 
        "rata_rata_nilai" = $13, 
        "nilai_harian" = $14,
        "nilai_semester" = $15,
        "bobot_harian" = $16,
        "bobot_semester" = $17,
        "diperbarui_pada" = NOW() 
       WHERE "id" = $18`,
      data.name,
      data.nisn,
      className,
      classId,
      data.gender || "L",
      data.avatarUrl || "https://i.pravatar.cc/150",
      data.birthPlaceDate || "-",
      parentName,
      parentPhone,
      parentEmail,
      address,
      data.attendanceRate !== undefined && data.attendanceRate !== null && !isNaN(Number(data.attendanceRate)) ? Number(data.attendanceRate) : 0.0,
      Number(data.averageGrade) || 88.5,
      data.dailyGrade !== undefined && data.dailyGrade !== null ? Number(data.dailyGrade) : 85.0,
      data.semesterGrade !== undefined && data.semesterGrade !== null ? Number(data.semesterGrade) : 90.0,
      data.dailyWeight !== undefined && data.dailyWeight !== null ? Number(data.dailyWeight) : 40.0,
      data.semesterWeight !== undefined && data.semesterWeight !== null ? Number(data.semesterWeight) : 60.0,
      id
    );

    // 2. Also sync linked parent user in pengguna_admin if student has a linked parent user
    const studentRes: any[] = await prisma.$queryRawUnsafe(`SELECT nama_pengguna, telepon_orang_tua FROM "siswa" WHERE "id" = $1 LIMIT 1`, id);
    if (studentRes.length > 0) {
      const username = studentRes[0].nama_pengguna;
      const oldPhone = studentRes[0].telepon_orang_tua;
      await prisma.$executeRawUnsafe(
        `UPDATE "pengguna_admin" SET "nama" = $1, "telepon" = $2, "email" = $3, "diperbarui_pada" = NOW() WHERE ("nama_pengguna" = $4 AND "peran" = 'ORANG_TUA') OR ("telepon" = $5 AND "peran" = 'ORANG_TUA')`,
        parentName,
        parentPhone,
        parentEmail,
        username || "",
        oldPhone || parentPhone
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id,
        name: data.name,
        nisn: data.nisn,
        className,
        classId,
        gender: data.gender,
        parentName,
        parentPhone,
        parentEmail,
        address,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Akses ditolak" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.student.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Data murid dihapus" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
