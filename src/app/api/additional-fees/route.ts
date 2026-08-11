import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

// GET /api/additional-fees
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get("schoolId");
    const schoolCode = searchParams.get("schoolCode");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const feeName = searchParams.get("feeName");
    const studentId = searchParams.get("studentId");
    const parentPhone = searchParams.get("parentPhone");
    const className = searchParams.get("className");

    const where: any = {};

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (feeName && feeName !== "ALL") {
      where.feeName = { contains: feeName, mode: "insensitive" };
    }

    if (studentId) {
      where.studentId = studentId;
    }

    if (parentPhone) {
      where.student = { parentPhone };
    }

    if (className && className !== "ALL") {
      where.className = className;
    }

    if (schoolId && schoolId !== "ALL") {
      where.schoolId = schoolId;
    } else if (schoolCode && schoolCode !== "ALL") {
      const sch = await prisma.school.findUnique({ where: { code: schoolCode } });
      if (!sch) {
        return NextResponse.json(
          { success: false, error: "Sekolah tidak ditemukan" },
          { status: 404 }
        );
      }
      where.schoolId = sch.id;
    }

    if (search) {
      where.OR = [
        { studentName: { contains: search, mode: "insensitive" } },
        { feeName: { contains: search, mode: "insensitive" } },
        { nisn: { contains: search, mode: "insensitive" } },
        { className: { contains: search, mode: "insensitive" } },
      ];
    }

    const records = await prisma.additionalFee.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        student: {
          include: {
            school: true,
            classRoom: true,
          },
        },
        school: true,
        feeComponent: true,
      },
    });

    return NextResponse.json({ success: true, data: records });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/additional-fees (Create single or batch for class)
export async function POST(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      schoolId,
      studentId,
      studentName,
      nisn,
      className,
      feeComponentId,
      feeName,
      amount,
      status,
      dueDate,
      note,
      isBatchForClass,
    } = body;

    const targetStudent = studentId
      ? await prisma.student.findUnique({ where: { id: studentId } })
      : null;

    let targetSchoolId = schoolId || admin.schoolId || targetStudent?.schoolId;
    if (!targetSchoolId) {
      const defSchool = await prisma.school.findFirst({ orderBy: { orderIndex: "asc" } });
      targetSchoolId = defSchool?.id;
    }

    const selectedFeeComponent = feeComponentId
      ? await prisma.feeComponent.findFirst({
          where: {
            id: feeComponentId,
            ...(targetSchoolId ? { schoolId: targetSchoolId } : {}),
            category: "ADDITIONAL",
            isActive: true,
          },
        })
      : null;

    if (feeComponentId && !selectedFeeComponent) {
      return NextResponse.json(
        { success: false, error: "Komponen biaya tambahan tidak valid atau sudah tidak aktif" },
        { status: 400 }
      );
    }

    const resolvedFeeName = selectedFeeComponent?.name || String(feeName || "").trim();
    const resolvedAmount = selectedFeeComponent?.amount ?? Number(amount);
    if (!resolvedFeeName || !Number.isFinite(resolvedAmount) || resolvedAmount <= 0) {
      return NextResponse.json(
        { success: false, error: "Nama biaya dan nominal yang valid wajib diisi" },
        { status: 400 }
      );
    }

    // Batch creation for an entire class
    if (isBatchForClass && className) {
      const studentsInClass = await prisma.student.findMany({
        where: {
          ...(targetSchoolId && targetSchoolId !== "ALL" ? { schoolId: targetSchoolId } : {}),
          className: className,
        },
      });

      if (!studentsInClass.length) {
        return NextResponse.json(
          { success: false, error: `Tidak ditemukan siswa di kelas ${className}` },
          { status: 404 }
        );
      }

      const newRecordsData = studentsInClass.map((st) => ({
        schoolId: st.schoolId,
        studentId: st.id,
        studentName: st.name,
        nisn: st.nisn,
        className: st.className,
        feeComponentId: selectedFeeComponent?.id || null,
        feeName: resolvedFeeName,
        amount: resolvedAmount,
        status: status || "belum_lunas",
        dueDate: dueDate || null,
        note: note || null,
      }));

      await prisma.additionalFee.createMany({
        data: newRecordsData,
      });

      return NextResponse.json({
        success: true,
        message: `Berhasil membuat tagihan ${resolvedFeeName} untuk ${studentsInClass.length} siswa di kelas ${className}`,
      });
    }

    // Single record creation
    const record = await prisma.additionalFee.create({
      data: {
        schoolId: targetSchoolId || targetStudent?.schoolId || null,
        studentId: studentId || null,
        feeComponentId: selectedFeeComponent?.id || null,
        studentName: studentName || targetStudent?.name || "Siswa Kebanggaan",
        nisn: nisn || targetStudent?.nisn || null,
        className: className || targetStudent?.className || null,
        feeName: resolvedFeeName,
        amount: resolvedAmount,
        status: status || "belum_lunas",
        dueDate: dueDate || null,
        note: note || null,
      },
    });

    return NextResponse.json({
      success: true,
      data: record,
      message: `Tagihan ${resolvedFeeName} berhasil dibuat`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PATCH /api/additional-fees (Update status / payment proof / detail)
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      status,
      paymentDate,
      proofUrl,
      paymentMethod,
      note,
      amount,
      feeName,
      feeComponentId,
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID Tagihan tidak ditemukan" },
        { status: 400 }
      );
    }

    const existing = feeComponentId
      ? await prisma.additionalFee.findUnique({
          where: { id },
          select: { schoolId: true },
        })
      : null;
    const selectedFeeComponent = feeComponentId
      ? await prisma.feeComponent.findFirst({
          where: {
            id: feeComponentId,
            ...(existing?.schoolId ? { schoolId: existing.schoolId } : {}),
            category: "ADDITIONAL",
            isActive: true,
          },
        })
      : null;

    if (feeComponentId && !selectedFeeComponent) {
      return NextResponse.json(
        { success: false, error: "Komponen biaya tambahan tidak valid atau sudah tidak aktif" },
        { status: 400 }
      );
    }

    const parsedAmount = amount === undefined ? undefined : Number(amount);
    if (parsedAmount !== undefined && (!Number.isFinite(parsedAmount) || parsedAmount <= 0)) {
      return NextResponse.json(
        { success: false, error: "Nominal biaya tidak valid" },
        { status: 400 }
      );
    }

    const updated = await prisma.additionalFee.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(paymentDate !== undefined && { paymentDate }),
        ...(proofUrl !== undefined && { proofUrl }),
        ...(paymentMethod !== undefined && { paymentMethod }),
        ...(note !== undefined && { note }),
        ...(parsedAmount !== undefined && { amount: parsedAmount }),
        ...(feeName !== undefined && { feeName: String(feeName).trim() }),
        ...(selectedFeeComponent && {
          feeComponentId: selectedFeeComponent.id,
          feeName: selectedFeeComponent.name,
          amount: selectedFeeComponent.amount,
        }),
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Status tagihan biaya tambahan berhasil diperbarui",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/additional-fees
export async function DELETE(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID Tagihan tidak ditemukan" },
        { status: 400 }
      );
    }

    await prisma.additionalFee.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Tagihan biaya tambahan berhasil dihapus",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
