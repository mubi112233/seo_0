export type SiteLocale = "en" | "ge";

export interface SiteConfig {
  brandName: string;
  brandMarkText: string;
  defaultLocale: SiteLocale;
  apiBase: string;
  tenantId: string;
  routes: {
    bookMeeting: string;
    contact: string;
    blog: string;
  };
  external: {
    whatsappNumber?: string;
  };
}

export const siteConfig: SiteConfig = {
  brandName: "DON SEO",
  brandMarkText: "D",
  defaultLocale: "en",
  apiBase: process.env.NEXT_PUBLIC_API_BASE || "https://api.don-va.com",
  tenantId: process.env.NEXT_PUBLIC_TENANT_ID || "seo",
  routes: {
    bookMeeting: "/book-meeting",
    contact: "/contact",
    blog: "/blog",
  },
  external: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  },
};

export const normalizeLocale = (locale: string): SiteLocale => {
  const raw = (locale || "").toLowerCase();
  // Handle full pathnames like "/de/contact" or "/ge/blog"
  const seg = raw.replace(/^\//, "").split("/")[0];
  if (seg === "ge" || seg === "de") return "ge";
  return "en";
};

/** URL path segment for public links (`de` for German locale, not `ge`). */
export function localeUrlPrefix(locale: SiteLocale): "en" | "de" {
  return locale === "ge" ? "de" : "en";
}

export const localizedPath = (locale: SiteLocale, pathname: string): string => {
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/${localeUrlPrefix(locale)}${clean}`;
};

/** Ensure internal paths like `/book-meeting` get `/en/...` or `/de/...`. */
export function withLocalePrefix(href: string, locale: SiteLocale): string {
  const h = href.trim();
  if (!h || /^[a-z][a-z0-9+.-]*:/i.test(h)) return h;
  if (/^\/(en|ge|de)(\/|$)/i.test(h)) return h;
  const clean = h.startsWith("/") ? h : `/${h}`;
  return localizedPath(locale, clean);
}

export const getWhatsAppUrl = (number?: string): string | null => {
  if (!number) return null;
  const digits = number.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
};


