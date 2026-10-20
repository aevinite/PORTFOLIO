import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import { SITE_URL } from "@/lib/site";
import { COMPANY, FOUNDERS, FOUNDER_NAMES, FAQ } from "@/lib/company";

// The page that answers "who is Aevinite, who founded it, since when" — for people, for Google
// and for AI assistants (which read the HTML and do not run JavaScript, so everything here is
// plain server-rendered text: no fade-ins that start invisible).
const DESCRIPTION = `Aevinite is a software company in Ahmedabad, founded on 28 July 2024 by ${FOUNDER_NAMES}. Meet the founders and read the company story.`;
const CARD_ALT =
  "Aevinite: Software that runs real businesses. SaaS products, business software and automation.";

export const metadata: Metadata = {
  title: "About Aevinite: Founders & Story",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  // A page's openGraph REPLACES the layout's (no deep merge) — see contact/layout.tsx.
  openGraph: {
    type: "website",
    url: "/about",
    siteName: "Aevinite",
    locale: "en_IN",
    title: "About Aevinite: Founders & Story",
    description: DESCRIPTION,
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: CARD_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Aevinite: Founders & Story",
    description: DESCRIPTION,
    images: [{ url: "/twitter-image.jpg", alt: CARD_ALT }],
  },
};

// The founders themselves (Person) are declared once in layout.tsx; this adds what is specific to
// this page: that it is the About page, where it sits, and the FAQ — word for word as shown below.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about#webpage`,
      url: `${SITE_URL}/about`,
      name: "About Aevinite: Founders & Story",
      description: DESCRIPTION,
      inLanguage: "en-IN",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      mainEntity: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/about#faq`,
      mainEntity: FAQ.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

const FACTS: { label: string; value: string }[] = [
  { label: "Founded", value: `${COMPANY.foundedLabel}, as ${COMPANY.formerName}` },
  { label: "Founders", value: FOUNDER_NAMES },
  { label: "Headquarters", value: `${COMPANY.city}, ${COMPANY.region}, ${COMPANY.country}` },
  { label: "Renamed to Aevinite", value: COMPANY.renamedLabel },
  { label: "What we do", value: "Custom software, SaaS, websites & apps, 3D web, AI automation" },
  { label: "Contact", value: COMPANY.email },
];

