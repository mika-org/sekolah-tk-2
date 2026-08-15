import { constants } from "fs";
import { access } from "fs/promises";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUploadsRoot } from "@/lib/storage-paths";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  let database = false;
  let storage = false;

  try {
    await Promise.all([
      prisma.$queryRaw`SELECT 1 FROM "program" LIMIT 1`,
      prisma.$queryRaw`SELECT 1 FROM "log_unggahan" LIMIT 1`,
    ]);
    database = true;
  } catch {}

  try {
    await access(getUploadsRoot(), constants.R_OK | constants.W_OK);
    storage = true;
  } catch {}

  const healthy = database && storage;
  return NextResponse.json(
    {
      success: healthy,
      checks: {
        database: database ? "ready" : "unavailable",
        storage: storage ? "ready" : "unavailable",
      },
    },
    {
      status: healthy ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
