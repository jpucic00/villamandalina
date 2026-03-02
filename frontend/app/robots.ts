import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/en/login", "/hr/login"],
      },
    ],
    sitemap: "https://villamandalina.hr/sitemap.xml",
  };
}
