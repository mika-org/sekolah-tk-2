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
    const parentPhone = searchParams.get("parentPhone");
    const nisn = searchParams.get("nisn");
    const studentId = searchParams.get("studentId");

    let query = `
      SELECT 
        st.id, 
        st."id_sekolah" as "schoolId", 
        st."id_kelas" as "classId",
        st."nama" as name, 
        st."nisn" as nisn, 
        st."nama_pengguna" as username, 
        st."nama_kelas" as "className", 
        st."jenis_kelamin" as gender, 
        st."kode_qr" as "qrCode", 
        st."url_avatar" as "avatarUrl", 
        st."tempat_tanggal_lahir" as "birthPlaceDate", 
        st."nama_orang_tua" as "parentName", 
        st."telepon_orang_tua" as "parentPhone", 
        st."email_orang_tua" as "parentEmail", 
        st."alamat" as address, 
        st."persentase_kehadiran" as "attendanceRate", 
        st."rata_rata_nilai" as "averageGrade", 
        st."nilai_harian" as "dailyGrade",
        st."nilai_semester" as "semesterGrade",
        st."bobot_harian" as "dailyWeight",
        st."bobot_semester" as "semesterWeight",
        st."dibuat_pada" as "createdAt", 
        st."diperbarui_pada" as "updatedAt",
        json_build_object('id', k.id, 'name', k.nama_kelas, 'gradeLevel', k.tingkat) as "classRoom",
        json_build_object('id', s.id, 'code', s.kode, 'name', s.nama) as school
      FROM "siswa" st
      LEFT JOIN "kelas" k ON st."id_kelas" = k.id
      LEFT JOIN "sekolah" s ON st."id_sekolah" = s.id
    `;

    const whereConditions: string[] = [];
    if (studentId) whereConditions.push(`st."id" = '${studentId}'`);
    if (nisn) whereConditions.push(`st."nisn" = '${nisn}'`);
    if (classId && classId !== "ALL") whereConditions.push(`st."id_kelas" = '${classId}'`);
    if (className && className !== "ALL") whereConditions.push(`st."nama_kelas" = '${className}'`);
    if (parentPhone) whereConditions.push(`(st."telepon_orang_tua" = '${parentPhone}' OR st."telepon_orang_tua" LIKE '%${parentPhone}%')`);

    if (schoolId && schoolId !== "ALL") {
      whereConditions.push(`st."id_sekolah" = '${schoolId}'`);
    } else if (schoolCode && schoolCode !== "ALL") {
      whereConditions.push(`s."kode" = '${schoolCode}'`);
    }

    if (whereConditions.length > 0) {
      query += ` WHERE ` + whereConditions.join(" AND ");
    }
    query += ` ORDER BY st."nama" ASC`;

    const students: any[] = await prisma.$queryRawUnsafe(query);
    return NextResponse.json({ success: true, data: students });
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

    const { schoolId, classId, name, nisn, className, gender, avatarUrl, birthPlaceDate, parentName, parentPhone, parentEmail, address, attendanceRate, averageGrade, dailyGrade, semesterGrade, dailyWeight, semesterWeight } = await req.json();

    let targetSchoolId = schoolId || admin.schoolId;
    if (!targetSchoolId) {
      const defaultSchool: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM "sekolah" ORDER BY "urutan" ASC LIMIT 1`);
      targetSchoolId = defaultSchool[0]?.id;
    }

    const studentNisn = nisn || `NISN-${Date.now()}`;
    let finalClassName = className || "Kelas TK A";
    let targetClassId = classId || null;

    if (targetClassId) {
      const foundClass: any[] = await prisma.$queryRawUnsafe(`SELECT nama_kelas FROM "kelas" WHERE "id" = $1 LIMIT 1`, targetClassId);
      if (foundClass.length > 0) {
        finalClassName = foundClass[0].nama_kelas;
      }
    }

    const res: any[] = await prisma.$queryRawUnsafe(
      `INSERT INTO "siswa" ("id", "id_sekolah", "id_kelas", "nama", "nisn", "nama_kelas", "jenis_kelamin", "kode_qr", "url_avatar", "tempat_tanggal_lahir", "nama_orang_tua", "telepon_orang_tua", "email_orang_tua", "alamat", "persentase_kehadiran", "rata_rata_nilai", "nilai_harian", "nilai_semester", "bobot_harian", "bobot_semester", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, NOW(), NOW()) RETURNING id`,
      targetSchoolId,
      targetClassId,
      name,
      studentNisn,
      finalClassName,
      gender || "L",
      `STUDENT:${studentNisn}`,
      avatarUrl || "https://i.pravatar.cc/150",
      birthPlaceDate || "-",
      parentName || "-",
      parentPhone || "-",
      parentEmail || null,
      address || "-",
      Number(attendanceRate) || 95.0,
      Number(averageGrade) || 88.5,
      dailyGrade !== undefined && dailyGrade !== null ? Number(dailyGrade) : 85.0,
      semesterGrade !== undefined && semesterGrade !== null ? Number(semesterGrade) : 90.0,
      dailyWeight !== undefined && dailyWeight !== null ? Number(dailyWeight) : 40.0,
      semesterWeight !== undefined && semesterWeight !== null ? Number(semesterWeight) : 60.0
    );

    return NextResponse.json({
      success: true,
      data: {
        id: res[0].id,
        schoolId: targetSchoolId,
        classId: targetClassId,
        name,
        nisn: studentNisn,
        className: finalClassName,
        parentName,
        parentPhone,
        parentEmail,
        address,
        gender: gender || "L",
        qrCode: `STUDENT:${studentNisn}`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
