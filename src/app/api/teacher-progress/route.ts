import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get("schoolId");
    const schoolCode = searchParams.get("schoolCode");
    const teacherId = searchParams.get("teacherId");
    const teacherName = searchParams.get("teacherName");
    const month = searchParams.get("month");

    let query = `
      SELECT 
        tp.id,
        tp."id_guru" as "teacherId",
        tp."nama_guru" as "teacherName",
        tp."id_sekolah" as "schoolId",
        tp."bulan" as "month",
        tp."judul_program" as "programTitle",
        tp."jam_mengajar" as "hoursTaught",
        tp."target_jam" as "targetHours",
        tp."persentase_capaian" as "completionPercentage",
        tp."jumlah_siswa_dievaluasi" as "evaluatedStudentsCount",
        tp."poin_progresif" as "progressivePoints",
        tp."catatan_capaian" as "notes",
        tp."dibuat_pada" as "createdAt",
        tp."diperbarui_pada" as "updatedAt",
        json_build_object('id', g.id, 'name', g.nama, 'photoUrl', g.url_foto, 'role', g.jabatan) as teacher
      FROM "capaian_progresif_guru" tp
      LEFT JOIN "guru" g ON tp."id_guru" = g.id
    `;

    const whereConditions: string[] = [];

    if (teacherId && teacherId !== "ALL") {
      whereConditions.push(`(tp."id_guru" = '${teacherId}' OR g.id = '${teacherId}')`);
    }

    if (teacherName && teacherName !== "ALL") {
      const sanitizedName = teacherName.replace(/'/g, "''");
      whereConditions.push(`(tp."nama_guru" ILIKE '%${sanitizedName}%' OR g.nama ILIKE '%${sanitizedName}%')`);
    }

    if (month && month !== "ALL") {
      whereConditions.push(`tp."bulan" ILIKE '%${month.replace(/'/g, "''")}%'`);
    }

    if (schoolId && schoolId !== "ALL") {
      whereConditions.push(`tp."id_sekolah" = '${schoolId}'`);
    } else if (schoolCode && schoolCode !== "ALL") {
      whereConditions.push(`g."id_sekolah" IN (SELECT id FROM "sekolah" WHERE kode = '${schoolCode}')`);
    }

    if (whereConditions.length > 0) {
      query += ` WHERE ` + whereConditions.join(" AND ");
    }
    query += ` ORDER BY tp."dibuat_pada" DESC`;

    const records: any[] = await prisma.$queryRawUnsafe(query);
    return NextResponse.json({ success: true, data: records });
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

    const {
      teacherId,
      teacherName,
      schoolId,
      month,
      programTitle,
      hoursTaught,
      targetHours,
      evaluatedStudentsCount,
      notes,
    } = await req.json();

    let targetTeacherName = teacherName;
    let targetTeacherId = teacherId;

    if (!targetTeacherName && targetTeacherId) {
      const g: any[] = await prisma.$queryRawUnsafe(`SELECT nama FROM "guru" WHERE id = $1 LIMIT 1`, targetTeacherId);
      if (g.length > 0) targetTeacherName = g[0].nama;
    }

    if (!targetTeacherName) {
      targetTeacherName = admin.name || "Guru Pengajar";
    }

    const hTaught = Number(hoursTaught) || 0;
    const tHours = Number(targetHours) || 40;
    const completionPct = Math.min(Math.round((hTaught / tHours) * 1000) / 10, 100);
    const progressiveRatio = Math.max(Math.round((hTaught / Math.max(tHours, 1)) * 100) / 100, 0.5);

    const targetSchoolId = schoolId || admin.schoolId || null;
    const currentMonth = month || new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" });

    const res: any[] = await prisma.$queryRawUnsafe(
      `INSERT INTO "capaian_progresif_guru" (
        "id", "id_guru", "nama_guru", "id_sekolah", "bulan", "judul_program", 
        "jam_mengajar", "target_jam", "persentase_capaian", "jumlah_siswa_dievaluasi", 
        "poin_progresif", "catatan_capaian", "dibuat_pada", "diperbarui_pada"
      ) VALUES (
        gen_random_uuid()::text, $1, $2, $3, $4, $5, 
        $6, $7, $8, $9, 
        $10, $11, NOW(), NOW()
      ) RETURNING id`,
      targetTeacherId || null,
      targetTeacherName,
      targetSchoolId,
      currentMonth,
      programTitle || "Program Pembelajaran TK A",
      hTaught,
      tHours,
      completionPct,
      Number(evaluatedStudentsCount) || 0,
      progressiveRatio,
      notes || null
    );

    return NextResponse.json({
      success: true,
      data: {
        id: res[0].id,
        teacherId: targetTeacherId,
        teacherName: targetTeacherName,
        schoolId: targetSchoolId,
        month: currentMonth,
        programTitle: programTitle || "Program Pembelajaran TK A",
        hoursTaught: hTaught,
        targetHours: tHours,
        completionPercentage: completionPct,
        evaluatedStudentsCount: Number(evaluatedStudentsCount) || 0,
        progressivePoints: progressiveRatio,
        notes: notes || null,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
