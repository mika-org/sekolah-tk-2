import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function recalculateStudentGrades(studentId: string) {
  try {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { attendances: true, dailyGrades: true },
    });

    if (!student) return null;

    // 1. Calculate Attendance Rate (%)
    const totalAttendances = student.attendances.length;
    let attendanceRate = student.attendanceRate ?? 95.0;

    if (totalAttendances > 0) {
      const hadirCount = student.attendances.filter(
        (a) => (a.status || "").toLowerCase() === "hadir"
      ).length;
      attendanceRate = Math.round((hadirCount / totalAttendances) * 1000) / 10;
    }

    // 2. Calculate Average Daily Grade from DailyGrade records
    const totalDailyRecords = student.dailyGrades.length;
    let dailyGradeAvg = student.dailyGrade ?? 85.0;

    if (totalDailyRecords > 0) {
      const sumScores = student.dailyGrades.reduce((acc, curr) => acc + Number(curr.score || 0), 0);
      dailyGradeAvg = Math.round((sumScores / totalDailyRecords) * 10) / 10;
    }

    // 3. Calculate Final Grade (averageGrade) based on weights
    const attWeight = Number((student as any).attendanceWeight ?? 20.0);
    const dWeight = Number(student.dailyWeight ?? 40.0);
    const semWeight = Number(student.semesterWeight ?? 40.0);
    const semGrade = Number(student.semesterGrade ?? 90.0);

    const calculatedFinalGrade = Math.round(
      ((attendanceRate * attWeight) / 100 +
        (dailyGradeAvg * dWeight) / 100 +
        (semGrade * semWeight) / 100) *
        10
    ) / 10;

    // 4. Update Student Record in DB
    await prisma.student.update({
      where: { id: studentId },
      data: {
        attendanceRate,
        dailyGrade: dailyGradeAvg,
        averageGrade: calculatedFinalGrade,
        attendanceWeight: attWeight,
        dailyWeight: dWeight,
        semesterWeight: semWeight,
      },
    });

    return {
      attendanceRate,
      dailyGradeAvg,
      calculatedFinalGrade,
    };
  } catch (err: any) {
    console.error("Error recalculating student grades:", err);
    return null;
  }
}

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
