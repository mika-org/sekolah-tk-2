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
    const { schoolId, name, role, photoUrl, bio, education, orderIndex } = await req.json();

    const dataToUpdate: any = {
      name,
      role,
      photoUrl: photoUrl || "/images/teacher_default.png",
      bio: bio || null,
      education: education || null,
      orderIndex: Number(orderIndex) || 0,
    };

    if (schoolId) {
      dataToUpdate.schoolId = schoolId;
    }

    const updated = await prisma.teacher.update({
      where: { id },
      data: dataToUpdate,
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
    await prisma.teacher.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Data guru berhasil dihapus" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
