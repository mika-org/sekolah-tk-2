import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signAdminToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawUsername = body?.username ?? "";
    const rawPassword = body?.password ?? "";

    const usernameStr = String(rawUsername).trim();
    const passwordStr = String(rawPassword).trim();

    if (!usernameStr || !passwordStr) {
      return NextResponse.json(
        { success: false, error: "Username/Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    // 1. Search in AdminUser by username OR email
    let admin = await prisma.adminUser.findFirst({
      where: {
        OR: [
          { username: usernameStr },
          { email: usernameStr },
          { username: { equals: usernameStr, mode: "insensitive" } },
        ],
      },
      include: {
        school: true,
      },
    });

    if (admin) {
      const isMatch = await bcrypt.compare(passwordStr, admin.passwordHash);
      if (!isMatch) {
        return NextResponse.json(
          { success: false, error: "Username/Email atau password salah" },
          { status: 401 }
        );
      }

      const token = signAdminToken({
        id: admin.id,
        username: admin.username,
        name: admin.name,
        role: admin.role,
        schoolId: admin.schoolId,
      });

      const response = NextResponse.json({
        success: true,
        message: "Login berhasil",
        admin: {
          id: admin.id,
          username: admin.username,
          name: admin.name,
          role: admin.role,
          schoolId: admin.schoolId,
          schoolName: admin.school?.name || "TK Smart Kids",
          schoolCode: admin.school?.code || "dekeraton",
          assignedClass: admin.assignedClass || null,
          phone: admin.phone || null,
          email: admin.email || null,
        },
      });

      response.cookies.set({
        name: "admin_token",
        value: token,
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return response;
    }

    // 2. Fallback: Search in Student table by username or nisn
    const student = await prisma.student.findFirst({
      where: {
        OR: [
          { username: usernameStr },
          { nisn: usernameStr },
          { username: { equals: usernameStr, mode: "insensitive" } },
        ],
      },
      include: {
        school: true,
      },
    });

    if (student && student.passwordHash) {
      const isMatch = await bcrypt.compare(passwordStr, student.passwordHash);
      if (isMatch) {
        const token = signAdminToken({
          id: student.id,
          username: student.username || student.nisn,
          name: student.name,
          role: "SISWA",
          schoolId: student.schoolId,
        });

        const response = NextResponse.json({
          success: true,
          message: "Login siswa berhasil",
          admin: {
            id: student.id,
            username: student.username || student.nisn,
            name: student.name,
            role: "SISWA",
            schoolId: student.schoolId,
            schoolName: student.school?.name || "TK Smart Kids",
            schoolCode: student.school?.code || "dekeraton",
            assignedClass: student.className,
            parentName: student.parentName,
            parentPhone: student.parentPhone,
          },
        });

        response.cookies.set({
          name: "admin_token",
          value: token,
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60,
        });

        return response;
      }
    }

    return NextResponse.json(
      { success: false, error: "Username/Email atau password salah" },
      { status: 401 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Terjadi kesalahan server saat login" },
      { status: 500 }
    );
  }
}
