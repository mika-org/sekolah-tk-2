import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Cleaning up old school codes if duplicate...");
  await prisma.$executeRawUnsafe(
    `DELETE FROM "sekolah" WHERE "kode" IN ('dekeraton', 'cikarang')`
  );
  const schools = await prisma.school.findMany();
  console.log("Current Schools in Database:", schools);
}

main().catch(console.error).finally(() => prisma.$disconnect());
