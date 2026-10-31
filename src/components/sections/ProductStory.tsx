"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import FilmPlayer from "@/components/FilmPlayer";
import { Arrow, ButtonLink, Eyebrow, Reveal, TONES, useSpotlight } from "@/components/ui";
import type { Product } from "@/data/products";

// One product's full story on the home page: headline, its film you can steer by chapter, and
// "a screen for everyone": tap a person to see the real screen they use (stills from the film).
export default function ProductStory({ p, flip = false }: { p: Product; flip?: boolean }) {
  const spot = useSpotlight();
  const [pick, setPick] = useState(0);
  const t = TONES[p.tone];
  return (
    <section id={p.id} onPointerMove={spot} className="spotlight relative py-24 md:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
          <Reveal>
            <Eyebrow tone={p.tone}>
              {p.name} · {p.kind}
            </Eyebrow>
            <h2 className="display text-[clamp(2.6rem,6vw,5.2rem)] text-ink max-w-4xl">
              {p.headline[0]}
              <span className={`serif-accent ${t.text}`}>{p.headline[1]}</span>
              {p.headline[2]}
            </h2>
            <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">{p.sub}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3">
            <ButtonLink href={p.href} look={p.tone === "gold" ? "gold" : "amber"}>
              Explore {p.id === "aevidine" ? "Aevidine" : "Campus"} <Arrow />
            </ButtonLink>
            <ButtonLink href="/contact" look="ghost">
              Book a free demo
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <FilmPlayer preview={p.film.preview} src={p.film.src} poster={p.film.poster} title={p.film.title} chapters={[...p.film.chapters]} tone={p.tone} />
        </Reveal>

        <div className={`mt-16 md:mt-24 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div>
            <p className="eyebrow mb-6">A screen for everyone</p>
            <ul className="border-t border-line">
              {p.screens.map((s, i) => {
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
                      <span className={`tabular-nums text-sm transition-colors ${on ? t.text : "text-subtle"}`}>0{i + 1}</span>
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
              {p.screens.map((s, i) => (
                <motion.div
                  key={s.who}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: pick === i ? 1 : 0, scale: pick === i ? 1 : 1.04 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image src={s.img} alt={`${p.name}, ${s.who.toLowerCase()} screen`} fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
                </motion.div>
              ))}
            </div>
            <div className="relative mt-3 md:mt-0 md:absolute md:-bottom-5 md:right-8 rounded-2xl bg-surface edge shadow-card px-5 py-4 flex items-center gap-4">
              <span className={`grid place-items-center w-10 h-10 rounded-full ${t.soft} ${t.text} font-semibold`}>{pick + 1}</span>
              <span className="text-sm text-muted leading-snug">
                <span className="block text-ink font-medium">{p.screens[pick].who}</span>
                {p.screens.length} people, one system. Works on any phone, tablet or computer.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
