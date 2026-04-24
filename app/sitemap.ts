import { PROJECT_SLUGS } from "@/lib/projects";
import { getLocalizedPath, getLocalizedProjectPath, getSiteUrl } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const staticPages = ["/", "/about", "/projects", "/contact"] as const;
  type SitemapEntry = MetadataRoute.Sitemap[number];

  const pageEntries: SitemapEntry[] = routing.locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}${getLocalizedPath(locale, page)}`,
      lastModified: new Date(),
      changeFrequency: page === "/" ? "weekly" : "monthly",
      priority: page === "/" ? 1 : 0.8,
    })),
  );

  const projectEntries: SitemapEntry[] = routing.locales.flatMap((locale) =>
    PROJECT_SLUGS.map((slug) => ({
      url: `${baseUrl}${getLocalizedProjectPath(locale, slug)}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  );

  return [...pageEntries, ...projectEntries];
}
