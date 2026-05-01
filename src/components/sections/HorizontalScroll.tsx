"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const items = [
  "Digital Innovation",
  "Immersive 3D",
  "Fluid Motion",
  "Future Ready"
];

export default function HorizontalScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (containerRef.current && targetRef.current) {
      let scrollTween = gsap.to(containerRef.current, {
        x: () => -(containerRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: targetRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + containerRef.current!.scrollWidth
        }
      });

      return () => {
        scrollTween.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, []);

  return (
    <section ref={targetRef} className="h-screen bg-black overflow-hidden relative flex items-center border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgba(51,187,255,0.03)] via-transparent to-transparent pointer-events-none" />
      
      <div ref={containerRef} className="flex items-center gap-24 px-[20vw] whitespace-nowrap will-change-transform">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-12 group">
            <h2 className="text-6xl md:text-9xl font-bold text-transparent text-stroke-1 text-stroke-white/30 group-hover:text-white group-hover:text-glow transition-all duration-500 uppercase tracking-tighter">
              {item}
            </h2>
            {i < items.length - 1 && (
              <div className="w-12 h-12 md:w-24 md:h-24 rounded-full border border-neon-blue/30 flex justify-center items-center">
                <div className="w-2 h-2 md:w-4 md:h-4 bg-neon-cyan rounded-full box-glow" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
