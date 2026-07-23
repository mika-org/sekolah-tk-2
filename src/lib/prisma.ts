import { PrismaClient } from "@/generated/client";

// Force reset globalThis cache to purge pre-migration Prisma instances
if ((globalThis as any).prisma && !(globalThis as any).prisma.school) {
  delete (globalThis as any).prisma;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
