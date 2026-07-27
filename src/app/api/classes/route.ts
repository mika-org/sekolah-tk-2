import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get("schoolId");
    const schoolCode = searchParams.get("schoolCode");

    let query = `
      SELECT 
        c.id, 
        c."id_sekolah" as "schoolId", 
        c."nama_kelas" as name, 
        c."tingkat" as "gradeLevel", 
        c."tahun_ajaran" as "academicYear", 
        c."kapasitas" as capacity, 
        c."id_guru_wali" as "homeroomTeacherId", 
        c."nama_guru_wali" as "homeroomTeacherName", 
        c."dibuat_pada" as "createdAt", 
        c."diperbarui_pada" as "updatedAt",
        (SELECT COUNT(*)::int FROM "siswa" st WHERE st."id_kelas" = c.id OR (c.id IS NULL AND st."nama_kelas" = c."nama_kelas")) as "studentCount",
        json_build_object(
          'id', s.id,
          'code', s.kode,
          'name', s.nama
        ) as school
      FROM "kelas" c
      LEFT JOIN "sekolah" s ON c."id_sekolah" = s.id
    `;

    const whereConditions: string[] = [];
    if (schoolId && schoolId !== "ALL") {
      whereConditions.push(`c."id_sekolah" = '${schoolId}'`);
    } else if (schoolCode && schoolCode !== "ALL") {
      whereConditions.push(`s."kode" = '${schoolCode}'`);
    }

    if (whereConditions.length > 0) {
      query += ` WHERE ` + whereConditions.join(" AND ");
    }
    query += ` ORDER BY c."nama_kelas" ASC`;

    const classesRaw: any[] = await prisma.$queryRawUnsafe(query);
    const classes = classesRaw.map((c) => {
      const studentCount = Number(c.studentCount || 0);
      const capacity = Number(c.capacity || 20);
      return {
        ...c,
        studentCount,
        capacity,
        isFull: studentCount >= capacity,
      };
    });
    return NextResponse.json({ success: true, data: classes });
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

    const { schoolId, name, gradeLevel, academicYear, capacity, homeroomTeacherId, homeroomTeacherName } = await req.json();

    let targetSchoolId = schoolId || admin.schoolId;
    if (!targetSchoolId) {
      const defaultSchool: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM "sekolah" ORDER BY "urutan" ASC LIMIT 1`);
      targetSchoolId = defaultSchool[0]?.id;
    }

    if (!targetSchoolId) {
      return NextResponse.json({ success: false, error: "Sekolah tidak ditemukan" }, { status: 400 });
    }

    const res: any[] = await prisma.$queryRawUnsafe(
      `INSERT INTO "kelas" ("id", "id_sekolah", "nama_kelas", "tingkat", "tahun_ajaran", "kapasitas", "id_guru_wali", "nama_guru_wali", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING id`,
      targetSchoolId,
      name,
      gradeLevel || "TK A",
      academicYear || "2026/2027",
      Number(capacity) || 20,
      homeroomTeacherId || null,
      homeroomTeacherName || null
    );

    const newClassId = res[0].id;

    // If homeroom teacher assigned, update teacher's id_kelas and assignedClass
    if (homeroomTeacherId) {
      await prisma.$executeRawUnsafe(
        `UPDATE "guru" SET "id_kelas" = $1, "kelas_ditugaskan" = $2 WHERE "id" = $3`,
        newClassId,
        name,
        homeroomTeacherId
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: newClassId,
        schoolId: targetSchoolId,
        name,
        gradeLevel: gradeLevel || "TK A",
        academicYear: academicYear || "2026/2027",
        capacity: Number(capacity) || 20,
        homeroomTeacherId: homeroomTeacherId || null,
        homeroomTeacherName: homeroomTeacherName || null,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
