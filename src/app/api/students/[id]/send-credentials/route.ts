import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";
import { sendCredentialEmail } from "@/lib/email";
import bcrypt from "bcryptjs";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const student = await prisma.student.findUnique({ where: { id } });

    if (!student) {
      return NextResponse.json(
        { success: false, error: "Data siswa tidak ditemukan" },
        { status: 404 }
      );
    }

    // 1. Generate clean unique username if missing
    let username = student.username;
    if (!username) {
      const cleanName = student.name.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      username = cleanName || `siswa${Math.floor(100 + Math.random() * 900)}`;

      let counter = 1;
      while (await prisma.student.findFirst({ where: { username, NOT: { id: student.id } } })) {
        username = `${cleanName}${counter}`;
        counter++;
      }
    }

    // 2. Generate new random password
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const passwordStr = `Sk${randomNum}`;
    const passwordHash = await bcrypt.hash(passwordStr, 10);

    // 3. Update student record with username and new passwordHash
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        username,
        passwordHash,
      },
    });

    // 4. Synchronize & Upsert parent account in AdminUser table (role = ORTU)
    await prisma.adminUser.upsert({
      where: { username },
      update: {
        schoolId: student.schoolId,
        passwordHash,
        name: `Wali ${student.name}`,
        phone: student.parentPhone,
        email: student.parentEmail,
        role: "ORTU",
      },
      create: {
        schoolId: student.schoolId,
        username,
        passwordHash,
        name: `Wali ${student.name}`,
        phone: student.parentPhone,
        email: student.parentEmail,
        role: "ORTU",
      },
    });

    // 4. Send email if parent email exists
    let emailSent = false;
    if (student.parentEmail) {
      const emailRes = await sendCredentialEmail(
        student.parentEmail,
        student.name,
        username,
        passwordStr
      );
      emailSent = emailRes.success;
    }

    // 5. Construct WhatsApp link
    const cleanPhone = (student.parentPhone || "").replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.startsWith("0")
      ? `62${cleanPhone.slice(1)}`
      : cleanPhone;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const waMessage = `Halo Bapak/Ibu ${student.parentName || "Orang Tua"},\n\nBerikut adalah akun Portal Orang Tua Smart Kids untuk ananda *${student.name}*:\n\n👤 Username: *${username}*\n🔑 Password: *${passwordStr}*\n\nSilakan login melalui: ${appUrl}/login\n\nTerima kasih.`;
    const waUrl = formattedPhone
      ? `https://wa.me/${formattedPhone}?text=${encodeURIComponent(waMessage)}`
      : null;

    return NextResponse.json({
      success: true,
      message: `Akun ortu untuk ${student.name} berhasil dibuat/diperbarui!`,
      data: {
        student: updatedStudent,
        username,
        password: passwordStr,
        parentEmail: student.parentEmail,
        parentPhone: student.parentPhone,
        emailSent,
        waUrl,
      },
    });
  } catch (error: any) {
    console.error("Error sending student credentials:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal mengirim akun ortu" },
      { status: 500 }
    );
  }
}
