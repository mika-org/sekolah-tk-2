import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get("schoolId");
    const schoolCode = searchParams.get("schoolCode");

    const where: any = {};
    if (schoolId && schoolId !== "ALL") {
      where.schoolId = schoolId;
    } else if (schoolCode && schoolCode !== "ALL") {
      const school = await prisma.school.findUnique({ where: { code: schoolCode } });
      if (school) where.schoolId = school.id;
    }

    const db = prisma as any;
    const classes = await db.classRoom.findMany({
      where,
      orderBy: { name: "asc" },
      include: { school: true },
    });

    return NextResponse.json({ success: true, data: classes });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
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
      const defaultSchool = await prisma.school.findFirst({ orderBy: { orderIndex: "asc" } });
      targetSchoolId = defaultSchool?.id;
    }

    if (!targetSchoolId) {
      return NextResponse.json({ success: false, error: "Sekolah tidak ditemukan" }, { status: 400 });
    }

    const db = prisma as any;
    const classRoom = await db.classRoom.create({
      data: {
        schoolId: targetSchoolId,
        name,
        gradeLevel: gradeLevel || "TK A",
        academicYear: academicYear || "2026/2027",
        capacity: Number(capacity) || 20,
        homeroomTeacherId: homeroomTeacherId || null,
        homeroomTeacherName: homeroomTeacherName || null,
      },
    });

    // If homeroom teacher assigned, update teacher's assignedClass
    if (homeroomTeacherId) {
      await db.teacher.update({
        where: { id: homeroomTeacherId },
        data: { assignedClass: name },
      });
    }

    return NextResponse.json({ success: true, data: classRoom });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
