import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Checking existing Les SD registrations...");
  const count = await prisma.lesSdRegistration.count();
  if (count > 0) {
    console.log(`Already has ${count} Les SD registrations.`);
    return;
  }

  const schools = await prisma.school.findMany();
  const teachers = await prisma.teacher.findMany();

  const sadjatiSchool = schools.find((s) => s.code === "sadjati");
  const bclSchool = schools.find((s) => s.code === "bumi-cipta-laras");

  const missAfifah = teachers.find((t) => t.name.includes("Afifah"));
  const missMaya = teachers.find((t) => t.name.includes("Maya"));

  console.log("Seeding Les SD sample registrations...");

  // 1. Sadjati Student 1: Raffasya
  if (sadjatiSchool) {
    const reg1 = await prisma.lesSdRegistration.create({
      data: {
        schoolId: sadjatiSchool.id,
        registrationNo: "LES-2026-1001",
        studentName: "RAFFASYA HAWARRI ANDRIYAN",
        gender: "L",
        sdGrade: "Kelas 2 SD",
        schoolOrigin: "SDN Sadjati 01",
        parentName: "PIRNANTI / ANDRIYANTO",
        parentPhone: "081959606322",
        parentEmail: "pirnanti@gmail.com",
        address: "Perumahan Sadjati Indah Blok A No. 12",
        programPackage: "1 Minggu 3x Pertemuan - Semua Mata Pelajaran",
        scheduleDays: "Senin, Rabu, Jumat",
        scheduleTime: "14:00 - 15:30 WIB",
        sppAmount: 200000,
        teacherPicId: missAfifah?.id || null,
        teacherPicName: missAfifah?.name || "Miss Afifah",
        status: "AKTIF",
        notes: "Siswa pindahan les dari luar, fokus Matematika & IPA.",
        payments: {
          create: [
            {
              studentName: "RAFFASYA HAWARRI ANDRIYAN",
              month: "Agustus 2026",
              amount: 200000,
              status: "lunas",
              paymentDate: "2026-08-05",
              paymentMethod: "TRANSFER_BCA",
              bankName: "BCA",
              notes: "SPP Les SD Bulan Agustus 2026 lunas.",
              verifiedBy: "Miss Afifah",
              verifiedAt: new Date("2026-08-05T10:00:00Z"),
            },
            {
              studentName: "RAFFASYA HAWARRI ANDRIYAN",
              month: "September 2026",
              amount: 200000,
              status: "lunas",
              paymentDate: "2026-09-06",
              paymentMethod: "TRANSFER_BCA",
              bankName: "BCA",
              notes: "SPP Les SD Bulan September 2026 lunas.",
              verifiedBy: "Miss Afifah",
              verifiedAt: new Date("2026-09-06T09:30:00Z"),
            },
          ],
        },
      },
    });
    console.log("Created registration 1:", reg1.registrationNo, reg1.studentName);

    // 2. Sadjati Student 2: Nakusya
    const reg2 = await prisma.lesSdRegistration.create({
      data: {
        schoolId: sadjatiSchool.id,
        registrationNo: "LES-2026-1002",
        studentName: "NAKUSYA EL SYAFA",
        gender: "P",
        sdGrade: "Kelas 1 SD",
        schoolOrigin: "SDIT Al-Fatih",
        parentName: "IKHA / SISWANTO",
        parentPhone: "08561852150",
        parentEmail: "ikha@gmail.com",
        address: "Jl. Sadjati Barat No. 45",
        programPackage: "1 Minggu 3x Pertemuan - Semua Mata Pelajaran",
        scheduleDays: "Senin, Rabu, Jumat",
        scheduleTime: "14:00 - 15:30 WIB",
        sppAmount: 200000,
        teacherPicId: missAfifah?.id || null,
        teacherPicName: missAfifah?.name || "Miss Afifah",
        status: "AKTIF",
        notes: "Materi bimbingan membaca intensif & berhitung.",
        payments: {
          create: [
            {
              studentName: "NAKUSYA EL SYAFA",
              month: "September 2026",
              amount: 200000,
              status: "lunas",
              paymentDate: "2026-09-07",
              paymentMethod: "TRANSFER_MANDIRI",
              bankName: "MANDIRI",
              notes: "SPP Les SD September 2026.",
              verifiedBy: "Miss Afifah",
              verifiedAt: new Date("2026-09-07T11:15:00Z"),
            },
          ],
        },
      },
    });
    console.log("Created registration 2:", reg2.registrationNo, reg2.studentName);
  }

  // 3. BCL Student 1: Rafif
  if (bclSchool) {
    const reg3 = await prisma.lesSdRegistration.create({
      data: {
        schoolId: bclSchool.id,
        registrationNo: "LES-2026-2001",
        studentName: "RAFIF",
        gender: "L",
        sdGrade: "Kelas 3 SD",
        schoolOrigin: "SDN Karawang Kulon",
        parentName: "RAGITA / SUCI",
        parentPhone: "081299185973",
        parentEmail: "ragita@gmail.com",
        address: "Perumahan Bumi Cipta Laras Blok C No. 8",
        programPackage: "1 Minggu 3x Pertemuan - Semua Mata Pelajaran",
        scheduleDays: "Selasa, Kamis, Sabtu",
        scheduleTime: "14:00 - 15:30 WIB",
        sppAmount: 200000,
        teacherPicId: missMaya?.id || null,
        teacherPicName: missMaya?.name || "Miss Maya",
        status: "AKTIF",
        notes: "Pendalaman Bahasa Inggris & Matematika.",
        payments: {
          create: [
            {
              studentName: "RAFIF",
              month: "Agustus 2026",
              amount: 200000,
              status: "lunas",
              paymentDate: "2026-08-10",
              paymentMethod: "TRANSFER_BCA",
              bankName: "BCA",
              notes: "SPP Les SD Agustus 2026.",
              verifiedBy: "Miss Maya",
              verifiedAt: new Date("2026-08-10T14:00:00Z"),
            },
            {
              studentName: "RAFIF",
              month: "September 2026",
              amount: 200000,
              status: "menunggu_konfirmasi",
              paymentDate: "2026-09-10",
              paymentMethod: "TRANSFER_BCA",
              bankName: "BCA",
              notes: "Menunggu konfirmasi admin/guru PIC.",
            },
          ],
        },
      },
    });
    console.log("Created registration 3:", reg3.registrationNo, reg3.studentName);

    // 4. BCL Student 2: Arsy Alvaro
    const reg4 = await prisma.lesSdRegistration.create({
      data: {
        schoolId: bclSchool.id,
        registrationNo: "LES-2026-2002",
        studentName: "ARSY ALVARO NANDANA",
        gender: "L",
        sdGrade: "Kelas 1 SD",
        schoolOrigin: "SDIT Harapan Bunda",
        parentName: "IKA NOVIYANTI / NOPI ALFIAN",
        parentPhone: "085718624144",
        parentEmail: "ikanoviyanti@gmail.com",
        address: "Perumahan BCL Cluster Melati No. 22",
        programPackage: "1 Minggu 3x Pertemuan - Semua Mata Pelajaran",
        scheduleDays: "Selasa, Kamis, Sabtu",
        scheduleTime: "14:00 - 15:30 WIB",
        sppAmount: 200000,
        teacherPicId: missMaya?.id || null,
        teacherPicName: missMaya?.name || "Miss Maya",
        status: "PENDING",
        notes: "Pendaftaran baru lewat akun orang tua.",
      },
    });
    console.log("Created registration 4:", reg4.registrationNo, reg4.studentName);
  }

  console.log("Les SD data seeding completed successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
