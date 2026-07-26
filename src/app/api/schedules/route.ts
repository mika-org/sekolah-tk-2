import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get("schoolId");
    const schoolCode = searchParams.get("schoolCode");
    const classId = searchParams.get("classId");
    const className = searchParams.get("className");

    let query = `
      SELECT 
        j.id, 
        j."id_sekolah" as "schoolId", 
        j."id_kelas" as "classId",
        j."rentang_waktu" as "timeRange", 
        j."nama_kelas" as "className", 
        j."ruangan" as room, 
        j."mata_pelajaran" as subject, 
        j."aktivitas" as activities, 
        j."selesai" as "isCompleted", 
        j."dibuat_pada" as "createdAt", 
        j."diperbarui_pada" as "updatedAt",
        json_build_object('id', s.id, 'code', s.kode, 'name', s.nama) as school
      FROM "jadwal_kbm" j
      LEFT JOIN "sekolah" s ON j."id_sekolah" = s.id
    `;

    const whereConditions: string[] = [];
    if (classId && classId !== "ALL") whereConditions.push(`j."id_kelas" = '${classId}'`);
    if (className && className !== "ALL") whereConditions.push(`j."nama_kelas" = '${className}'`);

    if (schoolId && schoolId !== "ALL") {
      whereConditions.push(`j."id_sekolah" = '${schoolId}'`);
    } else if (schoolCode && schoolCode !== "ALL") {
      whereConditions.push(`s."kode" = '${schoolCode}'`);
    }

    if (whereConditions.length > 0) {
      query += ` WHERE ` + whereConditions.join(" AND ");
    }
    query += ` ORDER BY j."rentang_waktu" ASC`;

    const schedules: any[] = await prisma.$queryRawUnsafe(query);
    return NextResponse.json({ success: true, data: schedules });
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

    const { id, schoolId, classId, timeRange, className, room, subject, activities, isCompleted } = await req.json();

    let targetSchoolId = schoolId || admin.schoolId;
    if (!targetSchoolId) {
      const defaultSchool: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM "sekolah" ORDER BY "urutan" ASC LIMIT 1`);
      targetSchoolId = defaultSchool[0]?.id;
    }

    if (!targetSchoolId) {
      return NextResponse.json({ success: false, error: "Sekolah tidak ditemukan" }, { status: 400 });
    }

    if (id) {
      // Update existing schedule
      await prisma.$executeRawUnsafe(
        `UPDATE "jadwal_kbm" SET "id_sekolah" = $1, "id_kelas" = $2, "rentang_waktu" = $3, "nama_kelas" = $4, "ruangan" = $5, "mata_pelajaran" = $6, "aktivitas" = $7, "selesai" = $8, "diperbarui_pada" = NOW() WHERE "id" = $9`,
        targetSchoolId,
        classId || null,
        timeRange || "08.00 - 09.30",
        className || "Kelas TK A",
        room || "Ruang Kelas",
        subject || "Pelajaran Utama",
        activities || "Bernyanyi & Belajar",
        isCompleted ? true : false,
        id
      );

      return NextResponse.json({ success: true, data: { id, schoolId: targetSchoolId, timeRange, className } });
    }

    const res: any[] = await prisma.$queryRawUnsafe(
      `INSERT INTO "jadwal_kbm" ("id", "id_sekolah", "id_kelas", "rentang_waktu", "nama_kelas", "ruangan", "mata_pelajaran", "aktivitas", "selesai", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) RETURNING id`,
      targetSchoolId,
      classId || null,
      timeRange || "08.00 - 09.30",
      className || "Kelas TK A",
      room || "Ruang Kelas",
      subject || "Pelajaran Utama",
      activities || "Bernyanyi & Belajar",
      isCompleted ? true : false
    );

    return NextResponse.json({
      success: true,
      data: {
        id: res[0].id,
        schoolId: targetSchoolId,
        timeRange,
        className,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
