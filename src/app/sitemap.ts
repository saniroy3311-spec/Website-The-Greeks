import { MetadataRoute } from "next";
import { getPostSlugs } from "@/lib/markdown";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://thegreks.in";

  const slugs = getPostSlugs().map((slug) => slug.replace(/\.md$/, ""));

  const blogUrls = slugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