const TIMELINE = [
  {
    date: COMPANY.foundedLabel,
    title: `Founded as ${COMPANY.formerName}`,
    text: `${FOUNDER_NAMES} start the company in Ahmedabad.`,
  },
  {
    date: COMPANY.renamedLabel,
    title: "Infinite becomes Aevinite",
    text: "The company takes the name Aevinite, from Aevum: a beginning with no end.",
  },
  {
    date: "Today",
    title: "Software that runs real businesses",
    text: "Aevinite builds SaaS products, business software, websites, 3D web experiences and AI automation for clients across India.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-8 h-px bg-neon-blue/60" />
      {/* /70 not /60: small mono text needs the stronger contrast. */}
      <span className="text-[11px] uppercase tracking-[0.35em] text-neon-cyan/70 font-mono">{children}</span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
      />
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 w-full pt-32 md:pt-40 pb-24">
        {/* ── Intro ─────────────────────────────────────────────── */}
        <section className="container mx-auto px-6 md:px-12">
          <nav aria-label="Breadcrumb" className="text-xs font-mono uppercase tracking-widest text-white/50 mb-8">
            <Link href="/" className="interactive inline-block py-1 hover:text-neon-blue transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">About</span>
          </nav>
          <Eyebrow>Who we are</Eyebrow>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] max-w-4xl">
            About <span className="text-neon-blue text-glow">Aevinite</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mt-8 max-w-3xl">
            Aevinite is a software company based in {COMPANY.city}, {COMPANY.region}, {COMPANY.country}.
            It was founded on {COMPANY.foundedLabel} by{" "}
            <a href={`#${FOUNDERS[0].id}`} className="interactive text-white hover:text-neon-blue transition-colors">{FOUNDERS[0].name}</a>{" "}
            ({FOUNDERS[0].role}) and{" "}
            <a href={`#${FOUNDERS[1].id}`} className="interactive text-white hover:text-neon-blue transition-colors">{FOUNDERS[1].name}</a>{" "}
            ({FOUNDERS[1].role}) under the name {COMPANY.formerName}, and became Aevinite on {COMPANY.renamedLabel}.
            We build custom business software, SaaS products, websites and apps, 3D web experiences and
            AI automation: software that runs real businesses.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px mt-14 rounded-2xl overflow-hidden border border-white/10 bg-white/10">
            {FACTS.map((f) => (
              <div key={f.label} className="bg-black/80 p-6">
                <dt className="text-[11px] uppercase tracking-[0.25em] text-white/50 font-mono">{f.label}</dt>
                <dd className="text-white text-base md:text-lg mt-2 break-words">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-white/60 mt-6">
            Aevinite elsewhere:{" "}
            {[
              ["LinkedIn", COMPANY.linkedin],
              ["Crunchbase", COMPANY.crunchbase],
              ["Instagram", COMPANY.instagram],
              ["GitHub", COMPANY.github],
            ].map(([label, href], i) => (
              <span key={label}>
                {i > 0 && " · "}
                <a href={href} target="_blank" rel="noopener noreferrer" className="interactive inline-block py-1 text-white/80 hover:text-neon-blue transition-colors">
                  {label}
                </a>
              </span>
            ))}
          </p>
        </section>

        {/* ── Founders ──────────────────────────────────────────── */}
        <section className="container mx-auto px-6 md:px-12 mt-28" aria-labelledby="founders">
          <Eyebrow>Leadership</Eyebrow>
          <h2 id="founders" className="text-4xl md:text-5xl font-bold text-white">The founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {FOUNDERS.map((f) => (
              <article
                key={f.id}
                id={f.id}
                className="glass-panel rounded-3xl p-8 md:p-10 scroll-mt-32 flex flex-col"
              >
                <div className="flex items-center gap-5">
                  <div
                    aria-hidden="true"
                    className="w-16 h-16 shrink-0 rounded-full border border-neon-blue/40 bg-neon-blue/10 flex items-center justify-center text-neon-blue text-xl font-bold tracking-wider"
                  >
                    {f.name.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{f.name}</h3>
                    <p className="text-neon-blue text-sm uppercase tracking-widest mt-1">
                      {f.role}, Aevinite
                    </p>
                  </div>
                </div>
                <p className="text-white/65 leading-relaxed mt-6 flex-1">{f.bio}</p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/80 text-sm hover:border-neon-blue hover:text-neon-blue transition-colors"
                  >
                    LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only">profile of {f.name}</span>
                  </a>
                  <a
                    href={f.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/80 text-sm hover:border-neon-blue hover:text-neon-blue transition-colors"
                  >
                    Instagram <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only">profile of {f.name}</span>
                  </a>
                  {/* Visible links (not just JSON-LD sameAs) so search engines crawl each founder's
                      Crunchbase page and tie the common name "Jenish Patel" to this person. */}
                  <a
                    href={f.crunchbase}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/80 text-sm hover:border-neon-blue hover:text-neon-blue transition-colors"
                  >
                    Crunchbase <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only">profile of {f.name}</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Story ─────────────────────────────────────────────── */}
        <section className="container mx-auto px-6 md:px-12 mt-28" aria-labelledby="story">
          <Eyebrow>Our story</Eyebrow>
          <h2 id="story" className="text-4xl md:text-5xl font-bold text-white">From Infinite to Aevinite</h2>
          <ol className="mt-10 border-l border-white/15 ml-2">
            {TIMELINE.map((t) => (
              <li key={t.title} className="relative pl-8 md:pl-10 pb-12 last:pb-0">
                <span aria-hidden="true" className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-neon-blue shadow-[0_0_12px_rgba(51,187,255,0.7)]" />
                <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan/70">{t.date}</p>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-2">{t.title}</h3>
                <p className="text-white/60 leading-relaxed mt-2 max-w-2xl">{t.text}</p>
              </li>
            ))}
          </ol>

          <div className="glass-panel rounded-3xl p-8 md:p-10 mt-16 max-w-3xl">
            <h3 className="text-xl font-bold text-white">What the name means</h3>
            <p className="text-white/65 leading-relaxed mt-3">
              <span className="text-white">Aevinite</span> is derived from <span className="text-white">Aevum</span>, a
              dimension of existence with a beginning but no end, and it echoes{" "}
              <span className="text-white">Infinite</span>, the name the company started with. Hence the tagline:{" "}
              <span className="text-neon-blue">The beginning with no end.</span>
            </p>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section className="container mx-auto px-6 md:px-12 mt-28" aria-labelledby="faq">
          <Eyebrow>Questions</Eyebrow>
          <h2 id="faq" className="text-4xl md:text-5xl font-bold text-white">Frequently asked questions</h2>
          <dl className="mt-10 max-w-4xl divide-y divide-white/10 border-y border-white/10">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="py-7">
                <dt className="text-lg md:text-xl font-bold text-white">{q}</dt>
                <dd className="text-white/65 leading-relaxed mt-2">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="container mx-auto px-6 md:px-12 mt-28">
          <div className="glass-panel rounded-3xl p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Have a project in mind?</h2>
              <p className="text-white/60 mt-3">Talk to the founders directly: {COMPANY.email} · {COMPANY.phoneDisplay}</p>
            </div>
            <Link
              href="/contact"
              className="interactive inline-flex items-center gap-2 self-start md:self-auto px-8 py-4 rounded-full border border-neon-blue/50 text-neon-blue uppercase tracking-widest text-sm hover:bg-neon-blue/10 hover:box-glow transition-all duration-300"
            >
              Contact us <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
