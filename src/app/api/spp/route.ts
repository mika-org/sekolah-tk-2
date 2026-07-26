import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get("schoolId");
    const schoolCode = searchParams.get("schoolCode");
    const month = searchParams.get("month");
    const status = searchParams.get("status");
    const studentId = searchParams.get("studentId");
    const parentPhone = searchParams.get("parentPhone");

    const where: any = {};

    if (month && month !== "ALL") {
      where.month = { contains: month, mode: "insensitive" };
    }

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (studentId) {
      where.studentId = studentId;
    }

    if (parentPhone) {
      where.student = {
        parentPhone: { contains: parentPhone },
      };
    }

    if (schoolId && schoolId !== "ALL") {
      where.student = {
        ...(where.student || {}),
        schoolId: schoolId,
      };
    } else if (schoolCode && schoolCode !== "ALL") {
      const sch = await prisma.school.findUnique({ where: { code: schoolCode } });
      if (sch) {
        where.student = {
          ...(where.student || {}),
          schoolId: sch.id,
        };
      }
    }

    const sppRecords = await prisma.sppRecord.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { student: { include: { school: true } } },
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

    const {
      studentId,
      studentName,
      nisn,
      className,
      month,
      amount,
      status,
      paymentDate,
      proofUrl,
      paymentMethod,
      note,
    } = await req.json();

    let targetStudentId = studentId;
    if (!targetStudentId && nisn) {
      const st = await prisma.student.findUnique({ where: { nisn } });
      if (st) targetStudentId = st.id;
    }

    const isParent = admin.role === "ORTU" || admin.role === "ORANG_TUA";
    const initialStatus = status || (isParent ? "menunggu_konfirmasi" : "lunas");

    const spp = await prisma.sppRecord.create({
      data: {
        studentId: targetStudentId || null,
        studentName,
        nisn: nisn || "123456789",
        className: className || "TK A",
        month: month || "Juli 2026",
        amount: Number(amount) || 350000,
        status: initialStatus,
        paymentDate: paymentDate || (initialStatus === "lunas" ? new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : null),
        proofUrl: proofUrl || null,
        paymentMethod: paymentMethod || "TRANSFER",
        note: note || null,
      } as any,
    });

    return NextResponse.json({ success: true, data: spp });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
