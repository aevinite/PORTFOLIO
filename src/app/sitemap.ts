import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Served as /sitemap.xml — the list of pages we want in Google. Add a line here for every new page.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];
}
