import { SITE_URL, absoluteUrl } from "@/lib/site-url";

interface BlogStructuredDataProps {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  image: string;
  url: string;
}

export function generateBlogStructuredData({
  title,
  description,
  publishedAt,
  updatedAt,
  image,
  url,
}: BlogStructuredDataProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": "DON SEO",
      "url": SITE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": "DON SEO",
      "logo": {
        "@type": "ImageObject",
        "url": absoluteUrl("/og-image.jpg")
      }
    },
    "datePublished": publishedAt,
    "dateModified": updatedAt || publishedAt,
    "image": image,
    "url": url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };
}

interface ServiceStructuredDataProps {
  serviceName: string;
  description: string;
  provider: string;
  areaServed: string;
  hasOfferCatalog: string;
}

export function generateServiceStructuredData({
  serviceName,
  description,
  provider,
  areaServed,
  hasOfferCatalog,
}: ServiceStructuredDataProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": SITE_URL
    },
    "areaServed": areaServed,
    "hasOfferCatalog": hasOfferCatalog,
    "serviceType": "Web Design Services"
  }; 
}

interface LocalBusinessStructuredDataProps {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  email?: string;
  address?: string;
}

export function generateLocalBusinessStructuredData({
  name,
  description,
  url,
  telephone,
  email,
  address,
}: LocalBusinessStructuredDataProps) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": name,
    "description": description,
    "url": url,
    "telephone": telephone,
    "email": email,
    "address": address ? {
      "@type": "PostalAddress",
      "addressCountry": "Germany",
      "addressLocality": address
    } : undefined,
    "openingHours": "Mo-Fr 09:00-18:00",
    "availableLanguage": ["English", "German"],
    "serviceArea": "Germany, Austria, Switzerland"
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${SITE_URL}${item.href.startsWith("/") ? item.href : `/${item.href}`}`,
    })),
  };
}


