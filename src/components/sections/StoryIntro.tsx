"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function StoryIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!textRef.current) return;
    
    const lines = textRef.current.querySelectorAll('.reveal-text');
    
    gsap.fromTo(lines, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          scrub: 1,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-64 w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff1a_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      
      <motion.div 
        className="container mx-auto px-6 relative z-10 flex justify-center text-center"
        style={{ scale }}
      >
        <div ref={textRef} className="flex flex-col gap-4 md:gap-8 text-4xl md:text-7xl font-bold tracking-tight text-white uppercase">
          <div className="reveal-text text-glow">We Design</div>
          <div className="reveal-text text-glow">We Build</div>
          <div className="reveal-text text-glow">We Animate</div>
          <div className="reveal-text text-glow text-neon-blue">We Innovate</div>
        </div>
      </motion.div>
    </section>
  );
}
