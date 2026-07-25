import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const attendanceItems = body?.attendance || body?.items || (Array.isArray(body) ? body : []);

    if (!Array.isArray(attendanceItems) || attendanceItems.length === 0) {
      return NextResponse.json(
        { success: false, error: "Data presensi guru tidak boleh kosong" },
        { status: 400 }
      );
    }

    const todayStr = new Date().toISOString().split("T")[0];

    const results = [];
    for (const item of attendanceItems) {
      const teacherId = item.teacherId || item.id;
      const date = item.date || todayStr;
      const status = item.status || "hadir";
      const time = item.time || new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

      if (!teacherId) continue;

      let teacherName = item.teacherName;
      let schoolId = item.schoolId;
      let className = item.className;

      if (!teacherName) {
        const t = await prisma.teacher.findUnique({ where: { id: teacherId } });
        if (t) {
          teacherName = t.name;
          if (!schoolId) schoolId = t.schoolId;
          if (!className) className = t.assignedClass || t.role;
        }
      }

      const existing = await prisma.teacherAttendance.findFirst({
        where: {
          teacherId,
          date,
        },
      });

      if (existing) {
        const updated = await prisma.teacherAttendance.update({
          where: { id: existing.id },
          data: {
            status: String(status).toLowerCase(),
            time,
            reason: item.reason || null,
          },
        });
        results.push(updated);
      } else {
        const created = await prisma.teacherAttendance.create({
          data: {
            teacherId,
            teacherName: teacherName || "Guru",
            schoolId: schoolId || null,
            className: className || "Guru",
            status: String(status).toLowerCase(),
            time,
            date,
            reason: item.reason || null,
          },
        });
        results.push(created);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Berhasil menyimpan ${results.length} presensi guru`,
      data: results,
    });
  } catch (error: any) {
    console.error("Batch teacher attendance error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Gagal menyimpan batch presensi guru" },
      { status: 500 }
    );
  }
}
