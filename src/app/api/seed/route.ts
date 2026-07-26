import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const passwordHash = await bcrypt.hash("password123", 10);

    // 1. Foundation (Yayasan)
    let foundationId = "fnd_default";
    const rawFnd: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM "yayasan" LIMIT 1`);
    if (rawFnd.length > 0) {
      foundationId = rawFnd[0].id;
    } else {
      const res: any[] = await prisma.$queryRawUnsafe(
        `INSERT INTO "yayasan" ("id", "nama", "tagline", "logo_url", "telepon", "email", "alamat", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, 'YAPCHI Foundation', 'Yayasan Pendidikan Anak Indonesia', '/images/yapchi_logo.png', '0812 3456 7890', 'info@yapchi.or.id', 'Jl. Raya DeKeraton No. 1, Karawang', NOW(), NOW()) RETURNING id`
      );
      foundationId = res[0].id;
    }

    // 2. Schools (Sekolah)
    let schoolDeKeratonId = "";
    let schoolCikarangId = "";

    const rawSchools: any[] = await prisma.$queryRawUnsafe(`SELECT id, kode FROM "sekolah"`);
    if (rawSchools.length === 0) {
      const resDeKeraton: any[] = await prisma.$queryRawUnsafe(
        `INSERT INTO "sekolah" ("id", "id_yayasan", "kode", "nama", "jenjang", "alamat", "telepon", "logo_url", "urutan", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, 'dekeraton', 'TK Smart Kids DeKeraton', 'TK', 'DeKeraton, Karawang', '081234567890', '/images/smart_kids_logo.png', 1, NOW(), NOW()) RETURNING id`,
        foundationId
      );
      schoolDeKeratonId = resDeKeraton[0].id;

      const resCikarang: any[] = await prisma.$queryRawUnsafe(
        `INSERT INTO "sekolah" ("id", "id_yayasan", "kode", "nama", "jenjang", "alamat", "telepon", "logo_url", "urutan", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, 'cikarang', 'TK Smart Kids Cikarang', 'TK', 'Cikarang, Bekasi', '081298765432', '/images/smart_kids_logo.png', 2, NOW(), NOW()) RETURNING id`,
        foundationId
      );
      schoolCikarangId = resCikarang[0].id;
    } else {
      schoolDeKeratonId = rawSchools.find((s) => s.kode === "dekeraton")?.id || rawSchools[0].id;
      schoolCikarangId = rawSchools.find((s) => s.kode === "cikarang")?.id || rawSchools[0].id;
    }

    // 3. Master Kelas (kelas)
    let classTkAId = "";
    let classTkBId = "";

    const rawClasses: any[] = await prisma.$queryRawUnsafe(`SELECT id, nama_kelas FROM "kelas"`);
    if (rawClasses.length === 0) {
      const resTkA: any[] = await prisma.$queryRawUnsafe(
        `INSERT INTO "kelas" ("id", "id_sekolah", "nama_kelas", "tingkat", "tahun_ajaran", "kapasitas", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, 'Kelas TK A - Melati', 'TK A', '2026/2027', 20, NOW(), NOW()) RETURNING id`,
        schoolDeKeratonId
      );
      classTkAId = resTkA[0].id;

      const resTkB: any[] = await prisma.$queryRawUnsafe(
        `INSERT INTO "kelas" ("id", "id_sekolah", "nama_kelas", "tingkat", "tahun_ajaran", "kapasitas", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, 'Kelas TK B - Mawar', 'TK B', '2026/2027', 20, NOW(), NOW()) RETURNING id`,
        schoolDeKeratonId
      );
      classTkBId = resTkB[0].id;
    } else {
      classTkAId = rawClasses[0].id;
      classTkBId = rawClasses[1]?.id || rawClasses[0].id;
    }

    // 4. Admin Users (pengguna_admin)
    const rawAdmins: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM "pengguna_admin" LIMIT 1`);
    if (rawAdmins.length === 0) {
      // Super Admin
      await prisma.$executeRawUnsafe(
        `INSERT INTO "pengguna_admin" ("id", "id_sekolah", "nama_pengguna", "kata_sandi_hash", "nama", "peran", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, NULL, 'admin', $1, 'Super Admin Yayasan', 'SUPER_ADMIN', NOW(), NOW())`,
        passwordHash
      );
      // Admin Cabang DeKeraton
      await prisma.$executeRawUnsafe(
        `INSERT INTO "pengguna_admin" ("id", "id_sekolah", "nama_pengguna", "kata_sandi_hash", "nama", "peran", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, 'admin_dekeraton', $2, 'Admin Cabang DeKeraton', 'ADMIN_CABANG', NOW(), NOW())`,
        schoolDeKeratonId,
        passwordHash
      );
      // Guru Wali Kelas
      await prisma.$executeRawUnsafe(
        `INSERT INTO "pengguna_admin" ("id", "id_sekolah", "nama_pengguna", "kata_sandi_hash", "nama", "peran", "kelas_ditugaskan", "id_kelas", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, 'guru_melati', $2, 'Ibu Siti Melati', 'GURU', 'Kelas TK A - Melati', $3, NOW(), NOW())`,
        schoolDeKeratonId,
        passwordHash,
        classTkAId
      );
      // Orang Tua (Bapak Budi)
      await prisma.$executeRawUnsafe(
        `INSERT INTO "pengguna_admin" ("id", "id_sekolah", "nama_pengguna", "kata_sandi_hash", "nama", "peran", "telepon", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, 'ortu_budi', $2, 'Bapak Budi Santoso', 'ORANG_TUA', '081234567890', NOW(), NOW())`,
        schoolDeKeratonId,
        passwordHash
      );
      // User Belum Masuk
      await prisma.$executeRawUnsafe(
        `INSERT INTO "pengguna_admin" ("id", "id_sekolah", "nama_pengguna", "kata_sandi_hash", "nama", "peran", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, 'user_pending', $2, 'Calon Pengguna', 'BELUM_MASUK', NOW(), NOW())`,
        schoolDeKeratonId,
        passwordHash
      );
    }

    // 5. Guru (guru)
    let teacherSitiId = "";
    const rawTeachers: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM "guru" LIMIT 1`);
    if (rawTeachers.length === 0) {
      const resTeacher: any[] = await prisma.$queryRawUnsafe(
        `INSERT INTO "guru" ("id", "id_sekolah", "id_kelas", "nama", "jabatan", "kelas_ditugaskan", "kode_qr", "url_foto", "bio", "pendidikan", "urutan", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, 'Ibu Siti Melati', 'Wali Kelas TK A', 'Kelas TK A - Melati', 'TEACHER:siti_melati', 'https://i.pravatar.cc/300?img=5', 'Mendidik anak usia dini dengan penuh cinta dan kehangatan.', 'S1 Pendidikan PAUD', 1, NOW(), NOW()) RETURNING id`,
        schoolDeKeratonId,
        classTkAId
      );
      teacherSitiId = resTeacher[0].id;

      // Update homeroom teacher on Master Kelas
      await prisma.$executeRawUnsafe(
        `UPDATE "kelas" SET "id_guru_wali" = $1, "nama_guru_wali" = 'Ibu Siti Melati' WHERE "id" = $2`,
        teacherSitiId,
        classTkAId
      );
    }

    // 6. Siswa (siswa)
    const rawStudents: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM "siswa" LIMIT 1`);
    if (rawStudents.length === 0) {
      await prisma.$executeRawUnsafe(
        `INSERT INTO "siswa" ("id", "id_sekolah", "id_kelas", "nama", "nisn", "nama_pengguna", "kata_sandi_hash", "nama_kelas", "jenis_kelamin", "kode_qr", "url_avatar", "tempat_tanggal_lahir", "nama_orang_tua", "telepon_orang_tua", "alamat", "persentase_kehadiran", "rata_rata_nilai", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, 'Ananda Rizky Pratama', '1001', 'ortu_budi', $3, 'Kelas TK A - Melati', 'L', 'STUDENT:1001', 'https://i.pravatar.cc/150?img=12', 'Karawang, 15 Mei 2021', 'Bapak Budi Santoso', '081234567890', 'DeKeraton, Karawang', 98.0, 92.5, NOW(), NOW())`,
        schoolDeKeratonId,
        classTkAId,
        passwordHash
      );
      await prisma.$executeRawUnsafe(
        `INSERT INTO "siswa" ("id", "id_sekolah", "id_kelas", "nama", "nisn", "nama_pengguna", "kata_sandi_hash", "nama_kelas", "jenis_kelamin", "kode_qr", "url_avatar", "tempat_tanggal_lahir", "nama_orang_tua", "telepon_orang_tua", "alamat", "persentase_kehadiran", "rata_rata_nilai", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, 'Siti Nur Aisyah', '1002', 'ortu_aisyah', $3, 'Kelas TK A - Melati', 'P', 'STUDENT:1002', 'https://i.pravatar.cc/150?img=47', 'Karawang, 20 Agustus 2021', 'Ibu Rahmawati', '081399887766', 'DeKeraton, Karawang', 95.0, 90.0, NOW(), NOW())`,
        schoolDeKeratonId,
        classTkAId,
        passwordHash
      );
    }

    // 7. Jadwal KBM (jadwal_kbm)
    const rawSchedules: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM "jadwal_kbm" LIMIT 1`);
    if (rawSchedules.length === 0) {
      await prisma.$executeRawUnsafe(
        `INSERT INTO "jadwal_kbm" ("id", "id_sekolah", "id_kelas", "nama_kelas", "rentang_waktu", "ruangan", "mata_pelajaran", "aktivitas", "selesai", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, 'Kelas TK A - Melati', '08.00 - 09.00', 'Ruang Kelas Melati', 'Mengenal Abjad & Bernyanyi', 'Bernyanyi lagu anak, menebalkan huruf vokal A-I-U-E-O', false, NOW(), NOW())`,
        schoolDeKeratonId,
        classTkAId
      );
    }

    return NextResponse.json({ success: true, message: "Database seeded successfully with Bahasa Indonesia UUID structure" });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
