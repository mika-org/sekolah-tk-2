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

    let gallery = await prisma.galleryItem.findMany({
      where,
      orderBy: { orderIndex: "asc" },
      include: { school: true },
    });

    if (gallery.length === 0) {
      const targetSchools = where.schoolId
        ? await prisma.school.findMany({ where: { id: where.schoolId } })
        : await prisma.school.findMany();

      const defaultGallery = [
        { title: "Kegiatan Belajar Sentra Sains & Motorik", imageUrl: "/images/gallery1.png", orderIndex: 1 },
        { title: "Keceriaan Bermain Outdoor & Interaksi", imageUrl: "/images/gallery2.png", orderIndex: 2 },
        { title: "Kemandirian & Kreasi Seni Melipat Origami", imageUrl: "/images/gallery3.png", orderIndex: 3 },
      ];

      for (const targetSch of targetSchools) {
        for (const g of defaultGallery) {
          try {
            await prisma.galleryItem.create({
              data: {
                schoolId: targetSch.id,
                title: g.title,
                imageUrl: g.imageUrl,
                folder: "gallery",
                orderIndex: g.orderIndex,
              },
            });
          } catch (e) {
            // ignore
          }
        }
      }

      gallery = await prisma.galleryItem.findMany({
        where,
        orderBy: { orderIndex: "asc" },
        include: { school: true },
      });
    }

    return NextResponse.json({ success: true, data: gallery });
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

    const { schoolId, title, imageUrl, folder, orderIndex } = await req.json();

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

    const item = await prisma.galleryItem.create({
      data: {
        schoolId: targetSchoolId,
        title: title || "Kegiatan Belajar",
        imageUrl,
        folder: folder || "gallery",
        orderIndex: Number(orderIndex) || 0,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
