"use client";

import { motion } from "framer-motion";

const tech = [
  "React", "Next.js", "GSAP", "Three.js", "Framer Motion", "TailwindCSS", "WebGL"
];

export default function TechStack() {
  return (
    <section className="relative py-32 bg-black overflow-hidden flex flex-col items-center justify-center border-y border-white/5">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-sm font-bold text-neon-blue tracking-[0.3em] uppercase mb-4 text-glow">Powered By</h2>
      </div>

      <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center">
        {/* Core center */}
        <div className="absolute w-24 h-24 rounded-full border border-neon-blue/50 flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(51,187,255,0.2)]">
          <div className="w-4 h-4 bg-neon-cyan rounded-full" />
        </div>

        {/* Orbiting Tech */}
        {tech.map((t, i) => {
          const angle = (i / tech.length) * Math.PI * 2;
          const radius = 150 + Math.random() * 100;
          
          return (
            <motion.div
              key={t}
              className="absolute glass-panel px-6 py-3 rounded-full border border-white/10 text-white/80 font-mono text-sm shadow-xl"
              initial={{ x: 0, y: 0, opacity: 0 }}
              whileInView={{ 
                x: Math.cos(angle) * radius, 
                y: Math.sin(angle) * radius,
                opacity: 1
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, type: "spring", bounce: 0.3, delay: i * 0.1 }}
              whileHover={{ 
                scale: 1.1, 
                borderColor: "rgba(51, 187, 255, 0.5)",
                color: "#fff",
                textShadow: "0 0 10px rgba(51, 187, 255, 0.5)"
              }}
              animate={{
                y: [Math.sin(angle) * radius, Math.sin(angle) * radius - 15, Math.sin(angle) * radius],
              }}
              //@ts-ignore
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {t}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
