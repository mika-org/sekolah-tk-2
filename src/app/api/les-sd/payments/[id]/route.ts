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
      if (body.status === "lunas") {
        dataToUpdate.verifiedBy = admin.name || "Admin";
        dataToUpdate.verifiedAt = new Date();
        if (!body.paymentDate) {
          dataToUpdate.paymentDate = new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
        }
      } else if (body.status === "ditolak") {
        dataToUpdate.verifiedBy = admin.name || "Admin";
        dataToUpdate.verifiedAt = new Date();
      }
    }

    if (body.paymentDate !== undefined) dataToUpdate.paymentDate = body.paymentDate;
    if (body.paymentMethod !== undefined) dataToUpdate.paymentMethod = body.paymentMethod;
    if (body.proofUrl !== undefined) dataToUpdate.proofUrl = body.proofUrl;
    if (body.bankName !== undefined) dataToUpdate.bankName = body.bankName;
    if (body.notes !== undefined) dataToUpdate.notes = body.notes;
    if (body.amount !== undefined) dataToUpdate.amount = Number(body.amount);

    const updated = await prisma.lesSdPayment.update({
      where: { id },
      data: dataToUpdate,
      include: {
        registration: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message:
        body.status === "lunas"
          ? "Pembayaran SPP Les SD berhasil disetujui (Lunas)!"
          : body.status === "ditolak"
          ? "Pembayaran SPP Les SD ditolak."
          : "Data pembayaran berhasil diperbarui.",
    });
  } catch (error: any) {
    console.error("[LES_SD_PAYMENT_PATCH_ERROR]", error);
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
      return NextResponse.json({ success: false, error: "Hanya Admin yang dapat menghapus catatan pembayaran" }, { status: 403 });
    }

    const { id } = await params;
    await prisma.lesSdPayment.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Catatan pembayaran SPP Les SD berhasil dihapus",
    });
  } catch (error: any) {
    console.error("[LES_SD_PAYMENT_DELETE_ERROR]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
