import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ProjectModalProvider } from "@/context/ProjectModalContext";
import StartProjectModal from "@/components/StartProjectModal";

import { SITE_URL } from "@/lib/site";
import { COMPANY, FOUNDERS } from "@/lib/company";

// Fonts are downloaded at build time and served from our own address (next/font): no request to
// Google when someone visits. Instrument Sans for everything, Instrument Serif only for the italic
// accent words in headlines. (Before this the CSS asked for "Geist", which was never loaded, so
// the whole site quietly rendered in Arial.)
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

// The phone's address bar takes the page colour in each theme.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#05060a" },
  ],
};

// Runs before the first paint so a visitor who picked dark never sees a flash of light.
// Default is LIGHT for everyone (owner, 31 Oct 2026) — the OS setting is deliberately not read.
const THEME_SCRIPT = `try{var t=localStorage.getItem("aev-theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){}`;

// Search title (Google result + browser tab): brand, then the line we stand for, then where.
// Owner, 31 Oct 2026: Aevinite is the company that helps businesses grow, not a "software/SaaS
// company"; Aevidine (our SaaS product) is a separate thing and says so on its own page.
const SEARCH_TITLE = "Aevinite | We Help Businesses Grow | Ahmedabad";
// Share title (WhatsApp / LinkedIn / X cards) keeps the tagline the preview image also says.
const SHARE_TITLE = "Aevinite | We help businesses grow";
// Names the founders: "who founded Aevinite" is the question people and AI assistants ask most.
const DESCRIPTION =
  "Aevinite helps businesses grow, with websites, software and automation built around how each business works. Ahmedabad, India; founded by Rishi Nakrani and Jenish Patel.";

// Google ignores the keywords tag for ranking (since 2009); it's kept as an honest list of
// what we do. What actually ranks is the title, description, page text and the JSON-LD below.
const KEYWORDS = [
  "Aevinite",
  "Aevinite founders",
  "Rishi Nakrani",
  "Jenish Patel",
  "help businesses grow",
  "business growth company Ahmedabad",
  "software company in Ahmedabad",
  "custom software development",
  "website development Ahmedabad",
  "web and app development",
  "business automation",
  "AI automation",
  "AI integration",
  "restaurant software",
  "student transport app",
  "school bus tracking app",
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
      slogan: "We help businesses grow",
      description: DESCRIPTION,
      foundingDate: COMPANY.foundingDate,
      foundingLocation: {
        "@type": "Place",
        name: `${COMPANY.city}, ${COMPANY.region}, ${COMPANY.country}`,
      },
      founder: FOUNDERS.map((f) => ({ "@id": `${SITE_URL}/about#${f.id}` })),
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 2, maxValue: 10 },
      email: COMPANY.email,
      telephone: COMPANY.phoneE164,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      areaServed: "IN",
      knowsAbout: [
        "Business growth",
        "Website and app development",
        "Custom software development",
        "Business process automation",
        "AI integration",
        "3D web experiences",
        "Restaurant technology",
        "Student transport software",
      ],
      sameAs: [COMPANY.linkedin, COMPANY.crunchbase, COMPANY.instagram, COMPANY.github, COMPANY.medium, COMPANY.facebook],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: COMPANY.email,
        telephone: COMPANY.phoneE164,
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
    // The founders as people of their own, so "Rishi Nakrani" and "Jenish Patel" are tied to
    // Aevinite and to their LinkedIn / Instagram (sameAs) wherever they are searched.
    ...FOUNDERS.map((f) => ({
      "@type": "Person",
      "@id": `${SITE_URL}/about#${f.id}`,
      name: f.name,
      jobTitle: f.role,
      description: f.bio,
      url: `${SITE_URL}/about#${f.id}`,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      homeLocation: { "@type": "Place", name: `${COMPANY.city}, ${COMPANY.region}, ${COMPANY.country}` },
      sameAs: [f.linkedin, f.crunchbase, f.instagram],
    })),
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
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
