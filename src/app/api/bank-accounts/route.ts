import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

// GET /api/bank-accounts
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get("schoolId");
    const schoolCode = searchParams.get("schoolCode");
    const publicOnly = searchParams.get("publicOnly") === "true";

    const where: any = {};
    if (publicOnly) {
      where.isActive = true;
    }

    if (schoolId && schoolId !== "ALL") {
      where.OR = [{ schoolId: schoolId }, { schoolId: null }];
    } else if (schoolCode && schoolCode !== "ALL") {
      const sch = await prisma.school.findFirst({
        where: { code: { equals: schoolCode, mode: "insensitive" } },
      });
      if (sch) {
        where.OR = [{ schoolId: sch.id }, { schoolId: null }];
      }
    }

    const accounts = await prisma.bankAccount.findMany({
      where,
      orderBy: { createdAt: "asc" },
      include: { school: true },
    });

    return NextResponse.json({ success: true, data: accounts });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/bank-accounts
export async function POST(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { schoolId, bankName, accountNumber, accountHolder, logoUrl, isActive } = body;

    if (!bankName || !accountNumber || !accountHolder) {
      return NextResponse.json(
        { success: false, error: "Nama bank, nomor rekening, dan atas nama wajib diisi" },
        { status: 400 }
      );
    }

    const newAccount = await prisma.bankAccount.create({
      data: {
        schoolId: schoolId && schoolId !== "ALL" ? schoolId : admin.schoolId || null,
        bankName,
        accountNumber,
        accountHolder,
        logoUrl: logoUrl || null,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });

    return NextResponse.json({
      success: true,
      data: newAccount,
      message: "Rekening bank berhasil ditambahkan",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/bank-accounts
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
    const { id, bankName, accountNumber, accountHolder, logoUrl, isActive, schoolId } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID Rekening tidak ditemukan" },
        { status: 400 }
      );
    }

    const updatedAccount = await prisma.bankAccount.update({
      where: { id },
      data: {
        ...(bankName !== undefined && { bankName }),
        ...(accountNumber !== undefined && { accountNumber }),
        ...(accountHolder !== undefined && { accountHolder }),
        ...(logoUrl !== undefined && { logoUrl }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
        ...(schoolId !== undefined && { schoolId: schoolId === "ALL" ? null : schoolId }),
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedAccount,
      message: "Rekening bank berhasil diperbarui",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/bank-accounts
export async function DELETE(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID Rekening tidak ditemukan" },
        { status: 400 }
      );
    }

    await prisma.bankAccount.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Rekening bank berhasil dihapus",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
