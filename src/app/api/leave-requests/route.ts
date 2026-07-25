import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get("schoolId");
    const schoolCode = searchParams.get("schoolCode");
    const status = searchParams.get("status");

    const where: any = {};

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (schoolId && schoolId !== "ALL") {
      where.schoolId = schoolId;
    } else if (schoolCode && schoolCode !== "ALL") {
      const sch = await prisma.school.findUnique({ where: { code: schoolCode } });
      if (sch) where.schoolId = sch.id;
    }

    const leaveRequests = await prisma.leaveRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { school: true },
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
    const { schoolId, teacherName, type, startDate, endDate, reason, attachment } = await req.json();

    let targetSchoolId = schoolId;
    if (!targetSchoolId && teacherName) {
      const teacher = await prisma.teacher.findFirst({
        where: { name: { equals: teacherName, mode: "insensitive" } },
      });
      if (teacher) targetSchoolId = teacher.schoolId;
    }

    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        schoolId: targetSchoolId || null,
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
