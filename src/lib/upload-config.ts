export const MAX_UPLOAD_SIZE_BYTES = 1024 * 1024;
export const MAX_UPLOAD_SIZE_LABEL = "1 MB";

export const IMAGE_UPLOAD_ACCEPT =
  "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp";
export const DOCUMENT_UPLOAD_ACCEPT = `${IMAGE_UPLOAD_ACCEPT},application/pdf,.pdf`;

export const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type UploadCategory =
  | "general"
  | "programs"
  | "gallery"
  | "profiles"
  | "ppdb"
  | "spp"
  | "payments"
  | "qris"
  | "leave";

const categoryAliases: Record<string, UploadCategory> = {
  uploads: "general",
  upload: "general",
  profile: "profiles",
  payment: "payments",
};

const categories = new Set<UploadCategory>([
  "general",
  "programs",
  "gallery",
  "profiles",
  "ppdb",
  "spp",
  "payments",
  "qris",
  "leave",
]);

const imageOnlyCategories = new Set<UploadCategory>([
  "programs",
  "gallery",
  "profiles",
  "qris",
]);

export function normalizeUploadCategory(value: FormDataEntryValue | null): UploadCategory {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "general";
  const aliased = categoryAliases[normalized] || normalized;
  return categories.has(aliased as UploadCategory)
    ? (aliased as UploadCategory)
    : "general";
}

function hasExtension(fileName: string, extensions: string[]) {
  const normalized = fileName.toLowerCase();
  return extensions.some((extension) => normalized.endsWith(extension));
}

export function isImageUpload(file: Pick<File, "name" | "type">) {
  return (
    IMAGE_MIME_TYPES.includes(file.type.toLowerCase() as (typeof IMAGE_MIME_TYPES)[number]) ||
    hasExtension(file.name, [".jpg", ".jpeg", ".png", ".webp"])
  );
}

export function isPdfUpload(file: Pick<File, "name" | "type">) {
  return file.type.toLowerCase() === "application/pdf" || hasExtension(file.name, [".pdf"]);
}

export function validateUploadFile(file: File, category: UploadCategory): string | null {
  if (file.size <= 0) return "File kosong tidak dapat diunggah.";
  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return `Ukuran file maksimal ${MAX_UPLOAD_SIZE_LABEL}.`;
  }

  if (imageOnlyCategories.has(category)) {
    return isImageUpload(file)
      ? null
      : "Format gambar harus JPG, PNG, atau WEBP.";
  }

  return isImageUpload(file) || isPdfUpload(file)
    ? null
    : "Format file harus JPG, PNG, WEBP, atau PDF.";
}
