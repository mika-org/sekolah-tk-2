import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin || admin.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { success: false, error: "Hanya Super Admin yang dapat mengubah data user admin" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { username, password, name, role, schoolId } = body;

    const existingUser = await prisma.adminUser.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    const updateData: any = {
      name,
      role: role || existingUser.role,
      schoolId: schoolId === "ALL" || !schoolId ? null : schoolId,
    };

    if (username && username !== existingUser.username) {
      const checkUsername = await prisma.adminUser.findUnique({
        where: { username },
      });
      if (checkUsername) {
        return NextResponse.json(
          { success: false, error: "Username sudah digunakan" },
          { status: 400 }
        );
      }
      updateData.username = username;
    }

    if (password && password.trim() !== "") {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.adminUser.update({
      where: { id },
      data: updateData,
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

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error: any) {
    console.error("PUT admin-user error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui user admin" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin || admin.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { success: false, error: "Hanya Super Admin yang dapat menghapus user admin" },
        { status: 403 }
      );
    }

    const { id } = await params;

    if (admin.id === id) {
      return NextResponse.json(
        { success: false, error: "Anda tidak dapat menghapus akun Anda sendiri" },
        { status: 400 }
      );
    }

    await prisma.adminUser.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "User admin dihapus" });
  } catch (error: any) {
    console.error("DELETE admin-user error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menghapus user admin" },
      { status: 500 }
    );
  }
}
