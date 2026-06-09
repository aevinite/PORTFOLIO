"use client";

import { motion } from "framer-motion";

// Order matters: the widest labels are spread evenly around the ring (never
// neighbours) so two long ones can't collide when they're both out at once.
const tech = [
  "React Three Fiber", "React", "Lenis", "Framer Motion", "Next.js", "GSAP",
  "TailwindCSS", "WebGL", "Three.js", "Node.js", "TypeScript", "Vercel",
  "Figma", "JavaScript", "Blender", "Git"
];

// Each badge runs the SAME self-contained loop: born inside the center dot ->
// SLOWLY forms out to its ring slot -> keeps drifting outward while fading away
// (it never travels back on screen) -> waits invisibly -> repeats forever.
const RADIUS = 200;          // ring radius (px)

// --- Timing in ABSOLUTE seconds, so the FORM motion looks identical no matter
//     how many badges there are (this is the part that's "perfectly fine"). ---
const FORM = 5.5;            // emerge from the EXACT center, slowly out to the ring
const FADE = 4.5;            // keep drifting outward while fading away
const VISIBLE = FORM + FADE; // seconds of on-screen travel (center -> out beyond ring)
const VIS_WINDOW = 7;        // ~seconds it reads as "present" (visible nearly the whole way)
const TARGET_VISIBLE = 5;    // how many read as present at once (density; lower = calmer)

// The cycle STRETCHES with the badge count so only ~TARGET_VISIBLE are ever out
// together. Result: a fresh badge emerges every (VISIBLE / TARGET_VISIBLE) ≈
// 1.1s forever — whether there are 11 badges or 22. Add/remove tags freely and
// the rhythm + density stay the same.
// Floor keeps the form/fade/reset fitting inside the cycle; above ~16 badges the
// TARGET_VISIBLE term takes over so density stays put as you add more.
const CYCLE = Math.max(VISIBLE + 1.2, (VIS_WINDOW * tech.length) / TARGET_VISIBLE);

// Keyframe moments, in seconds within the cycle (6 points — must match the
// x/y/scale/opacity arrays in the JSX below):
//   0            at the EXACT center, opacity 0 — about to appear
//   FORM         arrived at the ring, fully visible (faded in the WHOLE way out,
//                so you see it from the middle onward as it travels)
//   +FADE*0.7    ~1.25x out, fully faded back to 0 (disappeared further OUT)
//   VISIBLE      ~1.4x out, still 0 — buffer so opacity is solidly gone...
//   +0.2         ...BEFORE the invisible snap back to the dot begins
//   CYCLE        waiting inside the dot for its next turn
const TIMES = [
  0,
  FORM / CYCLE,
  (FORM + FADE * 0.7) / CYCLE,
  VISIBLE / CYCLE,
  (VISIBLE + 0.2) / CYCLE,
  1,
];

// Golden-ratio phase offsets: each badge starts at a scattered point in the
// cycle so the ones visible at any instant are spread EVENLY around the ring —
// never too many on one side with the other side blank. Deterministic (no
// Math.random) so server and client render identically.
const PHI = 0.618033988749895;

const items = tech.map((t, i) => {
  const angle = ((-90 + (360 / tech.length) * i) * Math.PI) / 180;
  return {
    name: t,
    x: Math.cos(angle) * RADIUS,
    y: Math.sin(angle) * RADIUS,
    delay: ((i * PHI) % 1) * CYCLE,
  };
});

export default function TechStack() {
  return (
    <section className="relative py-32 bg-black overflow-hidden flex flex-col items-center justify-center border-y border-white/5">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-sm font-bold text-neon-blue tracking-[0.3em] uppercase mb-4 text-glow">Powered By</h2>
      </div>

      <div className="relative w-full max-w-5xl h-[520px] flex items-center justify-center">
        {/* Core center */}
        <div className="absolute w-24 h-24 rounded-full border border-neon-blue/50 flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(51,187,255,0.2)]">
          <div className="w-4 h-4 bg-neon-cyan rounded-full" />
        </div>

        {items.map((item) => (
          <motion.div
            key={item.name}
            className="absolute"
            animate={{
              // 6 keyframes — MUST stay the same length as TIMES above.
              // Appears at the EXACT center and is visible the whole way out (fades
              // in from the middle), keeps drifting outward and fades to 0 OUT past
              // the ring, then — fully invisible — snaps back to the dot. So you see
              // it form FROM the middle, never sit still there, and never travel back.
              x: [0, item.x, item.x * 1.25, item.x * 1.4, 0, 0],
              y: [0, item.y, item.y * 1.25, item.y * 1.4, 0, 0],
              scale: [0.3, 1, 1.15, 1.25, 0.3, 0.3],
              opacity: [0, 1, 0, 0, 0, 0],
            }}
            transition={{
              duration: CYCLE,
              times: TIMES,
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
