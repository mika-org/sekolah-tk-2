import { prisma } from "@/lib/prisma";

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
