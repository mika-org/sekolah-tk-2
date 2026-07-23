import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get("schoolId");
    const schoolCode = searchParams.get("schoolCode");

    let where: any = {};
    if (schoolId) {
      where.schoolId = schoolId;
    } else if (schoolCode) {
      const school = await prisma.school.findUnique({ where: { code: schoolCode } });
      if (school) where.schoolId = school.id;
    }

    if (!where.schoolId) {
      const firstSchool = await prisma.school.findFirst({ orderBy: { orderIndex: "asc" } });
      if (firstSchool) where.schoolId = firstSchool.id;
    }

    let profile = await prisma.siteProfile.findFirst({
      where,
      include: { school: true },
    });

    if (!profile && where.schoolId) {
      profile = await prisma.siteProfile.create({
        data: { schoolId: where.schoolId },
        include: { school: true },
      });
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const schoolId = body.schoolId || admin.schoolId;

    if (!schoolId) {
      return NextResponse.json(
        { success: false, error: "Pilih sekolah terlebih dahulu" },
        { status: 400 }
      );
    }

    const updated = await prisma.siteProfile.upsert({
      where: { schoolId },
      update: {
        heroBadge: body.heroBadge,
        heroTitle: body.heroTitle,
        heroSubtitle: body.heroSubtitle,
        heroMascotUrl: body.heroMascotUrl,
        ctaTitle: body.ctaTitle,
        ctaSubtitle: body.ctaSubtitle,
        phone: body.phone,
        instagram: body.instagram,
        facebook: body.facebook,
        address: body.address,
      },
      create: {
        schoolId,
        heroBadge: body.heroBadge,
        heroTitle: body.heroTitle,
        heroSubtitle: body.heroSubtitle,
        heroMascotUrl: body.heroMascotUrl,
        ctaTitle: body.ctaTitle,
        ctaSubtitle: body.ctaSubtitle,
        phone: body.phone,
        instagram: body.instagram,
        facebook: body.facebook,
        address: body.address,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
