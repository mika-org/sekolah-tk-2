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
      return NextResponse.json({ success: false, error: "Akses ditolak" }, { status: 401 });
    }

    const { id } = await params;
    const data = await req.json();

    const updated = await prisma.student.update({
      where: { id },
      data: {
        name: data.name,
        nisn: data.nisn,
        className: data.className,
        gender: data.gender,
        avatarUrl: data.avatarUrl,
        birthPlaceDate: data.birthPlaceDate,
        parentName: data.parentName,
        parentPhone: data.parentPhone,
        address: data.address,
        attendanceRate: Number(data.attendanceRate) || 95.0,
        averageGrade: Number(data.averageGrade) || 88.5,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Akses ditolak" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.student.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Data murid dihapus" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
