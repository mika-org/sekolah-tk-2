import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawQr = body?.qrData || body?.qrCode || body?.teacherId || "";
    const adminRole = body?.adminRole || body?.role || "";

    const qrData = String(rawQr).trim();
    if (!qrData) {
      return NextResponse.json(
        { success: false, error: "QR Data Guru tidak boleh kosong" },
        { status: 400 }
      );
    }

    // Security check: Only SUPER_ADMIN, ADMIN_PUSAT, and ADMIN_SEKOLAH can scan teacher QR
    const allowedRoles = ["SUPER_ADMIN", "ADMIN_PUSAT", "ADMIN_SEKOLAH"];
    if (adminRole && !allowedRoles.includes(adminRole.toUpperCase())) {
      return NextResponse.json(
        { success: false, error: "Hanya Super Admin & Admin Cabang yang berwenang melakukan scan QR presensi guru" },
        { status: 403 }
      );
    }

    let cleanCode = qrData;
    if (qrData.startsWith("TEACHER:")) {
      cleanCode = qrData.replace("TEACHER:", "");
    }

    const teacher = await prisma.teacher.findFirst({
      where: {
        OR: [
          { id: cleanCode },
          { qrCode: qrData },
          { qrCode: `TEACHER:${cleanCode}` },
          { name: { contains: cleanCode, mode: "insensitive" } },
        ],
      },
      include: {
        school: true,
      },
    });

    if (!teacher) {
      return NextResponse.json(
        { success: false, error: `Guru dengan QR Data "${qrData}" tidak ditemukan` },
        { status: 404 }
      );
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const nowTimeStr = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const existing = await prisma.teacherAttendance.findFirst({
      where: {
        teacherId: teacher.id,
        date: todayStr,
      },
    });

    let record;
    if (existing) {
      record = await prisma.teacherAttendance.update({
        where: { id: existing.id },
        data: {
          status: "hadir",
          time: nowTimeStr,
        },
      });
    } else {
      record = await prisma.teacherAttendance.create({
        data: {
          teacherId: teacher.id,
          teacherName: teacher.name,
          schoolId: teacher.schoolId,
          className: teacher.assignedClass || teacher.role,
          status: "hadir",
          time: nowTimeStr,
          date: todayStr,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Presensi QR Guru berhasil! ${teacher.name} (${teacher.role}) dicatat HADIR pukul ${nowTimeStr}`,
      data: {
        attendance: record,
        teacher: {
          id: teacher.id,
          name: teacher.name,
          role: teacher.role,
          assignedClass: teacher.assignedClass,
          photoUrl: teacher.photoUrl,
          schoolName: teacher.school?.name || "TK Smart Kids",
        },
      },
    });
  } catch (error: any) {
    console.error("Scan QR teacher attendance error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Gagal memproses QR presensi guru" },
      { status: 500 }
    );
  }
}
