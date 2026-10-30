import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import { SITE_URL } from "@/lib/site";
import { COMPANY } from "@/lib/company";
import { GUIDES, guidePath } from "@/data/guides";

// One page per guide (src/data/guides.ts). Plain server-rendered text, as on /about and /aevidine:
// AI crawlers read the HTML and do not run JavaScript. The first paragraph is the direct answer —
// the part an assistant quotes.
const CARD_ALT =
  "Aevinite: Software that runs real businesses. SaaS products, business software and automation.";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) return {};
  return {
    title: { absolute: g.title },
    description: g.description,
    alternates: { canonical: guidePath(g) },
    // A page's openGraph REPLACES the layout's (no deep merge) — see contact/layout.tsx.
    openGraph: {
      type: "article",
      url: guidePath(g),
      siteName: "Aevinite",
      locale: "en_IN",
      title: g.title,
      description: g.description,
      publishedTime: g.published,
      images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: CARD_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title: g.title,
      description: g.description,
      images: [{ url: "/twitter-image.jpg", alt: CARD_ALT }],
    },
  };
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-8 h-px bg-neon-blue/60" />
      {/* /70 not /60: small mono text needs the stronger contrast. */}
      <span className="text-[11px] uppercase tracking-[0.35em] text-neon-cyan/70 font-mono">{children}</span>
    </div>
  );
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) notFound();
  const url = `${SITE_URL}${guidePath(g)}`;
  const date = new Date(g.published).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: g.title,
        description: g.description,
        url,
        mainEntityOfPage: url,
        datePublished: g.published,
        dateModified: g.published,
        inLanguage: "en-IN",
        image: `${SITE_URL}/opengraph-image.jpg`,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mentions: { "@id": `${SITE_URL}/aevidine#software` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
          { "@type": "ListItem", position: 3, name: g.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: g.faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 w-full pt-32 md:pt-40 pb-24">
        <article className="container mx-auto px-6 md:px-12 max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-xs font-mono uppercase tracking-widest text-white/50 mb-8">
            <Link href="/" className="interactive inline-block py-1 hover:text-neon-blue transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/guides" className="interactive inline-block py-1 hover:text-neon-blue transition-colors">Guides</Link>
          </nav>
          <Eyebrow>Guide · {g.readMinutes} min read</Eyebrow>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1]">{g.title}</h1>
          <p className="text-sm text-white/50 mt-6">
            By <Link href="/about" className="interactive text-white/70 hover:text-neon-blue transition-colors">Aevinite</Link>, {COMPANY.city} · <time dateTime={g.published}>{date}</time>
          </p>
          <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mt-10">{g.answer}</p>

          {g.sections.map((s) => (
            <section key={s.heading} className="mt-14">
              <h2 className="text-2xl md:text-3xl font-bold text-white">{s.heading}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="text-white/70 text-lg leading-relaxed mt-5">{p}</p>
              ))}
              {s.list && (
                <ul className="mt-6 space-y-3">
                  {s.list.map((item) => (
                    <li key={item} className="flex gap-3 text-white/75 text-lg leading-relaxed">
                      <span aria-hidden="true" className="mt-3 w-1.5 h-1.5 shrink-0 rounded-full bg-neon-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="glass-panel rounded-3xl p-8 md:p-10 mt-16">
            <h2 className="text-xl md:text-2xl font-bold text-white">How Aevidine does it</h2>
            <p className="text-white/70 leading-relaxed mt-3">{g.aevidine}</p>
            <Link
              href="/aevidine"
              className="interactive inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full border border-neon-blue/50 text-neon-blue uppercase tracking-widest text-xs hover:bg-neon-blue/10 transition-colors"
            >
              See Aevidine <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </section>

          <section className="mt-16" aria-labelledby="faq">
            <h2 id="faq" className="text-2xl md:text-3xl font-bold text-white">Questions</h2>
            <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {g.faq.map(({ q, a }) => (
                <div key={q} className="py-6">
                  <dt className="text-lg font-bold text-white">{q}</dt>
                  <dd className="text-white/65 leading-relaxed mt-2">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <p className="text-sm text-white/50 mt-12">
            More guides: {" "}
            {GUIDES.filter((x) => x.slug !== g.slug).map((x, i) => (
              <span key={x.slug}>
                {i > 0 && " · "}
                <Link href={guidePath(x)} className="interactive text-white/70 hover:text-neon-blue transition-colors">{x.title}</Link>
              </span>
            ))}
          </p>
        </article>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
