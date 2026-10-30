import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
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
  "Aevinite: Software that runs real businesses. SaaS products, business software and automation.";

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
    a: `Aevidine is made by Aevinite, a software company in ${COMPANY.city}, ${COMPANY.region}, India, founded by ${FOUNDER_NAMES}.`,
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

// The product films (made from the real app; full 4K masters live in brag-output). Shown here while
// there is no public live demo; each is also a VideoObject below so it can appear in video results.
const FILMS = [
  {
    id: "one-platform",
    title: "Aevidine: one platform for the whole restaurant",
    length: "1 min 14 s",
    duration: "PT1M14S",
    uploadDate: "2026-10-08",
    src: "/films/aevidine-one-platform.mp4",
    poster: "/films/aevidine-one-platform.jpg",
    description:
      "From paper tickets to one system: the guest orders by QR code, the kitchen gets the KOT, every table shows its status live, and the owner sees the day.",
  },
  {
    id: "guest-menu",
    title: "Aevidine guest menu: from the QR code on the table to the kitchen",
    length: "3 min 24 s",
    duration: "PT3M24S",
    uploadDate: "2026-10-03",
    src: "/films/aevidine-guest-menu.mp4",
    poster: "/films/aevidine-guest-menu.jpg",
    description:
      "The guest scans the QR sticker, browses the menu with search and filters, opens each dish with its allergens, sees it in 3D, and orders; the allergy note reaches the kitchen ticket. Six languages.",
  },
];

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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-8 h-px bg-neon-blue/60" />
      {/* /70 not /60: small mono text needs the stronger contrast. */}
      <span className="text-[11px] uppercase tracking-[0.35em] text-neon-cyan/70 font-mono">{children}</span>
    </div>
  );
}

export default function AevidinePage() {
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
            <span className="text-white/70">Aevidine</span>
          </nav>
          <Eyebrow>Our product</Eyebrow>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] max-w-4xl">
            <span className="text-neon-blue text-glow">Aevidine</span>
            <span className="block text-2xl md:text-4xl font-semibold text-white/85 mt-4 leading-snug">
              Restaurant software for QR ordering, KOT and billing
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mt-8 max-w-3xl">
            Aevidine is restaurant management software made by{" "}
            <Link href="/about" className="interactive text-white hover:text-neon-blue transition-colors">Aevinite</Link>{" "}
            in {COMPANY.city}. Guests order from a QR code menu at the table, the kitchen gets every order as a
            KOT, and waiters, managers and the owner run tables, bills and reports from their own screens. It works
            on any phone, tablet or computer, and keeps working when the internet drops.
          </p>
          <div className="flex flex-wrap gap-3 mt-10">
            <Link
              href="/contact"
              className="interactive inline-flex items-center gap-2 px-8 py-4 rounded-full border border-neon-blue/50 text-neon-blue uppercase tracking-widest text-sm hover:bg-neon-blue/10 hover:box-glow transition-all duration-300"
            >
              Book a free demo <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <figure className="mt-16 rounded-3xl overflow-hidden border border-white/10 max-w-5xl">
            {/* preload="none": nothing downloads until someone presses play (8 MB film). */}
            <video
              src={FILMS[0].src}
              poster={FILMS[0].poster}
              controls
              preload="none"
              playsInline
              className="w-full h-auto block aspect-video bg-black"
            >
              {FILMS[0].title}
            </video>
            <figcaption className="text-sm text-white/55 px-6 py-4 bg-black/60">
              {FILMS[0].title} ({FILMS[0].length}): {FILMS[0].description} Music by Sascha Ende at ende.app (CC BY 4.0).
            </figcaption>
          </figure>
        </section>

        {/* ── Screens ───────────────────────────────────────────── */}
        <section className="container mx-auto px-6 md:px-12 mt-28" aria-labelledby="screens">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="screens" className="text-4xl md:text-5xl font-bold text-white">One system, a screen for everyone</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {SCREENS.map((s) => (
              <article key={s.title} className="glass-panel rounded-3xl p-8">
                <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan/70">{s.who}</p>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-3">{s.title}</h3>
                <p className="text-white/65 leading-relaxed mt-3">{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Guest film ────────────────────────────────────────── */}
        <section className="container mx-auto px-6 md:px-12 mt-28" aria-labelledby="guest-film">
          <Eyebrow>Watch</Eyebrow>
          <h2 id="guest-film" className="text-4xl md:text-5xl font-bold text-white">What the guest sees</h2>
          <p className="text-white/65 leading-relaxed mt-4 max-w-3xl">{FILMS[1].description}</p>
          <figure className="mt-10 rounded-3xl overflow-hidden border border-white/10 max-w-5xl">
            <video
              src={FILMS[1].src}
              poster={FILMS[1].poster}
              controls
              preload="none"
              playsInline
              className="w-full h-auto block aspect-video bg-black"
            >
              {FILMS[1].title}
            </video>
            <figcaption className="text-sm text-white/55 px-6 py-4 bg-black/60">
              {FILMS[1].title} ({FILMS[1].length}) · Music by Sascha Ende at ende.app (CC BY 4.0)
            </figcaption>
          </figure>
        </section>

        {/* ── Features ──────────────────────────────────────────── */}
        <section className="container mx-auto px-6 md:px-12 mt-28" aria-labelledby="features">
          <Eyebrow>Features</Eyebrow>
          <h2 id="features" className="text-4xl md:text-5xl font-bold text-white">What Aevidine does</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 mt-10 max-w-4xl">
            {FEATURES.map((f) => (
              <li key={f} className="flex gap-3 text-white/75 text-lg">
                <span aria-hidden="true" className="mt-2.5 w-2 h-2 shrink-0 rounded-full bg-neon-blue shadow-[0_0_10px_rgba(51,187,255,0.7)]" />
                {f}
              </li>
            ))}
          </ul>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white">See Aevidine in your restaurant</h2>
              <p className="text-white/60 mt-3">Free demo: {COMPANY.email} · {COMPANY.phoneDisplay}</p>
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
