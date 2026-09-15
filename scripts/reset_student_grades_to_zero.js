const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetGrades() {
  console.log('--- Resetting Pre-filled Student Grades to 0 ---');

  const students = await prisma.student.findMany({
    include: {
      attendances: true,
      dailyGrades: true,
    },
  });

  console.log(`Total students found: ${students.length}`);
  let updatedCount = 0;

  for (const s of students) {
    // 1. Attendance rate
    let attRate = 0.0;
    if (s.attendances.length > 0) {
      const hadirCount = s.attendances.filter(
        (a) => (a.status || '').toLowerCase() === 'hadir'
      ).length;
      attRate = Math.round((hadirCount / s.attendances.length) * 1000) / 10;
    }

    // 2. Daily grade average from real records only
    let dailyAvg = 0.0;
    if (s.dailyGrades.length > 0) {
      const sum = s.dailyGrades.reduce((acc, curr) => acc + Number(curr.score || 0), 0);
      dailyAvg = Math.round((sum / s.dailyGrades.length) * 10) / 10;
    }

    // 3. Semester grade (if previously 90 preset with no real justification, set to 0.0)
    let semGrade = Number(s.semesterGrade || 0);
    if (semGrade === 90 && s.dailyGrades.length === 0) {
      semGrade = 0.0;
    }

    // 4. Final grade
    const attWeight = Number(s.attendanceWeight ?? 20.0);
    const dWeight = Number(s.dailyWeight ?? 40.0);
    const semWeight = Number(s.semesterWeight ?? 40.0);

    const finalGrade = Math.round(
      ((attRate * attWeight) / 100 +
        (dailyAvg * dWeight) / 100 +
        (semGrade * semWeight) / 100) *
        10
    ) / 10;

    await prisma.student.update({
      where: { id: s.id },
      data: {
        attendanceRate: attRate,
        dailyGrade: dailyAvg,
        semesterGrade: semGrade,
        averageGrade: finalGrade,
      },
    });

    updatedCount++;
  }

  console.log(`Successfully updated ${updatedCount} students to clean 0.0 baseline!`);
}

resetGrades().catch(console.error).finally(() => process.exit(0));
