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

    // Candidate locations
    const candidatePaths = [
      path.join(process.env.STORAGE_PATH || "/var/www/storage-sekolah", relativeFilePath),
      path.join("/var/www/storage", relativeFilePath),
      path.join(process.cwd(), "public", "storage", relativeFilePath),
    ];

    let foundPath: string | null = null;
    for (const cand of candidatePaths) {
      try {
        const fileStat = await stat(cand);
        if (fileStat.isFile()) {
          foundPath = cand;
          break;
        }
      } catch {
        // file not found in this candidate path
      }
    }

    if (!foundPath) {
      return NextResponse.json(
        { success: false, error: "File tidak ditemukan" },
        { status: 404 }
      );
    }

    const fileBuffer = await readFile(foundPath);
    const ext = path.extname(foundPath).toLowerCase();

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
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
