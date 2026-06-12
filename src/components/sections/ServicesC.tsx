"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useProjectModal } from "@/context/ProjectModalContext";

const services = [
  {
    number: "01",
    title: "Web & App Dev",
    tagline: "Concept to launch",
    description:
      "Custom digital products built precisely for your workflow — fast, polished, and production-ready.",
    icon: "◈",
  },
  {
    number: "02",
    title: "Process Automation",
    tagline: "Unblock your team",
    description:
      "We map your operations and replace manual work with smart automation that runs around the clock.",
    icon: "⬡",
  },
  {
    number: "03",
    title: "AI Integration",
    tagline: "Smarter by design",
    description:
      "AI models and APIs embedded into your systems — turning raw data into clear, actionable decisions.",
    icon: "◎",
  },
  {
    number: "04",
    title: "Growth Infrastructure",
    tagline: "Built to scale",
    description:
      "Backend systems and cloud architecture that grow alongside your ambitions — no ceiling, no compromise.",
    icon: "⬢",
  },
];

const marqueeItems = [...services, ...services];

function FlipCard({ service, delay }: { service: (typeof services)[0]; delay: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setIsFlipped(true);
  };
  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setIsFlipped(false);
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") setIsFlipped((f) => !f);
  };

  return (
    <motion.div
      className="group cursor-pointer w-full h-full"
      style={{ perspective: "1200px" }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 28, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        default: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
        y: { duration: 0.28, ease: "easeOut" },
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* ── Front ── */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-6 rounded-2xl border border-white/[0.07] bg-[#080810]"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Muted watermark number */}
          <span
            aria-hidden
            className="font-black leading-none text-white/[0.055] select-none self-start"
            style={{ fontSize: "clamp(44px, 4.5vw, 72px)" }}
          >
            {service.number}
          </span>

          {/* Bottom content */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-neon-blue shrink-0"
                animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.5, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }}
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-neon-cyan/45 leading-none">
                {service.tagline}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-tight leading-tight">
              {service.title}
            </h3>
          </div>

          {/* Tap/click hint */}
          <span className="absolute bottom-3.5 right-4 text-[8px] font-mono text-white/15 tracking-widest pointer-events-none">
            tap →
          </span>
        </div>

        {/* ── Back ── */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-6 rounded-2xl border border-neon-blue/20 bg-gradient-to-br from-[#07080f] via-[#08090e] to-[#090d18]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Corner accent */}
          <svg className="absolute top-0 right-0 pointer-events-none" width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path d="M42 0 L42 13 M42 0 L29 0" stroke="rgba(51,187,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          {/* Top: number + icon */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neon-cyan/50">
              {service.number}
            </span>
            <span className="text-neon-blue/30 text-lg leading-none">{service.icon}</span>
          </div>

          {/* Bottom: title + separator + description */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-tight mb-2">
              {service.title}
            </h3>
            {/* Neon separator */}
            <div className="w-7 h-px bg-neon-blue/40 mb-3" />
            <p className="text-white/55 text-[13px] leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesC() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.88, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.88, 1], [44, 0, 0, -32]);
  const { openModal } = useProjectModal();

  return (
    <section ref={sectionRef} id="services" className="relative py-20 md:py-28 bg-black overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(51,187,255,0.9) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <motion.div
        style={{ opacity, y }}
        className="container mx-auto px-6 md:px-12 relative z-10"
      >
        {/* Header */}
        <div className="mb-10">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.55 }}
            className="text-[10px] uppercase tracking-[0.4em] text-neon-cyan/50 font-mono mb-2"
          >
            What you get
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Our Services
          </motion.h2>
        </div>

        {/* Marquee — the live ticker; kept bright so it reads at a glance */}
        <div className="overflow-hidden mb-10 border-y border-neon-blue/15 py-5 bg-white/[0.02]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            className="flex gap-10 whitespace-nowrap w-max"
          >
            {marqueeItems.map((s, i) => (
              <span
                key={i}
                className="flex items-center gap-6 font-bold text-[13px] md:text-base uppercase tracking-[0.35em] text-white/75"
                style={{ textShadow: "0 0 16px rgba(51,187,255,0.35)" }}
              >
                {s.title}
                <span className="text-neon-blue/80 text-lg">·</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* 1-col mobile → 2-col sm → 4-col lg. Heights sized so back-face never overflows. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {services.map((s, i) => (
            <div key={s.number} className="h-[240px] sm:h-[260px] lg:h-[270px]">
              <FlipCard service={s} delay={i * 0.07} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.55, delay: 0.28 }}
          className="mt-12 text-center"
        >
          <button
            onClick={openModal}
            className="interactive group relative px-10 py-3.5 rounded-full border border-neon-blue/45 text-neon-blue text-sm uppercase tracking-widest overflow-hidden hover:box-glow transition-all duration-300"
          >
            <div className="absolute inset-0 bg-neon-blue/12 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">Start a Project →</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
