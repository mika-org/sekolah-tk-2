import bcrypt from "bcrypt";
import { randomBytes } from "node:crypto";

export const BCRYPT_SALT_ROUNDS = 10;

const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;
const PASSWORD_MANAGER_ROLES = new Set([
  "SUPER_ADMIN",
  "ADMIN_PUSAT",
  "ADMIN_CABANG",
  "ADMIN_SEKOLAH",
  "SCHOOL_ADMIN",
]);

export function canManagePasswords(role: unknown): boolean {
  return (
    typeof role === "string" && PASSWORD_MANAGER_ROLES.has(role.toUpperCase())
  );
}

export function isBcryptHash(value: unknown): value is string {
  return typeof value === "string" && BCRYPT_HASH_PATTERN.test(value);
}

export async function hashPassword(password: string): Promise<string> {
  if (typeof password !== "string" || password.length === 0) {
    throw new Error("Password wajib diisi");
  }
  if (password.length < 8) {
    throw new Error("Password minimal 8 karakter");
  }

  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  passwordHash: unknown
): Promise<boolean> {
  if (typeof password !== "string" || !isBcryptHash(passwordHash)) {
    return false;
  }

  try {
    return await bcrypt.compare(password, passwordHash);
  } catch {
    return false;
  }
}

export function generateTemporaryPassword(prefix = "Sk"): string {
  return `${prefix}-${randomBytes(9).toString("base64url")}`;
}
