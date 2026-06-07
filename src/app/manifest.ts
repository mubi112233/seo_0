import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DON SEO - Professional SEO Services",
    short_name: "DON SEO",
    description: "Save 70% on web development with Professional SEO Services. Modern websites that convert. Native quality, guaranteed satisfaction.",
    start_url: "/",
    display: "standalone",
    background_color: "#3D2817",
    theme_color: "#FFBC42",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    orientation: "portrait",
    scope: "/",
    lang: "en",
    categories: ["design", "business", "productivity", "web"],
  };
}


