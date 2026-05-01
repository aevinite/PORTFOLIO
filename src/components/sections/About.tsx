"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const cards = [
  "Interactive Design",
  "Web Development",
  "Creative Motion",
  "Brand Experiences"
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="relative py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 relative z-10" ref={containerRef}>
        
        {/* Left: Typography */}
        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
          >
            We don&apos;t just build websites. <br/>
            <span className="text-neon-blue text-glow">We build worlds.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-lg max-w-xl font-light"
          >
            AEVINITE is a futuristic digital agency focused on pushing the boundaries of web experiences. We blend cutting-edge technology with high-end aesthetics to create immersive platforms that captivate and engage.
          </motion.p>
        </div>

        {/* Right: Floating Cards */}
        <div className="flex-1 relative h-[500px] w-full perspective-1000">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="absolute interactive glass-panel px-8 py-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl"
              initial={{ opacity: 0, y: 100, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.15,
                type: "spring",
                bounce: 0.4
              }}
              whileHover={{ 
                scale: 1.05, 
                rotateX: 10, 
                rotateY: -10,
                borderColor: "rgba(51, 187, 255, 0.5)",
                boxShadow: "0 10px 30px rgba(51, 187, 255, 0.2)"
              }}
              style={{
                top: `${i * 20}%`,
                left: `${(i % 2) * 10}%`,
                zIndex: cards.length - i
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-neon-blue box-glow" />
                <h3 className="text-xl font-bold text-white">{card}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
