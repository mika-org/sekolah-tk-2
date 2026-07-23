import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const attendances = await prisma.attendance.findMany({
      orderBy: { createdAt: "desc" },
      include: { student: true },
    });
    return NextResponse.json({ success: true, data: attendances });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { studentId, studentName, className, status, time, reason, date } = await req.json();

    const attendance = await prisma.attendance.create({
      data: {
        studentId,
        studentName,
        className,
        status: status || "hadir",
        time: time || null,
        reason: reason || null,
        date: date || new Date().toISOString().split("T")[0],
      },
    });

    return NextResponse.json({ success: true, data: attendance });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
