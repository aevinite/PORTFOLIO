import type { Metadata } from "next";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmPlayer from "@/components/FilmPlayer";
import { Arrow, Breadcrumb, ButtonLink, Eyebrow } from "@/components/ui";
import { FILMS as FILM_DATA, FILM_CREDIT } from "@/data/films";
import { SITE_URL } from "@/lib/site";
import { COMPANY, FOUNDER_NAMES } from "@/lib/company";

// Aevidine's own page: the one place on the web that says what Aevidine is. Before it existed,
// ChatGPT searched "Aevidine restaurant software" / "Aevidine restaurant POS software company"
// (seen in its search log, 31 Oct 2026), found nothing and guessed another product. So the
// address, title, heading and first sentence use those words. Plain server-rendered text, as on
// /about: AI crawlers read the HTML and do not run JavaScript.
const TITLE = "Aevidine: Restaurant Software for QR Ordering, KOT & Billing";
const DESCRIPTION =
  "Aevidine is restaurant management software by Aevinite, Ahmedabad: QR code ordering at the table, a kitchen screen and KOT printing, waiter and manager screens, GST bills and owner reports.";
const CARD_ALT =
  "Aevinite: We help businesses grow. Websites, software and automation built around how each business works.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/aevidine" },
  // A page's openGraph REPLACES the layout's (no deep merge) — see contact/layout.tsx.
  openGraph: {
    type: "website",
    url: "/aevidine",
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

// One screen per person who works in the restaurant — the way the product is actually split.
const SCREENS: { who: string; title: string; text: string }[] = [
  {
    who: "Guests",
    title: "QR code menu and ordering",
    text: "Guests scan the QR code on their table and order from their phone. No app to download: the menu opens in the browser, with categories, search, veg and non-veg filters, and a page for every dish with photos, price and nutrition.",
  },
  {
    who: "Kitchen",
    title: "Kitchen screen and KOT printing",
    text: "Every order reaches the kitchen the moment it is placed, as a KOT (kitchen order ticket) on the kitchen screen and on the kitchen printer, so nothing is lost between the table and the cook.",
  },
  {
    who: "Waiters",
    title: "Waiter tablet",
    text: "Waiters take orders at the table, see which tables are busy, move orders and close bills from a tablet or phone.",
  },
  {
    who: "Managers",
    title: "Manager panel",
    text: "Managers edit the menu, prices and categories, and run the floor and the day's bills.",
  },
  {
    who: "Owner",
    title: "Owner reports",
    text: "The owner sees sales, bills and how the day is going, from anywhere, with daily reports and GST summaries.",
  },
];

const FEATURES = [
  "QR code ordering at the table",
  "Kitchen screen and KOT printing",
  "Table management for waiters",
  "Bills, GST invoices and discounts",
  "Daily sales and owner reports",
  "Keeps working on a weak or lost internet connection",
  "Live updates on every screen",
  "Each restaurant's own name, colours and branding",
  "Menu in more than one language",
  "Optional 3D view of dishes",
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is Aevidine?",
    a: "Aevidine is restaurant management software. Guests order from a QR code menu at the table; the kitchen receives each order as a KOT on a screen and a printer; waiters, managers and the owner run tables, bills and reports from their own screens.",
  },
  {
    q: "Who makes Aevidine?",
    a: `Aevidine is made by Aevinite, a company that helps businesses grow, based in ${COMPANY.city}, ${COMPANY.region}, India, founded by ${FOUNDER_NAMES}.`,
  },
  {
    q: "Do guests need to download an app?",
    a: "No. Guests scan the QR code on the table and the menu opens in their phone's browser.",
  },
  {
    q: "Does Aevidine print KOTs and bills?",
    a: "Yes. Orders print as KOTs (kitchen order tickets) in the kitchen, and bills and GST invoices print at the counter.",
  },
  {
    q: "What happens if the internet goes down?",
    a: "The screens keep working. Orders taken while offline are saved and sent as soon as the connection is back.",
  },
  {
    q: "Where is Aevidine available?",
    a: `Aevidine is built in ${COMPANY.city} and is available to restaurants, cafés and bakeries across India.`,
  },
  {
    q: "How much does Aevidine cost, and can I see a demo?",
    a: `Pricing depends on the restaurant. For a free demo and a quote, email ${COMPANY.email} or call or WhatsApp ${COMPANY.phoneDisplay}.`,
  },
];

