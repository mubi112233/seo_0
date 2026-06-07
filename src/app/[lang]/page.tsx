import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { HomeBelowFold } from "@/components/HomeBelowFold.hybrid";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchApiDataClient, API_ENDPOINTS, normalizeLanguage } from "@/lib/api";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/structured-data";
import { SITE_URL, absoluteUrl, hreflangAlternates, publicLocalePathSegment } from "@/lib/site-url";

export const revalidate = 60;

const SUPPORTED_LANGS = ['en', 'ge', 'de'];

async function getHeroMeta(lang: string) {
  try {
    const data = await fetchApiDataClient<{ hero: any | any[] }>(API_ENDPOINTS.HERO, normalizeLanguage(lang));
    if (!data?.hero) return null;

    // Handle array response (multiple heroes)
    if (Array.isArray(data.hero)) {
      // Prefer hero with metaTitle/metaDescription for SEO, then fall back to newest
      const withMeta = data.hero.find((h: any) => h.metaTitle || h.metaDescription);
      if (withMeta) {
        console.log(`[getHeroMeta] Found hero with SEO meta:`, withMeta._id);
        return withMeta;
      }
      // Sort by _id (newest first - MongoDB ObjectId contains timestamp)
      const sorted = data.hero.sort((a: any, b: any) => {
        const idA = a._id || '';
        const idB = b._id || '';
        return idB.localeCompare(idA);
      });
      console.log(`[getHeroMeta] Found ${sorted.length} heroes, using newest:`, sorted[0]?._id);
      return sorted[0] || null;
    }

    return data.hero;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang === 'de' || rawLang === 'ge' ? 'ge' : 'en';
  const hero = await getHeroMeta(lang);
  console.log("[generateMetadata] hero data:", JSON.stringify({ metaTitle: hero?.metaTitle, metaDescription: hero?.metaDescription, metaKeywords: hero?.metaKeywords, title: hero?.title, _id: hero?._id }));

  const title =
    hero?.metaTitle ||
    (lang === "ge"
      ? "DON SEO – Professionelle SEO-Agentur | Organisches Wachstum für DACH"
      : "DON SEO – Professional SEO Agency | Grow Your Organic Traffic");
  const description =
    hero?.metaDescription ||
    (lang === "ge"
      ? "Datengetriebenes SEO und Content Marketing für DACH-Unternehmen. Mehr organischer Traffic und bessere Google-Rankings."
      : "Data-driven SEO and content marketing for DACH businesses. Rank higher on Google and grow your organic traffic.");
  const keywordsFromHero = hero?.metaKeywords
    ? hero.metaKeywords.split(",").map((k: string) => k.trim())
    : null;
  const defaultDeKeywords = [
    "SEO Agentur Deutschland",
    "Suchmaschinenoptimierung",
    "Content Marketing DACH",
    "Google Ranking verbessern",
    "Technisches SEO",
    "Link Building",
    "Lokales SEO",
    "DON SEO",
  ];
  const defaultEnKeywords = [
    "SEO agency Germany",
    "search engine optimization",
    "content marketing DACH",
    "Google ranking",
    "technical SEO",
    "link building",
    "local SEO",
    "DON SEO",
  ];
  const keywords = keywordsFromHero ?? (lang === "ge" ? defaultDeKeywords : defaultEnKeywords);
  const pathSeg = publicLocalePathSegment(lang);
  const canonical = absoluteUrl(`/${pathSeg}`);
  const { languages } = hreflangAlternates("");

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "DON SEO",
      locale: lang === "ge" ? "de_DE" : "en_US",
      alternateLocale: lang === "ge" ? "en_US" : "de_DE",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: lang === "ge" ? "DON SEO — Professionelle SEO-Agentur" : "DON SEO — Professional SEO Agency",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

const pageJsonLd = (baseUrl: string) => ({
  en: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "DON SEO — Professional SEO Services",
    provider: { "@type": "Organization", name: "DON SEO" },
    description:
      "Data-driven SEO and content marketing for DACH businesses. Rank higher on Google and grow your organic traffic.",
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
      { "@type": "Place", name: "Worldwide" },
    ],
    availableLanguage: ["English", "German"],
    url: `${baseUrl}/en`,
    inLanguage: "en-US",
  },
  ge: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "DON SEO — Professionelle SEO-Dienstleistungen",
    provider: { "@type": "Organization", name: "DON SEO" },
    description:
      "Datengetriebenes SEO und Content Marketing für DACH-Unternehmen. Bessere Google-Rankings und mehr organischer Traffic.",
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
      { "@type": "Place", name: "Worldwide" },
    ],
    availableLanguage: ["Deutsch", "Englisch"],
    url: `${baseUrl}/de`,
    inLanguage: "de-DE",
  },
});

export default async function HomeLangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLangValue } = await params;
  const rawLang = rawLangValue?.toLowerCase();

  if (!SUPPORTED_LANGS.includes(rawLang)) {
    notFound();
  }

  const lang = rawLang === 'de' || rawLang === 'ge' ? 'ge' : 'en';
  const jsonLd = pageJsonLd(SITE_URL)[lang];

  const faqs: any[] = [];
  const faqSchema = null;

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: lang === 'ge' ? 'Startseite' : 'Home', href: `/${lang}` },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Navbar />
      <main id="main-content" className="overflow-x-hidden">
        <Hero lang={lang} />
        <HomeBelowFold lang={lang} />
      </main>
    </div>
  );
}
