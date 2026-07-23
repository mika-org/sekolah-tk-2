import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const sppRecords = await prisma.sppRecord.findMany({
      orderBy: { createdAt: "desc" },
      include: { student: true },
    });
    return NextResponse.json({ success: true, data: sppRecords });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Akses ditolak" }, { status: 401 });
    }

    const { studentName, nisn, className, month, amount, status, paymentDate } = await req.json();

    const spp = await prisma.sppRecord.create({
      data: {
        studentName,
        nisn: nisn || "123456789",
        className: className || "TK A",
        month: month || "Juli 2026",
        amount: Number(amount) || 350000,
        status: status || "lunas",
        paymentDate: paymentDate || null,
      },
    });

    return NextResponse.json({ success: true, data: spp });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
