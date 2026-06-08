"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform, AnimatePresence } from "framer-motion";

const steps = [
  { n: "01", title: "We Identify", desc: "We identify bottlenecks, inefficiencies and missed opportunities." },
  { n: "02", title: "We Build",    desc: "We create systems designed around real business needs." },
  { n: "03", title: "We Automate", desc: "We eliminate repetitive work through intelligent automation." },
  { n: "04", title: "We Scale",    desc: "We help businesses grow with systems built to last." },
];

// Thresholds at which each arrow+description reveals
const thresholds = [0.14, 0.36, 0.58, 0.8];

function Arrow() {
  return (
    <svg width="30" height="18" viewBox="0 0 34 20" fill="none" className="drop-shadow-[0_0_8px_rgba(51,187,255,0.9)]">
      <path d="M2 10 H25"     stroke="#33bbff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M21 4 L28 10 L21 16" stroke="#33bbff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function StoryIntro() {
  const ref = useRef<HTMLElement>(null);

  // Main scroll: drives arrow/description reveals over 440vh
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [revealed, setRevealed] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setRevealed(thresholds.filter((t) => v >= t).length);
  });

  // Section-level fade: content fades in at start, fades out at end of pin
  const contentOpacity = useTransform(scrollYProgress, [0, 0.06, 0.88, 1], [0, 1, 1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.06, 0.88, 1], [36, 0, 0, -28]);

  return (
    <section ref={ref} className="relative bg-black" style={{ height: "440vh" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff1a_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

        {/* Entire content block fades in on entry, out on exit */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl"
        >
          <div className="flex flex-col gap-5 md:gap-8">
            {steps.map((s, i) => {
              const isRevealed = i < revealed;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-10% 0px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-y-2 md:gap-5 items-center"
                >
                  {/* Gutter: arrow + number */}
                  <div className="md:col-span-2 flex items-center gap-3 h-7">
                    <div className="w-8 shrink-0">
                      <AnimatePresence>
                        {isRevealed && (
                          <motion.div
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -12 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                          >
                            <Arrow />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <span className={`font-mono text-xs tracking-widest transition-colors duration-500 ${isRevealed ? "text-neon-cyan" : "text-white/30"}`}>
                      {s.n}
                    </span>
                  </div>

                  {/* Heading — reduced from text-7xl → text-6xl */}
                  <h3 className="md:col-span-6 text-3xl md:text-4xl lg:text-[3.5rem] font-bold uppercase tracking-tight text-white text-glow leading-none">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <div className="md:col-span-4">
                    <AnimatePresence>
                      {isRevealed && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                          className="flex items-center gap-4"
                        >
                          <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="hidden md:block h-px w-7 bg-neon-blue box-glow origin-left shrink-0"
                          />
                          <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
                            {s.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
