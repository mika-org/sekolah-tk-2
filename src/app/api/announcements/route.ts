import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get("schoolId");
    const schoolCode = searchParams.get("schoolCode");

    const where: any = {};
    if (schoolId) {
      where.schoolId = schoolId;
    } else if (schoolCode) {
      const school = await prisma.school.findUnique({ where: { code: schoolCode } });
      if (school) where.schoolId = school.id;
    }

    const announcements = await prisma.announcement.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { school: true },
    });
    return NextResponse.json({ success: true, data: announcements });
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

    const { schoolId, title, content, targetRole, sender, date } = await req.json();

    let targetSchoolId = schoolId || admin.schoolId;
    if (!targetSchoolId) {
      const defaultSchool = await prisma.school.findFirst({ orderBy: { orderIndex: "asc" } });
      targetSchoolId = defaultSchool?.id;
    }

    const announcement = await prisma.announcement.create({
      data: {
        schoolId: targetSchoolId,
        title,
        content,
        targetRole: targetRole || "Semua",
        sender: sender || admin.name || "Pengelola Sekolah",
        date: date || new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      },
    });

    return NextResponse.json({ success: true, data: announcement });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
