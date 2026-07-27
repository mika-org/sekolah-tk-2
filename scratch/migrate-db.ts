import { prisma } from "../src/lib/prisma";

async function main() {
  try {
    console.log("Adding jumlah_spp column to program and pendaftaran_ppdb tables if not existing...");
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "program" ADD COLUMN IF NOT EXISTS "jumlah_spp" DOUBLE PRECISION NOT NULL DEFAULT 200000`
    );
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "pendaftaran_ppdb" ADD COLUMN IF NOT EXISTS "jumlah_spp" DOUBLE PRECISION DEFAULT 200000`
    );
    console.log("Columns added successfully!");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
