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

    // Candidate directories to write
    const candidateDirs = [
      process.env.STORAGE_PATH,
      "/var/www/storage-sekolah",
      "/var/www/storage",
      path.join(process.cwd(), "public", "storage"),
    ].filter(Boolean) as string[];

    let writtenPath: string | null = null;
    let usedBaseDir: string | null = null;
    let lastError: any = null;

    for (const baseDir of candidateDirs) {
      try {
        const targetFolder = path.join(baseDir, folder);
        await mkdir(targetFolder, { recursive: true, mode: 0o777 });
        const targetFilePath = path.join(targetFolder, uniqueFileName);
        await writeFile(targetFilePath, buffer, { mode: 0o666 });

        writtenPath = targetFilePath;
        usedBaseDir = baseDir;
        break;
      } catch (err: any) {
        console.warn(`Write attempt failed for ${baseDir}:`, err?.message || err);
        lastError = err;
      }
    }

    if (!writtenPath) {
      const errMsg = lastError?.message || "Tidak ada direktori yang dapat ditulis oleh server (Permission Denied)";
      console.error("All upload storage directories failed:", errMsg);
      return NextResponse.json(
        {
          success: false,
          error: `Gagal menulis berkas ke server: ${errMsg}. Jalankan 'sudo chmod -R 777 /var/www/storage-sekolah' di VPS.`,
        },
        { status: 500 }
      );
    }

    // Storage URL resolution
    const relativePath = `/storage/${folder}/${uniqueFileName}`;
    const storageBaseUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
    const fileUrl = storageBaseUrl
      ? `${storageBaseUrl.replace(/\/$/, "")}/${folder}/${uniqueFileName}`
      : relativePath;

    // Record upload log in PostgreSQL
    await prisma.uploadLog.create({
      data: {
        fileName: uniqueFileName,
        fileFolder: folder,
        fileUrl: fileUrl,
        fileSize: file.size,
        mimeType: file.type || "application/octet-stream",
      },
    });

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

