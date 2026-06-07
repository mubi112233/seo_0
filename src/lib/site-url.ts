/**
 * Canonical site origin for metadata, sitemap, and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in production to match your live domain.
 */
export const isProduction = process.env.NODE_ENV === "production";

// Force correct production domain - update this if domain changes
const PRODUCTION_SITE_URL = "https://don-seo.com";
const DEFAULT_SITE_URL = isProduction ? PRODUCTION_SITE_URL : "http://localhost:3000";

// Get env var but validate it doesn't contain old/wrong domains
const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const isValidEnvUrl = envUrl && !envUrl.includes("don-va.com");

export const SITE_URL = (isValidEnvUrl ? envUrl : DEFAULT_SITE_URL) as string;

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

/** Path segment for canonical / OG URLs: `de` for German (valid hreflang), `en` for English. */
export function publicLocalePathSegment(lang: string): "en" | "de" {
  return lang === "ge" || lang === "de" ? "de" : "en";
}

/**
 * Path after locale, e.g. "" for home, "contact", "blog/post-slug"
 * (no leading slash on segments).
 */
export function hreflangAlternates(pathAfterLocale: string): {
  canonicalEn: string;
  canonicalDe: string;
  languages: Record<string, string>;
} {
  const tail = pathAfterLocale ? `/${pathAfterLocale.replace(/^\//, "")}` : "";
  return {
    canonicalEn: absoluteUrl(`/en${tail}`),
    canonicalDe: absoluteUrl(`/de${tail}`),
    languages: {
      en: absoluteUrl(`/en${tail}`),
      de: absoluteUrl(`/de${tail}`),
      "x-default": absoluteUrl(`/en${tail}`),
    },
  };
}


