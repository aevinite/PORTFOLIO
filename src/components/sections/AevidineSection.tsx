"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import FilmPlayer from "@/components/FilmPlayer";
import { Arrow, ButtonLink, Eyebrow, Reveal, useSpotlight } from "@/components/ui";
import { FILMS } from "@/data/films";

// Aevidine is OUR product, so it gets the stage before client work. Its own colour is gold —
// the colour of its films — so it reads as a product of Aevinite, not the same brand.
// Stills from the film itself, one per person (public/films/screens/).
const SCREENS = [
  { who: "Guest", line: "Scans the QR on the table and orders from their own phone. No app to download.", img: "/films/screens/guest.webp" },
  { who: "Kitchen", line: "Gets every order the moment it's placed, on the kitchen screen and as a printed KOT.", img: "/films/screens/kitchen.webp" },
  { who: "Waiter", line: "Sees every table live: new order, cooking, served, bill still open.", img: "/films/screens/waiter.webp" },
  { who: "Manager", line: "Runs the floor and the day's bills. GST is worked out on every bill.", img: "/films/screens/manager.webp" },
  { who: "Owner", line: "Sees the day's sales and reports live, from anywhere.", img: "/films/screens/owner.webp" },
];

export default function AevidineSection() {
  const spot = useSpotlight();
  const [pick, setPick] = useState(0);
  const f = FILMS.onePlatform;
  return (
    <section id="aevidine" onPointerMove={spot} className="spotlight relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
          <Reveal>
            <Eyebrow tone="gold">Our own product</Eyebrow>
            <h2 className="display text-[clamp(2.6rem,6vw,5.2rem)] text-ink max-w-4xl">
              Aevidine runs the <span className="serif-accent text-gold">whole</span> restaurant.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              QR ordering at the table, the kitchen screen and KOT printing, live tables, GST bills and the owner&apos;s
              reports. One system instead of six different things.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3">
            <ButtonLink href="/aevidine" look="gold">
              Explore Aevidine <Arrow />
            </ButtonLink>
            <ButtonLink href="/contact" look="ghost">
              Book a free demo
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <FilmPlayer preview={f.preview} src={f.src} poster={f.poster} title={f.title} chapters={[...f.chapters]} />
        </Reveal>

        {/* Five people, five screens: tap one to see what it does for them. */}
        <div className="mt-16 md:mt-24 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
          <div>
            <p className="eyebrow mb-6">A screen for everyone</p>
            <ul className="border-t border-line">
              {SCREENS.map((s, i) => {
                const on = pick === i;
                return (
                  <li key={s.who} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setPick(i)}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setPick(i)}
                      aria-pressed={on}
                      className="w-full text-left py-5 flex items-baseline gap-5"
                    >
                      <span className={`tabular-nums text-sm transition-colors ${on ? "text-gold" : "text-subtle"}`}>0{i + 1}</span>
                      <span className="flex-1">
                        <span className={`block text-2xl md:text-3xl font-medium tracking-tight transition-colors ${on ? "text-ink" : "text-subtle"}`}>{s.who}</span>
                        <motion.span
                          initial={false}
                          animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                          className="block overflow-hidden text-muted leading-relaxed"
                        >
                          <span className="block pt-2">{s.line}</span>
                        </motion.span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative">
            <div className="relative aspect-[16/7] rounded-[28px] overflow-hidden edge bg-black shadow-float">
              {SCREENS.map((s, i) => (
                <motion.div
                  key={s.who}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: pick === i ? 1 : 0, scale: pick === i ? 1 : 1.04 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image src={s.img} alt={`Aevidine, ${s.who.toLowerCase()} screen`} fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
                </motion.div>
              ))}
            </div>
            <div className="relative mt-3 md:mt-0 md:absolute md:-bottom-5 md:right-8 rounded-2xl bg-surface edge shadow-card px-5 py-4 flex items-center gap-4">
              <span className="grid place-items-center w-10 h-10 rounded-full bg-gold-soft text-gold font-semibold">{pick + 1}</span>
              <span className="text-sm text-muted leading-snug">
                <span className="block text-ink font-medium">{SCREENS[pick].who}</span>
                Works on any phone, tablet or computer. Keeps working offline.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
