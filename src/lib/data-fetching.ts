/**
 * Server-side data fetching for home page sections
 * Fetches all data in parallel for optimal performance
 */

import { fetchAPI, fetchAPIClient, API_ENDPOINTS, normalizeLanguage } from './api';
import type { Service, FAQItem } from './api';

export interface CaseStudyCard {
  id: number;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  image: string;
  stats: { costSaved: string; timeframe: string; vaCount: string };
}

export interface FinalCtaSectionPayload {
  badge?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  subheading?: string;
  benefits?: string[];
  stats?: { activeClients: string; avgRoi: string; satisfaction: string; fastStart: string };
  trust?: {
    consultationTime: string;
    consultationLabel: string;
    responseTime: string;
    responseLabel: string;
    noCommitment: string;
    noCommitmentLabel: string;
    footer: string;
  };
  ctas?: { primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string };
  whatsAppNumber?: string;
}

// Types for our data structures
export interface HomePageData {
  services: Service[];
  testimonials: Testimonial[];
  pricing: any;
  faq: any;
  caseStudies: any;
  blog: any;
}

// Testimonial interface
export interface Testimonial {
  _id?: string;
  content: string;
  name: string;
  role: string;
  company: string;
  order?: number;
}

/**
 * Fetch all home page data in parallel
 * This should be called from server components
 */
export async function fetchHomePageData(lang: string): Promise<HomePageData> {
  const normalizedLang = normalizeLanguage(lang);
  
  try {
    // Fetch all data in parallel for better performance
    const [
      servicesResponse,
      testimonialsResponse,
      pricingResponse,
      faqResponse,
      caseStudiesResponse,
      blogResponse
    ] = await Promise.all([
      fetchAPI(`${API_ENDPOINTS.SERVICES}?lang=${normalizedLang}`),
      fetchAPI(`${API_ENDPOINTS.TESTIMONIALS}?lang=${normalizedLang}`),
      fetchAPI(`${API_ENDPOINTS.PRICING}?lang=${normalizedLang}`),
      fetchAPI(`${API_ENDPOINTS.FAQ}?lang=${normalizedLang}`),
      fetchAPI(`${API_ENDPOINTS.CASE_STUDIES}?lang=${normalizedLang}`),
      fetchAPI(`${API_ENDPOINTS.BLOGS}?lang=${normalizedLang}`)
    ]);

    // Parse responses in parallel
    const [
      servicesData,
      testimonialsData,
      pricingData,
      faqData,
      caseStudiesData,
      blogData
    ] = await Promise.all([
      servicesResponse.json(),
      testimonialsResponse.json(),
      pricingResponse.json(),
      faqResponse.json(),
      caseStudiesResponse.json(),
      blogResponse.json()
    ]);

    return {
      services: servicesData?.services || [],
      testimonials: testimonialsData?.testimonials || [],
      pricing: pricingData || {},
      faq: faqData || {},
      caseStudies: caseStudiesData || {},
      blog: blogData || {}
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    // Return empty data on error to prevent crashes
    return {
      services: [],
      testimonials: [],
      pricing: {},
      faq: {},
      caseStudies: {},
      blog: {}
    };
  }
}

/**
 * Individual fetch functions for specific sections
 * Use these when you only need specific data
 */
export async function fetchServicesData(lang: string): Promise<Service[]> {
  try {
    const normalizedLang = normalizeLanguage(lang);
    const response = await fetchAPI(`${API_ENDPOINTS.SERVICES}?lang=${normalizedLang}`);
    const data = await response.json();
    return data?.services || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function fetchTestimonialsData(lang: string): Promise<Testimonial[]> {
  try {
    const normalizedLang = normalizeLanguage(lang);
    const response = await fetchAPI(`${API_ENDPOINTS.TESTIMONIALS}?lang=${normalizedLang}`);
    const data = await response.json();
    return data?.testimonials || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function fetchFAQData(lang: string): Promise<FAQItem[]> {
  try {
    const normalizedLang = normalizeLanguage(lang);
    const response = await fetchAPI(`${API_ENDPOINTS.FAQ}?lang=${normalizedLang}`);
    const data = await response.json();
    const list = Array.isArray(data?.faqs) ? (data.faqs as FAQItem[]) : [];
    return [...list].sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}

export async function fetchCaseStudiesCardsData(lang: string): Promise<CaseStudyCard[]> {
  try {
    const normalizedLang = normalizeLanguage(lang);
    const response = await fetchAPIClient(`${API_ENDPOINTS.CASE_STUDIES}?lang=${normalizedLang}`);
    const data = await response.json();
    if (!Array.isArray(data?.caseStudies)) return [];
    return data.caseStudies
      .map((cs: Record<string, unknown>) => ({
        id: (cs.caseStudyId ?? cs._id ?? cs.id) as number,
        title: cs.title as string,
        company: cs.company as string,
        industry: cs.industry as string,
        challenge: cs.challenge as string,
        image: cs.image as string,
        stats: cs.stats as CaseStudyCard['stats'],
      }))
      .filter((cs: CaseStudyCard) => cs.id !== undefined && cs.id !== null)
      .sort((a: CaseStudyCard, b: CaseStudyCard) => (a.id as number) - (b.id as number));
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export async function fetchFinalCtaSectionData(
  lang: string
): Promise<FinalCtaSectionPayload | null> {
  try {
    const normalizedLang = normalizeLanguage(lang);
    const response = await fetchAPIClient(`${API_ENDPOINTS.FINAL_CTA}?lang=${normalizedLang}`)
    if (!response.ok) return null;
    const data = await response.json();
    const section = data?.finalCta;
    return section && typeof section === 'object' ? (section as FinalCtaSectionPayload) : null;
  } catch (error) {
    console.warn('Error fetching final CTA:', error);
    return null;
  }
}


