import { prisma } from "../src/lib/prisma";

async function main() {
  const ppdbComps = await prisma.feeComponent.findMany({
    where: { category: "PPDB" },
    include: { school: true },
    orderBy: { orderIndex: "asc" }
  });
  console.log("PPDB Components count:", ppdbComps.length);
  for (const c of ppdbComps) {
    console.log({
      school: c.school?.code,
      code: c.code,
      name: c.name,
      description: c.description,
      amount: c.amount,
      isRequired: c.isRequired,
      orderIndex: c.orderIndex,
      isActive: c.isActive
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
