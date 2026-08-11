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
    } else if (admin.role !== "SUPER_ADMIN" && admin.role !== "ADMIN_PUSAT" && admin.schoolId) {
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
      include: {
        school: true,
        feeSelections: { orderBy: { createdAt: "asc" } },
      },
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

    const usesDynamicFeeSelection = Array.isArray(body.selectedFeeComponentIds);
    const selectedFeeComponentIds: string[] = usesDynamicFeeSelection
      ? Array.from(
          new Set<string>(
            (body.selectedFeeComponentIds as unknown[])
              .map((id) => String(id || "").trim())
              .filter(Boolean)
          )
        )
      : [];

    if (usesDynamicFeeSelection && selectedFeeComponentIds.length === 0) {
      return NextResponse.json(
        { success: false, error: "Pilih minimal satu komponen biaya PPDB" },
        { status: 400 }
      );
    }

    const selectedFeeComponents = usesDynamicFeeSelection
      ? await prisma.feeComponent.findMany({
          where: {
            id: { in: selectedFeeComponentIds },
            schoolId: targetSchoolId,
            category: "PPDB",
            isActive: true,
          },
          orderBy: { orderIndex: "asc" },
        })
      : [];

    if (
      usesDynamicFeeSelection &&
      selectedFeeComponents.length !== selectedFeeComponentIds.length
    ) {
      return NextResponse.json(
        { success: false, error: "Ada komponen PPDB yang tidak valid atau sudah tidak aktif" },
        { status: 400 }
      );
    }

    if (usesDynamicFeeSelection) {
      const requiredComponents = await prisma.feeComponent.findMany({
        where: {
          schoolId: targetSchoolId,
          category: "PPDB",
          isActive: true,
          isRequired: true,
        },
        select: { id: true, name: true },
      });
      const missingRequired = requiredComponents.filter(
        (component) => !selectedFeeComponentIds.includes(component.id)
      );
      if (missingRequired.length > 0) {
        return NextResponse.json(
          {
            success: false,
            error: `Komponen wajib belum dipilih: ${missingRequired
              .map((component) => component.name)
              .join(", ")}`,
          },
          { status: 400 }
        );
      }
    }

    const selectedItemNames = usesDynamicFeeSelection
      ? selectedFeeComponents.map((component) => component.name)
      : body.selectedItems;
    const ppdbTotalAmount = usesDynamicFeeSelection
      ? selectedFeeComponents.reduce((sum, component) => sum + component.amount, 0)
      : body.totalAmount
        ? Number(body.totalAmount)
        : 200000;

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
        sppAmount: body.sppAmount ? Number(body.sppAmount) : 200000,
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
        selectedItems: selectedItemNames
          ? typeof selectedItemNames === "string"
            ? selectedItemNames
            : JSON.stringify(selectedItemNames)
          : null,
        totalAmount: ppdbTotalAmount,
        status: "PENDING",
        ...(usesDynamicFeeSelection && {
          feeSelections: {
            create: selectedFeeComponents.map((component) => ({
              feeComponentId: component.id,
              componentCode: component.code,
              componentName: component.name,
              amount: component.amount,
            })),
          },
        }),
      },
      include: {
        school: true,
        feeSelections: { orderBy: { createdAt: "asc" } },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: registration,
        message: "Pendaftaran PPDB berhasil dikirim",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating PPDB registration:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menyimpan pendaftaran" },
      { status: 500 }
    );
  }
}
