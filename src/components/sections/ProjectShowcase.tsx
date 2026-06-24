"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowLeft } from "lucide-react";
import AutoSlideImage from "@/components/showcase/AutoSlideImage";
import projectsData from "@/data/projects.json";

type Project = {
  id: string;
  title: string;
  category: string;
  tech: string;
  description: string;
  longDescription: string;
  demoUrl: string;
  colSpan: string;
  interval?: number;
  images: string[];
  /** Optional looping preview video; shown instead of the image slider. */
  video?: string;
  comingSoon?: boolean;
};

const projects = projectsData as Project[];

export default function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const n = projects.length;
  const go = (d: number) => setActive((p) => (p + d + n) % n);

  // swipe to browse projects; a real swipe must not fire the card's click
  const swipe = useRef({ x: 0, y: 0, swiped: false });
  const onPointerDown = (e: React.PointerEvent) => {
    swipe.current = { x: e.clientX, y: e.clientY, swiped: false };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const dx = e.clientX - swipe.current.x;
    const dy = e.clientY - swipe.current.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      swipe.current.swiped = true;
      go(dx < 0 ? 1 : -1);
      // suppress only the click that immediately follows this swipe
      setTimeout(() => { swipe.current.swiped = false; }, 180);
    }
  };

  return (
    <section id="projects" className="relative py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-16 flex justify-between items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-neon-cyan/60 font-mono mb-3">
              Major Projects
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white">Selected Works</h2>
            <div className="w-24 h-1 bg-neon-blue box-glow rounded-full mt-4" />
          </div>

          {/*
            VIEW-ALL LINK — not active yet. When a full projects page exists,
            uncomment this and point href to it (e.g. "/projects"):

            <a
              href="/projects"
              className="hidden md:block interactive text-neon-blue uppercase tracking-widest text-sm hover:text-glow"
            >
              View all projects →
            </a>
          */}
        </div>

        {/* 3D Coverflow deck */}
        <div className="relative">
          <div
            className="relative h-[260px] md:h-[420px] flex items-center justify-center"
            style={{ perspective: 1700, touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            {projects.map((p, i) => {
              let offset = i - active;
              if (offset > n / 2) offset -= n;
              if (offset < -n / 2) offset += n;
              const abs = Math.abs(offset);
              const isCenter = offset === 0;

              return (
                <motion.div
                  key={p.id}
                  onClick={() => {
                    if (swipe.current.swiped) return; // drag, not a click
                    if (!isCenter) { setActive(i); return; }
                    if (p.comingSoon) return; // hype card has no detail
                    setSelected(p);
                  }}
                  className="absolute w-[clamp(300px,52vw,640px)] aspect-[16/9] rounded-2xl overflow-hidden border"
                  animate={{
                    x: `${offset * 52}%`,
                    rotateY: offset * -34,
                    scale: isCenter ? 1 : 0.82,
                    opacity: abs > 1.6 ? 0 : 1,
                    zIndex: 20 - abs,
                    filter: isCenter ? "brightness(1)" : "brightness(0.45)",
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    borderColor: isCenter ? "rgba(51,187,255,0.45)" : "rgba(255,255,255,0.08)",
                    cursor: "pointer",
                    pointerEvents: abs > 1.6 ? "none" : "auto",
                  }}
                >
                  {isCenter ? (
                    p.video ? (
                      /* Live preview video — muted + looping so it autoplays everywhere */
                      <video
                        src={p.video}
                        poster={p.images[0]}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      /* Center card auto-slides every 2.5s, zooms OUT to reveal the full image */
                      <AutoSlideImage
                        images={p.images}
                        interval={2500}
                        showArrows={false}
                        showDots={false}
                        align="center"
                        zoom="out"
                      />
                    )
                  ) : (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${p.images[0]})` }}
                    />
                  )}
                  {p.comingSoon ? (
                    /* Hype card — centered "coming soon" overlay */
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/60">
                      <span className="text-[10px] uppercase tracking-[0.45em] text-neon-cyan/70 font-mono mb-3">
                        Next Up
                      </span>
                      <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                        Something New
                      </h3>
                      <p className="text-white/55 text-xs md:text-sm mt-3 max-w-[260px]">
                        We&apos;re crafting our next experience — stay tuned.
                      </p>
                      <span className="mt-5 px-4 py-1.5 rounded-full border border-neon-blue/40 text-neon-blue text-[10px] uppercase tracking-[0.2em]">
                        Coming Soon
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                      <div className="pointer-events-none absolute bottom-0 left-0 p-6 md:p-7">
                        <span className="text-neon-cyan uppercase tracking-[0.2em] text-[11px] font-bold">
                          {p.category}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                          {p.title}
                        </h3>
                        {isCenter && (
                          <span className="text-white/45 text-[11px] font-mono mt-1 block">
                            Click to view project →
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Edge click-zones — tap either side of the deck to browse (no arrow buttons) */}
          <button
            onClick={() => { if (!swipe.current.swiped) go(-1); }}
            aria-label="Previous project"
            className="interactive absolute left-0 top-0 z-40 h-full w-[14%] cursor-pointer bg-transparent"
          />
          <button
            onClick={() => { if (!swipe.current.swiped) go(1); }}
            aria-label="Next project"
            className="interactive absolute right-0 top-0 z-40 h-full w-[14%] cursor-pointer bg-transparent"
          />

          {/* No progress dots at the bottom — removed per request */}
        </div>
      </div>

      {/* Detail page — portaled to <body> so it sits above the navbar */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selected && (
              <motion.div
                data-lenis-prevent
                className="fixed inset-0 z-[200] bg-[#06070d] overflow-y-auto overscroll-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Sticky top bar */}
                <div className="sticky top-0 z-30 backdrop-blur-xl bg-[#06070d]/70 border-b border-white/[0.06]">
                  <div className="container mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                    <button
                      onClick={() => setSelected(null)}
                      className="interactive group flex items-center gap-2.5 text-white/80 hover:text-white transition-colors"
                    >
                      <span className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center group-hover:border-neon-blue/60 group-hover:text-neon-blue transition-colors">
                        <ArrowLeft size={18} />
                      </span>
                      <span className="uppercase tracking-[0.2em] text-xs font-bold">Back</span>
                    </button>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                      {selected.category}
                    </span>
                  </div>
                </div>

                <div className="container mx-auto px-6 md:px-12 py-12 md:py-16">
                  {/* Title block */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="text-neon-cyan uppercase tracking-[0.25em] text-xs font-bold mb-3 block">
                      {selected.category}
                    </span>
                    <h2 className="text-4xl md:text-7xl font-bold text-white leading-[1.05] max-w-4xl">
                      {selected.title}
                    </h2>
                    <p className="text-white/65 text-lg md:text-xl font-light leading-relaxed mt-5 max-w-2xl">
                      {selected.description}
                    </p>
                  </motion.div>

                  {/* Gallery — full 16:9 image, framed */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 mt-10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                  >
                    {selected.video ? (
                      <video
                        src={selected.video}
                        poster={selected.images[0]}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <AutoSlideImage
                        images={selected.images}
                        interval={4000}
                        align="center"
                        zoom="out"
                      />
                    )}
                  </motion.div>

                  {/* Content grid */}
                  <div className="mt-14 grid md:grid-cols-[1fr_300px] gap-10 md:gap-16">
                    {/* Case study */}
                    <div>
                      <h3 className="text-[11px] uppercase tracking-[0.3em] text-neon-cyan/60 font-mono mb-5">
                        About the project
                      </h3>
                      <p className="text-white/65 text-base md:text-lg font-light whitespace-pre-wrap leading-relaxed">
                        {selected.longDescription}
                      </p>
                    </div>

                    {/* Meta sidebar */}
                    <aside className="md:border-l md:border-white/[0.07] md:pl-10">
                      <h3 className="text-[11px] uppercase tracking-[0.3em] text-neon-cyan/60 font-mono mb-5">
                        Built with
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-10">
                        {selected.tech.split(", ").map((t) => (
                          <span
                            key={t}
                            className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/70 text-xs font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {selected.demoUrl && selected.demoUrl !== "#" ? (
                        <a
                          href={selected.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group interactive flex items-center justify-center gap-2 w-full px-6 py-4 bg-neon-blue text-[#04050c] font-bold uppercase tracking-widest text-sm rounded-full shadow-[0_0_26px_rgba(51,187,255,0.4)] hover:shadow-[0_0_40px_rgba(51,187,255,0.6)] transition-all"
                        >
                          Launch Demo
                          <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      ) : (
                        <button className="w-full px-6 py-4 bg-white/10 text-white/40 font-bold uppercase tracking-widest text-sm rounded-full cursor-not-allowed">
                          Coming Soon
                        </button>
                      )}
                    </aside>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
