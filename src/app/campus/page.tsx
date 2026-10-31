import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmPlayer from "@/components/FilmPlayer";
import { Arrow, Breadcrumb, ButtonLink, Eyebrow } from "@/components/ui";
import { FILMS, FILM_CREDIT } from "@/data/films";
import { productById } from "@/data/products";
import { SITE_URL } from "@/lib/site";
import { COMPANY, FOUNDER_NAMES } from "@/lib/company";

// Campus Conveyance's own page: Aevinite's second product. Plain server-rendered text (like
// /aevidine and /about) so search engines and AI assistants read every word without running
// JavaScript. Facts only from the product itself (Brain: Campus-Conveyance, 31 Oct 2026): no
// school is signed yet, so nothing here claims one.
const TITLE = "Campus Conveyance: Student Transport App for Schools & Colleges";
const DESCRIPTION =
  "Campus Conveyance by Aevinite, Ahmedabad: students and parents book a bus seat and pay by UPI, watch the bus live, and are told the moment a child boards by QR. Panels for colleges, transport agencies, drivers and admin.";
const CARD_ALT =
  "Aevinite: We help businesses grow. Websites, software and automation built around how each business works.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/campus" },
  openGraph: {
    type: "website",
    url: "/campus",
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

// The five panels of the app (the film shows parent and student separately: six people).
const PANELS: { who: string; title: string; text: string }[] = [
  {
    who: "Students and parents",
    title: "Book, pay, track",
    text: "Pick the college, the route and the stop, choose a seat and pay by UPI. The pass is a QR code on the phone. Parents can book for more than one child, and get \"your bus is 10 minutes away\".",
  },
  {
    who: "Drivers",
    title: "The phone becomes the bus",
    text: "The driver goes online and the bus shows up live on every map. At the door, the driver scans each pass, and the family is told the child is on board.",
  },
  {
    who: "Schools and colleges",
    title: "Every bus coming in",
    text: "The college sees every bus on its way to campus, with its riders and routes, without calling anyone.",
  },
  {
    who: "Transport agencies",
    title: "The whole fleet on one screen",
    text: "Routes, buses, drivers, riders, bookings, refunds and revenue. The agency assigns each rider to a bus and can move a route to another bus.",
  },
  {
    who: "Admin",
    title: "Every payment, checked",
    text: "Each UPI payment is checked before a seat is confirmed, and an agency's badge appears only after its proof is checked.",
  },
];

const FEATURES = [
  "Seat booking by college, route and stop",
  "UPI payment, checked before the seat is confirmed",
  "Live bus location from the driver's phone, no GPS box",
  "\"Your bus is 10 minutes away\" alerts",
  "QR pass scanned at the bus door",
  "Parents told the moment the child boards",
  "One parent, more than one child",
  "A college view of every bus coming in",
  "Fleet, routes, riders and refunds for agencies",
  "Routes on Indian maps",
  "Aadhaar kept as the last 4 digits only",
  "Web app and Android app",
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is Campus Conveyance?",
    a: "Campus Conveyance is a student transport app. Students and parents book a seat on a school or college bus and pay by UPI, watch the bus live on a map, and are told when the child boards. Drivers, colleges, transport agencies and an admin each have their own panel.",
  },
  {
    q: "Who makes Campus Conveyance?",
    a: `Campus Conveyance is made by Aevinite, a company that helps businesses grow, based in ${COMPANY.city}, ${COMPANY.region}, India, founded by ${FOUNDER_NAMES}. Aevinite also makes Aevidine, restaurant software.`,
  },
  {
    q: "How do parents know the child is on the bus?",
    a: "Every rider has a QR pass. The driver scans it at the bus door, and the parent gets a notice on their phone at that moment.",
  },
  {
    q: "Does the bus need a GPS device?",
    a: "No. The driver's phone shares the bus's live location while the driver is online, so there is no hardware to buy or fit.",
  },
  {
    q: "How do students pay?",
    a: "By UPI, inside the app. The payment is checked before the seat is confirmed, and refunds are handled by the transport agency.",
  },
  {
    q: "Is Campus Conveyance available now? Can I see a demo?",
    a: `It runs on the web and on Android, and is ready for its first schools, colleges and transport agencies in Ahmedabad and Gandhinagar. For a free demo, email ${COMPANY.email} or call or WhatsApp ${COMPANY.phoneDisplay}.`,
  },
];

