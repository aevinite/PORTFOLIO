"use client";

import { motion } from "framer-motion";
import { Arrow, Button, ButtonLink, Magnetic, useSpotlight } from "@/components/ui";
import { useProjectModal } from "@/context/ProjectModalContext";
import { COMPANY } from "@/lib/company";

export default function CallToAction() {
  const { openModal } = useProjectModal();
  const spot = useSpotlight();
  return (
    <section onPointerMove={spot} className="spotlight relative py-28 md:py-44 overflow-hidden">
      {/* The infinity, drawn as one line, behind the ask. */}
      <svg viewBox="0 0 1200 400" aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] md:w-[110%] max-w-none opacity-60">
        <motion.path
          d="M 1120.0 200.0 L 1111.6 233.9 L 1087.6 264.3 L 1051.4 288.5 L 1007.6 305.2 L 960.3 314.3 L 912.7 316.6 L 866.9 313.3 L 824.2 305.7 L 784.7 294.8 L 748.6 281.7 L 715.3 266.8 L 684.4 250.9 L 655.3 234.3 L 627.3 217.2 L 600.0 200.0 L 572.7 182.8 L 544.7 165.7 L 515.6 149.1 L 484.7 133.2 L 451.4 118.3 L 415.3 105.2 L 375.8 94.3 L 333.1 86.7 L 287.3 83.4 L 239.7 85.7 L 192.4 94.8 L 148.6 111.5 L 112.4 135.7 L 88.4 166.1 L 80.0 200.0 L 88.4 233.9 L 112.4 264.3 L 148.6 288.5 L 192.4 305.2 L 239.7 314.3 L 287.3 316.6 L 333.1 313.3 L 375.8 305.7 L 415.3 294.8 L 451.4 281.7 L 484.7 266.8 L 515.6 250.9 L 544.7 234.3 L 572.7 217.2 L 600.0 200.0 L 627.3 182.8 L 655.3 165.7 L 684.4 149.1 L 715.3 133.2 L 748.6 118.3 L 784.7 105.2 L 824.2 94.3 L 866.9 86.7 L 912.7 83.4 L 960.3 85.7 L 1007.6 94.8 L 1051.4 111.5 L 1087.6 135.7 L 1111.6 166.1 L 1120.0 200.0 Z"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.6, ease: [0.65, 0, 0.35, 1] }}
          style={{ filter: "drop-shadow(0 0 12px var(--glow))" }}
        />
      </svg>
      <div className="relative max-w-5xl mx-auto px-5 md:px-10 text-center">
        <p className="eyebrow">Your turn</p>
        <h2 className="display mt-5 text-[clamp(3rem,9vw,8rem)] text-ink">
          Let&apos;s <span className="serif-accent text-accent shine">grow</span> your business.
        </h2>
        <p className="mt-6 text-lg md:text-xl text-muted max-w-xl mx-auto leading-relaxed">
          Tell us what slows you down. The founders reply themselves, usually the same day.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <Button size="lg" onClick={openModal}>
              Start a project <Arrow />
            </Button>
          </Magnetic>
          <ButtonLink href={`https://wa.me/919099723703?text=${encodeURIComponent("Hi Aevinite, I'd like to discuss a project.")}`} external look="ghost" size="lg">
            WhatsApp us
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm text-subtle select-text">
          {COMPANY.email} · {COMPANY.phoneDisplay}
        </p>
      </div>
    </section>
  );
}
