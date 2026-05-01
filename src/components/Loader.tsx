"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
        exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="relative flex flex-col items-center">
          {/* Logo */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-widest text-white text-glow mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            AEVINITE
          </motion.h1>

          {/* Orbit Ring */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-48 h-48 md:w-64 md:h-64 border border-neon-blue/30 rounded-full"
            style={{ x: "-50%", y: "-50%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-neon-cyan rounded-full box-glow" style={{ transform: "translate(-50%, -50%)" }} />
          </motion.div>

          {/* Progress Line */}
          <div className="w-64 h-[2px] bg-white/10 mt-12 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-neon-blue box-glow"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
          
          <div className="mt-4 text-neon-blue font-mono text-sm tracking-widest">
            {Math.round(progress)}%
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
