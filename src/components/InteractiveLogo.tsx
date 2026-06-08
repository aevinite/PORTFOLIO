"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React from "react";

interface InteractiveLogoProps {
  className?: string;
  imageClass?: string;
}

export default function InteractiveLogo({ className = "", imageClass = "w-16 h-16" }: InteractiveLogoProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17deg", "-17deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17deg", "17deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className={`group ${className}`}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative flex items-center justify-center cursor-pointer"
      >
        <motion.div 
          style={{ transform: "translateZ(30px)" }}
          className={`relative flex items-center justify-center ${imageClass} group-hover:drop-shadow-[0_0_25px_rgba(51,187,255,0.6)] transition-all duration-300`}
        >
          <img
            src="/aevinite-logo.png"
            alt="Aevinite Logo"
            className="w-full h-full object-contain"
          />
          
          {/* Dynamic glare effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-sm" style={{ transform: "translateZ(10px)" }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
