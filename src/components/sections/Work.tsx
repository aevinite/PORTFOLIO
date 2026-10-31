"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Arrow, Eyebrow, Reveal } from "@/components/ui";
import projectsData from "@/data/projects.json";

type Project = {
  id: string;
  title: string;
  category: string;
  tech: string;
  description: string;
  longDescription: string;
  demoUrl: string;
  images: string[];
  video?: string;
};

// Aevidine has its own section above, so the grid shows the client and studio work.
const projects = (projectsData as Project[]).filter((p) => p.id !== "aevidine");

function Card({ p, big, onOpen }: { p: Project; big: boolean; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);
  const [img, setImg] = useState(0);
  // Tilt toward the cursor, a few degrees, on a damped spring.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 200, damping: 24 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 24 });

  // While hovered, flip through the project's screenshots; a video project plays instead.
  useEffect(() => {
    if (p.video) {
      if (hover) vid.current?.play().catch(() => {});
      else vid.current?.pause();
      return;
    }
    if (!hover || p.images.length < 2) return;
    const t = setInterval(() => setImg((n) => (n + 1) % p.images.length), 1100);
    return () => clearInterval(t);
  }, [hover, p]);

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => {
        setHover(false);
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className="group block w-full text-left"
      aria-label={`${p.title}: ${p.category}. Open details`}
    >
      <div className={`relative overflow-hidden rounded-[24px] edge bg-surface-2 shadow-card ${big ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        {p.video ? (
          <video ref={vid} src={p.video} poster={p.images[0]} muted loop playsInline preload="none" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          p.images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={i === 0 ? `${p.title} screenshot` : ""}
              fill
              sizes={big ? "(min-width:1024px) 760px, 100vw" : "(min-width:1024px) 500px, 100vw"}
              className={`object-cover object-top transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i === img ? "opacity-100" : "opacity-0"
              } group-hover:scale-[1.03]`}
            />
          ))
        )}
        <span className="absolute top-4 left-4 rounded-full bg-black/55 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5">{p.category}</span>
        <span className="absolute bottom-4 right-4 grid place-items-center w-11 h-11 rounded-full bg-white text-black opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Arrow />
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="text-2xl font-medium tracking-tight text-ink">{p.title}</h3>
          <p className="mt-2 text-muted leading-relaxed max-w-lg">{p.description}</p>
        </div>
      </div>
    </motion.button>
  );
}

function Sheet({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);
  const live = p.demoUrl && p.demoUrl !== "#" ? p.demoUrl : "";
  return (
    <motion.div className="fixed inset-0 z-[120] flex items-end md:items-center justify-center p-0 md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        data-lenis-prevent
        className="relative w-full max-w-4xl max-h-[92svh] overflow-y-auto rounded-t-[28px] md:rounded-[28px] bg-surface edge shadow-float"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", bounce: 0, duration: 0.45 }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 md:px-8 py-4 bg-surface/85 backdrop-blur-md border-b border-line">
          <p className="text-sm text-subtle">{p.category}</p>
          <button type="button" onClick={onClose} aria-label="Close" className="grid place-items-center w-10 h-10 rounded-full border border-line text-ink hover:border-line-strong">
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M1 1l10 10M11 1 1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-6 md:px-8 pt-6 pb-10">
          <h3 className="display text-4xl md:text-5xl text-ink">{p.title}</h3>
          <div className="mt-6 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
            {p.video && (
              <video src={p.video} poster={p.images[0]} controls playsInline preload="none" className="snap-start shrink-0 w-[85%] md:w-[70%] aspect-video rounded-2xl bg-black object-cover" />
            )}
            {p.images.map((src) => (
              <div key={src} className="snap-start relative shrink-0 w-[85%] md:w-[70%] aspect-[16/10] rounded-2xl overflow-hidden bg-surface-2 edge">
                <Image src={src} alt={`${p.title} screen`} fill sizes="(min-width:768px) 600px, 85vw" className="object-cover object-top" />
              </div>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-[1fr_14rem] gap-8">
            <div className="space-y-4 text-muted text-lg leading-relaxed">
              {p.longDescription.split("\n\n").map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
            <div className="space-y-6">
              <div>
                <p className="eyebrow mb-3">Built with</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.split(",").map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                      {t.trim()}
                    </span>
                  ))}
                </div>
              </div>
              {live && (
                <a
                  href={live}
                  target={live.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 h-11 px-5 rounded-full bg-ink text-bg dark:bg-accent dark:text-accent-ink font-medium"
                >
                  {live.startsWith("http") ? "Visit live" : "See it"} <Arrow />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Work() {
  const [open, setOpen] = useState<Project | null>(null);
  return (
    <section id="work" className="relative py-24 md:py-36 border-t border-line">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="display text-[clamp(2.4rem,5vw,4.4rem)] text-ink max-w-3xl">
              Built for real <span className="serif-accent text-accent">businesses.</span>
            </h2>
          </div>
          <p className="text-muted max-w-sm leading-relaxed">Hover to look inside. Tap any project for the full story.</p>
        </Reveal>
        <div className="grid md:grid-cols-12 gap-x-6 gap-y-16">
          {projects.map((p, i) => {
            // Asymmetric rhythm: wide, narrow / narrow, wide.
            const big = i % 4 === 0 || i % 4 === 3;
            return (
              <Reveal key={p.id} delay={(i % 2) * 0.08} className={big ? "md:col-span-7" : "md:col-span-5 md:mt-24"}>
                <Card p={p} big={big} onOpen={() => setOpen(p)} />
              </Reveal>
            );
          })}
        </div>
      </div>
      <AnimatePresence>{open && <Sheet p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
