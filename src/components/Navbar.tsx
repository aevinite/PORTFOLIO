"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useProjectModal } from "@/context/ProjectModalContext";
import { PRODUCTS } from "@/data/products";
import { TONES } from "@/components/ui";

const LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/about" },
  { label: "Guides", href: "/guides" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false); // the Products panel (desktop)
  const menuRef = useRef<HTMLLIElement>(null);

  // A tap or click anywhere outside the Products panel closes it.
  useEffect(() => {
    if (!menu) return;
    const away = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [menu]);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { openModal } = useProjectModal();

  // The bar becomes a floating pill once you scroll, slips away while you read downward,
  // and comes back the moment you scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev + 2);
    if (y < prev - 2) setHidden(false);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[90] px-3 md:px-6 pt-3"
        animate={{ y: hidden && !open ? -110 : 0 }}
        transition={{ type: "spring", bounce: 0, duration: 0.45 }}
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex items-center justify-between gap-4 rounded-full transition-[max-width,background-color,border-color,box-shadow,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled || open
              ? "max-w-5xl bg-[var(--nav-bg)] backdrop-blur-xl backdrop-saturate-150 border border-line shadow-card pl-4 pr-2 py-2"
              : "max-w-7xl border border-transparent px-3 py-3"
          }`}
        >
          <Link href="/" aria-label="Aevinite home" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
            <Image src="/aevinite-mark.webp" alt="" width={192} height={118} loading="eager" className="w-11 h-auto dark:drop-shadow-[0_0_14px_var(--glow)]" />
            <span className="text-[17px] font-semibold tracking-[0.14em] text-ink">AEVINITE</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            <li ref={menuRef} className="relative" onPointerEnter={(e) => e.pointerType === "mouse" && setMenu(true)} onPointerLeave={(e) => e.pointerType === "mouse" && setMenu(false)}>
              <button
                type="button"
                // Mouse: hovering already opened it, so a click keeps it open. Keyboard (detail 0)
                // toggles. Touch: a tap opens; tapping elsewhere closes.
                onClick={(e) => setMenu((m) => (e.detail === 0 ? !m : true))}
                aria-expanded={menu}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[15px] transition-colors ${
                  menu || pathname === "/aevidine" || pathname === "/campus" ? "text-ink bg-surface-2" : "text-muted hover:text-ink"
                }`}
              >
                Products
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={`transition-transform duration-200 ${menu ? "rotate-180" : ""}`}>
                  <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <AnimatePresence>
                {menu && (
                  <motion.div
                    className="absolute left-1/2 top-full pt-3 -translate-x-1/2"
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                    style={{ transformOrigin: "top center" }}
                  >
                    <div className="w-[560px] grid grid-cols-2 gap-2 p-2 rounded-[22px] bg-surface edge shadow-float">
                      {PRODUCTS.map((p) => (
                        <Link
                          key={p.id}
                          href={p.href}
                          onClick={() => setMenu(false)}
                          className="group rounded-2xl p-4 hover:bg-surface-2 transition-colors"
                        >
                          <span className="flex items-center gap-2.5">
                            {p.mark ? (
                              <Image src={p.mark} alt="" width={28} height={28} className="w-7 h-7 rounded-lg" />
                            ) : (
                              <span className={`grid place-items-center w-7 h-7 rounded-lg text-sm font-semibold ${TONES[p.tone].soft} ${TONES[p.tone].text}`}>A</span>
                            )}
                            <span className="text-ink font-medium">{p.name}</span>
                          </span>
                          <span className={`block mt-3 text-xs font-medium ${TONES[p.tone].text}`}>{p.kind}</span>
                          <span className="block mt-1 text-sm text-muted leading-snug">{p.line}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className={`px-3.5 py-2 rounded-full text-[15px] transition-colors ${
                      active ? "text-ink bg-surface-2" : "text-muted hover:text-ink"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openModal}
              className="hidden sm:inline-flex h-10 items-center px-4 rounded-full text-[15px] font-medium bg-ink text-bg hover:bg-accent hover:text-accent-ink dark:bg-accent dark:text-accent-ink transition-colors active:scale-[0.97]"
            >
              Start a project
            </button>
            <ThemeToggle />
            <button
              type="button"
              className="lg:hidden grid place-items-center w-10 h-10 rounded-full border border-line text-ink"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block w-4 h-3">
                <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[85] bg-bg/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col gap-1 px-6 pt-28 h-full overflow-y-auto pb-10">
              <li className="grid grid-cols-2 gap-3 mb-4">
                {PRODUCTS.map((p) => (
                  <Link key={p.id} href={p.href} onClick={() => setOpen(false)} className="rounded-2xl edge bg-surface p-4">
                    <span className={`block text-xs font-medium ${TONES[p.tone].text}`}>{p.kind}</span>
                    <span className="block mt-1 text-lg font-semibold tracking-tight text-ink leading-tight">{p.name}</span>
                  </Link>
                ))}
              </li>
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={l.href} onClick={() => setOpen(false)} className="block py-3 text-4xl font-semibold tracking-tight text-ink display">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openModal();
                  }}
                  className="h-14 rounded-full bg-ink text-bg dark:bg-accent dark:text-accent-ink text-base font-medium"
                >
                  Start a project
                </button>
                <Link href="/contact" onClick={() => setOpen(false)} className="h-14 grid place-items-center rounded-full border border-line-strong text-ink text-base">
                  Contact us
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
