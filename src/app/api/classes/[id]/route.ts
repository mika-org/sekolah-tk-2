import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Akses ditolak" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const db = prisma as any;
    const updated = await db.classRoom.update({
      where: { id },
      data: {
        name: body.name,
        gradeLevel: body.gradeLevel,
        academicYear: body.academicYear,
        capacity: Number(body.capacity) || 20,
        homeroomTeacherId: body.homeroomTeacherId || null,
        homeroomTeacherName: body.homeroomTeacherName || null,
      },
    });

    if (body.homeroomTeacherId) {
      await db.teacher.update({
        where: { id: body.homeroomTeacherId },
        data: { assignedClass: body.name },
      });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Akses ditolak" }, { status: 401 });
    }

    const { id } = await params;
    const db = prisma as any;
    await db.classRoom.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Master kelas berhasil dihapus" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
