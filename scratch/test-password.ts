import { PrismaClient } from "@prisma/client";
import { isBcryptHash, verifyPassword } from "../src/lib/password";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.adminUser.findUnique({
    where: { username: "admin" },
  });

  if (!admin) {
    console.log("Admin user not found");
    return;
  }

  console.log("Found admin:", admin.username);
  console.log("Stored as bcrypt:", isBcryptHash(admin.passwordHash));

  const match = await verifyPassword("admin123", admin.passwordHash);
  console.log("Does 'admin123' match?", match);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
