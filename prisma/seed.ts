import { PrismaClient } from "../src/generated/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Multi-School Yayasan database...");

  // 1. Create Foundation
  const foundation = await prisma.foundation.upsert({
    where: { id: "default" },
    update: {
      name: "YAPCHI Foundation",
      tagline: "Yayasan Pendidikan Anak Indonesia",
    },
    create: {
      id: "default",
      name: "YAPCHI Foundation",
      tagline: "Yayasan Pendidikan Anak Indonesia",
      logoUrl: "/images/yapchi_logo.png",
      phone: "0812 3456 7890",
      email: "info@yapchi.or.id",
      address: "Jl. Raya DeKeraton No. 1, Karawang",
    },
  });
  console.log("Foundation created:", foundation.name);

  // 2. Create School Branches
  const schoolDeKeraton = await prisma.school.upsert({
    where: { code: "dekeraton" },
    update: {
      name: "TK Smart Kids DeKeraton",
    },
    create: {
      foundationId: foundation.id,
      code: "dekeraton",
      name: "TK Smart Kids DeKeraton",
      level: "TK",
      address: "DeKeraton, Karawang, Jawa Barat",
      phone: "0812 3456 7890",
      logoUrl: "/images/smart_kids_logo.png",
      orderIndex: 1,
    },
  });

  const schoolCikarang = await prisma.school.upsert({
    where: { code: "cikarang" },
    update: {
      name: "TK Smart Kids Cikarang",
    },
    create: {
      foundationId: foundation.id,
      code: "cikarang",
      name: "TK Smart Kids Cikarang",
      level: "TK",
      address: "Kawasan Jababeka Cikarang, Bekasi, Jawa Barat",
      phone: "0813 9876 5432",
      logoUrl: "/images/smart_kids_logo.png",
      orderIndex: 2,
    },
  });

  console.log("School branches created:", schoolDeKeraton.name, "and", schoolCikarang.name);

  // 3. Create Super Admin User
  const passwordHash = await bcrypt.hash("admin", 10);
  const admin = await prisma.adminUser.upsert({
    where: { username: "admin" },
    update: {
      passwordHash,
      name: "Super Admin Yayasan YAPCHI",
      role: "SUPER_ADMIN",
    },
    create: {
      username: "admin",
      passwordHash,
      name: "Super Admin Yayasan YAPCHI",
      role: "SUPER_ADMIN",
    },
  });
  console.log("Super Admin seeded:", admin.username);

  // 4. Create Site Profiles
  await prisma.siteProfile.upsert({
    where: { schoolId: schoolDeKeraton.id },
    update: {},
    create: {
      schoolId: schoolDeKeraton.id,
      heroBadge: "Pendaftaran PPDB 2026/2027 Telah Dibuka!",
      heroTitle: "Belajar Seru, Tumbuh Bahagia",
      heroSubtitle:
        "Bimbingan belajar untuk anak usia 3-8 tahun di Cabang DeKeraton dengan metode bermain sambil belajar yang menyenangkan",
      heroMascotUrl: "/images/owl_mascot.png",
      ctaTitle: "Yuk, Daftarkan Si Kecil di Smart Kids DeKeraton!",
      ctaSubtitle:
        "Bergabunglah bersama TK Smart Kids DeKeraton dan berikan pengalaman belajar terbaik untuk masa depan cerah mereka",
      phone: "0812 3456 7890",
      instagram: "smartkids.dekeraton",
      facebook: "Smart Kids DeKeraton",
      address: "DeKeraton, Karawang, Jawa Barat",
    },
  });

  await prisma.siteProfile.upsert({
    where: { schoolId: schoolCikarang.id },
    update: {},
    create: {
      schoolId: schoolCikarang.id,
      heroBadge: "Pendaftaran Cabang Cikarang 2026/2027 Dibuka!",
      heroTitle: "Tumbuh Cerdas, Mandiri & Berkarakter",
      heroSubtitle:
        "Pendidikan anak usia dini berbasis kurikulum interaktif modern di lokasi strategis Jababeka Cikarang",
      heroMascotUrl: "/images/owl_mascot.png",
      ctaTitle: "Daftarkan Si Kecil di Smart Kids Cikarang!",
      ctaSubtitle:
        "Nikmati fasilitas belajar modern dan lingkungan yang aman & menyenangkan di Cikarang",
      phone: "0813 9876 5432",
      instagram: "smartkids.cikarang",
      facebook: "Smart Kids Cikarang",
      address: "Kawasan Jababeka Cikarang, Bekasi, Jawa Barat",
    },
  });

  console.log("Site Profiles seeded for both school branches.");

  // 5. Seed Programs for DeKeraton & Cikarang
  await prisma.program.deleteMany({});
  await prisma.program.createMany({
    data: [
      {
        schoolId: schoolDeKeraton.id,
        title: "Playground",
        ageRange: "Usia 3-4 Tahun",
        iconUrl: "/images/program_playground.png",
        features: JSON.stringify([
          "Pengenalan Diri",
          "Motorik Dasar",
          "Olah Energi",
          "Pembiasaan",
        ]),
        orderIndex: 1,
      },
      {
        schoolId: schoolDeKeraton.id,
        title: "Kindergarten",
        ageRange: "Usia 4-5 Tahun",
        iconUrl: "/images/program_kindergarten.png",
        features: JSON.stringify([
          "Persiapan Membaca",
          "Berhitung Dasar",
          "Gelora Minat Baca",
          "Kemandirian",
        ]),
        orderIndex: 2,
      },
      {
        schoolId: schoolDeKeraton.id,
        title: "Pre Kindergarten",
        ageRange: "Usia 5-6 Tahun",
        iconUrl: "/images/program_pre_kindergarten.png",
        features: JSON.stringify([
          "Persiapan Sekolah",
          "Smart Kuis",
          "Penalaran Umum",
          "Pengembangan Karakter",
        ]),
        orderIndex: 3,
      },
    ],
  });

  // Seed Programs for Cikarang
  await prisma.program.createMany({
    data: [
      {
        schoolId: schoolCikarang.id,
        title: "Toddler & Playgroup",
        ageRange: "Usia 2-4 Tahun",
        iconUrl: "/images/program_playground.png",
        features: JSON.stringify([
          "Sensorik & Motorik",
          "Sosialisasi Awal",
          "Seni & Lagu",
        ]),
        orderIndex: 1,
      },
      {
        schoolId: schoolCikarang.id,
        title: "TK A & B (Reguler)",
        ageRange: "Usia 4-6 Tahun",
        iconUrl: "/images/program_kindergarten.png",
        features: JSON.stringify([
          "Calistung Interaktif",
          "Bahasa Inggris Dasar",
          "Kreativitas",
        ]),
        orderIndex: 2,
      },
    ],
  });

  console.log("Programs seeded for both schools.");

  // 6. Seed Gallery
  await prisma.galleryItem.deleteMany({});
  await prisma.galleryItem.createMany({
    data: [
      {
        schoolId: schoolDeKeraton.id,
        title: "Kegiatan Belajar DeKeraton 1",
        imageUrl: "/images/gallery1.png",
        folder: "uploads",
        orderIndex: 1,
      },
      {
        schoolId: schoolDeKeraton.id,
        title: "Kegiatan Belajar DeKeraton 2",
        imageUrl: "/images/gallery2.png",
        folder: "uploads",
        orderIndex: 2,
      },
      {
        schoolId: schoolDeKeraton.id,
        title: "Kegiatan Belajar DeKeraton 3",
        imageUrl: "/images/gallery3.png",
        folder: "uploads",
        orderIndex: 3,
      },
      {
        schoolId: schoolCikarang.id,
        title: "Gedung Cabang Cikarang",
        imageUrl: "/images/gallery1.png",
        folder: "uploads",
        orderIndex: 1,
      },
    ],
  });

  // 7. Seed Testimonials
  await prisma.testimonial.deleteMany({});
  await prisma.testimonial.createMany({
    data: [
      {
        schoolId: schoolDeKeraton.id,
        parentName: "Bunda Eti",
        role: "Orang Tua Siswa DeKeraton",
        initials: "BE",
        content:
          "Saya sangat puas dengan pengajaran yang diberikan oleh Smart Kids DeKeraton, perkembangan anak sangat cepat.",
        rating: 5,
        bgColor: "emerald",
        orderIndex: 1,
      },
      {
        schoolId: schoolDeKeraton.id,
        parentName: "Bunda Lea",
        role: "Orang Tua Siswa DeKeraton",
        initials: "BL",
        content:
          "Metode pengajaran yang diberikan cukup unik dan efektif untuk anak, anak sudah dapat sosialisasi dengan baik dan mandiri.",
        rating: 5,
        bgColor: "blue",
        orderIndex: 2,
      },
      {
        schoolId: schoolCikarang.id,
        parentName: "Ayah Rian",
        role: "Orang Tua Siswa Cikarang",
        initials: "AR",
        content: "Fasilitas lengkap dan guru-guru di cabang Cikarang sangat ramah dan perhatian.",
        rating: 5,
        bgColor: "amber",
        orderIndex: 1,
      },
    ],
  });

  // 8. Seed Teachers
  await prisma.teacher.deleteMany({});
  await prisma.teacher.createMany({
    data: [
      {
        schoolId: schoolDeKeraton.id,
        name: "Bunda Siti Rahma, S.Pd.",
        role: "Kepala Sekolah & Guru Utama",
        photoUrl: "/images/teacher1.png",
        bio: "Berpengalaman lebih dari 8 tahun mendidik anak usia dini dengan kasih sayang.",
        education: "S1 Pendidikan Anak Usia Dini (PAUD)",
        orderIndex: 1,
      },
      {
        schoolId: schoolDeKeraton.id,
        name: "Bunda Anisa Fitri, S.Psi.",
        role: "Wali Kelas Kindergarten",
        photoUrl: "/images/teacher2.png",
        bio: "Fokus pada pengembangan kognitif dan pembentukan karakter anak.",
        education: "S1 Psikologi Pendidikan",
        orderIndex: 2,
      },
      {
        schoolId: schoolDeKeraton.id,
        name: "Bunda Dewi Lestari, A.Md.",
        role: "Guru Pendamping Playground",
        photoUrl: "/images/teacher3.png",
        bio: "Penyabar dan terampil merancang aktivitas motorik serta seni yang seru.",
        education: "D3 Pendidikan Seni & Kreativitas",
        orderIndex: 3,
      },
      {
        schoolId: schoolCikarang.id,
        name: "Bunda Ratna Sari, S.Pd.",
        role: "Kepala Sekolah Cabang Cikarang",
        photoUrl: "/images/teacher1.png",
        bio: "Berkomitmen mencetak generasi cilik yang cerdas dan mandiri.",
        education: "S1 Pendidikan Dasar",
        orderIndex: 1,
      },
      {
        schoolId: schoolCikarang.id,
        name: "Bunda Maya Indah, S.Pd.",
        role: "Guru TK A & B",
        photoUrl: "/images/teacher2.png",
        bio: "Spesialis metode belajar interaktif dan pengenalan calistung yang menyenangkan.",
        education: "S1 Pendidikan PAUD",
        orderIndex: 2,
      },
    ],
  });

  // 9. Seed Initial PPDB Registration
  await prisma.ppdbRegistration.upsert({
    where: { registrationNo: "PPDB-2026-8821" },
    update: {},
    create: {
      schoolId: schoolDeKeraton.id,
      registrationNo: "PPDB-2026-8821",
      namaAnak: "Eti Sulastri",
      jenisKelamin: "Perempuan",
      agama: "Islam",
      tempatLahir: "Jombang",
      tanggalLahir: "17 Agustus 2021",
      usiaAnak: "5 Tahun",
      program: "Kindergarten",
      namaOrtu: "Agus Mulyana",
      noWhatsapp: "0812 3456 7890",
      email: "agusmulyana1945@gmail.com",
      alamatRumah:
        "Jl. Turangga No. 25E RT 03 RW 09, Kelurahan Lingkar Selatan, Kecamatan Lengkong, Kota Bandung, Jawa Barat 40263",
      docKkUrl: "kk_eti_sulastri.pdf",
      docAktaUrl: "akta_kelahiran.pdf",
      docFotoUrl: "foto_anak_eti.jpg",
      docKtpUrl: "ktp_agus_mulyana.jpg",
      paymentMethod: "bank",
      status: "APPROVED",
    },
  });

  // 10. Seed Students
  await prisma.student.deleteMany({});
  const student1 = await prisma.student.create({
    data: {
      schoolId: schoolDeKeraton.id,
      name: "Muhammad Rizky Al-Fayyid",
      nisn: "212201001",
      className: "Kelas TK A",
      gender: "L",
      avatarUrl: "https://i.pravatar.cc/150?img=60",
      birthPlaceDate: "Karawang, 12 Mei 2021",
      parentName: "Ahmad Rizky",
      parentPhone: "0812-3344-5566",
      address: "Perum DeKeraton Blok B5 No. 12",
      attendanceRate: 96.5,
      averageGrade: 92.0,
    },
  });

  const student2 = await prisma.student.create({
    data: {
      schoolId: schoolDeKeraton.id,
      name: "Aisha Nabila Putri",
      nisn: "212201002",
      className: "Kelas TK A",
      gender: "P",
      avatarUrl: "https://i.pravatar.cc/150?img=61",
      birthPlaceDate: "Karawang, 24 Agustus 2021",
      parentName: "Bunda Ratna",
      parentPhone: "0812-9988-7766",
      address: "Perum DeKeraton Blok C2 No. 8",
      attendanceRate: 98.0,
      averageGrade: 95.0,
    },
  });

  // 11. Seed Schedules
  await prisma.schedule.deleteMany({});
  await prisma.schedule.createMany({
    data: [
      {
        schoolId: schoolDeKeraton.id,
        timeRange: "08.00 - 09.30",
        className: "Kelas TK A",
        room: "Ruang Melati",
        subject: "Mengenal huruf vokal",
        activities: "Bernyanyi, menebalkan huruf, bermain permainan edukatif",
        isCompleted: true,
      },
      {
        schoolId: schoolDeKeraton.id,
        timeRange: "09.30 - 10.30",
        className: "Kelas TK B",
        room: "Ruang Mawar",
        subject: "Mengenal angka 1-10",
        activities: "Menghitung benda, menyusun angka, permainan edukatif",
        isCompleted: false,
      },
    ],
  });

  // 12. Seed Announcements
  await prisma.announcement.deleteMany({});
  await prisma.announcement.createMany({
    data: [
      {
        schoolId: schoolDeKeraton.id,
        title: "Kegiatan Outbound & Field Trip Ke Taman Mini",
        content: "Diberitahukan kepada seluruh orang tua siswa TK A & TK B bahwa kegiatan Outbound akan dilaksanakan bulan depan.",
        date: "24 Juli 2026",
        targetRole: "Semua",
        sender: "Panitia Sekolah",
      },
      {
        schoolId: schoolDeKeraton.id,
        title: "Rapat Koordinasi Pengajar Awal Semester",
        content: "Rapat persiapan kurikulum dan pembelajaran semester ganjil bagi seluruh bapak/ibu guru.",
        date: "22 Juli 2026",
        targetRole: "Guru",
        sender: "Kepala Sekolah",
      },
    ],
  });

  // 13. Seed Attendance
  await prisma.attendance.deleteMany({});
  await prisma.attendance.createMany({
    data: [
      {
        studentId: student1.id,
        studentName: student1.name,
        className: student1.className,
        status: "sakit",
        time: "06.30",
        reason: "Demam dan flu",
        date: "2026-07-23",
      },
      {
        studentId: student2.id,
        studentName: student2.name,
        className: student2.className,
        status: "hadir",
        time: "07.15",
        date: "2026-07-23",
      },
    ],
  });

  // 14. Seed SPP Records
  await prisma.sppRecord.deleteMany({});
  await prisma.sppRecord.createMany({
    data: [
      {
        studentId: student1.id,
        studentName: student1.name,
        nisn: student1.nisn,
        className: student1.className,
        month: "Juli 2026",
        amount: 350000,
        status: "lunas",
        paymentDate: "05 Juli 2026",
      },
      {
        studentId: student2.id,
        studentName: student2.name,
        nisn: student2.nisn,
        className: student2.className,
        month: "Juli 2026",
        amount: 350000,
        status: "lunas",
        paymentDate: "10 Juli 2026",
      },
    ],
  });

  console.log("Database Multi-School Yayasan seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding DB:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
