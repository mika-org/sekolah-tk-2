import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";
import { recalculateStudentGrades } from "@/lib/student-grades";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");
    const schoolId = searchParams.get("schoolId");
    const date = searchParams.get("date");

    const where: any = {};

    if (studentId) {
      where.studentId = studentId;
    }

    if (date) {
      where.date = date;
    }

    if (schoolId && schoolId !== "ALL") {
      where.student = { schoolId };
    }

    const dailyGrades = await prisma.dailyGrade.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { student: true },
    });

    return NextResponse.json({ success: true, data: dailyGrades });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Akses ditolak" }, { status: 401 });
    }

    const { studentId, subject, score, date, notes } = await req.json();

    if (!studentId) {
      return NextResponse.json({ success: false, error: "Pilih siswa terlebih dahulu" }, { status: 400 });
    }

    const gradeDate = date || new Date().toISOString().split("T")[0];

    const newDailyGrade = await prisma.dailyGrade.create({
      data: {
        studentId,
        subject: subject || "Moral & Agama",
        score: Number(score) || 85.0,
        date: gradeDate,
        notes: notes || null,
      } as any,
    });

    // Automatically recalculate student summary grades & attendance
    const summary = await recalculateStudentGrades(studentId);

    return NextResponse.json({
      success: true,
      data: newDailyGrade,
      summary,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
