"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Reusable auto-rotating image slider.
 * - Crossfades through `images` every `interval` ms, with a subtle Ken Burns zoom.
 * - Rotation runs continuously (never pauses) so it keeps shifting even under the cursor.
 * - Desktop hover reveals prev/next arrows.
 * - Dots are clickable; controls stop their click from bubbling to a parent card.
 */
export default function AutoSlideImage({
  images,
  interval = 4000,
  showArrows = true,
  showDots = true,
  align = "center",
  zoom = "in",
}: {
  images: string[];
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  align?: "center" | "right";
  /** "in" = subtle zoom-in (Ken Burns). "out" = start zoomed, settle to full image. */
  zoom?: "in" | "out";
}) {
  const [idx, setIdx] = useState(0);

  const go = useCallback(
    (n: number) => setIdx((p) => (p + n + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setIdx((p) => (p + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className="group/slider absolute inset-0 overflow-hidden">
      {images.map((src, i) => {
        // zoom "out" starts magnified and settles to scale 1 (full image visible).
        // zoom "in" is the classic Ken Burns push-in.
        const idleScale = zoom === "out" ? 1.12 : 1;
        const activeScale = zoom === "out" ? [1.12, 1] : [1, 1.08];
        return (
          <motion.div
            key={src + i}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
            initial={false}
            animate={{ opacity: i === idx ? 1 : 0, scale: i === idx ? activeScale : idleScale }}
            transition={{
              opacity: { duration: 1.0, ease: "easeInOut" },
              scale: { duration: interval / 1000, ease: "easeOut" },
            }}
          />
        );
      })}

      {/* Dots */}
      {showDots && images.length > 1 && (
        <div
          className={`absolute bottom-3 z-20 flex gap-1.5 ${
            align === "right" ? "right-4" : "left-1/2 -translate-x-1/2"
          }`}
        >
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === idx ? 18 : 6,
                background: i === idx ? "rgba(51,187,255,0.95)" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      )}

      {/* Arrows — desktop hover only */}
      {showArrows && images.length > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/80 opacity-0 group-hover/slider:opacity-100 hover:bg-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/80 opacity-0 group-hover/slider:opacity-100 hover:bg-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
}