// The product films live in src/data/films.ts (shared with the home page).
const FILMS = [FILM_DATA.onePlatform, FILM_DATA.guestMenu];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/aevidine#software`,
      name: "Aevidine",
      alternateName: ["AeviDine", "Aevidine restaurant software"],
      url: `${SITE_URL}/aevidine`,
      description: DESCRIPTION,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Restaurant management software",
      operatingSystem: "Web browser (phone, tablet, computer)",
      image: `${SITE_URL}/projects/aevidine/1-home.webp`,
      featureList: FEATURES,
      areaServed: "IN",
      inLanguage: "en-IN",
      creator: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    ...FILMS.map((f) => ({
      "@type": "VideoObject",
      "@id": `${SITE_URL}/aevidine#film-${f.id}`,
      name: f.title,
      description: f.description,
      thumbnailUrl: `${SITE_URL}${f.poster}`,
      contentUrl: `${SITE_URL}${f.src}`,
      uploadDate: f.uploadDate,
      duration: f.duration,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
      about: { "@id": `${SITE_URL}/aevidine#software` },
    })),
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/aevidine#webpage`,
      url: `${SITE_URL}/aevidine`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en-IN",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/aevidine#software` },
      mainEntity: { "@id": `${SITE_URL}/aevidine#software` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Aevidine", item: `${SITE_URL}/aevidine` },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/aevidine#faq`,
      mainEntity: FAQ.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function AevidinePage() {
  const one = FILM_DATA.onePlatform;
  const guest = FILM_DATA.guestMenu;
  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main className="relative w-full pt-32 md:pt-40 pb-12">
        {/* ── Intro ─────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 md:px-10">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Aevidine" }]} />
          <Eyebrow tone="gold">Our product</Eyebrow>
          <h1 className="display text-[clamp(3.4rem,10vw,8rem)] text-ink">
            Aevi<span className="serif-accent text-gold">dine</span>
            <span className="block mt-5 text-[clamp(1.5rem,3.2vw,2.6rem)] font-medium tracking-tight leading-tight text-muted">
              Restaurant software for QR ordering, KOT and billing
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed mt-8 max-w-3xl">
            Aevidine is restaurant management software made by{" "}
            <Link href="/about" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-gold">Aevinite</Link>{" "}
            in {COMPANY.city}. Guests order from a QR code menu at the table, the kitchen gets every order as a
            KOT, and waiters, managers and the owner run tables, bills and reports from their own screens. It works
            on any phone, tablet or computer, and keeps working when the internet drops.
          </p>
          <div className="flex flex-wrap gap-3 mt-10">
            <ButtonLink href="/contact" look="gold" size="lg">
              Book a free demo <Arrow />
            </ButtonLink>
            <ButtonLink href="#film" look="ghost" size="lg">
              Watch it work
            </ButtonLink>
          </div>

          <figure id="film" className="mt-16 scroll-mt-28">
            <FilmPlayer preview={one.preview} src={one.src} poster={one.poster} title={one.title} chapters={[...one.chapters]} />
            <figcaption className="text-sm text-subtle mt-4 max-w-3xl">
              {one.title} ({one.length}): {one.description} {FILM_CREDIT}.
            </figcaption>
          </figure>
        </section>

        {/* ── Screens ───────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 md:px-10 mt-32" aria-labelledby="screens">
          <Eyebrow tone="gold">How it works</Eyebrow>
          <h2 id="screens" className="display text-[clamp(2.4rem,5vw,4.2rem)] text-ink max-w-3xl">
            One system, a screen for <span className="serif-accent text-gold">everyone.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {SCREENS.map((s, i) => (
              <article key={s.title} className="rounded-[24px] bg-surface edge shadow-card p-8 flex flex-col">
                <p className="flex items-center justify-between text-sm">
                  <span className="text-gold font-medium">{s.who}</span>
                  <span className="tabular-nums text-subtle">0{i + 1}</span>
                </p>
                <h3 className="text-2xl font-medium tracking-tight text-ink mt-6">{s.title}</h3>
                <p className="text-muted leading-relaxed mt-3">{s.text}</p>
              </article>
            ))}
            <article className="rounded-[24px] bg-gold-soft p-8 flex flex-col justify-between">
              <p className="text-2xl font-medium tracking-tight text-ink">See it running in your restaurant.</p>
              <ButtonLink href="/contact" look="gold" className="self-start mt-8">
                Book a free demo <Arrow />
              </ButtonLink>
            </article>
          </div>
        </section>

        {/* ── Guest film ────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 md:px-10 mt-32 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center" aria-labelledby="guest-film">
          <div>
            <Eyebrow tone="gold">Watch</Eyebrow>
            <h2 id="guest-film" className="display text-[clamp(2.4rem,5vw,4.2rem)] text-ink">
              What the <span className="serif-accent text-gold">guest</span> sees.
            </h2>
            <p className="text-muted text-lg leading-relaxed mt-6">{guest.description}</p>
          </div>
          <figure>
            <FilmPlayer src={guest.src} poster={guest.poster} title={guest.title} />
            <figcaption className="text-sm text-subtle mt-4">
              {guest.title} ({guest.length}) · {FILM_CREDIT}
            </figcaption>
          </figure>
        </section>

        {/* ── Features ──────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 md:px-10 mt-32" aria-labelledby="features">
          <Eyebrow tone="gold">Features</Eyebrow>
          <h2 id="features" className="display text-[clamp(2.4rem,5vw,4.2rem)] text-ink">What Aevidine does</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 border-t border-line mt-12">
            {FEATURES.map((f, i) => (
              <li key={f} className={`flex items-baseline gap-4 py-5 border-b border-line text-lg text-ink ${i % 2 ? "sm:pl-8" : "sm:pr-8"}`}>
                <span className="tabular-nums text-sm text-gold w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 md:px-10 mt-32 grid lg:grid-cols-[0.8fr_1.2fr] gap-10" aria-labelledby="faq">
          <div>
            <Eyebrow tone="gold">Questions</Eyebrow>
            <h2 id="faq" className="display text-[clamp(2.4rem,5vw,4.2rem)] text-ink">Frequently asked questions</h2>
          </div>
          <dl className="border-t border-line">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="py-7 border-b border-line">
                <dt className="text-xl font-medium tracking-tight text-ink">{q}</dt>
                <dd className="text-muted leading-relaxed mt-2 select-text">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 md:px-10 mt-32">
          <div className="rounded-[32px] bg-surface edge shadow-float p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h2 className="display text-4xl md:text-5xl text-ink">See Aevidine in your restaurant</h2>
              <p className="text-muted mt-4 select-text">Free demo: {COMPANY.email} · {COMPANY.phoneDisplay}</p>
            </div>
            <ButtonLink href="/contact" look="gold" size="lg" className="self-start md:self-auto">
              Contact us <Arrow />
            </ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
