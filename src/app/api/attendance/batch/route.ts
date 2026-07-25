import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const attendanceItems = body?.attendance || body?.items || (Array.isArray(body) ? body : []);

    if (!Array.isArray(attendanceItems) || attendanceItems.length === 0) {
      return NextResponse.json(
        { success: false, error: "Data presensi tidak boleh kosong" },
        { status: 400 }
      );
    }

    const todayStr = new Date().toISOString().split("T")[0];

    const results = [];
    for (const item of attendanceItems) {
      const studentId = item.studentId || item.id;
      const date = item.date || todayStr;
      const status = item.status || "hadir";
      const className = item.className || "Kelas TK A";
      const time = item.time || new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

      if (!studentId) continue;

      let studentName = item.studentName;
      if (!studentName) {
        const student = await prisma.student.findUnique({ where: { id: studentId } });
        if (student) studentName = student.name;
      }

      // Find if record already exists for this student on this date
      const existing = await prisma.attendance.findFirst({
        where: {
          studentId,
          date,
        },
      });

      if (existing) {
        const updated = await prisma.attendance.update({
          where: { id: existing.id },
          data: {
            status: String(status).toLowerCase(),
            time,
            reason: item.reason || null,
          },
        });
        results.push(updated);
      } else {
        const created = await prisma.attendance.create({
          data: {
            studentId,
            studentName: studentName || "Siswa",
            className,
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
      message: `Berhasil menyimpan ${results.length} presensi siswa`,
      data: results,
    });
  } catch (error: any) {
    console.error("Batch attendance error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Gagal menyimpan batch presensi" },
      { status: 500 }
    );
  }
}
