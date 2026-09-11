import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Akses ditolak" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const dataToUpdate: any = {};

    if (body.status !== undefined) {
      dataToUpdate.status = body.status;
    }

    if (body.teacherPicId !== undefined) {
      dataToUpdate.teacherPicId = body.teacherPicId || null;

      if (body.teacherPicId) {
        const teacher = await prisma.teacher.findUnique({
          where: { id: body.teacherPicId },
          select: { name: true },
        });
        dataToUpdate.teacherPicName = teacher?.name || body.teacherPicName || null;
      } else {
        dataToUpdate.teacherPicName = null;
      }
    } else if (body.teacherPicName !== undefined) {
      dataToUpdate.teacherPicName = body.teacherPicName;
    }

    if (body.scheduleDays !== undefined) dataToUpdate.scheduleDays = body.scheduleDays;
    if (body.scheduleTime !== undefined) dataToUpdate.scheduleTime = body.scheduleTime;
    if (body.sdGrade !== undefined) dataToUpdate.sdGrade = body.sdGrade;
    if (body.schoolOrigin !== undefined) dataToUpdate.schoolOrigin = body.schoolOrigin;
    if (body.sppAmount !== undefined) dataToUpdate.sppAmount = Number(body.sppAmount);
    if (body.notes !== undefined) dataToUpdate.notes = body.notes;

    const updated = await prisma.lesSdRegistration.update({
      where: { id },
      data: dataToUpdate,
      include: {
        school: true,
        teacherPic: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Data Les SD berhasil diperbarui",
    });
  } catch (error: any) {
    console.error("[LES_SD_PATCH_ERROR]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin || (admin.role !== "SUPER_ADMIN" && admin.role !== "ADMIN_PUSAT" && admin.role !== "ADMIN_SEKOLAH")) {
      return NextResponse.json({ success: false, error: "Hanya Admin yang dapat menghapus pendaftaran" }, { status: 403 });
    }

    const { id } = await params;
    await prisma.lesSdRegistration.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Pendaftaran Les SD berhasil dihapus",
    });
  } catch (error: any) {
    console.error("[LES_SD_DELETE_ERROR]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
