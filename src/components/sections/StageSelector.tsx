"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { founderStages } from "@/content/stages";
import { RevealLines } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { useJourney } from "@/lib/store";

export function StageSelector() {
  const { stageId, setStageId, goTo } = useJourney();
  const activeId = stageId ?? founderStages[0].id;
  const active = founderStages.find((s) => s.id === activeId) ?? founderStages[0];
  const groupRef = useRef<HTMLDivElement>(null);

  // Roving focus with arrow keys, as a proper radio group.
  const onKey = (e: React.KeyboardEvent) => {
    const i = founderStages.findIndex((s) => s.id === activeId);
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % founderStages.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + founderStages.length) % founderStages.length;
    else return;
    e.preventDefault();
    setStageId(founderStages[next].id);
    groupRef.current?.querySelectorAll<HTMLButtonElement>("[role=radio]")[next]?.focus();
  };

  return (
    <Section id="stage" index="03" label="Founder stage selector" tone="paper-2">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <RevealLines lines={["Where are", "you?"]} className="display text-giant" />
        <p className="max-w-xs text-ink/60">Pick the line that sounds most like you this week. It is allowed to change.</p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <div ref={groupRef} role="radiogroup" aria-label="Your current stage" onKeyDown={onKey} className="lg:col-span-6">
          {founderStages.map((s, i) => {
            const on = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={on}
                tabIndex={on ? 0 : -1}
                onClick={() => setStageId(s.id)}
                className={cn(
                  "group relative flex w-full items-center gap-4 border-b border-ink/15 py-4 text-left transition-colors md:py-5",
                  on ? "text-ink" : "text-ink/30 hover:text-ink",
                )}
              >
                <span className="kicker w-6 shrink-0 opacity-60">{String(i + 1).padStart(2, "0")}</span>
                <span className="display-narrow text-[clamp(1.6rem,4.2vw,3.25rem)] leading-none">{s.label}</span>
                {on && (
                  <>
                    <motion.span layoutId="stage-dot" className="ml-auto h-3 w-3 shrink-0 rounded-full bg-flare" />
                    <ArrowUpRight size={16} className="shrink-0" aria-hidden />
                  </>
                )}
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-6 lg:pl-8">
          <div className="sticky top-24 overflow-hidden border border-ink bg-paper-2 text-ink shadow-[8px_8px_0_rgb(var(--ink))]">
            <div className="hairline flex items-center justify-between border-b px-6 py-3">
              <span className="kicker text-ink/50">Your stage</span>
              <span className="kicker text-flare">{active.label}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.dl
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="divide-y divide-ink/10"
                aria-live="polite"
              >
                <div className="grid gap-2 px-6 py-5 sm:grid-cols-[9rem_1fr]">
                  <dt className="kicker pt-1 text-ink/50">Your stage</dt>
                  <dd className="text-xl leading-snug">{active.stage}</dd>
                </div>
                <div className="grid gap-2 px-6 py-5 sm:grid-cols-[9rem_1fr]">
                  <dt className="kicker pt-1 text-ink/50">What you may need</dt>
                  <dd>
                    <ul className="space-y-1.5">
                      {active.needs.map((n) => (
                        <li key={n} className="flex gap-2">
                          <span className="text-acid" aria-hidden>
                            ▪
                          </span>
                          {n}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="grid gap-2 px-6 py-5 sm:grid-cols-[9rem_1fr]">
                  <dt className="kicker pt-1 text-ink/50">How WHY can help</dt>
                  <dd>
                    <p className="text-ink/85">{active.help}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {active.capabilities.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            goTo("#stage");
                          }}
                          className="kicker rounded-full bg-ink px-2.5 py-1.5 text-paper transition-colors hover:bg-lime hover:text-ink"
                        >
                          {c} ↗
                        </button>
                      ))}
                    </div>
                  </dd>
                </div>
                <div className="grid gap-2 px-6 py-5 sm:grid-cols-[9rem_1fr]">
                  <dt className="kicker pt-1 text-ink/50">Relevant ecosystem</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {active.ecosystem.map((e) => (
                      <span key={e} className="rounded-full border border-ink/20 px-2.5 py-1 text-sm text-ink/80">
                        {e}
                      </span>
                    ))}
                  </dd>
                </div>
              </motion.dl>
            </AnimatePresence>
            <div className="p-4">
              <button
                type="button"
                className="btn-lime w-full hover:!bg-paper hover:!text-ink"
                onClick={() => {
                  setStageId(active.id);
                  goTo("#apply");
                }}
              >
                Start a conversation <ArrowUpRight size={14} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
