import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";
import { recalculateStudentGrades } from "../route";

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

    const existing = await prisma.dailyGrade.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Catatan nilai harian tidak ditemukan" }, { status: 404 });
    }

    const studentId = existing.studentId;

    await prisma.dailyGrade.delete({ where: { id } });

    // Recalculate summary grades after deletion
    const summary = await recalculateStudentGrades(studentId);

    return NextResponse.json({
      success: true,
      message: "Catatan nilai harian dihapus",
      summary,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
