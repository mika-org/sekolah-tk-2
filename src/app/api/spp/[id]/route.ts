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
    if (body.studentId !== undefined) dataToUpdate.studentId = body.studentId;
    if (body.studentName !== undefined) dataToUpdate.studentName = body.studentName;
    if (body.nisn !== undefined) dataToUpdate.nisn = body.nisn;
    if (body.className !== undefined) dataToUpdate.className = body.className;
    if (body.month !== undefined) dataToUpdate.month = body.month;
    if (body.amount !== undefined) dataToUpdate.amount = Number(body.amount);
    if (body.status !== undefined) {
      dataToUpdate.status = body.status;
      if (body.status === "lunas" && !body.paymentDate) {
        dataToUpdate.paymentDate = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
      }
    }
    if (body.paymentDate !== undefined) dataToUpdate.paymentDate = body.paymentDate;
    if (body.proofUrl !== undefined) dataToUpdate.proofUrl = body.proofUrl;
    if (body.paymentMethod !== undefined) dataToUpdate.paymentMethod = body.paymentMethod;
    if (body.note !== undefined) dataToUpdate.note = body.note;

    const updated = await prisma.sppRecord.update({
      where: { id },
      data: dataToUpdate,
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
    await prisma.sppRecord.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Catatan SPP dihapus" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
