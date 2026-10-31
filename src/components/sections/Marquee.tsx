"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

const ITEMS = ["Websites", "Custom software", "Automation", "AI integration", "3D web", "Restaurant tech", "Apps", "Dashboards"];

// A band of what we do. It drifts on its own and leans/skews with how fast you scroll.
export default function Marquee() {
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { stiffness: 120, damping: 30 });
  const skew = useTransform(v, [-2500, 0, 2500], [6, 0, -6]);
  const row = [...ITEMS, ...ITEMS];
  return (
    <section aria-label="What we do" className="relative py-8 md:py-10 border-y border-line overflow-hidden bg-surface/50">
      <motion.div style={{ skewX: skew }}>
        <div className="flex w-max animate-[marquee_38s_linear_infinite] hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-8 pr-8 text-3xl md:text-5xl font-medium tracking-tight text-ink whitespace-nowrap">
              <span className={i % 2 ? "serif-accent text-muted" : ""}>{t}</span>
              <svg width="22" height="14" viewBox="0 0 44 28" aria-hidden="true" className="text-accent">
                <path d="M22 14c-4-6-8-10-13-10a10 10 0 0 0 0 20c5 0 9-4 13-10s8-10 13-10a10 10 0 0 1 0 20c-5 0-9-4-13-10z" fill="none" stroke="currentColor" strokeWidth="3.5" />
              </svg>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
