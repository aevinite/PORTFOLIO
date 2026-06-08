"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const capabilities = [
  {
    n: "01",
    title: "Digital Experiences",
    desc: "Immersive, interactive websites and apps engineered to make brands unforgettable.",
  },
  {
    n: "02",
    title: "Custom Systems",
    desc: "Bespoke software shaped precisely around how your business actually operates.",
  },
  {
    n: "03",
    title: "AI & Automation",
    desc: "Intelligent workflows that remove repetitive work and compound your team's output.",
  },
  {
    n: "04",
    title: "Cloud Platforms",
    desc: "Secure, scalable infrastructure built to grow without hitting a ceiling.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-black">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 right-0 translate-x-1/3 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(51,187,255,0.08) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.35fr] gap-14 lg:gap-24 items-start">
          {/* LEFT — sticky intro */}
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-px bg-neon-blue/60" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-neon-cyan/60 font-mono">
                Who we are
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]"
            >
              <span className="text-white">We build </span>
              <span className="text-neon-blue text-glow">systems.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="text-white/50 text-base md:text-lg font-light leading-relaxed mt-6 max-w-md"
            >
              AEVINITE helps businesses identify bottlenecks, build smarter solutions,
              automate repetitive work, and create systems that scale with growth.
            </motion.p>
          </div>

          {/* RIGHT — capability list */}
          <div>
            {capabilities.map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className={`group relative grid grid-cols-[auto_1fr] gap-5 md:gap-8 py-7 md:py-8 border-t border-white/10 cursor-default ${
                  i === capabilities.length - 1 ? "border-b" : ""
                }`}
              >
                {/* Left accent that grows on hover */}
                <span className="absolute left-0 top-0 h-full w-[2px] bg-neon-blue origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />

                <span className="font-mono text-xl md:text-2xl text-white/25 group-hover:text-neon-blue transition-colors duration-300 pl-2 md:pl-4">
                  {c.n}
                </span>

                <div className="pr-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:translate-x-1 transition-transform duration-300">
                      {c.title}
                    </h3>
                    <ArrowUpRight
                      size={22}
                      className="shrink-0 text-neon-blue opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </div>
                  <p className="text-white/45 text-sm md:text-base leading-relaxed mt-2 max-w-md group-hover:text-white/60 transition-colors duration-300">
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
