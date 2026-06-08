"use client";

import { motion } from "framer-motion";

const tech = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "Framer Motion",
  "Three.js",
  "model-viewer",
  "WebGL",
  "GSAP",
  "Node.js",
  "Vercel",
];

// Organic, varied radius (deterministic so it doesn't jump on re-render).
const items = tech.map((t, i) => {
  const angle = (i / tech.length) * Math.PI * 2;
  const radius = 135 + ((i * 47) % 90); // ~135–224, spread like the original
  return {
    name: t,
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    floatDur: 3 + ((i * 0.6) % 2),
    delay: i * 0.1,
  };
});

export default function TechStack() {
  return (
    <section className="relative py-32 bg-black overflow-hidden flex flex-col items-center justify-center border-y border-white/5">
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-sm font-bold text-neon-blue tracking-[0.3em] uppercase mb-4 text-glow">
          Powered By
        </h2>
      </div>

      <div className="relative w-full max-w-4xl h-[440px] flex items-center justify-center">
        {/* Scale down on small screens so the orbit never overflows */}
        <div className="relative w-[500px] h-[440px] flex items-center justify-center scale-[0.6] sm:scale-[0.85] lg:scale-100">
          {/* Core center */}
          <div className="absolute w-24 h-24 rounded-full border border-neon-blue/50 flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(51,187,255,0.2)]">
            <div className="w-4 h-4 bg-neon-cyan rounded-full" />
          </div>

          {/* Orbiting tech — forms at the center, springs outward, then floats */}
          {items.map((item) => (
            <div key={item.name} className="absolute">
              <motion.div
                initial={{ x: 0, y: 0, opacity: 0 }}
                whileInView={{ x: item.x, y: item.y, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, type: "spring", bounce: 0.3, delay: item.delay }}
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: item.floatDur, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="block whitespace-nowrap glass-panel px-6 py-3 rounded-full border border-white/10 text-white/80 font-mono text-sm shadow-xl hover:border-neon-blue/50 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </motion.span>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
