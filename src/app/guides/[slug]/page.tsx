import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Eyebrow } from "@/components/ui";
import { SITE_URL } from "@/lib/site";
import { COMPANY } from "@/lib/company";
import { GUIDES, guidePath } from "@/data/guides";

// One page per guide (src/data/guides.ts). Plain server-rendered text, as on /about and /aevidine:
// AI crawlers read the HTML and do not run JavaScript. The first paragraph is the direct answer —
// the part an assistant quotes.
const CARD_ALT =
  "Aevinite: We help businesses grow. Websites, software and automation built around how each business works.";

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
      <Navbar />
      <main className="relative z-10 w-full pt-32 md:pt-40 pb-24">
        <article className="max-w-7xl mx-auto px-5 md:px-10 max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-sm text-subtle mb-10">
            <Link href="/" className=" inline-block py-1 hover:text-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/guides" className=" inline-block py-1 hover:text-accent transition-colors">Guides</Link>
          </nav>
          <Eyebrow>Guide · {g.readMinutes} min read</Eyebrow>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-ink leading-[1.1]">{g.title}</h1>
          <p className="text-sm text-subtle mt-6">
            By <Link href="/about" className=" text-muted hover:text-accent transition-colors">Aevinite</Link>, {COMPANY.city} · <time dateTime={g.published}>{date}</time>
          </p>
          <p className="text-lg md:text-xl text-ink font-light leading-relaxed mt-10">{g.answer}</p>

          {g.sections.map((s) => (
            <section key={s.heading} className="mt-14">
              <h2 className="display text-2xl md:text-3xl text-ink">{s.heading}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="text-muted text-lg leading-relaxed mt-5">{p}</p>
              ))}
              {s.list && (
                <ul className="mt-6 space-y-3">
                  {s.list.map((item) => (
                    <li key={item} className="flex gap-3 text-ink text-lg leading-relaxed">
                      <span aria-hidden="true" className="mt-3 w-1.5 h-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="bg-surface edge shadow-card rounded-3xl p-8 md:p-10 mt-16">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-ink">How Aevidine does it</h2>
            <p className="text-muted leading-relaxed mt-3">{g.aevidine}</p>
            <Link
              href="/aevidine"
              className=" inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-ink text-bg dark:bg-accent dark:text-accent-ink font-medium hover:opacity-90 text-xs hover:bg-accent-soft transition-colors"
            >
              See Aevidine <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </section>

          <section className="mt-16" aria-labelledby="faq">
            <h2 id="faq" className="display text-2xl md:text-3xl text-ink">Questions</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {g.faq.map(({ q, a }) => (
                <div key={q} className="py-6">
                  <dt className="text-lg font-semibold tracking-tight text-ink">{q}</dt>
                  <dd className="text-muted leading-relaxed mt-2">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <p className="text-sm text-subtle mt-12">
            More guides: {" "}
            {GUIDES.filter((x) => x.slug !== g.slug).map((x, i) => (
              <span key={x.slug}>
                {i > 0 && " · "}
                <Link href={guidePath(x)} className=" text-muted hover:text-accent transition-colors">{x.title}</Link>
              </span>
            ))}
          </p>
        </article>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
