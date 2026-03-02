import type { MetadataRoute } from "next";

const BASE_URL = "https://villamandalina.hr";
const locales = ["en", "hr"] as const;
const publicPages = ["/", "/gallery", "/details", "/contact", "/calendar"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of publicPages) {
      const path = page === "/" ? "" : page;
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: page === "/calendar" ? new Date() : new Date("2025-01-01"),
        changeFrequency: page === "/calendar" ? "daily" : "monthly",
        priority: page === "/" ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
