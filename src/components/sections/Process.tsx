"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Eyebrow } from "@/components/ui";

const STEPS = [
  { n: "01", title: "Identify", desc: "We find the bottlenecks, the slow handovers and the missed opportunities." },
  { n: "02", title: "Improve", desc: "We fix what slows you down, with systems designed around how you really work." },
  { n: "03", title: "Automate", desc: "We take the repetitive work off your team's plate, so it runs on its own." },
  { n: "04", title: "Scale", desc: "You grow on systems built to last, without hiring for every new task." },
];

// Each dot sits exactly on a joint of the curve (viewBox 1000x900, stretched to the box), at the
// fraction of the line's length where that joint falls — so the line reaches a dot as it lights.
const NODES = [
  { at: 0.02, x: 12.5, y: 91.1 },
  { at: 0.3, x: 37.5, y: 71.1 },
  { at: 0.631, x: 62.5, y: 44.4 },
  { at: 0.98, x: 87.5, y: 12.2 },
];
const PATH = "M 125 820 C 250 800, 300 700, 375 640 S 520 520, 625 400 S 780 150, 875 110";

// The page's signature: a growth curve that draws itself as you scroll, lighting each step.
export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const draw = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);
  const [lit, setLit] = useState(0);
  useMotionValueEvent(draw, "change", (v) => setLit(NODES.filter((n) => v >= n.at - 0.02).length));

  return (
    <section ref={ref} id="process" aria-labelledby="process-h" className="relative md:h-[300vh]">
      <div className="md:sticky md:top-0 md:h-[100svh] flex flex-col justify-center py-24 md:py-0 overflow-hidden">
        <div className="max-w-7xl w-full mx-auto px-5 md:px-10">
          <Eyebrow>How we work</Eyebrow>
          <h2 id="process-h" className="display text-[clamp(2.4rem,5vw,4.4rem)] text-ink max-w-3xl">
            Four steps. One direction: <span className="serif-accent text-accent">up.</span>
          </h2>

          {/* Desktop: the curve, then the four steps in columns under their dots */}
          <div className="hidden md:block mt-8">
            <div className="relative h-[30svh] max-h-[320px]">
              <svg viewBox="0 0 1000 900" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
                <path d={PATH} fill="none" stroke="var(--line-strong)" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <motion.path
                  d={PATH}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ pathLength: draw, filter: "drop-shadow(0 0 10px var(--glow))" }}
                />
              </svg>
              {NODES.map((n, i) => (
                <motion.span
                  key={n.at}
                  className="absolute -translate-x-1/2 -translate-y-1/2 block w-4 h-4 rounded-full border-2"
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  animate={{
                    scale: i < lit ? 1 : 0.6,
                    backgroundColor: i < lit ? "var(--accent)" : "var(--bg)",
                    borderColor: i < lit ? "var(--accent)" : "var(--line-strong)",
                    boxShadow: i < lit ? "0 0 0 8px var(--accent-soft), 0 0 24px var(--glow)" : "0 0 0 0px transparent",
                  }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                />
              ))}
            </div>
            <ol className="grid grid-cols-4 mt-10 border-t border-line">
              {STEPS.map((s, i) => {
                const on = i < lit;
                return (
                  <motion.li
                    key={s.n}
                    className="pt-6 pr-8"
                    animate={{ opacity: on ? 1 : 0.35, y: on ? 0 : 6 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="tabular-nums text-sm text-accent font-medium">{s.n}</p>
                    <h3 className="text-2xl font-semibold tracking-tight text-ink mt-1">{s.title}</h3>
                    <p className="text-muted leading-relaxed mt-2">{s.desc}</p>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          {/* Phone: the same steps as a rising list */}
          <ol className="md:hidden mt-10 border-l border-line-strong ml-2">
            {STEPS.map((s) => (
              <li key={s.n} className="relative pl-7 pb-10 last:pb-0">
                <span aria-hidden="true" className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-accent" />
                <p className="tabular-nums text-sm text-accent font-medium">{s.n}</p>
                <h3 className="text-2xl font-semibold tracking-tight text-ink mt-1">{s.title}</h3>
                <p className="text-muted leading-relaxed mt-1.5">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
