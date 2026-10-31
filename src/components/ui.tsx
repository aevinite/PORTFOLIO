"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

// Small shared pieces every page uses, so the whole site speaks one visual language.

export function Eyebrow({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "gold" }) {
  return (
    <p className="eyebrow flex items-center gap-3 mb-5">
      <span aria-hidden="true" className={`h-px w-8 ${tone === "gold" ? "bg-gold" : "bg-accent"}`} />
      {children}
    </p>
  );
}

// A button that leans toward the cursor (desktop only — touch never sees it move).
// Critically-damped spring, so it settles without wobble.
export function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 });
  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      className="inline-block"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[transform,background-color,border-color,box-shadow,color] duration-200 active:scale-[0.97] select-none";
const sizes = { md: "h-11 px-5 text-[15px]", lg: "h-14 px-7 text-base" };
const looks = {
  primary:
    "bg-ink text-bg hover:bg-accent hover:text-accent-ink dark:bg-accent dark:text-accent-ink dark:hover:bg-accent-2 dark:shadow-[0_0_0_1px_rgb(255_255_255/0.12)_inset,0_10px_40px_-10px_var(--glow)]",
  ghost: "border border-line-strong text-ink hover:border-ink hover:bg-surface",
  gold: "bg-gold text-bg hover:brightness-110",
};

type BtnProps = {
  children: React.ReactNode;
  look?: keyof typeof looks;
  size?: keyof typeof sizes;
  className?: string;
};

export function ButtonLink({ href, look = "primary", size = "md", className = "", children, external }: BtnProps & { href: string; external?: boolean }) {
  const cls = `${base} ${sizes[size]} ${looks[look]} ${className}`;
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Button({ onClick, look = "primary", size = "md", className = "", children, type = "button", disabled }: BtnProps & { onClick?: () => void; type?: "button" | "submit"; disabled?: boolean }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${looks[look]} disabled:opacity-60 ${className}`}>
      {children}
    </button>
  );
}

// Arrow that slides on hover of its parent .group — the only hover motion on buttons.
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={`transition-transform duration-200 group-hover:translate-x-0.5 ${className}`}>
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Fades + lifts content in once as it enters the screen. Server HTML keeps the text (only
// opacity/transform animate), so search engines and AI readers still see every word.
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// Writes the pointer position into --mx/--my so .spotlight sections glow under the cursor (dark).
export function useSpotlight() {
  return (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-subtle mb-10 flex flex-wrap items-center gap-2">
      {items.map((it, i) => (
        <span key={it.label} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true">/</span>}
          {it.href ? (
            <Link href={it.href} className="py-1 hover:text-ink transition-colors">
              {it.label}
            </Link>
          ) : (
            <span className="text-ink">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
