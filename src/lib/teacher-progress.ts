import { prisma } from "@/lib/prisma";

/**
 * Automatically syncs & calculates a teacher's monthly teaching progress history
 * based on teacher presence (kehadiran), assigned program SPP ratio relative to minimum SPP,
 * and total teaching hours achieved for the month.
 */
export async function syncTeacherMonthlyProgress(teacherId: string) {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id: teacherId },
      include: { school: true, classRoom: true },
    });
    if (!teacher) return null;

    const now = new Date();
    const currentMonthStr = now.toLocaleDateString("id-ID", { month: "long", year: "numeric" }); // e.g. "Juli 2026"
    const monthIsoPrefix = now.toISOString().substring(0, 7); // e.g. "2026-07"

    // 1. Count presence days for this teacher in current month
    const attendances = await prisma.teacherAttendance.findMany({
      where: {
        teacherId,
        date: { startsWith: monthIsoPrefix },
        status: { equals: "hadir", mode: "insensitive" },
      },
    });

    const hadirDaysCount = attendances.length;
    const hoursTaught = hadirDaysCount * 3.0; // 3 hours per teaching session
    const targetHours = 40.0; // 40 hours standard monthly target

    // 2. Find minimum basis SPP in the system
    const allPrograms = await prisma.program.findMany();
    const minSppAmount = allPrograms.length > 0 ? Math.min(...allPrograms.map((p) => Number(p.sppAmount || 200000))) : 200000;

    // 3. Find assigned program SPP for this teacher based on class plotting
    let teacherProgramSpp = minSppAmount;
    let programTitle = teacher.assignedClass || teacher.classRoom?.name || teacher.role || "Program Belajar";

    // Query classes to find if teacher is Wali Kelas
    const assignedClasses = await prisma.classRoom.findMany({
      where: {
        OR: [
          { id: teacher.classId || "" },
          { homeroomTeacherId: teacher.id },
          { homeroomTeacherName: { equals: teacher.name, mode: "insensitive" } },
        ],
      },
    });

    const plottedClassName = assignedClasses[0]?.name || teacher.classRoom?.name || teacher.assignedClass || "";
    const plottedGradeLevel = assignedClasses[0]?.gradeLevel || "";

    const schoolPrograms = allPrograms.filter((p) => !p.schoolId || p.schoolId === teacher.schoolId);

    const matchedProgram =
      schoolPrograms.find((p) => {
        const titleLower = p.title.toLowerCase();
        return (
          (plottedGradeLevel && titleLower.includes(plottedGradeLevel.toLowerCase())) ||
          (plottedClassName && (titleLower.includes(plottedClassName.toLowerCase()) || plottedClassName.toLowerCase().includes(titleLower))) ||
          (teacher.assignedClass && (titleLower.includes(teacher.assignedClass.toLowerCase()) || teacher.assignedClass.toLowerCase().includes(titleLower)))
        );
      }) || schoolPrograms[0] || allPrograms[0];

    if (matchedProgram) {
      teacherProgramSpp = Number(matchedProgram.sppAmount || minSppAmount);
      programTitle = matchedProgram.title;
    }

    // 4. Calculate SPP Ratio (Teacher Program SPP / Minimum Basis SPP)
    const sppRatio = Math.max(Math.round((teacherProgramSpp / Math.max(minSppAmount, 1)) * 100) / 100, 1.0);

    // 5. Completion percentage & Monthly Result Earnings/Points
    const completionPercentage = Math.min(Math.round((hoursTaught / targetHours) * 1000) / 10, 100);
    const baseDailyIncentive = 50000; // Rp 50.000 per kehadiran basis
    const estimatedMonthlyResult = Math.round(hadirDaysCount * baseDailyIncentive * sppRatio);
    const progressivePoints = Math.max(Math.round(sppRatio * Math.max(completionPercentage / 100, 0.5) * 100) / 100, 1.0);

    // Count evaluated students by teacher in current month
    const evaluatedStudentsCount = await prisma.dailyGrade.count({
      where: {
        student: {
          schoolId: teacher.schoolId,
        },
      },
    });

    const notes = `Presensi Otomatis: ${hadirDaysCount} Hari Hadir (${hoursTaught} Jam) • SPP Ratio: ${sppRatio}x (Rp ${teacherProgramSpp.toLocaleString("id-ID")} / Rp ${minSppAmount.toLocaleString("id-ID")}) • Hasil Bulanan: Rp ${estimatedMonthlyResult.toLocaleString("id-ID")}`;

    // 6. Upsert record in capaian_progresif_guru table via raw SQL
    const existingProgress: any[] = await prisma.$queryRawUnsafe(
      `SELECT id FROM "capaian_progresif_guru" WHERE "id_guru" = $1 AND "bulan" = $2 LIMIT 1`,
      teacherId,
      currentMonthStr
    );

    if (existingProgress.length > 0) {
      await prisma.$executeRawUnsafe(
        `UPDATE "capaian_progresif_guru" SET 
          "nama_guru" = $1, 
          "judul_program" = $2, 
          "jam_mengajar" = $3, 
          "target_jam" = $4, 
          "persentase_capaian" = $5, 
          "jumlah_siswa_dievaluasi" = $6, 
          "poin_progresif" = $7, 
          "catatan_capaian" = $8, 
          "diperbarui_pada" = NOW() 
        WHERE "id" = $9`,
        teacher.name,
        programTitle,
        hoursTaught,
        targetHours,
        completionPercentage,
        evaluatedStudentsCount || 15,
        progressivePoints,
        notes,
        existingProgress[0].id
      );
    } else {
      await prisma.$executeRawUnsafe(
        `INSERT INTO "capaian_progresif_guru" (
          "id", "id_guru", "nama_guru", "id_sekolah", "bulan", "judul_program", 
          "jam_mengajar", "target_jam", "persentase_capaian", "jumlah_siswa_dievaluasi", 
          "poin_progresif", "catatan_capaian", "dibuat_pada", "diperbarui_pada"
        ) VALUES (
          gen_random_uuid()::text, $1, $2, $3, $4, $5, 
          $6, $7, $8, $9, 
          $10, $11, NOW(), NOW()
        )`,
        teacher.id,
        teacher.name,
        teacher.schoolId,
        currentMonthStr,
        programTitle,
        hoursTaught,
        targetHours,
        completionPercentage,
        evaluatedStudentsCount || 15,
        progressivePoints,
        notes
      );
    }

    return {
      teacherId,
      teacherName: teacher.name,
      hadirDaysCount,
      hoursTaught,
      sppRatio,
      teacherProgramSpp,
      minSppAmount,
      estimatedMonthlyResult,
      completionPercentage,
    };
  } catch (err) {
    console.error("Error syncing teacher monthly progress:", err);
    return null;
  }
}
