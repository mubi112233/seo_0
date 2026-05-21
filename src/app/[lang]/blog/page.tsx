import type { Metadata } from "next";
import { BlogListingClient } from "./BlogListingClient";
import { absoluteUrl, hreflangAlternates, publicLocalePathSegment } from "@/lib/site-url";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import { fetchApiData, API_ENDPOINTS, normalizeLanguage } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const seg = publicLocalePathSegment(raw);
  const { languages } = hreflangAlternates("blog");
  const canonical = absoluteUrl(`/${seg}/blog`);

  const isDe = seg === "de";
  const title = isDe
    ? "Webdesign Blog — Tipps & Best Practices | don-webdesign"
    : "Web Design Blog — Tips & Best Practices | don-webdesign";
  const description = isDe
    ? "Einblicke, Tipps und Best Practices zu Webdesign, Webentwicklung und Conversion-Optimierung — auf Deutsch."
    : "Insights, tips, and best practices for web design, web development, and conversion optimization.";

  return {
    title,
    description,
    keywords: isDe
      ? [
          "Webdesign Blog",
          "Webentwicklung Tipps",
          "Website Design deutsch",
          "UX Design",
          "don-webdesign",
          "Webdesign Agentur Blog",
        ]
      : [
          "web design blog",
          "web development tips",
          "website design insights",
          "UX design",
          "don-webdesign",
          "web agency blog",
        ],
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: isDe ? "de_DE" : "en_US",
      alternateLocale: isDe ? "en_US" : "de_DE",
      siteName: "don-webdesign",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "don-webdesign Design Blog" }],
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

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw === 'de' || raw === 'ge' ? 'ge' : 'en';

  const blogData = await fetchApiData<{ blogs: any[] }>(API_ENDPOINTS.BLOGS, normalizeLanguage(lang));
  const initialPosts = Array.isArray((blogData as any)?.blogs)
    ? (blogData as any).blogs.sort((a: any, b: any) => (a.order || 0) - (b.order || 0) || (a.blogId || 0) - (b.blogId || 0))
    : [];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: lang === 'ge' ? 'Startseite' : 'Home', href: `/${lang}` },
    { label: "Blog", href: `/${lang}/blog` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogListingClient initialPosts={initialPosts} />
    </>
  );
}
