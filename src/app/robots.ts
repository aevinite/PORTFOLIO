import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// AI assistants that answer questions from the web — named one by one so it is explicit that
// ChatGPT, Claude, Perplexity, Gemini, Copilot, Apple and others may read and cite aevinite.com.
// (Everyone is already allowed by the "*" rule; naming them guards against a future blanket block.)
const AI_CRAWLERS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot", "Applebot-Extended",
  "Bingbot", "DuckDuckBot", "YandexBot", "CCBot", "Amazonbot", "meta-externalagent", "MistralAI-User",
];

// Served as /robots.txt — lets every search engine and AI assistant read the whole site and points it at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
