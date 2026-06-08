"use client";

import Link from "next/link";

const InstagramIcon = ({ size = 24 }) => (
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
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const GmailIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.943L12 11.668l8.073-8.153C21.691 2.28 24 3.434 24 5.457z" />
  </svg>
);

const WhatsAppIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
  </svg>
);

// Opens Gmail's compose window directly (not the OS default mail app / Outlook),
// with the recipient pre-filled.
const GMAIL_COMPOSE =
  "https://mail.google.com/mail/?view=cm&fs=1&to=aevinite@gmail.com&su=Project%20Inquiry";

// WhatsApp Business — wa.me needs international format (no +). 9409901526 -> +91.
const WHATSAPP_LINK =
  "https://wa.me/919409901526?text=Hi%20AEVINITE%2C%20I%27d%20like%20to%20discuss%20a%20project.";

export default function Footer() {
  return (
    <footer className="relative py-20 px-6 md:px-12 bg-black border-t border-white/10 z-10 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[rgba(51,187,255,0.05)] via-transparent to-transparent" />

      <div className="container mx-auto max-w-7xl relative z-10 flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Wordmark + meaning */}
        <div className="flex flex-col gap-4 max-w-sm">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-none bg-gradient-to-br from-white via-[#5aa9ff] to-[#1f6fb2] bg-clip-text text-transparent">
            AEVINITE
          </h2>
          <p className="text-white/45 text-sm md:text-base leading-relaxed">
            Derived from <span className="text-white/70">Aevum</span> — a dimension of
            existence with a beginning but no end. It also echoes <span className="text-white/70">Infinite</span>.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="text-white uppercase tracking-widest text-sm font-bold">Links</h4>
            <div className="flex flex-col gap-2">
              {["Home", "Projects", "Services", "Contact"].map((link) => (
                <Link
                  key={link}
                  href={link === "Contact" ? "/contact" : link === "Home" ? "/" : `/#${link.toLowerCase()}`}
                  className="interactive text-white/50 hover:text-neon-blue transition-colors text-sm"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white uppercase tracking-widest text-sm font-bold">Socials</h4>
            <div className="flex gap-4">
              {/* Instagram — brand color visible, gradient fill on hover */}
              <a
                href="https://instagram.com/aevinite"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="interactive w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[#E1306C] hover:text-white hover:border-transparent hover:bg-[linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)] hover:shadow-[0_0_18px_rgba(214,41,118,0.45)] transition-all duration-300"
              >
                <InstagramIcon size={19} />
              </a>

              {/* Gmail — opens Gmail compose with recipient pre-filled, red brand color */}
              <a
                href={GMAIL_COMPOSE}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email us on Gmail"
                className="interactive w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[#EA4335] hover:text-white hover:border-transparent hover:bg-[#EA4335] hover:shadow-[0_0_18px_rgba(234,67,53,0.45)] transition-all duration-300"
              >
                <GmailIcon size={18} />
              </a>

              {/* WhatsApp Business — opens chat with the business number */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="interactive w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[#25D366] hover:text-white hover:border-transparent hover:bg-[#25D366] hover:shadow-[0_0_18px_rgba(37,211,102,0.45)] transition-all duration-300"
              >
                <WhatsAppIcon size={19} />
              </a>
            </div>
            <div className="mt-1 space-y-0.5">
              <p className="text-white/30 text-xs font-mono">aevinite@gmail.com</p>
              <p className="text-white/30 text-xs font-mono">WhatsApp: +91 94099 01526</p>
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
