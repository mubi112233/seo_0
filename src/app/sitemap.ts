import type { MetadataRoute } from "next";
import { fetchApiData, API_ENDPOINTS, normalizeLanguage } from "@/lib/api";
import { SITE_URL } from "@/lib/site-url";

const base = SITE_URL;

const slugify = (title: string) =>
  title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();

const href = (path: string) => ({
  en: `${base}/en${path}`,
  de: `${base}/de${path}`,
  "x-default": `${base}/en${path}`,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: { en: `${base}/en`, de: `${base}/de`, "x-default": `${base}/en` } },
    },
    {
      url: `${base}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: href("") },
    },
    {
      url: `${base}/de`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: href("") },
    },
    {
      url: `${base}/en/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: { languages: href("/blog") },
    },
    {
      url: `${base}/de/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: { languages: href("/blog") },
    },
    {
      url: `${base}/en/book-meeting`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: href("/book-meeting") },
    },
    {
      url: `${base}/de/book-meeting`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: href("/book-meeting") },
    },
    {
      url: `${base}/en/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: href("/contact") },
    },
    {
      url: `${base}/de/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: href("/contact") },
    },
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const [enData, geData] = await Promise.all([
      fetchApiData<any>(API_ENDPOINTS.BLOGS, normalizeLanguage("en")),
      fetchApiData<any>(API_ENDPOINTS.BLOGS, normalizeLanguage("ge")),
    ]);
    const enPosts = Array.isArray(enData?.posts) ? enData.posts : Array.isArray(enData?.blogs) ? enData.blogs : [];
    const gePosts = Array.isArray(geData?.posts) ? geData.posts : Array.isArray(geData?.blogs) ? geData.blogs : [];
    const makeBlogSlug = (p: any) => {
      if (p.slug) return p.slug;
      const id = p.blogId ?? p.id;
      const safeId = id != null && !Number.isNaN(Number(id)) ? String(id) : null;
      return safeId ? `${slugify(p.title)}-${safeId}` : slugify(p.title);
    };

    blogRoutes = [
      ...enPosts.map((p: any) => ({
        url: `${base}/en/blog/${makeBlogSlug(p)}`,
        lastModified: p.publishedAt || p.updatedAt ? new Date(p.publishedAt || p.updatedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      ...gePosts.map((p: any) => ({
        url: `${base}/de/blog/${makeBlogSlug(p)}`,
        lastModified: p.publishedAt || p.updatedAt ? new Date(p.publishedAt || p.updatedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ];
  } catch {}

  let caseRoutes: MetadataRoute.Sitemap = [];
  try {
    const [enData, geData] = await Promise.all([
      fetchApiData<any>(API_ENDPOINTS.CASE_STUDIES, normalizeLanguage("en")),
      fetchApiData<any>(API_ENDPOINTS.CASE_STUDIES, normalizeLanguage("ge")),
    ]);
    const enStudies = Array.isArray(enData?.caseStudies) ? enData.caseStudies : [];
    const geStudies = Array.isArray(geData?.caseStudies) ? geData.caseStudies : [];
    const makeCaseSlug = (s: any) => {
      const id = s.caseStudyId ?? s.id;
      const safeId = id != null && !Number.isNaN(Number(id)) ? String(id) : null;
      return safeId ? `${slugify(s.title)}-${safeId}` : slugify(s.title);
    };

    caseRoutes = [
      ...enStudies.map((s: any) => ({
        url: `${base}/en/case-study/${makeCaseSlug(s)}`,
        lastModified: s.updatedAt ? new Date(s.updatedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      ...geStudies.map((s: any) => ({
        url: `${base}/de/case-study/${makeCaseSlug(s)}`,
        lastModified: s.updatedAt ? new Date(s.updatedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch {}

  return [...staticRoutes, ...blogRoutes, ...caseRoutes];
}


