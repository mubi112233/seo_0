import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";

  // Enforce www — redirect non-www to www (301)
  if (host === "don-webdesign.com") {
    const wwwUrl = new URL(request.url);
    wwwUrl.host = "www.don-webdesign.com";
    return NextResponse.redirect(wwwUrl, { status: 301 });
  }

  // Locale cookie / browser language detection
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;
  const acceptLang = request.headers.get("accept-language") || "";
  const browserLang = acceptLang.split(",")[0]?.toLowerCase() || "en";
  const isGermanBrowser = browserLang.startsWith("de") || browserLang.startsWith("ge");
  const preferredLocale = localeCookie || (isGermanBrowser ? "de" : "en");

  // Redirect bare root to preferred locale
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
  }

  // Set html lang header based on pathname
  const htmlLang = pathname.startsWith("/ge") || pathname.startsWith("/de") ? "de" : "en";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-html-lang", htmlLang);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

