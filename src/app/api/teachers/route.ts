import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get("schoolId");
    const schoolCode = searchParams.get("schoolCode");

    const where: any = {};
    if (schoolId && schoolId !== "ALL") {
      where.schoolId = schoolId;
    } else if (schoolCode && schoolCode !== "ALL") {
      const school = await prisma.school.findUnique({ where: { code: schoolCode } });
      if (school) where.schoolId = school.id;
    }

    const teachers = await prisma.teacher.findMany({
      where,
      orderBy: { orderIndex: "asc" },
      include: { school: true },
    });

    // Ensure all teachers have qrCode generated
    const formatted = teachers.map((t: any) => ({
      ...t,
      qrCode: t.qrCode || `TEACHER:${t.id}`,
    }));

    return NextResponse.json({ success: true, data: formatted });
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
      return NextResponse.json(
        { success: false, error: "Akses ditolak" },
        { status: 401 }
      );
    }

    const { id, schoolId, name, role, assignedClass, photoUrl, bio, education, orderIndex } = await req.json();

    let targetSchoolId = schoolId || admin.schoolId;
    if (!targetSchoolId) {
      const defaultSchool = await prisma.school.findFirst({ orderBy: { orderIndex: "asc" } });
      targetSchoolId = defaultSchool?.id;
    }

    if (!targetSchoolId) {
      return NextResponse.json(
        { success: false, error: "Sekolah tidak ditemukan" },
        { status: 400 }
      );
    }

    const db = prisma as any;

    if (id) {
      // Update existing teacher
      const updated = await db.teacher.update({
        where: { id },
        data: {
          name,
          role,
          assignedClass: assignedClass || null,
          photoUrl: photoUrl || "/images/teacher_default.png",
          bio: bio || null,
          education: education || null,
          orderIndex: Number(orderIndex) || 0,
        },
      });

      // Update linked AdminUser if role GURU
      await db.adminUser.updateMany({
        where: { name: name },
        data: { assignedClass: assignedClass || null },
      });

      return NextResponse.json({ success: true, data: updated });
    }

    const teacher = await db.teacher.create({
      data: {
        schoolId: targetSchoolId,
        name,
        role,
        assignedClass: assignedClass || null,
        photoUrl: photoUrl || "/images/teacher_default.png",
        bio: bio || null,
        education: education || null,
        orderIndex: Number(orderIndex) || 0,
      },
    });

    // Auto-update qrCode with created ID
    const updatedTeacher = await db.teacher.update({
      where: { id: teacher.id },
      data: { qrCode: `TEACHER:${teacher.id}` },
    });

    return NextResponse.json({ success: true, data: updatedTeacher });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
