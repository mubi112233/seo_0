import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import "@/styles/main.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { DesignSystemProvider } from "@/components/DesignSystemProvider";
import { SITE_URL, absoluteUrl } from "@/lib/site-url";
   
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
}); 

const poppins = Poppins({
  subsets:    ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DON SEO - Professional SEO Services \| Grow Your Organic Traffic",
    template: "%s | DON SEO",
  },
  description:
    "Data-driven SEO and content marketing for DACH businesses. Rank higher on Google and grow your organic traffic. Book your free consultation today.",
  keywords: [
    "SEO agency",
    "SEO services",
    "organic growth",
    "search engine optimization",
    "technical SEO",
    "content strategy",
    "link building",
    "custom SEO services",
    "on-page SEO",
    "SEO audit",
    "webdesign agentur",
    "SEO Agentur",
    "Suchmaschinenkoptimierung",
    "Google ranking",
    "DACH SEO",
    "SEO consulting",
    "organic traffic",
    "DON SEO",
  ],
  authors: [{ name: "DON SEO", url: SITE_URL }],
  creator: "DON SEO",
  publisher: "DON SEO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "l93HxOLqUBDjtuNfHM7OsWQd7i9MfSJo1fV_yaLAZrE",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "DON SEO",
    title: "DON SEO - Professional SEO Services \| Grow Your Organic Traffic",
    description:
      "Data-driven SEO and content marketing for DACH businesses. Rank higher on Google and grow your organic traffic.",
    url: absoluteUrl("/en"),
    locale: "en_US",
    alternateLocale: ["de_DE"],
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "DON SEO — Professional SEO Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DON SEO - Professional SEO Services \| Grow Your Organic Traffic",
    description:
      "Data-driven SEO and content marketing for DACH businesses. Rank higher on Google and grow your organic traffic.",
    images: [absoluteUrl("/opengraph-image")],
  },
  // Per-page alternates are set in each route's generateMetadata.
  // Root layout does NOT set alternates to avoid overriding page-level hreflang.
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DON SEO",
  url: SITE_URL,
  logo: absoluteUrl("/opengraph-image"),
  description:
    "Premium SEO agency specializing in modern websites, SEO services, on-page SEO, and digital solutions for businesses worldwide.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "German"],
  },
  areaServed: [
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "Austria" },
    { "@type": "Country", name: "Switzerland" },
    { "@type": "Place", name: "Worldwide" },
  ],
  sameAs: ["https://linkedin.com/company/DON SEO", "https://twitter.com/DON SEO", "https://instagram.com/DON SEO"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DON SEO",
  url: SITE_URL,
  inLanguage: ["en-US", "de-DE"],
  publisher: { "@type": "Organization", name: "DON SEO" },
};

// Service schema for web design services
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web Design Services",
  provider: {
    "@type": "Organization",
    name: "DON SEO",
    url: SITE_URL,
  },
  areaServed: [
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "Austria" },
    { "@type": "Country", name: "Switzerland" },
    { "@type": "Place", name: "Worldwide" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Design Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Website Design",
          description: "Modern, responsive websites tailored to your brand",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-Commerce Development",
          description: "High-converting online stores with seamless checkout",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "on-page SEO",
          description: "User-centered interface design for web and mobile",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO audit",
          description: "Transform your existing site into a conversion machine",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Maintenance",
          description: "Ongoing support and optimization for peak performance",
        },
      },
    ],
  },
};

// LocalBusiness schema for SEO agency
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DON SEO",
  url: SITE_URL,
  logo: absoluteUrl("/opengraph-image"),
  image: absoluteUrl("/opengraph-image"),
  description: "Premium SEO agency specializing in modern websites, on-page SEO, and digital solutions for businesses",
  sameAs: [
    "https://linkedin.com/company/DON SEO",
    "https://twitter.com/DON SEO",
    "https://instagram.com/DON SEO",
  ],
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const htmlLang = headersList.get("x-html-lang") || "en";

  return (
    <html lang={htmlLang} suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Performance: Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Security */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LNDGNQ7Z74" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LNDGNQ7Z74');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <DesignSystemProvider defaultTheme="blue">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </DesignSystemProvider>
      </body>
    </html>
  );
}


