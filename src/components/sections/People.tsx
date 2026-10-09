"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { people } from "@/content/ecosystem";
import type { Person } from "@/content/types";
import { RevealLines } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { PlaceholderTag } from "@/components/ui/Slot";
import { cn } from "@/lib/cn";
import { visible } from "@/lib/content";

const GROUPS = ["All", "Founder", "Builder", "Operator", "Mentor", "Investor", "Student"] as const;

function Portrait({ p, i }: { p: Person; i: number }) {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.03 }}
      className={cn("group", i % 3 === 1 && "md:translate-y-12")}
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
          rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        className="relative aspect-[3/4] overflow-hidden rounded-[1rem] bg-paper-2"
      >
        {p.verified && p.photo ? (
          <Image src={p.photo} alt={p.name} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0" />
        ) : (
          <div className="slot absolute inset-0 rounded-[1rem]" />
        )}
        <span className="kicker absolute left-3 top-3 rounded-full bg-paper px-2.5 py-1.5">{p.group}</span>
        {!p.verified && <PlaceholderTag className="absolute bottom-3 left-3" />}
      </motion.div>
      <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
        <p className="display text-xl leading-none">{p.name}</p>
        <p className="kicker opacity-50 sm:shrink-0 sm:text-right">{p.company}</p>
      </div>
      <p className="mt-1 text-sm text-ink/60">{p.role}</p>
    </motion.li>
  );
}

export function People() {
  const all = visible(people);
  const [group, setGroup] = useState<(typeof GROUPS)[number]>("All");
  if (all.length === 0) return null;
  const list = group === "All" ? all : all.filter((p) => p.group === group);
  const groups = GROUPS.filter((g) => g === "All" || all.some((p) => p.group === g));

  return (
    <Section id="people" index="07" label="The people" tone="paper-2">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <RevealLines lines={["Ambition is", "everywhere."]} className="display text-giant" />
          <p className="display mt-4 text-big text-flare">We just need to find it.</p>
        </div>
        <p className="max-w-sm text-ink/60 lg:col-span-4 lg:self-end">
          Your age should not determine the size of your ambition. These are the people building with WHY.
        </p>
      </div>

      <div className="no-scrollbar -mx-[var(--gutter)] mt-12 flex gap-2 overflow-x-auto px-[var(--gutter)]" role="tablist" aria-label="Filter people">
        {groups.map((g) => (
          <button
            key={g}
            type="button"
            role="tab"
            aria-selected={group === g}
            onClick={() => setGroup(g)}
            className={cn("kicker shrink-0 rounded-full border px-4 py-2.5 transition-colors", group === g ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink")}
          >
            {g}
          </button>
        ))}
      </div>

      <motion.ul layout className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 pb-12 md:grid-cols-3 lg:gap-x-6">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <Portrait key={`${p.name}-${p.group}-${i}`} p={p} i={i} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
}
