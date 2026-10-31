"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Arrow, ButtonLink, Button, Magnetic } from "@/components/ui";
import { useProjectModal } from "@/context/ProjectModalContext";

// The 3D mark loads after the words have painted, and never on the server.
const InfinityScene = dynamic(() => import("@/components/hero/InfinityScene"), { ssr: false });

// Who we have actually built for (see the Work section) — no invented industries.
const FOR = ["restaurants", "hospitals", "brands", "events", "your business"];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { openModal } = useProjectModal();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % FOR.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative min-h-[100svh] w-full overflow-hidden flex items-center">
      {/* A soft horizon line behind everything; in dark mode it becomes a light source. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[62%] -translate-x-1/2 h-px w-[140%] bg-gradient-to-r from-transparent via-line-strong to-transparent" />
        <div className="hidden dark:block absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-48 rounded-[100%] bg-accent/20 blur-[90px]" />
      </div>

      <motion.div style={{ y: sceneY, scale: sceneScale, opacity: fade }} className="absolute inset-x-0 top-[2%] h-[52%] lg:inset-y-0 lg:left-[46%] lg:right-0 lg:top-0 lg:h-full">
        <InfinityScene />
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-10 pt-[50svh] lg:pt-24 pb-16 pointer-events-none">
        <div className="max-w-3xl lg:max-w-[46rem] pointer-events-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="eyebrow mb-6 flex items-center gap-2.5"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
              <span className="relative w-2 h-2 rounded-full bg-accent" />
            </span>
            Aevinite · Ahmedabad, India
          </motion.p>

          <h1 className="display text-[clamp(3.1rem,8.4vw,7rem)] text-ink">
            {["We", "help", "businesses"].map((w, k) => (
              <span key={w} className="inline-block overflow-hidden align-bottom pb-[0.06em] mr-[0.22em]">
                <motion.span className="inline-block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.15 + k * 0.08 }}>
                  {w}
                </motion.span>
              </span>
            ))}
            <span className="inline-block overflow-hidden align-bottom pb-[0.12em] pr-[0.1em]">
              <motion.span
                className="inline-block serif-accent text-accent shine"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.45 }}
              >
                grow.
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
          >
            <p className="mt-7 text-lg md:text-xl text-muted max-w-[34rem] leading-relaxed">
              Websites, software and automation built around how your business actually works, for{" "}
              <span className="relative inline-flex overflow-hidden align-bottom h-[1.6em]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={FOR[i]}
                    className="text-ink font-medium whitespace-nowrap"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                  >
                    {FOR[i]}
                  </motion.span>
                </AnimatePresence>
              </span>
              .
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button size="lg" onClick={openModal}>
                  Start a project <Arrow />
                </Button>
              </Magnetic>
              <ButtonLink href="/#work" look="ghost" size="lg">
                See our work
              </ButtonLink>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-16 lg:mt-24 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-subtle pointer-events-auto"
        >
          <span>Since 2024</span>
          <span>Founded by Rishi Nakrani &amp; Jenish Patel</span>
          <span className="hidden lg:inline-flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Drag the infinity
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
