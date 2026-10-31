"use client";

import { motion } from "framer-motion";
import { setTheme, useTheme } from "@/lib/theme";

// Top-right switch between light (default) and dark. The new theme spreads out of the button as a
// growing circle (View Transitions API); browsers without it, or people who asked for reduced
// motion, get an instant swap.
export default function ThemeToggle() {
  const theme = useTheme();
  const dark = theme === "dark";

  const flip = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = dark ? "light" : "dark";
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) {
      setTheme(next);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const t = doc.startViewTransition(() => setTheme(next));
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <button
      type="button"
      onClick={flip}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className="relative grid place-items-center w-10 h-10 rounded-full border border-line bg-surface/60 text-ink hover:border-line-strong active:scale-95 transition-[transform,border-color] duration-150"
    >
      {/* One drawn icon that morphs: the sun's disc becomes the moon as a second disc slides over it. */}
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="overflow-visible">
        <mask id="moon-cut">
          <rect x="-4" y="-4" width="32" height="32" fill="white" />
          <motion.circle
            r="7"
            fill="black"
            initial={false}
            animate={dark ? { cx: 17, cy: 7 } : { cx: 30, cy: -6 }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask="url(#moon-cut)"
          initial={false}
          animate={{ r: dark ? 8 : 4.5 }}
          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
        />
        <motion.g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{ opacity: dark ? 0 : 1, rotate: dark ? -45 : 0, scale: dark ? 0.6 : 1 }}
          style={{ originX: "12px", originY: "12px" }}
          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="12" y1="2.5" x2="12" y2="4.5" transform={`rotate(${a} 12 12)`} />
          ))}
        </motion.g>
      </svg>
    </button>
  );
}
