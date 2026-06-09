"use client";

import { motion } from "framer-motion";

const tech = [
  "React", "Next.js", "GSAP", "Three.js", "Framer Motion", "TailwindCSS", "WebGL"
];

// Each badge runs the SAME self-contained loop: born inside the center dot ->
// blooms out to its ring slot -> holds -> is drawn back INTO the dot (same
// motion, reversed) -> waits -> repeats forever.
//
// The trick that makes it feel alive: every badge starts its loop at a
// different, SCATTERED point in time (phaseFrac, a shuffled spread of 0..1).
// So they never move in lockstep — at any instant some are forming while
// others are vanishing, and they pop out in a random-looking order around the
// ring instead of 1-2-3-4. Values are fixed (not Math.random) so server and
// client render identically (no hydration mismatch).
const RADIUS = 185;
const CYCLE = 8;             // seconds for one badge's full bloom+vanish loop

// Per-badge phase offset as a fraction of the cycle. Scattered on purpose.
const phaseFrac = [0, 0.71, 0.43, 0.14, 0.86, 0.29, 0.57];

const items = tech.map((t, i) => {
  const angle = ((-90 + (360 / tech.length) * i) * Math.PI) / 180;
  return {
    name: t,
    x: Math.cos(angle) * RADIUS,
    y: Math.sin(angle) * RADIUS,
    delay: phaseFrac[i] * CYCLE,
  };
});

export default function TechStack() {
  return (
    <section className="relative py-32 bg-black overflow-hidden flex flex-col items-center justify-center border-y border-white/5">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-sm font-bold text-neon-blue tracking-[0.3em] uppercase mb-4 text-glow">Powered By</h2>
      </div>

      <div className="relative w-full max-w-4xl h-[460px] flex items-center justify-center">
        {/* Core center */}
        <div className="absolute w-24 h-24 rounded-full border border-neon-blue/50 flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(51,187,255,0.2)]">
          <div className="w-4 h-4 bg-neon-cyan rounded-full" />
        </div>

        {items.map((item) => (
          <motion.div
            key={item.name}
            className="absolute"
            animate={{
              //  0      0.16     0.55     0.71      1   (fraction of cycle)
              // dot -> ring -> hold ring -> dot -> stay in dot
              x: [0, item.x, item.x, 0, 0],
              y: [0, item.y, item.y, 0, 0],
              scale: [0.3, 1, 1, 0.3, 0.3],
              opacity: [0, 1, 1, 0, 0],
            }}
            transition={{
              duration: CYCLE,
              times: [0, 0.16, 0.55, 0.71, 1],
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              delay: item.delay,
            }}
          >
            <motion.span
              whileHover={{ scale: 1.12 }}
              className="block whitespace-nowrap glass-panel px-6 py-3 rounded-full border border-white/10 text-white/80 font-mono text-sm shadow-xl hover:border-neon-blue/50 hover:text-white hover:[text-shadow:0_0_10px_rgba(51,187,255,0.6)] transition-colors duration-300"
            >
              {item.name}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
