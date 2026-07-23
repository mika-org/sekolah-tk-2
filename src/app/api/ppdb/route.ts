import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const schoolId = searchParams.get("schoolId");
    const schoolCode = searchParams.get("schoolCode");

    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }
    if (schoolId && schoolId !== "ALL") {
      where.schoolId = schoolId;
    } else if (schoolCode && schoolCode !== "ALL") {
      const school = await prisma.school.findUnique({ where: { code: schoolCode } });
      if (school) where.schoolId = school.id;
    } else if (admin.role !== "SUPER_ADMIN" && admin.schoolId) {
      where.schoolId = admin.schoolId;
    }

    if (search) {
      where.OR = [
        { namaAnak: { contains: search, mode: "insensitive" } },
        { namaOrtu: { contains: search, mode: "insensitive" } },
        { registrationNo: { contains: search, mode: "insensitive" } },
        { noWhatsapp: { contains: search, mode: "insensitive" } },
      ];
    }

    const registrations = await prisma.ppdbRegistration.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { school: true },
    });

    return NextResponse.json({ success: true, data: registrations });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let targetSchoolId = body.schoolId;
    if (!targetSchoolId && body.schoolCode) {
      const school = await prisma.school.findUnique({ where: { code: body.schoolCode } });
      if (school) targetSchoolId = school.id;
    }

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

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const registrationNo = body.registrationNo || `PPDB-2026-${randomDigits}`;

    const registration = await prisma.ppdbRegistration.create({
      data: {
        schoolId: targetSchoolId,
        registrationNo,
        namaAnak: body.namaAnak,
        jenisKelamin: body.jenisKelamin,
        agama: body.agama,
        tempatLahir: body.tempatLahir,
        tanggalLahir: body.tanggalLahir,
        usiaAnak: body.usiaAnak,
        program: body.program,
        namaOrtu: body.namaOrtu,
        noWhatsapp: body.noWhatsapp,
        email: body.email,
        alamatRumah: body.alamatRumah,
        docKkUrl: body.docKkUrl || null,
        docAktaUrl: body.docAktaUrl || null,
        docFotoUrl: body.docFotoUrl || null,
        docKtpUrl: body.docKtpUrl || null,
        buktiBayarUrl: body.buktiBayarUrl || null,
        paymentMethod: body.paymentMethod || "bank",
        status: "PENDING",
      },
      include: { school: true },
    });

    return NextResponse.json({
      success: true,
      data: registration,
      message: "Pendaftaran PPDB berhasil dikirim",
    });
  } catch (error: any) {
    console.error("Error creating PPDB registration:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menyimpan pendaftaran" },
      { status: 500 }
    );
  }
}
