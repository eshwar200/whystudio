"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { networkNodes } from "@/content/network";
import { RevealLines } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

const SIZE = 800;
const C = SIZE / 2;
const R = 300;

const positioned = networkNodes.map((n, i) => {
  const a = (i / networkNodes.length) * Math.PI * 2 - Math.PI / 2;
  return { ...n, x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
});
const byId = Object.fromEntries(positioned.map((n) => [n.id, n]));

// Unique undirected edges between nodes.
const edges = (() => {
  const seen = new Set<string>();
  const out: { a: string; b: string }[] = [];
  for (const n of networkNodes)
    for (const l of n.links) {
      const k = [n.id, l].sort().join("|");
      if (!seen.has(k) && byId[l]) {
        seen.add(k);
        out.push({ a: n.id, b: l });
      }
    }
  return out;
})();

function curve(a: { x: number; y: number }, b: { x: number; y: number }) {
  // Bow the curve toward the centre so the graph reads as a hub.
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const cx = mx + (C - mx) * 0.55;
  const cy = my + (C - my) * 0.55;
  return `M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`;
}

export function Network() {
  const [active, setActive] = useState("founders");
  const node = byId[active];
  const linked = new Set(node.links);

  return (
    <Section id="network" index="06" label="The network" tone="ink" className="overflow-hidden">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <RevealLines lines={["One founder.", "An entire", "network."]} className="display text-huge" />
          <p className="mt-8 max-w-sm text-paper/60">
            WHY sits in the middle of the system so a founder does not have to. Hover or tap a node to see what it brings and what it connects to.
          </p>

          <div className="mt-10 hidden min-h-[12rem] lg:block" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
                <p className="kicker text-lime">{node.label}</p>
                <p className="mt-3 text-2xl leading-snug">{node.blurb}</p>
                <p className="kicker mt-5 text-paper/40">Connects to · {node.links.map((l) => byId[l]?.label).join(" · ")}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Radial map (tablet / desktop) */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-[44rem] md:block lg:col-span-7">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full" aria-hidden>
            <circle cx={C} cy={C} r={R} fill="none" stroke="rgb(var(--paper) / 0.08)" strokeDasharray="2 6" />
            <circle cx={C} cy={C} r={R * 0.55} fill="none" stroke="rgb(var(--paper) / 0.06)" />
            {positioned.map((n) => (
              <line key={`spoke-${n.id}`} x1={C} y1={C} x2={n.x} y2={n.y} stroke={n.id === active ? "rgb(var(--lime))" : "rgb(var(--paper) / 0.12)"} strokeWidth={n.id === active ? 1.5 : 1} />
            ))}
            {edges.map((e) => {
              const on = e.a === active || e.b === active;
              return (
                <motion.path
                  key={`${e.a}-${e.b}`}
                  d={curve(byId[e.a], byId[e.b])}
                  fill="none"
                  stroke={on ? "rgb(var(--lime))" : "rgb(var(--paper) / 0.1)"}
                  strokeWidth={on ? 1.5 : 1}
                  initial={false}
                  animate={{ pathLength: 1, opacity: on ? 1 : 0.6 }}
                />
              );
            })}
          </svg>

          {/* WHY hub */}
          <div className="absolute left-1/2 top-1/2 grid h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lime text-ink">
            <span className="display text-[clamp(1.5rem,3vw,2.75rem)] leading-none">WHY</span>
          </div>

          {positioned.map((n) => {
            const on = n.id === active;
            const near = linked.has(n.id);
            return (
              <button
                key={n.id}
                type="button"
                onPointerEnter={() => setActive(n.id)}
                onFocus={() => setActive(n.id)}
                onClick={() => setActive(n.id)}
                aria-pressed={on}
                className={cn(
                  "kicker absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-2 transition-all duration-300",
                  on ? "scale-110 border-lime bg-lime text-ink" : near ? "border-lime/70 bg-ink text-lime" : "border-paper/20 bg-ink text-paper/60 hover:text-paper",
                )}
                style={{ left: `${(n.x / SIZE) * 100}%`, top: `${(n.y / SIZE) * 100}%` }}
              >
                {n.label}
              </button>
            );
          })}
        </div>

        {/* Vertical relationship map (mobile) + detail on tablet */}
        <ol className="relative md:hidden">
          <span aria-hidden className="absolute bottom-6 left-[1.1rem] top-6 w-px bg-paper/15" />
          <li className="relative flex items-center gap-4 pb-6">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-lime text-ink">
              <span className="display text-[0.7rem]">WHY</span>
            </span>
            <span className="kicker text-paper/50">At the centre</span>
          </li>
          {positioned.map((n) => {
            const on = n.id === active;
            return (
              <li key={n.id} className="relative pb-2">
                <button type="button" onClick={() => setActive(n.id)} aria-expanded={on} className="flex w-full items-center gap-4 py-2 text-left">
                  <span className={cn("ml-[0.85rem] h-2.5 w-2.5 shrink-0 rounded-full border transition-colors", on ? "border-lime bg-lime" : "border-paper/40 bg-ink")} />
                  <span className={cn("display text-2xl", on ? "text-lime" : "text-paper/80")}>{n.label}</span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-10">
                      <p className="pb-2 text-paper/75">{n.blurb}</p>
                      <div className="flex flex-wrap gap-1.5 pb-3">
                        {n.links.map((l) => (
                          <span key={l} className="kicker rounded-full border border-lime/50 px-2 py-1 text-lime">
                            {byId[l]?.label}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>

        <div className="hidden md:block lg:hidden" aria-live="polite">
          <p className="kicker text-lime">{node.label}</p>
          <p className="mt-3 text-xl leading-snug">{node.blurb}</p>
        </div>
      </div>
    </Section>
  );
}
