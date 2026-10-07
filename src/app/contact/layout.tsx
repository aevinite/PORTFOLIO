import type { Metadata } from "next";

// contact/page.tsx is a client component, which can't export metadata — so the Contact page's
// own title, description and canonical address live here. Without this it repeated the home
// page's title and told Google it *was* the home page.
const DESCRIPTION =
  "Contact Aevinite in Ahmedabad to discuss custom software, a SaaS product, a website or business automation. Email, call or WhatsApp us.";
// The root opengraph-image.jpg / twitter-image.jpg are dropped once a page sets its own
// openGraph/twitter, so they are named again here (seen in the built HTML, 2026-10-08).
const CARD_ALT =
  "Aevinite: Software that runs real businesses. SaaS products, business software and automation.";

export const metadata: Metadata = {
  title: "Contact Us",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  // A page's openGraph REPLACES the layout's (no deep merge), so the shared fields are repeated.
  openGraph: {
    type: "website",
    url: "/contact",
    siteName: "Aevinite",
    locale: "en_IN",
    title: "Contact Aevinite",
    description: DESCRIPTION,
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: CARD_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Aevinite",
    description: DESCRIPTION,
    images: [{ url: "/twitter-image.jpg", alt: CARD_ALT }],
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
