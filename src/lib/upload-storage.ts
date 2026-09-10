import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";
import {
  isImageUpload,
  isPdfUpload,
  MAX_UPLOAD_SIZE_BYTES,
  MAX_UPLOAD_SIZE_LABEL,
  type UploadCategory,
  validateUploadFile,
} from "@/lib/upload-config";
import { getUploadsRoot } from "@/lib/storage-paths";

export class UploadError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "UploadError";
  }
}

function getJakartaDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value || "00";

  return [part("year"), part("month"), part("day")];
}

function sanitizeBaseName(fileName: string) {
  const rawBaseName = path.parse(fileName || "file").name;
  const sanitized = rawBaseName
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80);

  return sanitized || "file";
}

function resolvePublicUrl(pathSegments: string[]) {
  const relativeUrl = `/uploads/${pathSegments.join("/")}`;
  if (process.env.NODE_ENV !== "production") return relativeUrl;

  const configuredUrl = process.env.NEXT_PUBLIC_STORAGE_URL?.trim();
  if (!configuredUrl) return relativeUrl;

  const normalizedBase = configuredUrl
    .replace(/\/+$/, "")
    .replace(/\/(?:storage|uploads)$/i, "");
  return `${normalizedBase}${relativeUrl}`;
}

async function compressImage(buffer: Buffer) {
  const image = sharp(buffer, {
    failOn: "error",
    limitInputPixels: 40_000_000,
  }).rotate();
  const metadata = await image.metadata();

  if (!metadata.format || !["jpeg", "png", "webp"].includes(metadata.format)) {
    throw new UploadError("Format gambar harus JPG, PNG, atau WEBP.", 415);
  }

  const attempts = [
    { dimension: 1920, quality: 80 },
    { dimension: 1600, quality: 72 },
    { dimension: 1280, quality: 64 },
    { dimension: 1024, quality: 56 },
  ];

  for (const attempt of attempts) {
    const output = await image
      .clone()
      .resize({
        width: attempt.dimension,
        height: attempt.dimension,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: attempt.quality, effort: 4, smartSubsample: true })
      .toBuffer();

    if (output.length <= MAX_UPLOAD_SIZE_BYTES) return output;
  }

  throw new UploadError(`Gambar tidak dapat dikompres hingga batas ${MAX_UPLOAD_SIZE_LABEL}.`, 413);
}

function validatePdf(buffer: Buffer) {
  const header = buffer.subarray(0, Math.min(buffer.length, 1024)).toString("latin1");
  if (!header.includes("%PDF-")) {
    throw new UploadError("Isi file PDF tidak valid.", 415);
  }
}

export async function storeUpload(file: File, category: UploadCategory) {
  const validationError = validateUploadFile(file, category);
  if (validationError) {
    throw new UploadError(validationError, file.size > MAX_UPLOAD_SIZE_BYTES ? 413 : 415);
  }

  const inputBuffer = Buffer.from(await file.arrayBuffer());
  const imageUpload = isImageUpload(file);
  let outputBuffer: Buffer;
  let extension: string;
  let mimeType: string;

  if (imageUpload) {
    try {
      outputBuffer = await compressImage(inputBuffer);
    } catch (error) {
      if (error instanceof UploadError) throw error;
      throw new UploadError("Gambar rusak atau tidak dapat diproses.", 415);
    }
    extension = ".webp";
    mimeType = "image/webp";
  } else if (isPdfUpload(file)) {
    validatePdf(inputBuffer);
    outputBuffer = inputBuffer;
    extension = ".pdf";
    mimeType = "application/pdf";
  } else {
    throw new UploadError("Format file tidak didukung.", 415);
  }

  if (outputBuffer.length > MAX_UPLOAD_SIZE_BYTES) {
    throw new UploadError(`Ukuran file hasil akhir melebihi batas ${MAX_UPLOAD_SIZE_LABEL}.`, 413);
  }

  const dateParts = getJakartaDateParts();
  const fileName = `${Date.now()}_${randomUUID().slice(0, 8)}_${sanitizeBaseName(file.name)}${extension}`;
  const relativeSegments = [category, ...dateParts, fileName];
  const uploadDir = path.resolve(getUploadsRoot(), category, ...dateParts);
  const uploadsRoot = getUploadsRoot();

  if (!uploadDir.startsWith(`${uploadsRoot}${path.sep}`)) {
    throw new UploadError("Lokasi upload tidak valid.", 400);
  }

  await mkdir(uploadDir, { recursive: true, mode: 0o755 });
  const targetFilePath = path.resolve(uploadDir, fileName);
  await writeFile(targetFilePath, outputBuffer, { flag: "wx", mode: 0o644 });

  return {
    fileName,
    fileFolder: path.posix.join("uploads", category, ...dateParts),
    fileUrl: resolvePublicUrl(relativeSegments),
    localUrl: `/uploads/${relativeSegments.join("/")}`,
    mimeType,
    originalSize: file.size,
    storedSize: outputBuffer.length,
    compressed: imageUpload,
  };
}
