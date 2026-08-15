import path from "path";

export function getStorageRoot() {
  const configuredPath = process.env.STORAGE_PATH?.trim();
  if (configuredPath) return path.resolve(configuredPath);

  return process.env.NODE_ENV === "production"
    ? path.resolve("/var/www/storage-sekolah")
    : path.resolve(process.cwd(), "storage");
}

export function getUploadsRoot() {
  return path.resolve(getStorageRoot(), "uploads");
}
