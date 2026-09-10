import { readFile, stat } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getStorageRoot, getUploadsRoot } from "@/lib/storage-paths";

type UploadNamespace = "uploads" | "storage";

const contentTypes: Record<string, string> = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function validatePathSegments(pathSegments: string[]) {
  return (
    pathSegments.length > 0 &&
    pathSegments.every(
      (segment) =>
        segment.length > 0 &&
        segment !== "." &&
        segment !== ".." &&
        !segment.includes("/") &&
        !segment.includes("\\") &&
        !segment.includes("\0"),
    )
  );
}

function resolveWithin(basePath: string, pathSegments: string[]) {
  const resolvedBase = path.resolve(basePath);
  const resolvedFile = path.resolve(resolvedBase, ...pathSegments);
  if (!resolvedFile.startsWith(`${resolvedBase}${path.sep}`)) return null;
  return resolvedFile;
}

async function findFile(pathSegments: string[], namespace: UploadNamespace) {
  if (!validatePathSegments(pathSegments)) return null;

  const storageRoot = getStorageRoot();
  const basePaths =
    namespace === "uploads"
      ? [
          getUploadsRoot(),
          path.resolve(process.cwd(), "public", "uploads"),
          path.resolve(process.cwd(), "public", "storage", "uploads"),
        ]
      : [
          storageRoot,
          getUploadsRoot(),
          path.resolve(process.cwd(), "public", "storage"),
          ...(process.platform === "win32" ? [] : ["/var/www/storage"]),
        ];

  for (const basePath of [...new Set(basePaths)]) {
    const candidate = resolveWithin(basePath, pathSegments);
    if (!candidate) continue;

    try {
      const fileStat = await stat(candidate);
      if (fileStat.isFile()) return { filePath: candidate, fileStat };
    } catch {}
  }

  return null;
}

export async function serveUpload(
  request: Request,
  pathSegments: string[],
  namespace: UploadNamespace,
) {
  const found = await findFile(pathSegments, namespace);
  if (!found) {
    return NextResponse.json(
      { success: false, error: "File tidak ditemukan" },
      { status: 404 },
    );
  }

  const extension = path.extname(found.filePath).toLowerCase();
  const headers = new Headers({
    "Cache-Control": "public, max-age=31536000, immutable",
    "Content-Length": String(found.fileStat.size),
    "Content-Type": contentTypes[extension] || "application/octet-stream",
    "Last-Modified": found.fileStat.mtime.toUTCString(),
    "X-Content-Type-Options": "nosniff",
  });

  if (request.method === "HEAD") {
    return new NextResponse(null, { status: 200, headers });
  }

  const fileBuffer = await readFile(found.filePath);
  return new NextResponse(fileBuffer, { status: 200, headers });
}
