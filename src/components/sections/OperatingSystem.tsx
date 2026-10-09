"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { capabilities, type Capability } from "@/content/capabilities";
import type { CapabilityId } from "@/content/types";
import { RevealLines } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { useJourney } from "@/lib/store";

const ACCENT_BG: Record<Capability["accent"], string> = {
  lime: "bg-lime",
  acid: "bg-acid",
  flare: "bg-flare",
  volt: "bg-volt",
};
const ACCENT_TEXT: Record<Capability["accent"], string> = {
  lime: "text-lime",
  acid: "text-acid",
  flare: "text-flare",
  volt: "text-[#8FA2FF]",
};

function Detail({ c }: { c: Capability }) {
  return (
    <div>
      <p className={cn("kicker", ACCENT_TEXT[c.accent])}>
        module {c.index} · {c.id.toLowerCase()}
      </p>
      <p className="display mt-4 text-big">{c.short}</p>
      <p className="mt-4 max-w-md text-lg text-paper/70">{c.description}</p>
      <ul className="mt-8 grid gap-px overflow-hidden rounded-lg bg-paper/10 sm:grid-cols-2">
        {c.details.map((d, i) => (
          <motion.li
            key={d}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i }}
            className="flex items-start gap-3 bg-ink p-4 text-sm"
          >
            <span className={cn("mt-1 h-1.5 w-1.5 shrink-0 rounded-full", ACCENT_BG[c.accent])} aria-hidden />
            {d}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function OperatingSystem() {
  const { focusCapability } = useJourney();
  const [active, setActive] = useState<CapabilityId>("CAPITAL");

  useEffect(() => {
    if (focusCapability) setActive(focusCapability);
  }, [focusCapability]);

  const current = capabilities.find((c) => c.id === active)!;

  return (
    <Section id="os" index="04" label="The WHY operating system" tone="ink">
      <RevealLines lines={["A VC gives you capital.", "We give you leverage."]} className="display text-huge max-w-6xl" />
      <p className="mt-8 max-w-xl text-lg text-paper/60">
        Six modules, one system. Founders plug into the ones they need, when they need them, and the rest stays on standby.
      </p>

      <div className="mt-14 overflow-hidden rounded-[1.25rem] border border-paper/15">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-paper/15 bg-ink-2 px-4 py-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 bg-paper/20" />
            <span className="h-2.5 w-2.5 bg-paper/20" />
            <span className="h-2.5 w-2.5 bg-lime" />
          </div>
          <span className="kicker text-paper/50">why-os</span>
          <span className="kicker text-paper/30">6 modules</span>
        </div>

        <div className="grid lg:grid-cols-12">
          <ul className="grid grid-cols-1 border-paper/15 sm:grid-cols-2 lg:col-span-6 lg:border-r">
            {capabilities.map((c) => {
              const on = c.id === active;
              return (
                <li key={c.id} className="border-b border-paper/15 sm:odd:border-r lg:[&:nth-last-child(-n+2)]:border-b-0">
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`os-${c.id}`}
                    onClick={() => setActive(c.id)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && window.innerWidth >= 1024 && setActive(c.id)}
                    className={cn(
                      "group relative flex min-h-[9.5rem] w-full lg:h-full flex-col justify-between overflow-hidden p-5 text-left transition-colors duration-300",
                      on ? (c.accent === "volt" ? "text-paper" : "text-ink") : "hover:bg-paper/[0.04]",
                    )}
                  >
                    {on && <motion.span layoutId="os-active" className={cn("absolute inset-0 -z-0", ACCENT_BG[c.accent])} transition={{ type: "spring", stiffness: 300, damping: 32 }} />}
                    <span className="relative flex w-full items-center justify-between">
                      <span className={cn("kicker", on ? "opacity-70" : "opacity-40")}>{c.index}</span>
                      <Plus size={16} aria-hidden className={cn("transition-transform duration-300", on && "rotate-45")} />
                    </span>
                    <span className="relative">
                      <span className="display block text-3xl leading-none md:text-4xl">{c.id}</span>
                      <span className={cn("mt-2 block text-sm", on ? "opacity-75" : "text-paper/50")}>{c.description}</span>
                    </span>
                  </button>
                  {/* Mobile/tablet: details inline */}
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`os-${c.id}`}
                        className="overflow-hidden lg:hidden"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="p-5">
                          <Detail c={c} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="relative hidden min-h-[30rem] p-10 lg:col-span-6 lg:block" aria-live="polite">
            <div aria-hidden className="grid-lines-ink pointer-events-none absolute inset-0 opacity-60" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                id={`os-pane-${current.id}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <Detail c={current} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
