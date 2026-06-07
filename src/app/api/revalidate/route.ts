import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand revalidation endpoint.
 *
 * Your backend calls this after saving any content change:
 *   POST https://www.DON SEO.com/api/revalidate
 *   Headers: { "x-revalidate-secret": "<REVALIDATE_SECRET>" }
 *   Body:    { "tags": ["hero", "faq"], "paths": ["/en", "/de"] }
 *
 * Or via GET for quick manual triggers:
 *   GET /api/revalidate?secret=TOKEN&tag=hero&path=/en
 */

const SECRET = process.env.REVALIDATE_SECRET;

function isAuthorized(req: NextRequest): boolean {
  // Support both header (POST) and query param (GET/manual)
  const headerSecret = req.headers.get("x-revalidate-secret");
  const querySecret = req.nextUrl.searchParams.get("secret");
  return !!(SECRET && (headerSecret === SECRET || querySecret === SECRET));
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const tags: string[] = Array.isArray(body.tags) ? body.tags : [];
    const paths: string[] = Array.isArray(body.paths) ? body.paths : [];

    // Revalidate by cache tags (granular — only busts tagged fetches)
    for (const tag of tags) {
      revalidateTag(tag);
    }

    // Revalidate by path (regenerates the full page)
    for (const path of paths) {
      revalidatePath(path);
    }

    // If nothing specified, revalidate all home pages
    if (tags.length === 0 && paths.length === 0) {
      revalidateTag("hero");
      revalidateTag("faq");
      revalidateTag("services");
      revalidateTag("blog");
      revalidatePath("/en");
      revalidatePath("/de");
    }

    return NextResponse.json({
      revalidated: true,
      tags,
      paths,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({ error: "Revalidation failed", detail: String(err) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tag = req.nextUrl.searchParams.get("tag");
  const path = req.nextUrl.searchParams.get("path");

  if (tag) revalidateTag(tag);
  if (path) revalidatePath(path);

  // Default: revalidate everything content-related
  if (!tag && !path) {
    revalidateTag("hero");
    revalidateTag("faq");
    revalidateTag("services");
    revalidateTag("blog");
    revalidatePath("/en");
    revalidatePath("/de");
  }

  return NextResponse.json({
    revalidated: true,
    tag,
    path,
    timestamp: new Date().toISOString(),
  });
}
