import { prisma } from "../src/lib/prisma";

async function main() {
  try {
    const schools = await prisma.school.findMany();
    console.log("Schools count:", schools.length);
    console.log("Schools:", schools);
  } catch (err) {
    console.error("DB Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
