import { prisma } from "../src/lib/prisma";

async function main() {
  const comps = await prisma.feeComponent.findMany({
    include: { school: true },
    orderBy: { orderIndex: "asc" }
  });
  console.log("Current Fee Components (total: " + comps.length + "):");
  for (const c of comps) {
    console.log({
      id: c.id,
      schoolCode: c.school?.code,
      code: c.code,
      name: c.name,
      category: c.category,
      amount: c.amount,
      isRequired: c.isRequired,
      orderIndex: c.orderIndex
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
