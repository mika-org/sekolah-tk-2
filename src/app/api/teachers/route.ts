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
        g.id, 
        g."id_sekolah" as "schoolId", 
        g."id_kelas" as "classId",
        g."nama" as name, 
        g."jabatan" as role, 
        g."kelas_ditugaskan" as "assignedClass", 
        g."kode_qr" as "qrCode", 
        g."url_foto" as "photoUrl", 
        g."bio" as bio, 
        g."pendidikan" as education, 
        g."urutan" as "orderIndex", 
        g."dibuat_pada" as "createdAt", 
        g."diperbarui_pada" as "updatedAt",
        json_build_object('id', k.id, 'name', k.nama_kelas) as "classRoom",
        json_build_object('id', s.id, 'code', s.kode, 'name', s.nama) as school
      FROM "guru" g
      LEFT JOIN "kelas" k ON g."id_kelas" = k.id
      LEFT JOIN "sekolah" s ON g."id_sekolah" = s.id
    `;

    const whereConditions: string[] = [];
    if (schoolId && schoolId !== "ALL") {
      whereConditions.push(`g."id_sekolah" = '${schoolId}'`);
    } else if (schoolCode && schoolCode !== "ALL") {
      whereConditions.push(`s."kode" = '${schoolCode}'`);
    }

    if (whereConditions.length > 0) {
      query += ` WHERE ` + whereConditions.join(" AND ");
    }
    query += ` ORDER BY g."urutan" ASC, g."nama" ASC`;

    const teachers: any[] = await prisma.$queryRawUnsafe(query);
    const formatted = teachers.map((t: any) => ({
      ...t,
      qrCode: t.qrCode || `TEACHER:${t.id}`,
    }));

    return NextResponse.json({ success: true, data: formatted });
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

    const { id, schoolId, classId, name, role, assignedClass, photoUrl, bio, education, orderIndex } = await req.json();

    let targetSchoolId = schoolId || admin.schoolId;
    if (!targetSchoolId) {
      const defaultSchool: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM "sekolah" ORDER BY "urutan" ASC LIMIT 1`);
      targetSchoolId = defaultSchool[0]?.id;
    }

    if (!targetSchoolId) {
      return NextResponse.json({ success: false, error: "Sekolah tidak ditemukan" }, { status: 400 });
    }

    if (id) {
      // Update existing teacher
      await prisma.$executeRawUnsafe(
        `UPDATE "guru" SET "nama" = $1, "jabatan" = $2, "kelas_ditugaskan" = $3, "id_kelas" = $4, "url_foto" = $5, "bio" = $6, "pendidikan" = $7, "urutan" = $8, "diperbarui_pada" = NOW() WHERE "id" = $9`,
        name,
        role,
        assignedClass || null,
        classId || null,
        photoUrl || "/images/teacher_default.png",
        bio || null,
        education || null,
        Number(orderIndex) || 0,
        id
      );

      // Also update linked AdminUser if role GURU
      await prisma.$executeRawUnsafe(
        `UPDATE "pengguna_admin" SET "kelas_ditugaskan" = $1, "id_kelas" = $2 WHERE "nama" = $3`,
        assignedClass || null,
        classId || null,
        name
      );

      return NextResponse.json({ success: true, data: { id, name, role, assignedClass } });
    }

    const res: any[] = await prisma.$queryRawUnsafe(
      `INSERT INTO "guru" ("id", "id_sekolah", "id_kelas", "nama", "jabatan", "kelas_ditugaskan", "kode_qr", "url_foto", "bio", "pendidikan", "urutan", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW()) RETURNING id`,
      targetSchoolId,
      classId || null,
      name,
      role,
      assignedClass || null,
      `TEACHER:${Date.now()}`,
      photoUrl || "/images/teacher_default.png",
      bio || null,
      education || null,
      Number(orderIndex) || 0
    );

    const createdId = res[0].id;
    await prisma.$executeRawUnsafe(`UPDATE "guru" SET "kode_qr" = $1 WHERE "id" = $2`, `TEACHER:${createdId}`, createdId);

    return NextResponse.json({
      success: true,
      data: {
        id: createdId,
        schoolId: targetSchoolId,
        name,
        role,
        assignedClass: assignedClass || null,
        qrCode: `TEACHER:${createdId}`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
