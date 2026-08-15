import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  MAX_UPLOAD_SIZE_BYTES,
  normalizeUploadCategory,
} from "@/lib/upload-config";
import { storeUpload, UploadError } from "@/lib/upload-storage";

export const runtime = "nodejs";

const MAX_MULTIPART_OVERHEAD_BYTES = 128 * 1024;

export async function POST(req: Request) {
  try {
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (contentLength > MAX_UPLOAD_SIZE_BYTES + MAX_MULTIPART_OVERHEAD_BYTES) {
      throw new UploadError("Ukuran file maksimal 1 MB.", 413);
    }

    const formData = await req.formData();
    const fileEntry = formData.get("file");
    if (!(fileEntry instanceof File)) {
      throw new UploadError("Tidak ada file yang diunggah.", 400);
    }

    const category = normalizeUploadCategory(
      formData.get("category") || formData.get("folder"),
    );
    const storedFile = await storeUpload(fileEntry, category);

    try {
      await prisma.uploadLog.create({
        data: {
          fileName: storedFile.fileName,
          fileFolder: storedFile.fileFolder,
          fileUrl: storedFile.fileUrl,
          fileSize: storedFile.storedSize,
          mimeType: storedFile.mimeType,
        },
      });
    } catch (error) {
      console.warn("Upload DB log warning (non-fatal):", error);
    }

    return NextResponse.json(
      {
        success: true,
        fileName: storedFile.fileName,
        folder: storedFile.fileFolder,
        url: storedFile.fileUrl,
        fileUrl: storedFile.fileUrl,
        localUrl: storedFile.localUrl,
        mimeType: storedFile.mimeType,
        originalSize: storedFile.originalSize,
        storedSize: storedFile.storedSize,
        compressed: storedFile.compressed,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof UploadError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.status },
      );
    }

    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengunggah file." },
      { status: 500 },
    );
  }
}
