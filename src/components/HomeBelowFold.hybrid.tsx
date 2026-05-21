import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { PricingDynamic } from "@/components/PricingDynamic";
import { ToolsIntegration } from "@/components/ToolsIntegration";
import { CaseStudies } from "@/components/CaseStudies.server";
import { Blog } from "@/components/Blog";
import { FAQInteractive } from "@/components/FAQInteractive.client";
import { FinalCTA } from "@/components/FinalCTA.server";
import { SPACING } from "@/lib/constants";
import { fetchFAQ, fetchApiData, API_ENDPOINTS, normalizeLanguage } from "@/lib/api";

export async function HomeBelowFold({ lang }: { lang: string }) {
  const [faqs, blogData, servicesData] = await Promise.all([
    fetchFAQ(lang),
    fetchApiData<{ blogs: any[] }>(API_ENDPOINTS.BLOGS, normalizeLanguage(lang)),
    fetchApiData<{ services: any[] }>(API_ENDPOINTS.SERVICES, normalizeLanguage(lang)),
  ]);

  const faqData = faqs?.faqs || [];
  const initialPosts = Array.isArray((blogData as any)?.blogs)
    ? (blogData as any).blogs.sort((a: any, b: any) => (a.order || 0) - (b.order || 0) || a.blogId - b.blogId)
    : [];
  const initialServices = Array.isArray((servicesData as any)?.services)
    ? [...(servicesData as any).services].sort((a: any, b: any) => a.order - b.order)
    : undefined;

  return (
    <>
      <div className={SPACING.container}>
        <HowItWorks />
        <Services />
        <PricingDynamic lang={lang} />
        <ToolsIntegration />
        <Testimonials />
        <Blog initialPosts={initialPosts} />
        <CaseStudies lang={lang} />
        <FAQInteractive faqs={faqData} lang={lang} />
      </div>
      <FinalCTA lang={lang} />
    </>
  );
}


