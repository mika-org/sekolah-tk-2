import { prisma } from "../src/lib/prisma";

const PPDB_ITEMS = [
  {
    code: "pendaftaran",
    name: "Biaya Pendaftaran",
    category: "PPDB",
    description: "Biaya pendaftaran dan administrasi utama",
    amount: 200000,
    isRequired: true,
    orderIndex: 10,
  },
  {
    code: "seragam_kuning",
    name: "Seragam Kuning",
    category: "PPDB",
    description: "Stelan seragam khas kuning Smart Kids",
    amount: 150000,
    isRequired: false,
    orderIndex: 20,
  },
  {
    code: "seragam_abu_abu",
    name: "Seragam Abu-abu",
    category: "PPDB",
    description: "Stelan seragam formal abu-abu",
    amount: 170000,
    isRequired: false,
    orderIndex: 30,
  },
  {
    code: "seragam_olahraga",
    name: "Seragam Olahraga",
    category: "PPDB",
    description: "Stelan kaos dan celana olahraga",
    amount: 130000,
    isRequired: false,
    orderIndex: 40,
  },
  {
    code: "raport",
    name: "Raport",
    category: "PPDB",
    description: "Buku laporan hasil capaian belajar anak",
    amount: 50000,
    isRequired: false,
    orderIndex: 50,
  },
  {
    code: "buku_penghubung",
    name: "Buku Penghubung",
    category: "PPDB",
    description: "Buku komunikasi harian orang tua dan guru",
    amount: 15000,
    isRequired: true,
    orderIndex: 60,
  },
  {
    code: "spp_bulan_pertama",
    name: "SPP S-3",
    category: "PPDB",
    description: "spp bulan pertama",
    amount: 200000,
    isRequired: true,
    orderIndex: 70,
  },
];

async function main() {
  const schools = await prisma.school.findMany();
  console.log(`Syncing PPDB fee components for ${schools.length} schools...`);

  for (const school of schools) {
    console.log(`Processing school: ${school.name} (${school.code})`);
    for (const item of PPDB_ITEMS) {
      await prisma.feeComponent.upsert({
        where: {
          schoolId_code: {
            schoolId: school.id,
            code: item.code,
          },
        },
        update: {
          name: item.name,
          description: item.description,
          amount: item.amount,
          isRequired: item.isRequired,
          isActive: true,
          orderIndex: item.orderIndex,
        },
        create: {
          schoolId: school.id,
          code: item.code,
          name: item.name,
          category: "PPDB",
          description: item.description,
          amount: item.amount,
          isRequired: item.isRequired,
          isActive: true,
          orderIndex: item.orderIndex,
        },
      });
    }
  }

  console.log("Sync complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
