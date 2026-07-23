import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const leaveRequests = await prisma.leaveRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: leaveRequests });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { teacherName, type, startDate, endDate, reason, attachment } = await req.json();

    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        teacherName,
        type: type || "izin",
        startDate,
        endDate,
        reason,
        attachment: attachment || null,
        status: "pending",
      },
    });

    return NextResponse.json({ success: true, data: leaveRequest });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
