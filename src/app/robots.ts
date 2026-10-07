import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Served as /robots.txt — lets every search engine read the whole site and points it at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
