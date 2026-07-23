import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Tidak memiliki akses" },
        { status: 401 }
      );
    }

    const users = await prisma.adminUser.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        schoolId: true,
        createdAt: true,
        updatedAt: true,
        school: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    console.error("GET admin-users error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data user admin" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin || admin.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { success: false, error: "Hanya Super Admin yang dapat membuat akun admin baru" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { username, password, name, role, schoolId } = body;

    if (!username || !password || !name) {
      return NextResponse.json(
        { success: false, error: "Username, password, dan nama wajib diisi" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.adminUser.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Username sudah digunakan oleh user lain" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.adminUser.create({
      data: {
        username,
        passwordHash,
        name,
        role: role || "SCHOOL_ADMIN",
        schoolId: schoolId === "ALL" || !schoolId ? null : schoolId,
      },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        schoolId: true,
        createdAt: true,
        school: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: newUser });
  } catch (error: any) {
    console.error("POST admin-users error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal membuat user admin baru" },
      { status: 500 }
    );
  }
}
