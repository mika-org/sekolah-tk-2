import { prisma } from "../src/lib/prisma";
import { verifyPassword, hashPassword } from "../src/lib/password";

async function main() {
  const users = await prisma.adminUser.findMany();
  console.log("Admin Users count:", users.length);
  for (const u of users) {
    const isPurwakartaMatch = await verifyPassword("purw4k4rt4", u.passwordHash);
    console.log({
      id: u.id,
      username: u.username,
      name: u.name,
      role: u.role,
      schoolId: u.schoolId,
      matchesPurwakarta: isPurwakartaMatch,
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
