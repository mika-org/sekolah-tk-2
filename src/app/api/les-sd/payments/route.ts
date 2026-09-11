import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    const { searchParams } = new URL(req.url);

    const month = searchParams.get("month");
    const status = searchParams.get("status");
    const registrationId = searchParams.get("registrationId");
    const schoolId = searchParams.get("schoolId");
    const teacherPicId = searchParams.get("teacherPicId");
    const search = searchParams.get("search");

    const where: any = {};

    if (month && month !== "ALL") {
      where.month = { contains: month, mode: "insensitive" };
    }

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (registrationId) {
      where.registrationId = registrationId;
    }

    // Role-based scoping
    if (admin) {
      if (admin.role === "ORTU" || admin.role === "ORANG_TUA") {
        const cleanPhone = (admin.phone || "").replace(/\D/g, "");
        const cleanEmail = (admin.email || "").trim().toLowerCase();
        const cleanName = (admin.name || "").replace(/^wali\s+/i, "").trim().toLowerCase();

        where.registration = {
          OR: [
            ...(cleanPhone ? [{ parentPhone: { contains: cleanPhone } }] : []),
            ...(cleanEmail ? [{ parentEmail: { equals: cleanEmail, mode: "insensitive" } }] : []),
            ...(cleanName ? [{ parentName: { contains: cleanName, mode: "insensitive" } }] : []),
          ],
        };
      } else if (admin.role === "GURU") {
        const teacher = await prisma.teacher.findFirst({
          where: {
            OR: [
              { email: admin.email || undefined },
              { name: { contains: admin.name, mode: "insensitive" } },
            ],
          },
        });

        where.registration = {
          OR: [
            ...(teacher ? [{ teacherPicId: teacher.id }] : []),
            { teacherPicName: { contains: admin.name, mode: "insensitive" } },
          ],
        };
      } else if (admin.role !== "SUPER_ADMIN" && admin.role !== "ADMIN_PUSAT" && admin.schoolId) {
        where.registration = {
          schoolId: admin.schoolId,
        };
      }
    }

    if (schoolId && schoolId !== "ALL") {
      where.registration = {
        ...(where.registration || {}),
        schoolId,
      };
    }

    if (teacherPicId && teacherPicId !== "ALL" && (!admin || admin.role !== "GURU")) {
      where.registration = {
        ...(where.registration || {}),
        teacherPicId,
      };
    }

    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        { studentName: { contains: q, mode: "insensitive" } },
        { registration: { parentName: { contains: q, mode: "insensitive" } } },
        { registration: { registrationNo: { contains: q, mode: "insensitive" } } },
      ];
    }

    const payments = await prisma.lesSdPayment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        registration: {
          include: {
            school: {
              select: { id: true, name: true, code: true },
            },
            teacherPic: {
              select: { id: true, name: true, phone: true },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: payments });
  } catch (error: any) {
    console.error("[LES_SD_PAYMENTS_GET_ERROR]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    const body = await req.json();

    const {
      registrationId,
      studentName,
      month,
      amount = 200000,
      paymentMethod = "TRANSFER",
      proofUrl,
      bankName,
      notes,
      paymentDate,
    } = body;

    if (!registrationId || !month) {
      return NextResponse.json(
        { success: false, error: "ID pendaftaran dan bulan tagihan wajib diisi" },
        { status: 400 }
      );
    }

    // Verify registration exists
    const reg = await prisma.lesSdRegistration.findUnique({
      where: { id: registrationId },
    });

    if (!reg) {
      return NextResponse.json(
        { success: false, error: "Data pendaftaran Les SD tidak ditemukan" },
        { status: 404 }
      );
    }

    const isAdmin =
      admin &&
      (admin.role === "SUPER_ADMIN" ||
        admin.role === "ADMIN_PUSAT" ||
        admin.role === "ADMIN_SEKOLAH");

    // If submitted by Admin directly (e.g. cash payment recorded at school), default to 'lunas'
    // If submitted with proofUrl by parent/user, status is 'menunggu_konfirmasi'
    const status = body.status
      ? body.status
      : isAdmin && !proofUrl
      ? "lunas"
      : proofUrl
      ? "menunggu_konfirmasi"
      : "belum_bayar";

    const formattedDate =
      paymentDate ||
      new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

    // Check if payment for this registration and month already exists
    const existing = await prisma.lesSdPayment.findFirst({
      where: {
        registrationId,
        month,
      },
    });

    let payment;
    if (existing) {
      payment = await prisma.lesSdPayment.update({
        where: { id: existing.id },
        data: {
          studentName: studentName || reg.studentName,
          amount: Number(amount) || 200000,
          status,
          paymentDate: formattedDate,
          paymentMethod,
          proofUrl: proofUrl || existing.proofUrl,
          bankName: bankName || existing.bankName,
          notes: notes !== undefined ? notes : existing.notes,
          verifiedBy: status === "lunas" ? admin?.name || "Admin" : null,
          verifiedAt: status === "lunas" ? new Date() : null,
        },
      });
    } else {
      payment = await prisma.lesSdPayment.create({
        data: {
          registrationId,
          studentName: studentName || reg.studentName,
          month,
          amount: Number(amount) || 200000,
          status,
          paymentDate: formattedDate,
          paymentMethod,
          proofUrl: proofUrl || null,
          bankName: bankName || null,
          notes: notes || null,
          verifiedBy: status === "lunas" ? admin?.name || "Admin" : null,
          verifiedAt: status === "lunas" ? new Date() : null,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: payment,
      message:
        status === "menunggu_konfirmasi"
          ? "Bukti pembayaran berhasil diunggah dan menunggu konfirmasi admin/guru PIC."
          : "Catatan pembayaran SPP Les SD berhasil disimpan.",
    });
  } catch (error: any) {
    console.error("[LES_SD_PAYMENTS_POST_ERROR]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
