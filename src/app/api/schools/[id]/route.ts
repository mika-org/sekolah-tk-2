import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin || admin.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { success: false, error: "Akses ditolak" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const { name, level, address, phone, logoUrl, code } = await req.json();

    const updated = await prisma.school.update({
      where: { id },
      data: {
        name,
        level,
        address,
        phone,
        logoUrl,
        code: code ? code.toLowerCase().replace(/[^a-z0-9]/g, "-") : undefined,
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
    if (!admin || admin.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { success: false, error: "Akses ditolak" },
        { status: 403 }
      );
    }

    const { id } = await params;
    await prisma.school.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Sekolah berhasil dihapus" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
