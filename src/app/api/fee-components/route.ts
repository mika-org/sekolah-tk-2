import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

const ALLOWED_CATEGORIES = new Set(["PPDB", "ADDITIONAL"]);

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan pada komponen biaya";
}

function isUniqueConstraintError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === "P2002"
  );
}

function isCentralAdmin(role: string) {
  return role === "SUPER_ADMIN" || role === "ADMIN_PUSAT";
}

function normalizeCategory(value: unknown) {
  return String(value || "").trim().toUpperCase();
}

function normalizeCode(value: unknown) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

async function resolveSchoolId(schoolId?: string | null, schoolCode?: string | null) {
  if (schoolId && schoolId !== "ALL") return schoolId;
  if (schoolCode && schoolCode !== "ALL") {
    const school = await prisma.school.findUnique({ where: { code: schoolCode } });
    return school?.id || null;
  }
  return null;
}

// Public read endpoint used by the PPDB form and authenticated dashboards.
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = normalizeCategory(searchParams.get("category"));
    const includeInactive = searchParams.get("includeInactive") === "true";
    const requestedSchoolId = searchParams.get("schoolId");
    const requestedSchoolCode = searchParams.get("schoolCode");
    const schoolId = await resolveSchoolId(
      requestedSchoolId,
      requestedSchoolCode
    );

    if (
      ((requestedSchoolId && requestedSchoolId !== "ALL") ||
        (requestedSchoolCode && requestedSchoolCode !== "ALL")) &&
      !schoolId
    ) {
      return NextResponse.json(
        { success: false, error: "Sekolah tidak ditemukan" },
        { status: 404 }
      );
    }

    if (category && !ALLOWED_CATEGORIES.has(category)) {
      return NextResponse.json(
        { success: false, error: "Kategori komponen biaya tidak valid" },
        { status: 400 }
      );
    }

    const components = await prisma.feeComponent.findMany({
      where: {
        ...(schoolId ? { schoolId } : {}),
        ...(category ? { category } : {}),
        ...(!includeInactive ? { isActive: true } : {}),
      },
      include: { school: true },
      orderBy: [{ category: "asc" }, { orderIndex: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({ success: true, data: components });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

// Create a reusable fee definition. Existing registrations and bills keep snapshots.
export async function POST(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const schoolId =
      (await resolveSchoolId(body.schoolId, body.schoolCode)) || admin.schoolId;
    const category = normalizeCategory(body.category);
    const code = normalizeCode(body.code || body.name);
    const amount = Number(body.amount);

    if (!schoolId) {
      return NextResponse.json(
        { success: false, error: "Sekolah wajib dipilih" },
        { status: 400 }
      );
    }
    if (!isCentralAdmin(admin.role) && admin.schoolId !== schoolId) {
      return NextResponse.json(
        { success: false, error: "Tidak boleh mengubah komponen sekolah lain" },
        { status: 403 }
      );
    }
    if (!body.name || !code || !ALLOWED_CATEGORIES.has(category)) {
      return NextResponse.json(
        { success: false, error: "Nama, kode, dan kategori biaya wajib valid" },
        { status: 400 }
      );
    }
    if (!Number.isFinite(amount) || amount < 0) {
      return NextResponse.json(
        { success: false, error: "Nominal biaya tidak valid" },
        { status: 400 }
      );
    }

    const component = await prisma.feeComponent.create({
      data: {
        schoolId,
        code,
        name: String(body.name).trim(),
        category,
        description: body.description ? String(body.description).trim() : null,
        amount,
        isRequired: body.isRequired === true,
        isActive: body.isActive !== false,
        orderIndex: Number.isInteger(Number(body.orderIndex))
          ? Number(body.orderIndex)
          : 0,
      },
    });

    return NextResponse.json(
      { success: true, data: component, message: "Komponen biaya berhasil disimpan" },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = isUniqueConstraintError(error)
      ? "Kode komponen biaya sudah digunakan di sekolah ini"
      : getErrorMessage(error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// Update or soft-disable a fee definition without changing historical snapshots.
export async function PATCH(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak" },
        { status: 401 }
      );
    }

    const body = await req.json();
    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "ID komponen biaya wajib diisi" },
        { status: 400 }
      );
    }

    const existing = await prisma.feeComponent.findUnique({
      where: { id: body.id },
      select: { schoolId: true },
    });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Komponen biaya tidak ditemukan" },
        { status: 404 }
      );
    }
    if (!isCentralAdmin(admin.role) && admin.schoolId !== existing.schoolId) {
      return NextResponse.json(
        { success: false, error: "Tidak boleh mengubah komponen sekolah lain" },
        { status: 403 }
      );
    }

    const amount = body.amount === undefined ? undefined : Number(body.amount);
    const category = body.category === undefined
      ? undefined
      : normalizeCategory(body.category);
    if (amount !== undefined && (!Number.isFinite(amount) || amount < 0)) {
      return NextResponse.json(
        { success: false, error: "Nominal biaya tidak valid" },
        { status: 400 }
      );
    }
    if (category !== undefined && !ALLOWED_CATEGORIES.has(category)) {
      return NextResponse.json(
        { success: false, error: "Kategori komponen biaya tidak valid" },
        { status: 400 }
      );
    }

    const component = await prisma.feeComponent.update({
      where: { id: body.id },
      data: {
        ...(body.name !== undefined && { name: String(body.name).trim() }),
        ...(body.code !== undefined && { code: normalizeCode(body.code) }),
        ...(category !== undefined && { category }),
        ...(body.description !== undefined && {
          description: body.description ? String(body.description).trim() : null,
        }),
        ...(amount !== undefined && { amount }),
        ...(body.isRequired !== undefined && { isRequired: body.isRequired === true }),
        ...(body.isActive !== undefined && { isActive: body.isActive === true }),
        ...(body.orderIndex !== undefined && { orderIndex: Number(body.orderIndex) || 0 }),
      },
    });

    return NextResponse.json({
      success: true,
      data: component,
      message: "Komponen biaya berhasil diperbarui",
    });
  } catch (error: unknown) {
    const message = isUniqueConstraintError(error)
      ? "Kode komponen biaya sudah digunakan di sekolah ini"
      : getErrorMessage(error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
