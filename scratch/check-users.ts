import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.adminUser.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      role: true,
      schoolId: true,
    },
  });
  console.log("Admin Users in DB:", JSON.stringify(users, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
