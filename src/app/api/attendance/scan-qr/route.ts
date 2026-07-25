import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawQr = body?.qrData || body?.qrCode || body?.nisn || body?.studentId || "";

    const qrData = String(rawQr).trim();
    if (!qrData) {
      return NextResponse.json(
        { success: false, error: "QR Data / NISN tidak boleh kosong" },
        { status: 400 }
      );
    }

    // Extract identifier: "STUDENT:12345" -> "12345" or raw string
    let cleanCode = qrData;
    if (qrData.startsWith("STUDENT:")) {
      cleanCode = qrData.replace("STUDENT:", "");
    }

    const student = await prisma.student.findFirst({
      where: {
        OR: [
          { id: cleanCode },
          { nisn: cleanCode },
          { qrCode: qrData },
          { qrCode: `STUDENT:${cleanCode}` },
        ],
      },
      include: {
        school: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        { success: false, error: `Siswa dengan QR Data "${qrData}" tidak ditemukan` },
        { status: 404 }
      );
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const nowTimeStr = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Check if attendance already recorded today
    const existing = await prisma.attendance.findFirst({
      where: {
        studentId: student.id,
        date: todayStr,
      },
    });

    let record;
    if (existing) {
      record = await prisma.attendance.update({
        where: { id: existing.id },
        data: {
          status: "hadir",
          time: nowTimeStr,
        },
      });
    } else {
      record = await prisma.attendance.create({
        data: {
          studentId: student.id,
          studentName: student.name,
          className: student.className,
          status: "hadir",
          time: nowTimeStr,
          date: todayStr,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Presensi QR berhasil! ${student.name} (${student.className}) dicatat HADIR pukul ${nowTimeStr}`,
      data: {
        attendance: record,
        student: {
          id: student.id,
          name: student.name,
          nisn: student.nisn,
          className: student.className,
          avatarUrl: student.avatarUrl,
          schoolName: student.school?.name || "TK Smart Kids",
        },
      },
    });
  } catch (error: any) {
    console.error("Scan QR attendance error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Gagal memproses QR presensi murid" },
      { status: 500 }
    );
  }
}
