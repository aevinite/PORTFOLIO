"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const steps = [
  { id: "01", title: "Discovery", desc: "Understanding the vision, target audience, and core objectives." },
  { id: "02", title: "Design", desc: "Crafting a unique visual language and interactive prototypes." },
  { id: "03", title: "Development", desc: "Building the experience with cutting-edge web technologies." },
  { id: "04", title: "Launch", desc: "Optimizing, testing, and deploying the final masterpiece." }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="process" className="relative py-32 bg-black min-h-screen flex items-center">
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={containerRef}>
        
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Process</h2>
          <div className="w-24 h-1 bg-neon-blue box-glow rounded-full mx-auto" />
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 hidden md:block" />
          <motion.div 
            className="absolute top-1/2 left-0 h-[2px] bg-neon-blue box-glow -translate-y-1/2 hidden md:block origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative group">
                {/* Dot */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
                  className="w-12 h-12 rounded-full bg-black border-2 border-white/20 flex items-center justify-center mb-8 relative z-10 group-hover:border-neon-blue group-hover:bg-neon-blue/10 transition-colors duration-300"
                >
                  <div className="w-3 h-3 rounded-full bg-white/50 group-hover:bg-neon-blue group-hover:box-glow transition-all duration-300" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.2, duration: 0.5 }}
                >
                  <span className="text-neon-cyan font-mono text-xl mb-4 block">{step.id}</span>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-white/60 font-light text-sm">{step.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
