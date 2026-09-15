import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";
import { handleOrderOnUpdate, normalizeAfterDelete } from "@/lib/order-helper";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { title, ageRange, iconUrl, features, sppAmount, orderIndex } = await req.json();

    const existing = await prisma.program.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Program tidak ditemukan" },
        { status: 404 }
      );
    }

    let effectiveOrder = Number(orderIndex);
    if (!effectiveOrder || effectiveOrder < 1) effectiveOrder = existing.orderIndex;

    effectiveOrder = await handleOrderOnUpdate(
      "programs",
      existing.schoolId,
      id,
      effectiveOrder
    );

    const updated = await prisma.program.update({
      where: { id },
      data: {
        title,
        ageRange,
        iconUrl,
        features: typeof features === "string" ? features : JSON.stringify(features || []),
        ...(sppAmount !== undefined ? { sppAmount: Number(sppAmount) } : {}),
        orderIndex: effectiveOrder,
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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const existing = await prisma.program.findUnique({ where: { id } });
    if (existing) {
      await prisma.program.delete({ where: { id } });
      await normalizeAfterDelete("programs", existing.schoolId);
    }

    return NextResponse.json({ success: true, message: "Program dihapus" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

