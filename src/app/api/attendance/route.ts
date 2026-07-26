import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { recalculateStudentGrades } from "@/lib/student-grades";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get("schoolId");
    const schoolCode = searchParams.get("schoolCode");
    const date = searchParams.get("date");
    const className = searchParams.get("className");
    const studentId = searchParams.get("studentId");
    const parentPhone = searchParams.get("parentPhone");

    const where: any = {};

    if (date) {
      where.date = date;
    }

    if (className) {
      where.className = className;
    }

    if (studentId) {
      where.studentId = studentId;
    }

    if (parentPhone) {
      where.student = {
        parentPhone: { contains: parentPhone },
      };
    }

    if (schoolId && schoolId !== "ALL") {
      where.student = {
        ...(where.student || {}),
        schoolId: schoolId,
      };
    } else if (schoolCode && schoolCode !== "ALL") {
      const sch = await prisma.school.findUnique({ where: { code: schoolCode } });
      if (sch) {
        where.student = {
          ...(where.student || {}),
          schoolId: sch.id,
        };
      }
    }

    const attendances = await prisma.attendance.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { student: { include: { school: true } } },
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

    // Automatically recalculate attendance percentage & final grade in DB
    try {
      await recalculateStudentGrades(targetStudentId);
    } catch (recalcErr) {
      console.warn("Attendance grade recalculation warning:", recalcErr);
    }

    return NextResponse.json({ success: true, data: attendance });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
