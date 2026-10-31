"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

// The server HTML carries the real number, so Google and anyone without JavaScript read the
// truth; after hydration it counts up once when it scrolls into view.
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const hydrated = useSyncExternalStore(noSubscribe, () => true, () => false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {hydrated ? n : to}
      {suffix}
    </span>
  );
}

// The owner's numbers (unchanged from the old site). "100% Creative" was dropped: it isn't a count.
const STATS = [
  { value: 12, suffix: "+", label: "Projects delivered" },
  { value: 10, suffix: "+", label: "Clients" },
  { value: 2, suffix: "+", label: "Years building" },
  { value: 6, suffix: "", label: "Screens in Aevidine" },
];

export default function Stats() {
  return (
    <section aria-label="Aevinite in numbers" className="border-y border-line">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className={`px-5 md:px-10 py-12 md:py-16 border-line ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}>
            <p className="display text-6xl md:text-7xl text-ink">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-3 text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
