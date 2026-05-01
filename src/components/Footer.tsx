"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, MessageCircle, Share2 } from "lucide-react";
import InteractiveLogo from "./InteractiveLogo";

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const GmailIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.943L12 11.668l8.073-8.153C21.691 2.28 24 3.434 24 5.457z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative py-20 px-6 md:px-12 bg-black border-t border-white/10 z-10 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[rgba(51,187,255,0.05)] via-transparent to-transparent"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-4 group interactive">
            <InteractiveLogo imageClass="w-[140px] h-[140px] drop-shadow-[0_0_15px_rgba(51,187,255,0.4)]" />
          </Link>
          <p className="text-white/50 font-mono text-sm max-w-xs">
            Interactive Digital Studio crafting immersive web experiences for forward-thinking brands.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="text-white uppercase tracking-widest text-sm font-bold">Links</h4>
            <div className="flex flex-col gap-2">
              {["Home", "Projects", "Services", "Contact"].map((link) => (
                <Link key={link} href={link === "Contact" ? "/contact" : link === "Home" ? "/" : `/#${link.toLowerCase()}`} className="interactive text-white/50 hover:text-neon-blue transition-colors text-sm">
                  {link}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-white uppercase tracking-widest text-sm font-bold">Socials</h4>
            <div className="flex gap-4">
              <a href="https://instagram.com/aevinite" target="_blank" rel="noopener noreferrer" className="interactive w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-neon-blue hover:text-neon-blue hover:box-glow transition-all">
                <InstagramIcon size={18} />
              </a>
              <a href="mailto:aevinite@gmail.com" className="interactive w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-neon-blue hover:text-neon-blue hover:box-glow transition-all">
                <GmailIcon size={18} />
              </a>
              <a href="#" className="interactive w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-neon-blue hover:text-neon-blue hover:box-glow transition-all">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="interactive w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-neon-blue hover:text-neon-blue hover:box-glow transition-all">
                <Share2 size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-7xl mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 text-xs font-mono text-white/30">
        <p>&copy; {new Date().getFullYear()} AEVINITE. All rights reserved.</p>
        <p>Crafted in the future.</p>
      </div>
    </footer>
  );
}
