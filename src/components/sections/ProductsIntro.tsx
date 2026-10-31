"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Arrow, Eyebrow, Reveal, TONES } from "@/components/ui";
import { PRODUCTS, type Product } from "@/data/products";

// The two products side by side, right after the hero: the proof that we build and run real
// software, not only client sites. Each card plays its film's silent loop while on screen and
// tilts toward the cursor; its glow takes the product's own colour.
function ProductCard({ p, i }: { p: Product; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 180, damping: 22 });
  const ry = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 180, damping: 22 });
  const glow = useTransform(
    [mx, my],
    ([x, y]: number[]) => `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, var(--${p.tone}-soft), transparent 70%)`,
  );
  const t = TONES[p.tone];

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.3 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <Reveal delay={i * 0.1}>
      <motion.a
        ref={ref}
        href={`#${p.id}`}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || !ref.current) return;
          const r = ref.current.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1400 }}
        className="group relative block overflow-hidden rounded-[30px] edge bg-surface shadow-card"
      >
        {/* The product's colour lights the card where the cursor is. */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: glow }}
        />
        <div className="relative aspect-[16/10] bg-black overflow-hidden">
          <video
            ref={vid}
            src={p.film.preview}
            poster={p.film.poster}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/55 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${t.bg}`} />
            {p.status}
          </span>
        </div>
        <div className="relative z-20 p-7 md:p-9">
          <div className="flex items-center gap-3">
            {p.mark ? (
              <Image src={p.mark} alt="" width={40} height={40} className="w-10 h-10 rounded-xl" />
            ) : (
              <span className={`grid place-items-center w-10 h-10 rounded-xl ${t.soft} ${t.text} font-semibold`}>A</span>
            )}
            <span className="text-sm text-subtle">{p.kind}</span>
          </div>
          <h3 className="display mt-5 text-4xl md:text-5xl text-ink">
            {p.nameParts[0]}
            <span className={`serif-accent ${t.text}`}>{p.nameParts[1]}</span>
          </h3>
          <p className="mt-4 text-muted text-lg leading-relaxed max-w-md">{p.line}</p>
          <span className={`mt-7 inline-flex items-center gap-2 font-medium ${t.text}`}>
            See how it works <Arrow />
          </span>
        </div>
      </motion.a>
    </Reveal>
  );
}

export default function ProductsIntro() {
  return (
    <section id="products" className="relative pt-24 md:pt-36 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Our products</Eyebrow>
            <h2 className="display text-[clamp(2.6rem,6vw,5.2rem)] text-ink max-w-4xl">
              We don&apos;t just build for others. We <span className="serif-accent text-accent">run</span> our own.
            </h2>
          </div>
          <p className="text-muted max-w-sm leading-relaxed">
            Two products, designed, built and run in-house in Ahmedabad. The same team builds yours.
          </p>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {PRODUCTS.map((p) => (
            <Link key={p.id} href={p.href} className="text-muted hover:text-ink transition-colors">
              {`${p.name} product page →`}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
