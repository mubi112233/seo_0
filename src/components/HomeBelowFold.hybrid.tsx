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
import { fetchApiDataClient, API_ENDPOINTS, normalizeLanguage, type PricingResponse } from "@/lib/api";

export async function HomeBelowFold({ lang }: { lang: string }) {
  const normalizedLang = normalizeLanguage(lang);

  const [blogData, servicesData, pricingData, testimonialsData, howItWorksData] = await Promise.all([
    fetchApiDataClient<{ blogs: any[] }>(API_ENDPOINTS.BLOGS, normalizedLang),
    fetchApiDataClient<{ services: any[] }>(API_ENDPOINTS.SERVICES, normalizedLang),
    fetchApiDataClient<PricingResponse>(API_ENDPOINTS.PRICING, normalizedLang),
    fetchApiDataClient<{ testimonials: any[] }>(API_ENDPOINTS.TESTIMONIALS, normalizedLang),
    fetchApiDataClient<{ steps: any[] }>(API_ENDPOINTS.HOW_IT_WORKS, normalizedLang),
  ]);

  const faqData: any[] = [];

  const initialPosts = Array.isArray((blogData as any)?.blogs) && (blogData as any).blogs.length > 0
    ? [...(blogData as any).blogs].sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    : undefined;

  const initialServices = Array.isArray((servicesData as any)?.services) && (servicesData as any).services.length > 0
    ? [...(servicesData as any).services].sort((a: any, b: any) => a.order - b.order)
    : undefined;

  const planOrder = ['starter', 'professional', 'enterprise'];
  const initialPlans = Array.isArray(pricingData?.plans)
    ? [...pricingData.plans].sort((a, b) => planOrder.indexOf(a.planKey) - planOrder.indexOf(b.planKey))
    : undefined;

  const initialTestimonials = Array.isArray((testimonialsData as any)?.testimonials) && (testimonialsData as any).testimonials.length > 0
    ? [...(testimonialsData as any).testimonials].sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
    : undefined;

  const initialSteps = Array.isArray((howItWorksData as any)?.steps) && (howItWorksData as any).steps.length > 0
    ? [...(howItWorksData as any).steps].sort((a: any, b: any) => (a.stepNumber || 0) - (b.stepNumber || 0))
    : undefined;

  return (
    <>
      <div className={SPACING.container}>
        <HowItWorks initialSteps={initialSteps} />
        <Services initialServices={initialServices} />
        <PricingDynamic lang={lang} initialPlans={initialPlans} />
        <ToolsIntegration />
        <Testimonials initialTestimonials={initialTestimonials} />
        <Blog initialPosts={initialPosts} />
        <CaseStudies lang={lang} />
        <FAQInteractive lang={lang} />
      </div>
      <FinalCTA lang={lang} />
    </>
  );
}
