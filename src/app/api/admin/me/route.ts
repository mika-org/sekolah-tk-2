import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET() {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json(
      { success: false, error: "Tidak terautentikasi" },
      { status: 401 }
    );
  }
  return NextResponse.json({ success: true, admin });
}
