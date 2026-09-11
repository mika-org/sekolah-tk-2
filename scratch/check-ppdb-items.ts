import { prisma } from "../src/lib/prisma";

async function main() {
  const c = await prisma.feeComponent.findMany({ where: { code: { contains: "ppdb_" } } });
  console.log("ppdb_ items count:", c.length);
  for (const item of c) {
    console.log(item.id, item.schoolId, item.code, item.name);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
