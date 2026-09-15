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
    const { schoolId, parentName, role, initials, content, rating, bgColor, orderIndex } =
      await req.json();

    if (!parentName || !content) {
      return NextResponse.json(
        { success: false, error: "Nama orang tua dan isi testimoni wajib diisi" },
        { status: 400 }
      );
    }

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Testimoni tidak ditemukan" },
        { status: 404 }
      );
    }

    const targetSchoolId = schoolId || existing.schoolId;
    let effectiveOrder = Number(orderIndex);
    if (!effectiveOrder || effectiveOrder < 1) effectiveOrder = existing.orderIndex;

    effectiveOrder = await handleOrderOnUpdate(
      "testimonials",
      targetSchoolId,
      id,
      effectiveOrder
    );

    const updated = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(schoolId && { schoolId }),
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
    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (existing) {
      await prisma.testimonial.delete({ where: { id } });
      await normalizeAfterDelete("testimonials", existing.schoolId);
    }

    return NextResponse.json({ success: true, message: "Testimoni dihapus" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

