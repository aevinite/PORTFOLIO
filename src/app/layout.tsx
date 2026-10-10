import type { Metadata } from "next";
import "./globals.css";
import { ProjectModalProvider } from "@/context/ProjectModalContext";
import StartProjectModal from "@/components/StartProjectModal";

import { SITE_URL } from "@/lib/site";

// Search title (Google result + browser tab): what we are + where, brand first. ~55 chars.
const SEARCH_TITLE = "Aevinite | Custom Software & SaaS Company in Ahmedabad";
// Share title (WhatsApp / LinkedIn / X cards) keeps the tagline the preview image also says.
const SHARE_TITLE = "Aevinite | Software that runs real businesses";
const DESCRIPTION =
  "Aevinite is a software company in Ahmedabad building custom business software, SaaS products, websites, 3D web experiences and AI automation.";

// Google ignores the keywords tag for ranking (since 2009); it's kept as an honest list of
// what we do. What actually ranks is the title, description, page text and the JSON-LD below.
const KEYWORDS = [
  "Aevinite",
  "software company in Ahmedabad",
  "software development company Ahmedabad",
  "custom software development",
  "SaaS development company India",
  "website development Ahmedabad",
  "web and app development",
  "business automation",
  "AI automation",
  "AI integration",
  "restaurant software",
  "QR code menu",
  "3D menu",
  "3D web experiences",
  "Next.js development",
  "Gujarat",
  "India",
];

// The preview image itself is src/app/opengraph-image.jpg (+ twitter-image.jpg); Next adds
// og:image / twitter:image for it. metadataBase turns it into the absolute URL that LinkedIn,
// WhatsApp and X need to show a preview card. The tab icon is src/app/icon.png (+ favicon.ico,
// apple-icon.png) — the Aevinite mark; it replaced create-next-app's Vercel triangle.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SEARCH_TITLE, template: "%s | Aevinite" },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: "Aevinite",
  authors: [{ name: "Aevinite", url: SITE_URL }],
  creator: "Aevinite",
  publisher: "Aevinite",
  category: "technology",
  alternates: { canonical: "/" },
  // Let Google show the full snippet and a large image preview for the brand result.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  // Search Console / Bing Webmaster ownership tags. Set the codes as Vercel env vars
  // (GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION); unset ones emit nothing.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Aevinite",
    title: SHARE_TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: DESCRIPTION,
  },
};

// Google's "business card" for the company (schema.org). Only facts that are on the site.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Aevinite",
      alternateName: ["AEVINITE", "aevinite.com"],
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
      image: `${SITE_URL}/opengraph-image.jpg`,
      slogan: "Software that runs real businesses",
      description: DESCRIPTION,
      email: "aevinite@gmail.com",
      telephone: "+91-90997-23703",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      areaServed: "IN",
      knowsAbout: [
        "Custom software development",
        "SaaS products",
        "Website and app development",
        "Business process automation",
        "AI integration",
        "3D web experiences",
        "Restaurant technology",
      ],
      sameAs: ["https://www.instagram.com/aevinite/", "https://github.com/aevinite"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "aevinite@gmail.com",
        telephone: "+91-90997-23703",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Gujarati"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      // Google's "site name" shown above the result reads name + alternateName from here.
      name: "Aevinite",
      alternateName: ["AEVINITE", "aevinite.com"],
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          // `<` escaped so the JSON can never close the script tag (Next's JSON-LD guide).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
        />
        <ProjectModalProvider>
          {children}
          <StartProjectModal />
        </ProjectModalProvider>
      </body>
    </html>
  );
}
