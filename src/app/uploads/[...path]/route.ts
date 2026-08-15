import { serveUpload } from "@/lib/serve-upload";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(request: Request, { params }: RouteContext) {
  const { path } = await params;
  return serveUpload(request, path, "uploads");
}

export async function HEAD(request: Request, { params }: RouteContext) {
  const { path } = await params;
  return serveUpload(request, path, "uploads");
}