const film = FILMS.campus;

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/campus#software`,
      name: "Campus Conveyance",
      url: `${SITE_URL}/campus`,
      description: DESCRIPTION,
      applicationCategory: "TravelApplication",
      applicationSubCategory: "Student transport and school bus management",
      operatingSystem: "Web browser, Android",
      image: `${SITE_URL}${film.poster}`,
      featureList: FEATURES,
      areaServed: "IN",
      inLanguage: "en-IN",
      creator: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "VideoObject",
      "@id": `${SITE_URL}/campus#film-${film.id}`,
      name: film.title,
      description: film.description,
      thumbnailUrl: `${SITE_URL}${film.poster}`,
      contentUrl: `${SITE_URL}${film.src}`,
      uploadDate: film.uploadDate,
      duration: film.duration,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
      about: { "@id": `${SITE_URL}/campus#software` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/campus#webpage`,
      url: `${SITE_URL}/campus`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en-IN",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/campus#software` },
      mainEntity: { "@id": `${SITE_URL}/campus#software` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Campus Conveyance", item: `${SITE_URL}/campus` },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/campus#faq`,
      mainEntity: FAQ.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function CampusPage() {
  const product = productById("campus");
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
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Campus Conveyance" }]} />
          <div className="flex items-center gap-3 mb-6">
            <Image src="/campus-mark.webp" alt="Campus Conveyance app icon" width={48} height={48} className="w-12 h-12 rounded-2xl" />
            <p className="eyebrow">Our product</p>
          </div>
          <h1 className="display text-[clamp(3rem,9vw,7.4rem)] text-ink">
            Campus <span className="serif-accent text-amber">Conveyance</span>
            <span className="block mt-5 text-[clamp(1.5rem,3.2vw,2.6rem)] font-medium tracking-tight leading-tight text-muted">
              The student transport app for schools and colleges
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed mt-8 max-w-3xl">
            Every morning, every parent in the city asks the same question: where is the bus? Campus Conveyance, made by{" "}
            <Link href="/about" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-amber">Aevinite</Link>{" "}
            in {COMPANY.city}, answers it. Students and parents book a seat and pay by UPI, the driver&apos;s phone
            becomes the live bus, a QR scan at the door tells the family the child is on board, and the college, the
            transport agency and the admin each see their part.
          </p>
          <div className="flex flex-wrap gap-3 mt-10">
            <ButtonLink href="/contact" look="amber" size="lg">
              Book a free demo <Arrow />
            </ButtonLink>
            <ButtonLink href="#film" look="ghost" size="lg">
              Watch the 7:10 bus
            </ButtonLink>
          </div>

          <figure id="film" className="mt-16 scroll-mt-28">
            <FilmPlayer preview={film.preview} src={film.src} poster={film.poster} title={film.title} chapters={[...film.chapters]} tone="amber" />
            <figcaption className="text-sm text-subtle mt-4 max-w-3xl">
              {film.title} ({film.length}): {film.description} {FILM_CREDIT}.
            </figcaption>
          </figure>
        </section>

        {/* ── The six people, as a picker of real screens ───────── */}
        <section className="max-w-7xl mx-auto px-5 md:px-10 mt-32" aria-labelledby="people">
          <Eyebrow tone="amber">Who it&apos;s for</Eyebrow>
          <h2 id="people" className="display text-[clamp(2.4rem,5vw,4.2rem)] text-ink max-w-3xl">
            Six people. <span className="serif-accent text-amber">One ride.</span>
          </h2>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
            {product.screens.map((s, i) => (
              <figure key={s.who} className="group rounded-[24px] overflow-hidden bg-surface edge shadow-card">
                <div className="relative aspect-[16/9] bg-black overflow-hidden">
                  <Image src={s.img} alt={`Campus Conveyance, ${s.who.toLowerCase()} screen`} fill sizes="(min-width:768px) 400px, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                </div>
                <figcaption className="p-5">
                  <p className="flex items-center justify-between text-sm">
                    <span className="text-amber font-medium">{s.who}</span>
                    <span className="tabular-nums text-subtle">0{i + 1}</span>
                  </p>
                  <p className="text-muted leading-snug mt-2 text-[15px]">{s.line}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── Panels ────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 md:px-10 mt-32" aria-labelledby="panels">
          <Eyebrow tone="amber">How it works</Eyebrow>
          <h2 id="panels" className="display text-[clamp(2.4rem,5vw,4.2rem)] text-ink max-w-3xl">
            Five panels, <span className="serif-accent text-amber">one system.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {PANELS.map((s, i) => (
              <article key={s.title} className="rounded-[24px] bg-surface edge shadow-card p-8 flex flex-col">
                <p className="flex items-center justify-between text-sm">
                  <span className="text-amber font-medium">{s.who}</span>
                  <span className="tabular-nums text-subtle">0{i + 1}</span>
                </p>
                <h3 className="text-2xl font-medium tracking-tight text-ink mt-6">{s.title}</h3>
                <p className="text-muted leading-relaxed mt-3">{s.text}</p>
              </article>
            ))}
            <article className="rounded-[24px] bg-amber-soft p-8 flex flex-col justify-between">
              <p className="text-2xl font-medium tracking-tight text-ink">Run a school, a college or a bus agency? See it on your own routes.</p>
              <ButtonLink href="/contact" look="amber" className="self-start mt-8">
                Book a free demo <Arrow />
              </ButtonLink>
            </article>
          </div>
        </section>

        {/* ── Features ──────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 md:px-10 mt-32" aria-labelledby="features">
          <Eyebrow tone="amber">Features</Eyebrow>
          <h2 id="features" className="display text-[clamp(2.4rem,5vw,4.2rem)] text-ink">What Campus Conveyance does</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 border-t border-line mt-12">
            {FEATURES.map((f, i) => (
              <li key={f} className={`flex items-baseline gap-4 py-5 border-b border-line text-lg text-ink ${i % 2 ? "sm:pl-8" : "sm:pr-8"}`}>
                <span className="tabular-nums text-sm text-amber w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 md:px-10 mt-32 grid lg:grid-cols-[0.8fr_1.2fr] gap-10" aria-labelledby="faq">
          <div>
            <Eyebrow tone="amber">Questions</Eyebrow>
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
              <h2 className="display text-4xl md:text-5xl text-ink">Put your buses on the map</h2>
              <p className="text-muted mt-4 select-text">Free demo: {COMPANY.email} · {COMPANY.phoneDisplay}</p>
            </div>
            <ButtonLink href="/contact" look="amber" size="lg" className="self-start md:self-auto">
              Contact us <Arrow />
            </ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
