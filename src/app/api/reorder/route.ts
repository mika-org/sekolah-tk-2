import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/auth";
import { swapItemOrder, normalizeOrders, OrderableEntityType } from "@/lib/order-helper";

export async function POST(req: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Akses ditolak" }, { status: 401 });
    }

    const { type, schoolId, id, direction } = await req.json();

    if (!type || !id || !direction) {
      return NextResponse.json(
        { success: false, error: "Parameter type, id, dan direction wajib diisi" },
        { status: 400 }
      );
    }

    const validTypes: OrderableEntityType[] = ["testimonials", "teachers", "programs", "gallery"];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { success: false, error: `Tipe entitas tidak didukung: ${type}` },
        { status: 400 }
      );
    }

    const targetSchoolId = schoolId || admin.schoolId;
    if (!targetSchoolId) {
      return NextResponse.json(
        { success: false, error: "ID Sekolah tidak ditemukan" },
        { status: 400 }
      );
    }

    const items = await swapItemOrder(type, targetSchoolId, id, direction);

    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal mengubah urutan" },
      { status: 500 }
    );
  }
}
