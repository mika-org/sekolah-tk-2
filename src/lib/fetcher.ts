/**
 * Helper to safely fetch JSON from an API endpoint.
 * Prevents "Unexpected token '<', <!DOCTYPE... is not valid JSON" errors
 * when an endpoint returns HTML (e.g., 404, 500 error page, or redirect).
 */
export async function safeFetchJson<T = any>(
  url: string,
  options?: RequestInit
): Promise<{ ok: boolean; status: number; data: T | null; error?: string }> {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      const text = await res.text();
      console.error(
        `[safeFetchJson] Expected JSON from ${url}, but received ${contentType || "unknown content-type"} (status ${res.status}). Preview:`,
        text.substring(0, 150)
      );
      return {
        ok: false,
        status: res.status,
        data: null,
        error: `Server returned non-JSON response (status ${res.status})`,
      };
    }

    const data = await res.json();
    return {
      ok: res.ok,
      status: res.status,
      data,
      error: !res.ok ? data?.error || `Request failed with status ${res.status}` : undefined,
    };
  } catch (err: any) {
    console.error(`[safeFetchJson] Network/Fetch error for ${url}:`, err);
    return {
      ok: false,
      status: 0,
      data: null,
      error: err?.message || "Network error",
    };
  }
}
