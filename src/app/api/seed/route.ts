import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export async function GET() {
  try {
    const passwordHash = await hashPassword("purw4k4rt4");

    // 0. Ensure required DB columns exist
    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE "program" ADD COLUMN IF NOT EXISTS "jumlah_spp" DOUBLE PRECISION NOT NULL DEFAULT 200000`
      );
      await prisma.$executeRawUnsafe(
        `ALTER TABLE "pendaftaran_ppdb" ADD COLUMN IF NOT EXISTS "jumlah_spp" DOUBLE PRECISION DEFAULT 200000`
      );
      await prisma.$executeRawUnsafe(
        `ALTER TABLE "jadwal_kbm" ADD COLUMN IF NOT EXISTS "tanggal" TEXT DEFAULT '2026-07-27'`
      );
    } catch (migErr) {
      console.warn("Auto column check warning:", migErr);
    }

    // 1. Foundation (Yayasan)
    let foundationId = "fnd_default";
    const rawFnd: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM "yayasan" LIMIT 1`);
    if (rawFnd.length > 0) {
      foundationId = rawFnd[0].id;
    } else {
      const res: any[] = await prisma.$queryRawUnsafe(
        `INSERT INTO "yayasan" ("id", "nama", "tagline", "logo_url", "telepon", "email", "alamat", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, 'YAPCHI Foundation', 'Yayasan Pendidikan Anak Indonesia', '/images/yapchi_logo.png', '0812 3456 7890', 'info@yapchi.or.id', 'Sadjati, Karawang', NOW(), NOW()) RETURNING id`
      );
      foundationId = res[0].id;
    }

    // 2. Ensure Schools (Sekolah)
    let schoolSadjatiId = "";
    let schoolBclId = "";

    const rawSchools: any[] = await prisma.$queryRawUnsafe(`SELECT id, kode FROM "sekolah"`);

    let existingSadjati = rawSchools.find((s) => s.kode === "sadjati");
    if (!existingSadjati) {
      const resSadjati: any[] = await prisma.$queryRawUnsafe(
        `INSERT INTO "sekolah" ("id", "id_yayasan", "kode", "nama", "jenjang", "alamat", "telepon", "logo_url", "urutan", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, 'sadjati', 'Smart Kids Sadjati', 'TK', 'Sadjati, Karawang', '081234567890', '/images/smart_kids_logo.png', 1, NOW(), NOW()) RETURNING id`,
        foundationId
      );
      schoolSadjatiId = resSadjati[0].id;
    } else {
      schoolSadjatiId = existingSadjati.id;
    }

    let existingBcl = rawSchools.find((s) => s.kode === "bcl");
    if (!existingBcl) {
      const resBcl: any[] = await prisma.$queryRawUnsafe(
        `INSERT INTO "sekolah" ("id", "id_yayasan", "kode", "nama", "jenjang", "alamat", "telepon", "logo_url", "urutan", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, 'bcl', 'Smart Kids BCL', 'TK', 'BCL, Cikarang', '081298765432', '/images/smart_kids_logo.png', 2, NOW(), NOW()) RETURNING id`,
        foundationId
      );
      schoolBclId = resBcl[0].id;
    } else {
      schoolBclId = existingBcl.id;
    }

    // Clean obsolete duplicate schools if any
    await prisma.$executeRawUnsafe(`DELETE FROM "sekolah" WHERE "kode" IN ('dekeraton', 'cikarang')`);

    // 3. Programs (S3, S4, S5, BEST PROGRAM)
    const defaultPrograms = [
      {
        title: "S3",
        ageRange: "1 Minggu 3X Pertemuan",
        iconUrl: "/images/program_playground.png",
        features: JSON.stringify(["3x Pertemuan / Minggu", "SPP Perbulan Rp 200.000"]),
        sppAmount: 200000,
        orderIndex: 1,
      },
      {
        title: "S4",
        ageRange: "1 Minggu 4X Pertemuan",
        iconUrl: "/images/program_kindergarten.png",
        features: JSON.stringify(["4x Pertemuan / Minggu", "SPP Perbulan Rp 250.000"]),
        sppAmount: 250000,
        orderIndex: 2,
      },
      {
        title: "S5",
        ageRange: "1 Minggu 5X Pertemuan",
        iconUrl: "/images/program_pre_kindergarten.png",
        features: JSON.stringify(["5x Pertemuan / Minggu", "SPP Perbulan Rp 300.000"]),
        sppAmount: 300000,
        orderIndex: 3,
      },
      {
        title: "BEST PROGRAM",
        ageRange: "1 Minggu 3X Pertemuan (1 Guru 1 Siswa)",
        iconUrl: "/images/program_kindergarten.png",
        features: JSON.stringify(["3x Pertemuan / Minggu", "Private 1 Guru 1 Siswa", "SPP Perbulan Rp 300.000"]),
        sppAmount: 300000,
        orderIndex: 4,
      },
      {
        title: "LES SD",
        ageRange: "1 Minggu 3X Pertemuan (Semua Mata Pelajaran)",
        iconUrl: "/images/program_kindergarten.png",
        features: JSON.stringify(["1 Minggu 3x Pertemuan", "Semua Mata Pelajaran SD", "SPP Perbulan Rp 200.000", "Bimbingan Guru PIC Berpengalaman"]),
        sppAmount: 200000,
        orderIndex: 5,
      },
    ];

    const activeSchools: any[] = await prisma.$queryRawUnsafe(`SELECT id, nama FROM "sekolah"`);

    for (const school of activeSchools) {
      await prisma.$executeRawUnsafe(`DELETE FROM "program" WHERE "id_sekolah" = $1`, school.id);
      for (const prog of defaultPrograms) {
        await prisma.$executeRawUnsafe(
          `INSERT INTO "program" ("id", "id_sekolah", "judul", "rentang_usia", "url_ikon", "fitur", "jumlah_spp", "urutan", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
          school.id,
          prog.title,
          prog.ageRange,
          prog.iconUrl,
          prog.features,
          prog.sppAmount,
          prog.orderIndex
        );
      }

      // Site profile check
      const siteProf: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM "profil_situs" WHERE "id_sekolah" = $1`, school.id);
      if (siteProf.length === 0) {
        await prisma.$executeRawUnsafe(
          `INSERT INTO "profil_situs" ("id", "id_sekolah", "lencana_pahlawan", "judul_pahlawan", "subjudul_pahlawan", "url_maskot_pahlawan", "judul_panggilan_aksi", "subjudul_panggilan_aksi", "telepon", "instagram", "facebook", "alamat", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, 'Belajar Seru, Tumbuh Bahagia', 'Bimbingan belajar untuk anak usia 3-8 tahun dengan metode bermain sambil belajar yang menyenangkan', '/images/owl_mascot.png', $3, 'Bergabunglah bersama Smart Kids dan berikan pengalaman belajar terbaik untuk masa depan cerah mereka', '0812 3456 7890', 'smartkids', 'Smart Kids', $4, NOW())`,
          school.id,
          `Pendaftaran ${school.nama} Telah Dibuka!`,
          `Yuk, Daftarkan Si Kecil di ${school.nama}!`,
          school.nama
        );
      }

      // 3b. Gallery Items check
      const rawGallery: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM "item_galeri" WHERE "id_sekolah" = $1`, school.id);
      if (rawGallery.length === 0) {
        const defaultGallery = [
          { title: "Kegiatan Belajar Sentra Sains & Motorik", imageUrl: "/images/gallery1.png", orderIndex: 1 },
          { title: "Keceriaan Bermain Outdoor & Interaksi", imageUrl: "/images/gallery2.png", orderIndex: 2 },
          { title: "Kemandirian & Kreasi Seni Melipat Origami", imageUrl: "/images/gallery3.png", orderIndex: 3 },
        ];
        for (const g of defaultGallery) {
          await prisma.$executeRawUnsafe(
            `INSERT INTO "item_galeri" ("id", "id_sekolah", "judul", "url_gambar", "folder", "urutan", "dibuat_pada") VALUES (gen_random_uuid()::text, $1, $2, $3, 'gallery', $4, NOW())`,
            school.id,
            g.title,
            g.imageUrl,
            g.orderIndex
          );
        }
      }

      // 3c. Testimonials check
      const rawTestimonials: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM "testimoni" WHERE "id_sekolah" = $1`, school.id);
      if (rawTestimonials.length === 0) {
        const defaultTestimonials = [
          {
            parentName: "Bunda Rayyan (Ibu Maya)",
            role: "Orang Tua Siswa",
            initials: "BM",
            content: "Metode bermain sambil belajar di Smart Kids sangat menyenangkan! Rayyan jadi lebih mandiri dan berani berbicara di depan umum.",
            rating: 5,
            bgColor: "emerald",
            orderIndex: 1,
          },
          {
            parentName: "Bapak Hendra Pratama",
            role: "Orang Tua Siswa",
            initials: "BP",
            content: "Program bimbingan belajarnya sangat intensif dan guru-gurunya sabar sekali membimbing anak. Nilai dan pemahaman anak meningkat pesat!",
            rating: 5,
            bgColor: "blue",
            orderIndex: 2,
          },
          {
            parentName: "Mama Alif (Ibu Dian)",
            role: "Orang Tua Siswa",
            initials: "MD",
            content: "Fasilitas lengkap, kelasnya nyaman dan aman. Anak saya selalu antusias berangkat ke sekolah setiap hari.",
            rating: 5,
            bgColor: "amber",
            orderIndex: 3,
          },
        ];
        for (const t of defaultTestimonials) {
          await prisma.$executeRawUnsafe(
            `INSERT INTO "testimoni" ("id", "id_sekolah", "nama_orang_tua", "peran", "inisial", "konten", "penilaian", "warna_latar", "urutan", "dibuat_pada") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
            school.id,
            t.parentName,
            t.role,
            t.initials,
            t.content,
            t.rating,
            t.bgColor,
            t.orderIndex
          );
        }
      }

      // 3d. Bank Accounts check
      const rawBanks: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM "rekening_bank" WHERE "id_sekolah" = $1`, school.id);
      if (rawBanks.length === 0) {
        const defaultBanks = [
          { bankName: "BCA", accountNumber: "123-456-7890", accountHolder: "Yayasan Smart Kids", logoUrl: "/images/bca_logo.png" },
          { bankName: "MANDIRI", accountNumber: "987-654-3210", accountHolder: "Yayasan Smart Kids", logoUrl: "/images/mandiri_logo.png" },
        ];
        for (const b of defaultBanks) {
          await prisma.$executeRawUnsafe(
            `INSERT INTO "rekening_bank" ("id", "id_sekolah", "nama_bank", "nomor_rekening", "atas_nama", "url_logo_bank", "aktif", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, true, NOW(), NOW())`,
            school.id,
            b.bankName,
            b.accountNumber,
            b.accountHolder,
            b.logoUrl
          );
        }
      }

      // 3e. Fee Components check
      const rawFeeComps: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM "komponen_biaya" WHERE "id_sekolah" = $1`, school.id);
      if (rawFeeComps.length === 0) {
        const defaultFeeComps = [
          { code: "pendaftaran", name: "Biaya Pendaftaran", category: "PPDB", description: "Biaya pendaftaran dan administrasi utama", amount: 200000, isRequired: true, orderIndex: 10 },
          { code: "seragam_kuning", name: "Seragam Kuning", category: "PPDB", description: "Stelan seragam khas kuning Smart Kids", amount: 150000, isRequired: false, orderIndex: 20 },
          { code: "seragam_abu_abu", name: "Seragam Abu-abu", category: "PPDB", description: "Stelan seragam formal abu-abu", amount: 170000, isRequired: false, orderIndex: 30 },
          { code: "seragam_olahraga", name: "Seragam Olahraga", category: "PPDB", description: "Stelan kaos dan celana olahraga", amount: 130000, isRequired: false, orderIndex: 40 },
          { code: "raport", name: "Raport", category: "PPDB", description: "Buku laporan hasil capaian belajar anak", amount: 50000, isRequired: false, orderIndex: 50 },
          { code: "buku_penghubung", name: "Buku Penghubung", category: "PPDB", description: "Buku komunikasi harian orang tua dan guru", amount: 15000, isRequired: true, orderIndex: 60 },
          { code: "spp_bulan_pertama", name: "SPP S-3", category: "PPDB", description: "spp bulan pertama", amount: 200000, isRequired: true, orderIndex: 70 },
        ];
        for (const fc of defaultFeeComps) {
          await prisma.$executeRawUnsafe(
            `INSERT INTO "komponen_biaya" ("id", "id_sekolah", "kode", "nama", "kategori", "deskripsi", "jumlah", "wajib", "aktif", "urutan", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, true, $8, NOW(), NOW())`,
            school.id,
            fc.code,
            fc.name,
            fc.category,
            fc.description,
            fc.amount,
            fc.isRequired,
            fc.orderIndex
          );
        }
      }
    }

    // 4. Reset & Seed Teachers (Guru), Master Kelas (Kelas), Students (Siswa), & KBM Schedules (Jadwal) per Walikelas
    await prisma.$executeRawUnsafe(`DELETE FROM "guru"`);
    await prisma.$executeRawUnsafe(`DELETE FROM "kelas"`);
    await prisma.$executeRawUnsafe(`DELETE FROM "siswa"`);
    await prisma.$executeRawUnsafe(`DELETE FROM "jadwal_kbm"`);

    // SADJATI WALIKELAS DATA
    const sadjatiWaliKelas = [
      {
        teacherName: "Miss Afifah",
        role: "Wali Kelas Miss Afifah",
        className: "Kelas Miss Afifah",
        grade: "S3",
        photo: "https://smartkids.elevore.web.id/uploads/profiles/2026/09/07/1788752422345_32fcc984_WhatsApp_Image_2026-09-06_at_15_57_54.webp",
        bio: "Mendidik dan mendampingi si kecil tumbuh cerdas & kreatif.",
        education: "S1 Pendidikan PAUD",
        students: [
          { name: "Ananda Rizky Pratama", nisn: "1001", gender: "L", parentName: "Bapak Budi Santoso", parentPhone: "081234567890", address: "Sadjati, Karawang" },
          { name: "Aira Syahputri", nisn: "1002", gender: "P", parentName: "Ibu Rahmawati", parentPhone: "081399887766", address: "Sadjati, Karawang" },
        ],
      },
      {
        teacherName: "Miss Ulin",
        role: "Wali Kelas Miss Ulin",
        className: "Kelas Miss Ulin",
        grade: "S4",
        photo: "/images/teacher2.jpg",
        bio: "Fokus pada pengembangan kognitif & emosional anak.",
        education: "S1 Pendidikan Anak Dini",
        students: [
          { name: "Bagas Mahendra", nisn: "1003", gender: "L", parentName: "Bapak Hendra", parentPhone: "081211223344", address: "Sadjati, Karawang" },
          { name: "Bilqis Az-Zahra", nisn: "1004", gender: "P", parentName: "Ibu Zahra", parentPhone: "081255667788", address: "Sadjati, Karawang" },
        ],
      },
      {
        teacherName: "Miss Lia",
        role: "Wali Kelas Miss Lia",
        className: "Kelas Miss Lia",
        grade: "S5",
        photo: "/images/teacher3.jpg",
        bio: "Mendampingi kemandirian & kecerdasan si kecil.",
        education: "S1 Psikologi Anak",
        students: [
          { name: "Cinta Kirana", nisn: "1005", gender: "P", parentName: "Bapak Kurnia", parentPhone: "081388990011", address: "Sadjati, Karawang" },
          { name: "Daffa Al-Fatih", nisn: "1006", gender: "L", parentName: "Ibu Fitri", parentPhone: "081322334455", address: "Sadjati, Karawang" },
        ],
      },
    ];

    // BCL WALIKELAS DATA
    const bclWaliKelas = [
      {
        teacherName: "Miss Sintia",
        role: "Wali Kelas Miss Sintia",
        className: "Kelas Miss Sintia",
        grade: "S3",
        photo: "/images/teacher4.jpg",
        bio: "Kreatif, penuh energi, dan berdedikasi tinggi.",
        education: "S1 Pendidikan PAUD",
        students: [
          { name: "Elvano Putra", nisn: "2001", gender: "L", parentName: "Bapak Rudi", parentPhone: "081512345678", address: "BCL, Cikarang" },
          { name: "Farah Nabila", nisn: "2002", gender: "P", parentName: "Ibu Nabila", parentPhone: "081587654321", address: "BCL, Cikarang" },
        ],
      },
      {
        teacherName: "Miss Alif",
        role: "Wali Kelas Miss Alif",
        className: "Kelas Miss Alif",
        grade: "S4",
        photo: "/images/teacher5.jpg",
        bio: "Membimbing kecerdasan berbahasa & sains dasar.",
        education: "S1 Pendidikan Karakter",
        students: [
          { name: "Gabriel Setiawan", nisn: "2003", gender: "L", parentName: "Bapak Setiawan", parentPhone: "081611223344", address: "BCL, Cikarang" },
          { name: "Hania Humaira", nisn: "2004", gender: "P", parentName: "Ibu Humaira", parentPhone: "081655667788", address: "BCL, Cikarang" },
        ],
      },
      {
        teacherName: "Miss Maya",
        role: "Wali Kelas Miss Maya",
        className: "Kelas Miss Maya",
        grade: "S5",
        photo: "/images/teacher6.jpg",
        bio: "Menghidupkan suasana belajar yang menyenangkan.",
        education: "S1 Pendidikan Dasar",
        students: [
          { name: "Ibrahim Pasya", nisn: "2005", gender: "L", parentName: "Bapak Pasya", parentPhone: "081788990011", address: "BCL, Cikarang" },
          { name: "Jasmine Aulia", nisn: "2006", gender: "P", parentName: "Ibu Aulia", parentPhone: "081722334455", address: "BCL, Cikarang" },
        ],
      },
    ];

    const seedBranchData = async (schoolId: string, waliKelasList: typeof sadjatiWaliKelas) => {
      let order = 1;
      for (const item of waliKelasList) {
        // 1. Create ClassRoom
        const resClass: any[] = await prisma.$queryRawUnsafe(
          `INSERT INTO "kelas" ("id", "id_sekolah", "nama_kelas", "tingkat", "tahun_ajaran", "kapasitas", "nama_guru_wali", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, $3, '2026/2027', 20, $4, NOW(), NOW()) RETURNING id`,
          schoolId,
          item.className,
          item.grade,
          item.teacherName
        );
        const classId = resClass[0].id;

        // 2. Create Teacher
        const qrTeacher = `TEACHER:${item.teacherName.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
        const resTeacher: any[] = await prisma.$queryRawUnsafe(
          `INSERT INTO "guru" ("id", "id_sekolah", "id_kelas", "nama", "jabatan", "kelas_ditugaskan", "kode_qr", "url_foto", "bio", "pendidikan", "urutan", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW()) RETURNING id`,
          schoolId,
          classId,
          item.teacherName,
          item.role,
          item.className,
          qrTeacher,
          item.photo,
          item.bio,
          item.education,
          order
        );
        const teacherId = resTeacher[0].id;

        // Update homeroomTeacherId in class
        await prisma.$executeRawUnsafe(`UPDATE "kelas" SET "id_guru_wali" = $1 WHERE "id" = $2`, teacherId, classId);

        // 3. Create Students per Wali Kelas
        for (const st of item.students) {
          const qrStudent = `STUDENT:${st.nisn}`;
          await prisma.$executeRawUnsafe(
            `INSERT INTO "siswa" ("id", "id_sekolah", "id_kelas", "nama", "nisn", "nama_pengguna", "kata_sandi_hash", "nama_kelas", "jenis_kelamin", "kode_qr", "url_avatar", "tempat_tanggal_lahir", "nama_orang_tua", "telepon_orang_tua", "alamat", "persentase_kehadiran", "rata_rata_nilai", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'Karawang, 15 Mei 2021', $11, $12, $13, 96.5, 91.0, NOW(), NOW())`,
            schoolId,
            classId,
            st.name,
            st.nisn,
            `ortu_${st.nisn}`,
            passwordHash,
            item.className,
            st.gender,
            qrStudent,
            st.gender === "L" ? "https://i.pravatar.cc/150?img=12" : "https://i.pravatar.cc/150?img=47",
            st.parentName,
            st.parentPhone,
            st.address
          );
        }

        // 4. Create Schedules with dates for this class
        const sampleSchedules = [
          { date: "2026-07-27", time: "08.00 - 09.30", room: "Ruang Kelas A", subject: "Motorik Halus & Mewarnai", activities: "Menggambar bentuk geometri dan mewarnai hewan" },
          { date: "2026-07-27", time: "09.30 - 10.30", room: "Ruang Bermain", subject: "Senam Ceria & Permainan", activities: "Senam irama anak dan permainan koordinasi tubuh" },
          { date: "2026-07-28", time: "08.00 - 09.30", room: "Ruang Abjad", subject: "Pengenalan Huruf & Bernyanyi", activities: "Mengenal huruf vokal A-I-U-E-O dan bernyanyi bersama" },
          { date: "2026-07-28", time: "09.30 - 10.30", room: "Taman Sekolah", subject: "Sains Alam & Lingkungan", activities: "Observasi taman sekolah dan menyiram tanaman" },
          { date: "2026-07-29", time: "08.00 - 09.30", room: "Ruang Agama", subject: "Hafalan Doa & Surah Pendek", activities: "Hafalan Surah Al-Fatihah dan doa sebelum makan" },
          { date: "2026-07-30", time: "08.00 - 09.30", room: "Ruang Seni", subject: "Kreasi Kerajinan Tangan", activities: "Membuat lipatan kertas origami dan menempel" },
        ];

        for (const sch of sampleSchedules) {
          await prisma.$executeRawUnsafe(
            `INSERT INTO "jadwal_kbm" ("id", "id_sekolah", "id_kelas", "tanggal", "rentang_waktu", "nama_kelas", "ruangan", "mata_pelajaran", "aktivitas", "selesai", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, false, NOW(), NOW())`,
            schoolId,
            classId,
            sch.date,
            sch.time,
            item.className,
            sch.room,
            sch.subject,
            sch.activities
          );
        }

        order++;
      }
    };

    await seedBranchData(schoolSadjatiId, sadjatiWaliKelas);
    await seedBranchData(schoolBclId, bclWaliKelas);

    // 5. Admin Users
    const rawAdmins: any[] = await prisma.$queryRawUnsafe(`SELECT id, nama_pengguna FROM "pengguna_admin"`);
    if (!rawAdmins.some((a) => a.nama_pengguna === "admin")) {
      await prisma.$executeRawUnsafe(
        `INSERT INTO "pengguna_admin" ("id", "id_sekolah", "nama_pengguna", "kata_sandi_hash", "nama", "peran", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, NULL, 'admin', $1, 'Super Admin Yayasan', 'SUPER_ADMIN', NOW(), NOW())`,
        passwordHash
      );
    }
    if (!rawAdmins.some((a) => a.nama_pengguna === "admin_sadjati")) {
      await prisma.$executeRawUnsafe(
        `INSERT INTO "pengguna_admin" ("id", "id_sekolah", "nama_pengguna", "kata_sandi_hash", "nama", "peran", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, 'admin_sadjati', $2, 'Admin Cabang Sadjati', 'ADMIN_CABANG', NOW(), NOW())`,
        schoolSadjatiId,
        passwordHash
      );
    }
    if (!rawAdmins.some((a) => a.nama_pengguna === "admin_bcl")) {
      await prisma.$executeRawUnsafe(
        `INSERT INTO "pengguna_admin" ("id", "id_sekolah", "nama_pengguna", "kata_sandi_hash", "nama", "peran", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, 'admin_bcl', $2, 'Admin Cabang BCL', 'ADMIN_CABANG', NOW(), NOW())`,
        schoolBclId,
        passwordHash
      );
    }

    // Teacher accounts
    const teacherSeedAccounts = [
      { username: "guru_afifah", name: "Miss Afifah", schoolId: schoolSadjatiId },
      { username: "guru_lia", name: "Miss Lia", schoolId: schoolSadjatiId },
      { username: "guru_ulin", name: "Miss Ulin", schoolId: schoolSadjatiId },
      { username: "guru_sinta", name: "Miss Sinta", schoolId: schoolBclId },
      { username: "guru_alif", name: "Miss Alif", schoolId: schoolBclId },
    ];

    for (const tAcc of teacherSeedAccounts) {
      if (!rawAdmins.some((a) => a.nama_pengguna === tAcc.username)) {
        await prisma.$executeRawUnsafe(
          `INSERT INTO "pengguna_admin" ("id", "id_sekolah", "nama_pengguna", "kata_sandi_hash", "nama", "peran", "dibuat_pada", "diperbarui_pada") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, 'GURU', NOW(), NOW())`,
          tAcc.schoolId,
          tAcc.username,
          passwordHash,
          tAcc.name
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully with Homeroom Teachers (Miss Afifah, Miss Ulin, Miss Lia for Sadjati & Miss Sintia, Miss Alif, Miss Maya for BCL) and student class distribution.",
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
