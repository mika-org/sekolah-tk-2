import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";
import { hashPassword, generateTemporaryPassword } from "@/lib/password";

export async function GET(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    const { searchParams } = new URL(req.url);

    const schoolId = searchParams.get("schoolId");
    const schoolCode = searchParams.get("schoolCode");
    const status = searchParams.get("status");
    const sdGrade = searchParams.get("sdGrade");
    const teacherPicId = searchParams.get("teacherPicId");
    const search = searchParams.get("search");
    const parentPhone = searchParams.get("parentPhone");

    const where: any = {};

    // 1. Role-based scoping
    if (admin) {
      if (admin.role === "ORTU" || admin.role === "ORANG_TUA") {
        const cleanPhone = (admin.phone || "").replace(/\D/g, "");
        const cleanEmail = (admin.email || "").trim().toLowerCase();
        const cleanName = (admin.name || "").replace(/^wali\s+/i, "").trim().toLowerCase();

        const orConditions: any[] = [];
        if (cleanPhone) orConditions.push({ parentPhone: { contains: cleanPhone } });
        if (cleanEmail) orConditions.push({ parentEmail: { equals: cleanEmail, mode: "insensitive" } });
        if (cleanName) orConditions.push({ parentName: { contains: cleanName, mode: "insensitive" } });

        if (orConditions.length > 0) {
          where.OR = orConditions;
        }
      } else if (admin.role === "GURU") {
        // Teacher PIC view
        // Find teacher record linked to this admin
        const teacher = await prisma.teacher.findFirst({
          where: {
            OR: [
              { email: admin.email || undefined },
              { name: { contains: admin.name, mode: "insensitive" } },
            ],
          },
        });

        if (teacherPicId && teacherPicId !== "ALL") {
          where.teacherPicId = teacherPicId;
        } else if (teacher) {
          where.OR = [
            { teacherPicId: teacher.id },
            { teacherPicName: { contains: admin.name, mode: "insensitive" } },
          ];
        }
      } else if (admin.role !== "SUPER_ADMIN" && admin.role !== "ADMIN_PUSAT" && admin.schoolId) {
        where.schoolId = admin.schoolId;
      }
    }

    // 2. Query filter parameters
    if (status && status !== "ALL") {
      where.status = status;
    }

    if (sdGrade && sdGrade !== "ALL") {
      where.sdGrade = sdGrade;
    }

    if (teacherPicId && teacherPicId !== "ALL" && (!admin || admin.role !== "GURU")) {
      where.teacherPicId = teacherPicId;
    }

    if (parentPhone) {
      where.parentPhone = { contains: parentPhone.replace(/\D/g, "") };
    }

    if (schoolId && schoolId !== "ALL") {
      where.schoolId = schoolId;
    } else if (schoolCode && schoolCode !== "ALL") {
      const sch = await prisma.school.findUnique({ where: { code: schoolCode } });
      if (sch) where.schoolId = sch.id;
    }

    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        ...(where.OR || []),
        { studentName: { contains: q, mode: "insensitive" } },
        { parentName: { contains: q, mode: "insensitive" } },
        { registrationNo: { contains: q, mode: "insensitive" } },
        { parentPhone: { contains: q } },
        { schoolOrigin: { contains: q, mode: "insensitive" } },
      ];
    }

    const registrations = await prisma.lesSdRegistration.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        school: {
          select: { id: true, name: true, code: true, address: true, phone: true },
        },
        teacherPic: {
          select: { id: true, name: true, phone: true, photoUrl: true, role: true },
        },
        payments: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return NextResponse.json({ success: true, data: registrations });
  } catch (error: any) {
    console.error("[LES_SD_GET_ERROR]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      schoolId,
      schoolCode,
      studentName,
      gender = "L",
      sdGrade = "Kelas 1 SD",
      schoolOrigin,
      parentName,
      parentPhone,
      parentEmail,
      address,
      programPackage = "1 Minggu 3x Pertemuan - Semua Mata Pelajaran",
      scheduleDays = "Senin, Rabu, Jumat",
      scheduleTime = "14:00 - 15:30 WIB",
      sppAmount = 200000,
      notes,
    } = body;

    if (!studentName || !parentName || !parentPhone) {
      return NextResponse.json(
        { success: false, error: "Nama anak, nama orang tua, dan nomor WhatsApp wajib diisi!" },
        { status: 400 }
      );
    }

    // VERIFIKASI KEANGGOTAAN: Program Les SD HANYA untuk murid & orang tua yang sudah terdaftar
    const cleanPhone = parentPhone.replace(/\D/g, "");
    const cleanStudentName = studentName.trim();
    const inputNisn = (body.nisn || "").trim();

    // 1. Cek sesi login saat ini (jika login sebagai orang tua atau staff)
    const sessionAdmin = await getAdminFromCookies();
    const isSessionParent = sessionAdmin && (sessionAdmin.role === "ORANG_TUA" || sessionAdmin.role === "ORTU");
    const isSessionStaff = sessionAdmin && (sessionAdmin.role === "SUPER_ADMIN" || sessionAdmin.role === "ADMIN_CABANG" || sessionAdmin.role === "GURU");

    // 2. Cek apakah murid atau kontak orang tua terdaftar di tabel Siswa
    const studentOrConditions: any[] = [];
    if (inputNisn) studentOrConditions.push({ nisn: inputNisn });
    if (cleanStudentName) studentOrConditions.push({ name: { equals: cleanStudentName, mode: "insensitive" } });
    if (cleanPhone.length >= 7) studentOrConditions.push({ parentPhone: { contains: cleanPhone } });
    if (parentEmail?.trim()) studentOrConditions.push({ parentEmail: { equals: parentEmail.trim(), mode: "insensitive" } });

    let registeredStudent: any = null;
    if (studentOrConditions.length > 0) {
      registeredStudent = await prisma.student.findFirst({
        where: { OR: studentOrConditions },
        include: { school: true },
      });
    }

    // 3. Cek apakah orang tua terdaftar di tabel AdminUser (role: ORANG_TUA / ORTU)
    let registeredParentUser: any = null;
    if (!registeredStudent) {
      const parentOrConditions: any[] = [];
      if (cleanPhone.length >= 7) parentOrConditions.push({ phone: { contains: cleanPhone } });
      if (parentEmail?.trim()) parentOrConditions.push({ email: { equals: parentEmail.trim(), mode: "insensitive" } });
      if (parentName?.trim()) parentOrConditions.push({ name: { contains: parentName.trim(), mode: "insensitive" } });

      if (parentOrConditions.length > 0) {
        registeredParentUser = await prisma.adminUser.findFirst({
          where: {
            role: { in: ["ORANG_TUA", "ORTU"] },
            OR: parentOrConditions,
          },
          include: { school: true },
        });
      }
    }

    // Tolak jika bukan murid/orang tua terdaftar dan bukan sesi login berwenang
    if (!registeredStudent && !registeredParentUser && !isSessionParent && !isSessionStaff) {
      return NextResponse.json(
        {
          success: false,
          error: "Pendaftaran Program Les SD hanya diperuntukkan bagi murid dan orang tua yang sudah terdaftar di Smart Kids. Silakan gunakan Nomor WhatsApp atau Nama Murid yang sudah tercatat di sekolah, atau silakan Masuk ke Portal Orang Tua.",
        },
        { status: 403 }
      );
    }

    // Determine target school
    let targetSchoolId = schoolId || registeredStudent?.schoolId || registeredParentUser?.schoolId;
    if (!targetSchoolId && schoolCode) {
      const foundSchool = await prisma.school.findUnique({ where: { code: schoolCode } });
      if (foundSchool) targetSchoolId = foundSchool.id;
    }
    if (!targetSchoolId) {
      const defaultSchool = await prisma.school.findFirst({ orderBy: { orderIndex: "asc" } });
      targetSchoolId = defaultSchool?.id;
    }
    if (!targetSchoolId) {
      return NextResponse.json({ success: false, error: "Sekolah cabang tidak ditemukan" }, { status: 400 });
    }

    // Generate unique registration number: LES-2026-XXXX
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const registrationNo = body.registrationNo || `LES-2026-${randomDigits}`;

    // Create Les SD registration
    const registration = await prisma.lesSdRegistration.create({
      data: {
        schoolId: targetSchoolId,
        registrationNo,
        studentName: studentName.trim(),
        gender,
        sdGrade,
        schoolOrigin: schoolOrigin ? schoolOrigin.trim() : null,
        parentName: parentName.trim(),
        parentPhone: parentPhone.trim(),
        parentEmail: parentEmail ? parentEmail.trim() : null,
        address: address ? address.trim() : null,
        programPackage,
        scheduleDays,
        scheduleTime,
        sppAmount: Number(sppAmount) || 200000,
        status: "PENDING",
        notes: notes ? notes.trim() : null,
      },
      include: {
        school: true,
      },
    });

    // Determine initial month label
    const now = new Date();
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const initialMonth = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    // Auto-create initial SPP invoice for the first month
    await prisma.lesSdPayment.create({
      data: {
        registrationId: registration.id,
        studentName: registration.studentName,
        month: initialMonth,
        amount: Number(sppAmount) || 200000,
        status: "belum_bayar",
        notes: "Tagihan SPP Perdana Les SD (1 Minggu 3x Pertemuan)",
      },
    });

    // Auto-create or ensure Parent Portal User Account
    let accountCreated = false;
    let tempUsername = "";
    let tempPassword = "";

    try {
      const cleanPhone = parentPhone.replace(/\D/g, "");
      const cleanStudentName = studentName.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      tempUsername = cleanPhone || `wali${cleanStudentName}`;

      const existingUser = await prisma.adminUser.findFirst({
        where: {
          OR: [
            { username: tempUsername },
            { phone: parentPhone.trim() },
            ...(parentEmail ? [{ email: parentEmail.trim() }] : []),
          ],
        },
      });

      if (!existingUser) {
        tempPassword = generateTemporaryPassword("Les");
        const passwordHash = await hashPassword(tempPassword);

        await prisma.adminUser.create({
          data: {
            schoolId: targetSchoolId,
            username: tempUsername,
            passwordHash,
            name: `Wali ${studentName.trim()}`,
            phone: parentPhone.trim(),
            email: parentEmail ? parentEmail.trim() : null,
            role: "ORANG_TUA",
          },
        });
        accountCreated = true;
      }
    } catch (userErr) {
      console.warn("[LES_SD_AUTO_USER_WARN]", userErr);
    }

    return NextResponse.json(
      {
        success: true,
        data: registration,
        accountInfo: accountCreated
          ? { username: tempUsername, password: tempPassword }
          : null,
        message: "Pendaftaran Les SD berhasil dikirim!",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[LES_SD_POST_ERROR]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
