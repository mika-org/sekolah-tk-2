import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get("schoolId");
    const schoolCode = searchParams.get("schoolCode");

    const where: any = {};
    if (schoolId) {
      where.schoolId = schoolId;
    } else if (schoolCode) {
      const school = await prisma.school.findUnique({ where: { code: schoolCode } });
      if (school) where.schoolId = school.id;
    }

    const students = await prisma.student.findMany({
      where,
      orderBy: { name: "asc" },
      include: { school: true },
    });
    return NextResponse.json({ success: true, data: students });
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

    const { schoolId, name, nisn, className, gender, avatarUrl, birthPlaceDate, parentName, parentPhone, address, attendanceRate, averageGrade } = await req.json();

    let targetSchoolId = schoolId || admin.schoolId;
    if (!targetSchoolId) {
      const defaultSchool = await prisma.school.findFirst({ orderBy: { orderIndex: "asc" } });
      targetSchoolId = defaultSchool?.id;
    }

    const student = await prisma.student.create({
      data: {
        schoolId: targetSchoolId,
        name,
        nisn: nisn || `NISN-${Date.now()}`,
        className: className || "Kelas TK A",
        gender: gender || "L",
        avatarUrl: avatarUrl || "https://i.pravatar.cc/150",
        birthPlaceDate: birthPlaceDate || "-",
        parentName: parentName || "-",
        parentPhone: parentPhone || "-",
        address: address || "-",
        attendanceRate: Number(attendanceRate) || 95.0,
        averageGrade: Number(averageGrade) || 88.5,
      },
    });

    return NextResponse.json({ success: true, data: student });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
