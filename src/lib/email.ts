import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function sendCredentialEmail(
  email: string,
  studentName: string,
  username: string,
  passwordStr: string
) {
  try {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || '"Smart Kids & YAPCHI Foundation" <no-reply@sekolah.com>';

    if (!host || !user || !pass) {
      console.warn("SMTP credentials not configured. Simulating email send to:", email);
      console.log(`
        === EMAIL SENT TO ORANG TUA (SIMULATION) ===
        To: ${email}
        Subject: Selamat! Ananda ${studentName} Diterima di Smart Kids
        
        Selamat, Ananda telah diterima di Smart Kids.
        Berikut akun untuk login.
        Username: ${username}
        Password: ${passwordStr}
        Silakan login melalui: ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/login
        ============================================
      `);
      return { success: true, simulated: true };
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const mailOptions = {
      from,
      to: email,
      subject: `Akun Portal Orang Tua Smart Kids - ${studentName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="color: #057a44; margin: 0; font-size: 20px; font-weight: 800; text-transform: uppercase;">Selamat! Pendaftaran Diterima</h2>
            <p style="color: #6b7280; font-size: 13px; margin-top: 4px;">Smart Kids & YAPCHI Foundation</p>
          </div>
          
          <p style="color: #374151; font-size: 14px; line-height: 1.6;">Halo Bapak/Ibu Orang Tua/Wali dari <strong>${studentName}</strong>,</p>
          <p style="color: #374151; font-size: 14px; line-height: 1.6;">Dengan hormat, kami menginformasikan bahwa pendaftaran PPDB ananda <strong>${studentName}</strong> telah <strong>Diterima</strong>.</p>
          <p style="color: #374151; font-size: 14px; line-height: 1.6;">Untuk memantau perkembangan belajar, kehadiran, dan nilai ananda, kami telah mengaktifkan akun Portal Orang Tua Anda. Berikut adalah detail login Anda:</p>
          
          <div style="background-color: #F8F6F2; padding: 18px; border-radius: 12px; margin: 24px 0; border: 1px dashed #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse; font-family: monospace; font-size: 14px;">
              <tr>
                <td style="width: 120px; font-weight: bold; color: #4b5563; padding-bottom: 8px;">Username:</td>
                <td style="color: #057a44; font-weight: bold; padding-bottom: 8px;">${username}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; color: #4b5563;">Password:</td>
                <td style="color: #057a44; font-weight: bold;">${passwordStr}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #ef4444; font-size: 11px; font-weight: 600; margin-top: -12px; margin-bottom: 24px;">*Demi keamanan data Anda, mohon segera lakukan penggantian password sementara di menu Pengaturan Akun setelah pertama kali berhasil masuk.</p>
          
          <div style="text-align: center; margin: 28px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/login" style="background-color: #057a44; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(5, 122, 68, 0.2);">Login ke Portal Sekolah</a>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #f3f4f6; margin: 24px 0;" />
          <p style="font-size: 11px; color: #9ca3af; text-align: center; line-height: 1.5; margin: 0;">Email ini dikirimkan secara otomatis oleh Sistem Portal Akademik Smart Kids.<br/>Mohon tidak membalas email ini.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`[EMAIL SENT] Successfully sent credential email to: ${email}`);
    return { success: true };
  } catch (err) {
    console.error(`[EMAIL ERROR] Failed to send credential email to ${email}:`, err);
    return { success: false, error: err };
  }
}

export async function createStudentAccountAndSendEmail(ppdb: {
  schoolId: string;
  registrationNo: string;
  namaAnak: string;
  jenisKelamin?: string;
  tempatLahir?: string;
  tanggalLahir?: string;
  program?: string;
  namaOrtu: string;
  noWhatsapp: string;
  email: string;
  alamatRumah: string;
}) {
  try {
    // 1. Trim & format student name into clean username
    const cleanName = ppdb.namaAnak.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    let username = cleanName || `siswa${Math.floor(100 + Math.random() * 900)}`;

    // Ensure username uniqueness
    let counter = 1;
    while (await prisma.student.findFirst({ where: { username } })) {
      username = `${cleanName}${counter}`;
      counter++;
    }

    // 2. Generate random plain password and hash with bcrypt
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const passwordStr = `Sk${randomNum}`;
    const passwordHash = await bcrypt.hash(passwordStr, 10);

    const birthPlaceDate =
      ppdb.tempatLahir && ppdb.tanggalLahir
        ? `${ppdb.tempatLahir}, ${ppdb.tanggalLahir}`
        : "Karawang, 2021";

    let targetSchoolId = ppdb.schoolId;
    if (!targetSchoolId) {
      const defaultSchool = await prisma.school.findFirst({ orderBy: { orderIndex: "asc" } });
      targetSchoolId = defaultSchool?.id || "default";
    }

    // 3. Upsert Student bound to PPDB registration
    const student = await prisma.student.upsert({
      where: { nisn: ppdb.registrationNo },
      update: {
        schoolId: targetSchoolId,
        username,
        passwordHash,
        parentEmail: ppdb.email,
        parentPhone: ppdb.noWhatsapp,
      },
      create: {
        schoolId: targetSchoolId,
        name: ppdb.namaAnak,
        nisn: ppdb.registrationNo,
        username,
        passwordHash,
        className: ppdb.program || "Kelas TK A",
        gender: ppdb.jenisKelamin === "Perempuan" ? "P" : "L",
        birthPlaceDate,
        parentName: ppdb.namaOrtu,
        parentPhone: ppdb.noWhatsapp,
        parentEmail: ppdb.email,
        address: ppdb.alamatRumah,
      },
    });

    // 4. Upsert AdminUser account table (role = ORTU) for portal login
    await prisma.adminUser.upsert({
      where: { username },
      update: {
        schoolId: targetSchoolId,
        passwordHash,
        name: `Wali ${ppdb.namaAnak}`,
        phone: ppdb.noWhatsapp,
        email: ppdb.email,
        role: "ORTU",
      },
      create: {
        schoolId: targetSchoolId,
        username,
        passwordHash,
        name: `Wali ${ppdb.namaAnak}`,
        phone: ppdb.noWhatsapp,
        email: ppdb.email,
        role: "ORTU",
      },
    });

    // 5. Send credential email to parent
    if (ppdb.email) {
      await sendCredentialEmail(ppdb.email, ppdb.namaAnak, username, passwordStr);
    }

    return { success: true, student, username, passwordStr };
  } catch (err: any) {
    console.error("Error creating student account and sending email:", err);
    return { success: false, error: err.message };
  }
}
