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

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { orderIndex: "asc" },
      include: { school: true },
    });
    return NextResponse.json({ success: true, data: testimonials });
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

    const {
      schoolId,
      parentName,
      role,
      initials,
      content,
      rating,
      bgColor,
      orderIndex,
    } = await req.json();

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

    const testimonial = await prisma.testimonial.create({
      data: {
        schoolId: targetSchoolId,
        parentName,
        role: role || "Orang Tua Siswa",
        initials: initials || parentName.substring(0, 2).toUpperCase(),
        content,
        rating: Number(rating) || 5,
        bgColor: bgColor || "emerald",
        orderIndex: Number(orderIndex) || 0,
      },
    });

    return NextResponse.json({ success: true, data: testimonial });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
