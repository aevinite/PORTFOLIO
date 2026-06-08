"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ from, to, duration = 2, suffix = "" }: { from: number; to: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * (to - from) + from));
        
        if (progress < 1) {
          window.requestAnimationFrame(animate);
        }
      };
      
      window.requestAnimationFrame(animate);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  const stats = [
    { value: 12, suffix: "+", label: "Projects" },
    { value: 10, suffix: "+", label: "Clients" },
    { value: 2, suffix: "+", label: "Years" },
    { value: 100, suffix: "%", label: "Creative" }
  ];

  return (
    <section className="py-32 bg-black relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex flex-col items-center justify-center p-6 group"
            >
              <h3 className="text-5xl md:text-7xl font-bold text-white mb-2 group-hover:text-neon-blue group-hover:text-glow transition-all duration-300">
                <Counter from={0} to={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-white/50 uppercase tracking-widest text-sm font-bold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
