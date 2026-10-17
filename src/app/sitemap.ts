import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/articles",
    "/about",
    "/author",
    "/contact",
    "/privacy",
    "/terms",
    "/editorial",
    ...siteConfig.categories.map((c) => `/category/${c.slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const articles = getAllArticles().map((a) => ({
    url: `${base}/articles/${a.slug}`,
    lastModified: new Date(a.updatedAt || a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...articles];
}
