"use client";

import { motion } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";

export default function CallToAction() {
  const { openModal } = useProjectModal();

  return (
    <section className="relative py-48 bg-black overflow-hidden flex items-center justify-center">
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-blue/20 via-transparent to-transparent opacity-50"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-8xl font-bold text-white mb-12 max-w-4xl leading-tight"
        >
          Let&apos;s Build Something <span className="text-neon-blue text-glow">Extraordinary</span>
        </motion.h2>

        <motion.button 
          onClick={openModal}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="interactive group relative px-12 py-6 rounded-full overflow-hidden"
        >
          {/* Button Background */}
          <div className="absolute inset-0 bg-neon-blue transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          
          <span className="relative z-10 text-black uppercase tracking-widest text-lg font-bold">
            Start a Project
          </span>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full box-glow opacity-100" />
        </motion.button>
      </div>
    </section>
  );
}
