import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { absoluteUrl, hreflangAlternates, publicLocalePathSegment } from "@/lib/site-url";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

const SUPPORTED_LANGS = ["en", "ge", "de"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const seg = publicLocalePathSegment(raw);
  const isDE = seg === "de";
  const title = isDE ? "Kontakt — SEO Agentur" : "Contact — SEO Agency";
  const description = isDE
    ? "Kontaktieren Sie DON SEO für eine kostenlose Beratung zu SEO, Content Marketing und organischem Wachstum."
    : "Contact DON SEO for a free consultation about SEO services, content marketing, and growing your organic traffic.";
  const { languages } = hreflangAlternates("contact");
  const canonical = absoluteUrl(`/${seg}/contact`);

  return {
    title: { absolute: `${title} | DON SEO` },
    description,
    keywords: isDE
      ? ["kontakt DON SEO", "SEO Anfrage", "SEO Beratung", "organisches Wachstum"]
      : ["contact DON SEO", "SEO inquiry", "SEO consultation", "SEO agency contact"],
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: isDE ? "de_DE" : "en_US",
      alternateLocale: isDE ? "en_US" : "de_DE",
      siteName: "DON SEO",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "DON SEO Agency" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/og-image.jpg")],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!SUPPORTED_LANGS.includes(rawLang?.toLowerCase())) notFound();
  const lang = rawLang === "ge" || rawLang === "de" ? "ge" : "en";
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: lang === "ge" ? "Startseite" : "Home", href: `/${lang}` },
    { label: lang === "ge" ? "Kontakt" : "Contact", href: `/${lang}/contact` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactClient lang={lang} />
    </>
  );
}
