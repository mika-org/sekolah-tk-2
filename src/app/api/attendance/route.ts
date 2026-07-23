import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const attendances = await prisma.attendance.findMany({
      orderBy: { createdAt: "desc" },
      include: { student: true },
    });
    return NextResponse.json({ success: true, data: attendances });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { studentId: reqStudentId, studentName, className, status, time, reason, date } = await req.json();

    let targetStudentId = reqStudentId;
    if (!targetStudentId && studentName) {
      const foundStudent = await prisma.student.findFirst({
        where: { name: { equals: studentName, mode: "insensitive" } },
      });
      if (foundStudent) targetStudentId = foundStudent.id;
    }

    if (!targetStudentId) {
      const fallbackStudent = await prisma.student.findFirst();
      targetStudentId = fallbackStudent?.id;
    }

    if (!targetStudentId) {
      return NextResponse.json(
        { success: false, error: "Siswa tidak ditemukan. Pastikan data siswa sudah terdaftar terlebih dahulu." },
        { status: 400 }
      );
    }

    const attendance = await prisma.attendance.create({
      data: {
        studentId: targetStudentId,
        studentName: studentName || "Siswa",
        className: className || "Kelas TK A",
        status: status || "hadir",
        time: time || null,
        reason: reason || null,
        date: date || new Date().toISOString().split("T")[0],
      },
    });

    return NextResponse.json({ success: true, data: attendance });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
