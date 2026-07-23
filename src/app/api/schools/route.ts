import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET() {
  try {
    const schools = await prisma.school.findMany({
      orderBy: { orderIndex: "asc" },
      include: {
        foundation: true,
      },
    });
    return NextResponse.json({ success: true, data: schools });
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
    if (!admin || admin.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { success: false, error: "Hanya Super Admin Yayasan yang dapat menambah sekolah" },
        { status: 403 }
      );
    }

    const { code, name, level, address, phone, logoUrl } = await req.json();

    const cleanCode = (code || name).toLowerCase().replace(/[^a-z0-9]/g, "-");

    const school = await prisma.school.create({
      data: {
        foundationId: "default",
        code: cleanCode,
        name,
        level: level || "TK",
        address,
        phone,
        logoUrl: logoUrl || "/images/smart_kids_logo.png",
        siteProfile: {
          create: {
            heroBadge: `Pendaftaran ${name} Telah Dibuka!`,
            heroTitle: "Belajar Seru, Tumbuh Bahagia",
            heroSubtitle: `Bimbingan belajar untuk anak usia 3-8 tahun di ${name}`,
            heroMascotUrl: "/images/owl_mascot.png",
            ctaTitle: `Yuk, Daftarkan Si Kecil di ${name}!`,
            ctaSubtitle: `Bergabunglah bersama ${name} untuk masa depan cerah mereka`,
            phone,
            instagram: "smartkids",
            facebook: "Smart Kids",
            address,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: school });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
