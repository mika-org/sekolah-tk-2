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

    // Target storage path in public/storage/{folder}/
    const uploadDir = path.join(process.cwd(), "public", "storage", folder);
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, uniqueFileName);
    await writeFile(filePath, buffer);

    // Storage base URL
    const storageBaseUrl =
      process.env.NEXT_PUBLIC_STORAGE_URL || "https://elevore.web.id/storage";
    const fileUrl = `${storageBaseUrl}/${folder}/${uniqueFileName}`;

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
      localUrl: `/storage/${folder}/${uniqueFileName}`,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal mengunggah file" },
      { status: 500 }
    );
  }
}
