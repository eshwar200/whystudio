"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { journey } from "@/content/journey";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionMarker } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

function StageBody({ i }: { i: number }) {
  const s = journey[i];
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <p className="kicker text-flare">Stage {String(i + 1).padStart(2, "0")} — the problem</p>
        <p className="mt-4 text-2xl leading-tight md:text-[2rem]">{s.problem}</p>
      </div>
      <div className="lg:col-span-5 lg:col-start-8">
        <p className="kicker opacity-60">Where WHY comes in</p>
        <ul className="mt-4">
          {s.support.map((item) => (
            <li key={item} className="hairline flex items-center justify-between border-b py-3 text-lg">
              {item}
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ink/30" />
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {s.capabilities.map((c) => (
            <span key={c} className="kicker rounded-full bg-ink px-2.5 py-1.5 text-paper">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(journey.length - 1, Math.max(0, Math.floor(v * journey.length)));
    setActive(i);
  });

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: top + span * ((i + 0.5) / journey.length), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="journey" aria-label="What does a venture studio actually do?" className="relative bg-paper">
      {/* Desktop: sticky, scroll-driven */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: `${journey.length * 75 + 25}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <div className="frame flex flex-1 flex-col pb-10 pt-24">
            <SectionMarker index="03" label="The founder journey" className="!mb-8" />
            <h2 className="display text-big max-w-4xl">What does a venture studio actually do?</h2>

            {/* Rail */}
            <div className="relative mt-10">
              <div className="hairline absolute inset-x-0 top-[7px] border-t" aria-hidden />
              <motion.div aria-hidden className="absolute left-0 top-[6px] h-[3px] w-full origin-left bg-flare" style={{ scaleX: bar }} />
              <ol className="relative grid grid-cols-6">
                {journey.map((s, i) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => jump(i)}
                      aria-current={i === active ? "step" : undefined}
                      className="group flex flex-col items-start gap-3 text-left"
                    >
                      <span className={cn("h-4 w-4 rounded-full border-2 transition-colors duration-300", i <= active ? "border-flare bg-flare" : "border-ink/25 bg-paper")} />
                      <span className={cn("kicker transition-opacity", i === active ? "opacity-100" : "opacity-40 group-hover:opacity-80")}>{s.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative mt-auto pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p aria-hidden className="display-narrow mb-8 text-[clamp(3.5rem,min(12vw,16vh),11rem)] leading-[0.8] tracking-[-0.03em]">
                    {journey[active].label}
                  </p>
                  <StageBody i={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: stacked */}
      <div className="frame py-24 lg:hidden">
        <SectionMarker index="03" label="The founder journey" />
        <RevealLines lines={["What does a", "venture studio", "actually do?"]} className="display text-huge" />
        <ol className="mt-12 space-y-14">
          {journey.map((s, i) => (
            <li key={s.id}>
              <Reveal>
                <div className="flex items-baseline gap-3 border-t-[3px] border-flare pt-4">
                  <span className="kicker text-flare">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display-narrow text-6xl leading-[0.85]">{s.label}</h3>
                </div>
                <div className="mt-6">
                  <StageBody i={i} />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
