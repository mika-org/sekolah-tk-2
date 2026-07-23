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

    const teachers = await prisma.teacher.findMany({
      where,
      orderBy: { orderIndex: "asc" },
      include: { school: true },
    });
    return NextResponse.json({ success: true, data: teachers });
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
      return NextResponse.json(
        { success: false, error: "Akses ditolak" },
        { status: 401 }
      );
    }

    const { schoolId, name, role, photoUrl, bio, education, orderIndex } = await req.json();

    let targetSchoolId = schoolId || admin.schoolId;
    if (!targetSchoolId) {
      const defaultSchool = await prisma.school.findFirst({ orderBy: { orderIndex: "asc" } });
      targetSchoolId = defaultSchool?.id;
    }

    if (!targetSchoolId) {
      return NextResponse.json(
        { success: false, error: "Sekolah tidak ditemukan" },
        { status: 400 }
      );
    }

    const teacher = await prisma.teacher.create({
      data: {
        schoolId: targetSchoolId,
        name,
        role,
        photoUrl: photoUrl || "/images/teacher_default.png",
        bio: bio || null,
        education: education || null,
        orderIndex: Number(orderIndex) || 0,
      },
    });

    return NextResponse.json({ success: true, data: teacher });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
