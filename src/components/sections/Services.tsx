"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Eyebrow, Reveal, useSpotlight } from "@/components/ui";

const SERVICES = [
  {
    title: "Websites & apps",
    tag: "Concept to launch",
    desc: "Fast, polished websites and web apps, built around your workflow and found on Google.",
    items: ["Company websites", "Web apps", "Mobile-first", "Local SEO"],
  },
  {
    title: "Custom software",
    tag: "Shaped around you",
    desc: "Software that fits how your business already runs: bookings, billing, dashboards and internal tools.",
    items: ["Dashboards", "Billing", "Admin panels", "Multi-branch"],
  },
  {
    title: "Automation & AI",
    tag: "Unblock your team",
    desc: "We map your operations and hand the repetitive work to automation, with AI where it turns data into decisions.",
    items: ["Workflow automation", "AI assistants", "Reports that write themselves", "Integrations"],
  },
  {
    title: "3D & immersive web",
    tag: "Make it unforgettable",
    desc: "Interactive 3D products, scroll stories and AR previews that people remember and share.",
    items: ["3D product views", "AR", "Scroll stories", "WebGL"],
  },
  {
    title: "Cloud & growth systems",
    tag: "Built to scale",
    desc: "Backends and cloud setup that stay fast and secure as you add customers, branches and staff.",
    items: ["Databases", "Realtime", "Offline-ready", "Security"],
  },
];

export default function Services() {
  const [open, setOpen] = useState<number | null>(0);
  const spot = useSpotlight();
  return (
    <section id="services" onPointerMove={spot} className="spotlight relative py-24 md:py-36 border-t border-line">
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 self-start">
          <Eyebrow>Services</Eyebrow>
          <h2 className="display text-[clamp(2.4rem,5vw,4.4rem)] text-ink">
            What we <span className="serif-accent text-accent">build</span> for you.
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed max-w-md">
            Everything is made in-house in Ahmedabad by the people you talk to. No hand-offs, no templates.
          </p>
        </Reveal>

        <ul className="border-t border-line">
          {SERVICES.map((s, i) => {
            const on = open === i;
            return (
              <li key={s.title} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(on ? null : i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
                  aria-expanded={on}
                  className="group w-full text-left py-7 md:py-8 flex items-start gap-5 md:gap-8"
                >
                  <span className={`tabular-nums text-sm pt-2.5 transition-colors ${on ? "text-accent" : "text-subtle"}`}>0{i + 1}</span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-baseline justify-between gap-4">
                      <span className={`text-3xl md:text-[2.6rem] font-medium tracking-tight leading-tight transition-all duration-300 ${on ? "text-ink md:translate-x-2" : "text-ink/70 group-hover:text-ink"}`}>
                        {s.title}
                      </span>
                      <span className="hidden sm:block text-sm text-subtle whitespace-nowrap">{s.tag}</span>
                    </span>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.span
                          className="block overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: "spring", bounce: 0, duration: 0.45 }}
                        >
                          <span className="block pt-4 md:pl-2 text-muted text-lg leading-relaxed max-w-xl">{s.desc}</span>
                          <span className="flex flex-wrap gap-2 pt-5 md:pl-2">
                            {s.items.map((t) => (
                              <span key={t} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                                {t}
                              </span>
                            ))}
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`mt-2 grid place-items-center w-9 h-9 shrink-0 rounded-full border transition-all duration-300 ${
                      on ? "rotate-45 bg-accent border-accent text-accent-ink" : "border-line-strong text-ink"
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
