"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Monitor, Code, Box, Zap, X } from "lucide-react";
import { useProjectModal } from "@/context/ProjectModalContext";

const services = [
  {
    title: "Web Design",
    icon: Monitor,
    description: "High-end, premium UI/UX design tailored for futuristic brands. We craft visually stunning interfaces that leave a lasting impression.",
  },
  {
    title: "Interactive Websites",
    icon: Zap,
    description: "Scroll-based storytelling, 3D elements, and micro-interactions that turn a standard webpage into an immersive journey.",
  },
  {
    title: "3D Modeling",
    icon: Box,
    description: "High-quality 3D assets, custom models, and environments designed to elevate your digital experiences.",
  },
  {
    title: "Creative Development",
    icon: Code,
    description: "Next.js, Three.js, and WebGL combined to build lightning-fast, highly optimized digital platforms.",
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const { openModal } = useProjectModal();

  return (
    <section id="services" className="relative pt-36 pb-32 bg-black min-h-screen flex items-start md:items-center">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Expertise</h2>
          <div className="w-24 h-1 bg-neon-blue mx-auto box-glow rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                layoutId={`card-${idx}`}
                onClick={() => setSelectedService(idx)}
                whileHover={{ y: -8 }}
                style={{ opacity: selectedService === idx ? 0 : 1 }}
                className="interactive glass-panel p-10 rounded-2xl cursor-pointer group relative overflow-hidden transition-colors duration-500 hover:border-neon-blue/50"
              >
                {/* Hover Glow Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-blue/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div className="mb-6 relative z-10 text-white/50 group-hover:text-neon-cyan transition-colors">
                  <Icon size={48} strokeWidth={1.5} />
                </motion.div>
                
                <motion.h3 className="text-2xl font-bold text-white mb-4 relative z-10">
                  {service.title}
                </motion.h3>
                
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-neon-blue group-hover:bg-neon-blue/10 transition-all absolute bottom-10 right-10">
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full group-hover:bg-neon-blue" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expanded View */}
      <AnimatePresence>
        {selectedService !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-20 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              layoutId={`card-${selectedService}`}
              className="bg-[#0a0a0f] border border-neon-blue/30 rounded-3xl p-8 sm:p-10 md:p-20 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-[0_0_50px_rgba(51,187,255,0.1)]"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="interactive absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full bg-black/50 backdrop-blur-md z-50"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col gap-8">
                {(() => {
                  const Icon = services[selectedService].icon;
                  return (
                    <motion.div className="text-neon-cyan">
                      <Icon size={64} strokeWidth={1} />
                    </motion.div>
                  );
                })()}

                <motion.h3 className="text-4xl md:text-6xl font-bold text-white text-glow">
                  {services[selectedService].title}
                </motion.h3>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-white/70 leading-relaxed font-light"
                >
                  {services[selectedService].description}
                </motion.p>
                
                <motion.button 
                  onClick={() => {
                    setSelectedService(null);
                    openModal();
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="interactive mt-8 self-start px-8 py-3 bg-neon-blue/10 border border-neon-blue text-neon-blue uppercase tracking-widest text-sm font-bold rounded-full hover:bg-neon-blue hover:text-black transition-all"
                >
                  Start Project
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
