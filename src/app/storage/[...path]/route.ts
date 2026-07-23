import { NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params;
    const relativeFilePath = pathSegments.join("/");

    // Static target paths
    const storagePath = process.env.STORAGE_PATH || "/var/www/storage-sekolah";
    const primaryFile = path.resolve(storagePath, relativeFilePath);
    const fallbackFile = path.resolve("/var/www/storage", relativeFilePath);

    let targetFile = primaryFile;
    try {
      const fileStat = await stat(primaryFile);
      if (!fileStat.isFile()) targetFile = fallbackFile;
    } catch {
      targetFile = fallbackFile;
    }

    const fileBuffer = await readFile(targetFile);
    const ext = path.extname(targetFile).toLowerCase();

    let contentType = "application/octet-stream";
    if (ext === ".pdf") contentType = "application/pdf";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".svg") contentType = "image/svg+xml";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "File tidak ditemukan" },
      { status: 404 }
    );
  }
}
