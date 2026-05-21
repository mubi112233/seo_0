"use client";

import { Blog } from "@/components/Blog";

export function BlogListingClient({ initialPosts }: { initialPosts: any[] }) {
  return <Blog initialPosts={initialPosts} />;
}
