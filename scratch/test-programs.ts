import { prisma } from "../src/lib/prisma";

async function main() {
  try {
    const sadjati = await prisma.school.findUnique({ where: { code: "sadjati" } });
    const bcl = await prisma.school.findUnique({ where: { code: "bcl" } });

    console.log("=== SADJATI PROGRAMS ===");
    if (sadjati) {
      const sadjatiProgs = await prisma.program.findMany({ where: { schoolId: sadjati.id } });
      console.log(sadjatiProgs);
    }

    console.log("=== BCL PROGRAMS ===");
    if (bcl) {
      const bclProgs = await prisma.program.findMany({ where: { schoolId: bcl.id } });
      console.log(bclProgs);
    }
  } catch (err) {
    console.error("DB Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
