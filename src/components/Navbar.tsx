"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import InteractiveLogo from "./InteractiveLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-300 ${
        scrolled ? "py-4 glass-panel border-b-0" : "py-6 bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="interactive group flex items-center gap-3">
          <InteractiveLogo imageClass="w-20 h-20 drop-shadow-[0_0_10px_rgba(51,187,255,0.3)]" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {["Projects", "Services", "Process"].map((item) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase()}`}
              className="interactive text-sm uppercase tracking-widest text-white/70 hover:text-white hover:text-glow transition-all duration-300"
            >
              {item}
            </Link>
          ))}
          <Link href="/contact" className="interactive px-6 py-2 rounded-full border border-neon-blue/50 text-neon-blue text-sm uppercase tracking-widest hover:bg-neon-blue/10 hover:box-glow transition-all duration-300">
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="interactive md:hidden flex flex-col gap-1.5 p-2">
          <div className="w-6 h-[2px] bg-white"></div>
          <div className="w-6 h-[2px] bg-white"></div>
          <div className="w-4 h-[2px] bg-white self-end"></div>
        </button>
      </div>
    </motion.nav>
  );
}
