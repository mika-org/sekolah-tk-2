import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

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
        orderIndex: Number(orderIndex) || 0,
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
    await prisma.testimonial.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Testimoni dihapus" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
