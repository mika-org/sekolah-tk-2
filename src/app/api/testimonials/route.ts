import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";
import { prepareOrderForInsert } from "@/lib/order-helper";

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

    let testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { orderIndex: "asc" },
      include: { school: true },
    });

    if (testimonials.length === 0) {
      const targetSchools = where.schoolId
        ? await prisma.school.findMany({ where: { id: where.schoolId } })
        : await prisma.school.findMany();

      for (const targetSch of targetSchools) {
        const isBcl = targetSch.code?.includes("bumi") || targetSch.name?.toLowerCase().includes("bcl");
        const defaultTestimonials = isBcl
          ? [
              {
                parentName: "Bunda Kenzo (Ibu Citra)",
                role: "Orang Tua Siswa",
                initials: "BK",
                content: "Sejak sekolah di Smart Kids BCL, Kenzo jadi suka membaca buku dan aktif bercerita. Perkembangan motorik dan percaya dirinya luar biasa!",
                rating: 5,
                bgColor: "emerald",
                orderIndex: 1,
              },
              {
                parentName: "Bapak Dedi Kurniawan",
                role: "Orang Tua Siswa",
                initials: "DK",
                content: "Guru-guru di Smart Kids BCL sangat perhatian dan komunikatif ke orang tua melalui laporan harian. Sangat merekomendasikan sekolah ini!",
                rating: 5,
                bgColor: "blue",
                orderIndex: 2,
              },
              {
                parentName: "Ibu Rina Wulandari",
                role: "Orang Tua Siswa",
                initials: "RW",
                content: "Lingkungan sekolah BCL sangat asri, bersih, dan kegiatannya sangat kreatif. Anak selalu ceria pulang sekolah.",
                rating: 5,
                bgColor: "purple",
                orderIndex: 3,
              },
            ]
          : [
              {
                parentName: "Bunda Rayyan (Ibu Maya)",
                role: "Orang Tua Siswa",
                initials: "BM",
                content: "Metode bermain sambil belajar di Smart Kids Sadjati sangat menyenangkan! Rayyan jadi lebih mandiri dan berani berbicara di depan umum.",
                rating: 5,
                bgColor: "emerald",
                orderIndex: 1,
              },
              {
                parentName: "Bapak Hendra Pratama",
                role: "Orang Tua Siswa",
                initials: "HP",
                content: "Program bimbingan belajarnya sangat intensif dan guru-gurunya sabar sekali membimbing anak. Nilai dan pemahaman anak meningkat pesat!",
                rating: 5,
                bgColor: "blue",
                orderIndex: 2,
              },
              {
                parentName: "Mama Alif (Ibu Dian)",
                role: "Orang Tua Siswa",
                initials: "MD",
                content: "Fasilitas lengkap, kelasnya nyaman dan aman. Anak saya selalu antusias berangkat ke sekolah setiap hari.",
                rating: 5,
                bgColor: "amber",
                orderIndex: 3,
              },
            ];
        for (const t of defaultTestimonials) {
          try {
            await prisma.testimonial.create({
              data: {
                schoolId: targetSch.id,
                parentName: t.parentName,
                role: t.role,
                initials: t.initials,
                content: t.content,
                rating: t.rating,
                bgColor: t.bgColor,
                orderIndex: t.orderIndex,
              },
            });
          } catch (e) {
            // ignore
          }
        }
      }

      testimonials = await prisma.testimonial.findMany({
        where,
        orderBy: { orderIndex: "asc" },
        include: { school: true },
      });
    }

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

    if (!parentName || !content) {
      return NextResponse.json(
        { success: false, error: "Nama orang tua dan isi testimoni wajib diisi" },
        { status: 400 }
      );
    }

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

    const effectiveOrder = await prepareOrderForInsert(
      "testimonials",
      targetSchoolId,
      Number(orderIndex) || 0
    );

    const testimonial = await prisma.testimonial.create({
      data: {
        schoolId: targetSchoolId,
        parentName,
        role: role || "Orang Tua Siswa",
        initials: initials || (parentName ? parentName.substring(0, 2).toUpperCase() : "OT"),
        content,
        rating: Number(rating) || 5,
        bgColor: bgColor || "emerald",
        orderIndex: effectiveOrder,
      },
      include: { school: true },
    });

    return NextResponse.json({ success: true, data: testimonial });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
