import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get("schoolId");
    const schoolCode = searchParams.get("schoolCode");
    const date = searchParams.get("date");
    const teacherId = searchParams.get("teacherId");

    const where: any = {};

    if (date) {
      where.date = date;
    }

    if (teacherId) {
      where.teacherId = teacherId;
    }

    if (schoolId && schoolId !== "ALL") {
      where.schoolId = schoolId;
    } else if (schoolCode && schoolCode !== "ALL") {
      const sch = await prisma.school.findUnique({ where: { code: schoolCode } });
      if (sch) where.schoolId = sch.id;
    }

    const records = await prisma.teacherAttendance.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: records,
    });
  } catch (error: any) {
    console.error("GET teacher attendance error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Gagal mengambil data presensi guru" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { teacherId, teacherName, schoolId, className, status, time, reason, date } = body;

    if (!teacherId) {
      return NextResponse.json(
        { success: false, error: "ID Guru wajib diisi" },
        { status: 400 }
      );
    }

    const todayStr = date || new Date().toISOString().split("T")[0];
    const nowTimeStr = time || new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

    let tName = teacherName;
    let sId = schoolId;
    let cName = className;

    const teacher = await prisma.teacher.findUnique({ where: { id: teacherId } });
    if (teacher) {
      if (!tName) tName = teacher.name;
      if (!sId) sId = teacher.schoolId;
      if (!cName) cName = teacher.assignedClass || teacher.role;
    }

    const existing = await prisma.teacherAttendance.findFirst({
      where: {
        teacherId,
        date: todayStr,
      },
    });

    let record;
    if (existing) {
      record = await prisma.teacherAttendance.update({
        where: { id: existing.id },
        data: {
          status: status || "hadir",
          time: nowTimeStr,
          reason: reason || null,
        },
      });
    } else {
      record = await prisma.teacherAttendance.create({
        data: {
          teacherId,
          teacherName: tName || "Guru",
          schoolId: sId,
          className: cName,
          status: status || "hadir",
          time: nowTimeStr,
          reason: reason || null,
          date: todayStr,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil mencatat presensi guru",
      data: record,
    });
  } catch (error: any) {
    console.error("POST teacher attendance error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Gagal menyimpan presensi guru" },
      { status: 500 }
    );
  }
}
