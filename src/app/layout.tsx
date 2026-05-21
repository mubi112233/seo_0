import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
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
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1433" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "don-webdesign - Premium Web Design Services | Save 70% on Development",
    template: "%s | don-webdesign",
  },
  description:
    "Save 70% on web development with premium web design services. Modern websites that convert. Native quality, guaranteed satisfaction. Book your free consultation today.",
  keywords: [
    "web design agency",
    "web development",
    "premium websites",
    "website design services",
    "modern web design",
    "responsive design",
    "ecommerce website",
    "custom web development",
    "UI/UX design",
    "website redesign",
    "webdesign agentur",
    "website erstellen",
    "professionelle websites",
    "wordpress design",
    "nextjs development",
    "react websites",
    "conversion optimization",
    "don-webdesign",
  ],
  authors: [{ name: "don-webdesign", url: SITE_URL }],
  creator: "don-webdesign",
  publisher: "don-webdesign",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "owA83i5dtMBx2-hhn9CBrI0wGgffRYCV2ux3FXUGG04",
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
    siteName: "don-webdesign",
    title: "don-webdesign - Premium Web Design Services | Save 70% on Development",
    description:
      "Save 70% on web development with premium web design services. Modern websites that convert. Native quality, guaranteed satisfaction.",
    url: absoluteUrl("/en"),
    locale: "en_US",
    alternateLocale: ["de_DE"],
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "don-webdesign — Premium Web Design Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "don-webdesign - Premium Web Design Services | Save 70% on Development",
    description:
      "Save 70% on web development with premium web design services. Modern websites that convert. Native quality, guaranteed satisfaction.",
    images: [absoluteUrl("/opengraph-image")],
  },
  // Per-page alternates are set in each route's generateMetadata.
  // Root layout does NOT set alternates to avoid overriding page-level hreflang.
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "don-webdesign",
  url: SITE_URL,
  logo: absoluteUrl("/opengraph-image"),
  description:
    "Premium web design agency specializing in modern websites, web development, UI/UX design, and digital solutions for businesses worldwide.",
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
  sameAs: ["https://linkedin.com/company/don-webdesign", "https://twitter.com/don-webdesign", "https://instagram.com/don-webdesign"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "don-webdesign",
  url: SITE_URL,
  inLanguage: ["en-US", "de-DE"],
  publisher: { "@type": "Organization", name: "don-webdesign" },
};

// Service schema for web design services
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web Design Services",
  provider: {
    "@type": "Organization",
    name: "don-webdesign",
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
          name: "UI/UX Design",
          description: "User-centered interface design for web and mobile",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Redesign",
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

// LocalBusiness schema for Web Design Agency
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "don-webdesign",
  url: SITE_URL,
  logo: absoluteUrl("/opengraph-image"),
  image: absoluteUrl("/opengraph-image"),
  description: "Premium web design agency specializing in modern websites, UI/UX design, and digital solutions for businesses",
  sameAs: [
    "https://linkedin.com/company/don-webdesign",
    "https://twitter.com/don-webdesign",
    "https://instagram.com/don-webdesign",
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
        {/* Performance: Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Security */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y41TLVJ50H" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Y41TLVJ50H');
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
        <DesignSystemProvider defaultTheme="gold">
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


