import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Eyebrow } from "@/components/ui";
import { SITE_URL } from "@/lib/site";
import { COMPANY, FOUNDERS, FOUNDER_NAMES, FAQ } from "@/lib/company";

// The page that answers "who is Aevinite, who founded it, since when" — for people, for Google
// and for AI assistants (which read the HTML and do not run JavaScript, so everything here is
// plain server-rendered text: no fade-ins that start invisible).
const DESCRIPTION = `Aevinite helps businesses grow. Based in Ahmedabad, founded on 28 July 2024 by ${FOUNDER_NAMES}. Meet the founders and read the company story.`;
const CARD_ALT =
  "Aevinite: We help businesses grow. Websites, software and automation built around how each business works.";

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
  { label: "What we do", value: "We help businesses grow: websites, software and automation" },
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
    title: "We help businesses grow",
    text: "Aevinite helps businesses across India grow, with websites, software and automation built around how each one works. Our own product, Aevidine, runs restaurants.",
  },
];

export default function AboutPage() {
  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main className="relative z-10 w-full pt-32 md:pt-40 pb-24">
        {/* ── Intro ─────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 md:px-10">
          <nav aria-label="Breadcrumb" className="text-sm text-subtle mb-10">
            <Link href="/" className=" inline-block py-1 hover:text-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-muted">About</span>
          </nav>
          <Eyebrow>Who we are</Eyebrow>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-ink leading-[1.05] max-w-4xl">
            About <span className="serif-accent text-accent">Aevinite</span>
          </h1>
          <p className="text-lg md:text-xl text-muted font-light leading-relaxed mt-8 max-w-3xl">
            Aevinite is a company based in {COMPANY.city}, {COMPANY.region}, {COMPANY.country}.
            It was founded on {COMPANY.foundedLabel} by{" "}
            <a href={`#${FOUNDERS[0].id}`} className=" text-ink hover:text-accent transition-colors">{FOUNDERS[0].name}</a>{" "}
            ({FOUNDERS[0].role}) and{" "}
            <a href={`#${FOUNDERS[1].id}`} className=" text-ink hover:text-accent transition-colors">{FOUNDERS[1].name}</a>{" "}
            ({FOUNDERS[1].role}) under the name {COMPANY.formerName}, and became Aevinite on {COMPANY.renamedLabel}.
            We help businesses grow, with websites, software and automation built around how each
            business works. Our own product, Aevidine, is restaurant software.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px mt-14 rounded-2xl overflow-hidden border border-line bg-surface-2">
            {FACTS.map((f) => (
              <div key={f.label} className="bg-surface p-6">
                <dt className="text-[11px] uppercase tracking-[0.25em] text-subtle">{f.label}</dt>
                <dd className="text-ink text-base md:text-lg mt-2 break-words">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-muted mt-6">
            Aevinite elsewhere:{" "}
            {[
              ["LinkedIn", COMPANY.linkedin],
              ["Crunchbase", COMPANY.crunchbase],
              ["Instagram", COMPANY.instagram],
              ["GitHub", COMPANY.github],
            ].map(([label, href], i) => (
              <span key={label}>
                {i > 0 && " · "}
                <a href={href} target="_blank" rel="noopener noreferrer" className=" inline-block py-1 text-ink hover:text-accent transition-colors">
                  {label}
                </a>
              </span>
            ))}
          </p>
        </section>

        {/* ── Founders ──────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 md:px-10 mt-28" aria-labelledby="founders">
          <Eyebrow>Leadership</Eyebrow>
          <h2 id="founders" className="display text-4xl md:text-5xl text-ink">The founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {FOUNDERS.map((f) => (
              <article
                key={f.id}
                id={f.id}
                className="bg-surface edge shadow-card rounded-3xl p-8 md:p-10 scroll-mt-32 flex flex-col"
              >
                <div className="flex items-center gap-5">
                  <div
                    aria-hidden="true"
                    className="w-16 h-16 shrink-0 rounded-full border border-accent bg-accent-soft flex items-center justify-center text-accent text-xl font-bold tracking-wider"
                  >
                    {f.name.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <div>
                    <h3 className="display text-2xl md:text-3xl text-ink">{f.name}</h3>
                    <p className="text-accent text-sm uppercase tracking-widest mt-1">
                      {f.role}, Aevinite
                    </p>
                  </div>
                </div>
                <p className="text-muted leading-relaxed mt-6 flex-1">{f.bio}</p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-line-strong text-ink text-sm hover:border-accent hover:text-accent transition-colors"
                  >
                    LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only">profile of {f.name}</span>
                  </a>
                  <a
                    href={f.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-line-strong text-ink text-sm hover:border-accent hover:text-accent transition-colors"
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
                    className=" inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-line-strong text-ink text-sm hover:border-accent hover:text-accent transition-colors"
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
        <section className="max-w-7xl mx-auto px-5 md:px-10 mt-28" aria-labelledby="story">
          <Eyebrow>Our story</Eyebrow>
          <h2 id="story" className="display text-4xl md:text-5xl text-ink">From Infinite to Aevinite</h2>
          <ol className="mt-10 border-l border-line-strong ml-2">
            {TIMELINE.map((t) => (
              <li key={t.title} className="relative pl-8 md:pl-10 pb-12 last:pb-0">
                <span aria-hidden="true" className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-accent" />
                <p className=" text-xs uppercase tracking-widest text-accent">{t.date}</p>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-ink mt-2">{t.title}</h3>
                <p className="text-muted leading-relaxed mt-2 max-w-2xl">{t.text}</p>
              </li>
            ))}
          </ol>

          <div className="bg-surface edge shadow-card rounded-3xl p-8 md:p-10 mt-16 max-w-3xl">
            <h3 className="text-xl font-semibold tracking-tight text-ink">What the name means</h3>
            <p className="text-muted leading-relaxed mt-3">
              <span className="text-ink">Aevinite</span> is derived from <span className="text-ink">Aevum</span>, a
              dimension of existence with a beginning but no end, and it echoes{" "}
              <span className="text-ink">Infinite</span>, the name the company started with. Hence the tagline:{" "}
              <span className="text-accent">The beginning with no end.</span>
            </p>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 md:px-10 mt-28" aria-labelledby="faq">
          <Eyebrow>Questions</Eyebrow>
          <h2 id="faq" className="display text-4xl md:text-5xl text-ink">Frequently asked questions</h2>
          <dl className="mt-10 max-w-4xl divide-y divide-line border-y border-line">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="py-7">
                <dt className="text-lg md:text-xl font-semibold tracking-tight text-ink">{q}</dt>
                <dd className="text-muted leading-relaxed mt-2">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 md:px-10 mt-28">
          <div className="bg-surface edge shadow-card rounded-3xl p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h2 className="display text-3xl md:text-4xl text-ink">Have a project in mind?</h2>
              <p className="text-muted mt-3">Talk to the founders directly: {COMPANY.email} · {COMPANY.phoneDisplay}</p>
            </div>
            <Link
              href="/contact"
              className=" inline-flex items-center gap-2 self-start md:self-auto px-8 py-4 rounded-full bg-ink text-bg dark:bg-accent dark:text-accent-ink font-medium hover:opacity-90 text-[15px] transition-all duration-200"
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
