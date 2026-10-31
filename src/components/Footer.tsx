"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { COMPANY, FOUNDERS } from "@/lib/company";

const COLS = [
  {
    h: "Company",
    links: [
      ["Home", "/"],
      ["Work", "/#work"],
      ["Services", "/#services"],
      ["About", "/about"],
      ["Contact", "/contact"],
    ],
  },
  {
    h: "Products",
    links: [
      ["Aevidine", "/aevidine"],
      ["Campus Conveyance", "/campus"],
      ["Guides for restaurants", "/guides"],
    ],
  },
  {
    h: "Follow",
    links: [
      ["Instagram", COMPANY.instagram],
      ["LinkedIn", COMPANY.linkedin],
      ["Medium", COMPANY.medium],
      ["GitHub", COMPANY.github],
    ],
  },
] as const;

// Each letter of the big wordmark hops when the pointer passes over it.
function Wordmark() {
  return (
    <p aria-hidden="true" className="flex justify-between select-none font-semibold leading-[0.8] tracking-[-0.04em] text-[clamp(4rem,17.5vw,17rem)] text-ink/[0.07] dark:text-ink/[0.06]">
      {"AEVINITE".split("").map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          whileHover={{ y: "-12%", color: "var(--accent)" }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
        >
          {c}
        </motion.span>
      ))}
    </p>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-line overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Aevinite home">
              <Image src="/aevinite-mark.webp" alt="" width={192} height={118} className="w-12 h-auto" />
              <span className="text-lg font-semibold tracking-[0.14em] text-ink">AEVINITE</span>
            </Link>
            <p className="mt-6 text-muted leading-relaxed">
              From <span className="text-ink">Aevum</span>, a dimension with a beginning but no end, and an echo of{" "}
              <span className="text-ink">Infinite</span>, our first name. The beginning with no end.
            </p>
            <div className="mt-8 space-y-1.5 text-sm select-text">
              <a href={`mailto:${COMPANY.email}`} className="block text-ink hover:text-accent transition-colors">
                {COMPANY.email}
              </a>
              <a href="https://wa.me/919099723703" target="_blank" rel="noopener noreferrer" className="block text-muted hover:text-accent transition-colors">
                WhatsApp {COMPANY.phoneDisplay}
              </a>
              <p className="text-subtle">
                {COMPANY.city}, {COMPANY.region}, {COMPANY.country}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            {COLS.map((c) => (
              <div key={c.h}>
                <h2 className="text-sm font-semibold text-ink">{c.h}</h2>
                <ul className="mt-4 space-y-1">
                  {c.links.map(([label, href]) => {
                    const ext = href.startsWith("http");
                    return (
                      <li key={label}>
                        {ext ? (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 text-muted hover:text-ink transition-colors">
                            {label}
                          </a>
                        ) : (
                          <Link href={href} className="inline-block py-1.5 text-muted hover:text-ink transition-colors">
                            {label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <Wordmark />
        </div>

        <div className="mt-8 pt-6 border-t border-line flex flex-col md:flex-row justify-between gap-3 text-sm text-subtle">
          <p>&copy; {new Date().getFullYear()} Aevinite. All rights reserved.</p>
          {/* Sitewide, in plain text: who founded the company (what Google and AI assistants look for). */}
          <p>
            Founded in {COMPANY.city}, 2024, by{" "}
            {FOUNDERS.map((f, i) => (
              <span key={f.id}>
                {i > 0 && " & "}
                <Link href={`/about#${f.id}`} className="hover:text-ink transition-colors">
                  {f.name}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
