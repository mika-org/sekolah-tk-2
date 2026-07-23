import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folderInput = (formData.get("folder") as string) || "uploads";

    // Validate folder target: must be uploads, profile, or ppdb
    const allowedFolders = ["uploads", "profile", "ppdb"];
    const folder = allowedFolders.includes(folderInput.toLowerCase())
      ? folderInput.toLowerCase()
      : "uploads";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Tidak ada file yang diunggah" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique timestamp prefix
    const originalName = file.name || "file";
    const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFileName = `${Date.now()}_${sanitizedName}`;

    // Target base storage directory (Static resolution)
    const baseStorageDir = process.env.STORAGE_PATH || "/var/www/storage-sekolah";
    let uploadDir = path.resolve(/*turbopackIgnore: true*/ baseStorageDir, folder);
    let targetFilePath = path.resolve(/*turbopackIgnore: true*/ uploadDir, uniqueFileName);

    try {
      await mkdir(uploadDir, { recursive: true, mode: 0o777 });
      await writeFile(/*turbopackIgnore: true*/ targetFilePath, buffer, { mode: 0o666 });
    } catch {
      // Fallback for local dev environments where /var/www/storage-sekolah is unavailable
      uploadDir = path.resolve(/*turbopackIgnore: true*/ process.cwd(), "public", "storage", folder);
      await mkdir(uploadDir, { recursive: true, mode: 0o777 });
      targetFilePath = path.resolve(/*turbopackIgnore: true*/ uploadDir, uniqueFileName);
      await writeFile(/*turbopackIgnore: true*/ targetFilePath, buffer, { mode: 0o666 });
    }

    // Storage URL resolution
    const relativePath = `/storage/${folder}/${uniqueFileName}`;
    const storageBaseUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
    const fileUrl = storageBaseUrl
      ? `${storageBaseUrl.replace(/\/$/, "")}/${folder}/${uniqueFileName}`
      : relativePath;

    // Record upload log in PostgreSQL (non-blocking log attempt)
    try {
      await prisma.uploadLog.create({
        data: {
          fileName: uniqueFileName,
          fileFolder: folder,
          fileUrl: fileUrl,
          fileSize: file.size,
          mimeType: file.type || "application/octet-stream",
        },
      });
    } catch (logErr: any) {
      console.warn("Upload DB log warning (non-fatal):", logErr?.message || logErr);
    }

    return NextResponse.json({
      success: true,
      fileName: uniqueFileName,
      folder: folder,
      url: fileUrl,
      fileUrl: fileUrl,
      localUrl: relativePath,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal mengunggah file" },
      { status: 500 }
    );
  }
}

