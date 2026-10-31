"use client";

import { useEffect, useRef, useState } from "react";

export type Chapter = { label: string; t: number };

// A film you can steer. Before anyone touches it, a 12-second, 0.4 MB silent loop plays (so the
// home page never downloads the 8 MB film on its own). Press play, or a chapter, and the full
// film takes over at that moment, with sound and controls; the chapter you are in stays lit.
export default function FilmPlayer({
  preview,
  src,
  poster,
  title,
  chapters = [],
  tone = "gold",
}: {
  preview?: string;
  src: string;
  poster: string;
  title: string;
  chapters?: Chapter[];
  tone?: "gold" | "accent";
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [full, setFull] = useState(false);
  const [now, setNow] = useState(0);
  const pending = useRef<number | null>(null);

  // The silent loop only runs while it's on screen.
  useEffect(() => {
    const v = ref.current;
    if (!v || full || !preview) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [full, preview]);

  const start = (t = 0) => {
    const v = ref.current;
    if (!v) return;
    if (!full) {
      pending.current = t;
      setFull(true); // src swaps to the full film; onLoadedMetadata seeks + plays
      return;
    }
    v.currentTime = t;
    v.play().catch(() => {});
  };

  const active = chapters.reduce((a, c, i) => (now >= c.t - 0.2 ? i : a), -1);
  const toneText = tone === "gold" ? "text-gold" : "text-accent";
  const toneBg = tone === "gold" ? "bg-gold" : "bg-accent";

  return (
    <div>
      <div className="relative overflow-hidden rounded-[22px] md:rounded-[28px] edge bg-black shadow-float">
        <video
          ref={ref}
          key={full ? "full" : "preview"}
          src={full || !preview ? src : preview}
          poster={poster}
          muted={!full}
          loop={!full}
          playsInline
          controls={full}
          preload={full ? "auto" : preview ? "metadata" : "none"}
          onLoadedMetadata={(e) => {
            if (pending.current !== null) {
              e.currentTarget.currentTime = pending.current;
              pending.current = null;
              e.currentTarget.play().catch(() => {});
            }
          }}
          onTimeUpdate={(e) => full && setNow(e.currentTarget.currentTime)}
          className="block w-full aspect-video object-cover"
        >
          {title}
        </video>
        {!full && (
          <button
            type="button"
            onClick={() => start(0)}
            className="group absolute inset-0 flex items-end justify-start p-4 md:p-6 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            aria-label={`Play ${title} with sound`}
          >
            <span className="inline-flex items-center gap-3 rounded-full bg-white/95 text-black pl-2 pr-5 h-12 text-[15px] font-medium shadow-lg transition-transform duration-200 group-hover:scale-[1.03] group-active:scale-[0.97]">
              <span className={`grid place-items-center w-8 h-8 rounded-full ${toneBg} text-white`}>
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
                </svg>
              </span>
              Watch the film
            </span>
          </button>
        )}
      </div>

      {chapters.length > 0 && (
        <div className="mt-4 -mx-1 flex gap-2 overflow-x-auto pb-1 px-1 [scrollbar-width:none]" role="group" aria-label="Jump to a part of the film">
          {chapters.map((c, i) => {
            const on = full && i === active;
            return (
              <button
                key={c.label}
                type="button"
                onClick={() => start(c.t)}
                aria-pressed={on}
                className={`shrink-0 inline-flex items-center gap-2 h-10 px-4 rounded-full text-sm border transition-colors ${
                  on ? `border-transparent ${toneBg} text-bg` : "border-line text-muted hover:text-ink hover:border-line-strong"
                }`}
              >
                <span className={`tabular-nums text-xs ${on ? "text-bg/80" : toneText}`}>
                  {Math.floor(c.t / 60)}:{String(Math.floor(c.t % 60)).padStart(2, "0")}
                </span>
                {c.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
