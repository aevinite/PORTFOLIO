import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import { SITE_URL } from "@/lib/site";
import { GUIDES, guidePath } from "@/data/guides";

const TITLE = "Restaurant Guides: QR Ordering, KOT and GST Bills | Aevinite";
const DESCRIPTION =
  "Plain guides for restaurant owners in India: how QR code ordering works, what a KOT is, what a GST bill must show, and choosing restaurant software in Ahmedabad.";
const CARD_ALT =
  "Aevinite: We help businesses grow. Websites, software and automation built around how each business works.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/guides" },
  // A page's openGraph REPLACES the layout's (no deep merge) — see contact/layout.tsx.
  openGraph: {
    type: "website",
    url: "/guides",
    siteName: "Aevinite",
    locale: "en_IN",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: CARD_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/twitter-image.jpg", alt: CARD_ALT }],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/guides#webpage`,
      url: `${SITE_URL}/guides`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en-IN",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      hasPart: GUIDES.map((g) => ({ "@id": `${SITE_URL}${guidePath(g)}#article` })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
      ],
    },
  ],
};

export default function GuidesPage() {
  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
      />
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 w-full pt-32 md:pt-40 pb-24">
        <section className="container mx-auto px-6 md:px-12 max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-xs font-mono uppercase tracking-widest text-white/50 mb-8">
            <Link href="/" className="interactive inline-block py-1 hover:text-neon-blue transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Guides</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05]">Guides for restaurant owners</h1>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mt-8 max-w-3xl">{DESCRIPTION}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
            {GUIDES.map((g) => (
              <Link
                key={g.slug}
                href={guidePath(g)}
                className="interactive glass-panel rounded-3xl p-8 flex flex-col hover:border-neon-blue/50 transition-colors"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan/70">{g.readMinutes} min read</p>
                <h2 className="text-xl font-bold text-white mt-3 leading-snug">{g.title}</h2>
                <p className="text-white/60 leading-relaxed mt-3 flex-1">{g.description}</p>
                <span className="inline-flex items-center gap-2 text-neon-blue text-sm mt-6">
                  Read <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
