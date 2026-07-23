import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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
  console.log("Hash in DB:", admin.passwordHash);

  const match = await bcrypt.compare("admin123", admin.passwordHash);
  console.log("Does 'admin123' match?", match);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
