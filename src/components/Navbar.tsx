"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import InteractiveLogo from "./InteractiveLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        scrolled ? "py-1 glass-panel border-b-0" : "py-1.5 bg-transparent"
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
          {["Projects", "Services", "About"].map((item) => (
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
        <button 
          className="interactive md:hidden flex flex-col gap-1.5 p-2 relative z-[100]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <motion.div 
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-[2px] bg-white transition-all"
          ></motion.div>
          <motion.div 
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-[2px] bg-white transition-all"
          ></motion.div>
          <motion.div 
            animate={isMobileMenuOpen ? { rotate: -45, y: -8, width: 24 } : { rotate: 0, y: 0, width: 16 }}
            className="h-[2px] bg-white self-end transition-all"
          ></motion.div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[95] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center min-h-screen"
          >
            <div className="flex flex-col items-center gap-8">
              {["Projects", "Services", "Process"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link
                    href={`/#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl uppercase tracking-widest text-white/70 hover:text-white hover:text-glow transition-all duration-300"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Link 
                  href="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-8 py-4 rounded-full border border-neon-blue/50 text-neon-blue text-lg uppercase tracking-widest hover:bg-neon-blue/10 hover:box-glow transition-all duration-300"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
