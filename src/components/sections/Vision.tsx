"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionMarker } from "@/components/ui/Section";

const HEAD = "We're not building another accelerator.".split(" ");

function Word({ word, i, total, progress }: { word: string; i: number; total: number; progress: MotionValue<number> }) {
  const start = i / total;
  const opacity = useTransform(progress, [start * 0.8, (start + 1 / total) * 0.8], [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.22em] inline-block">
      {word}
    </motion.span>
  );
}

export function Vision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.6"] });

  return (
    <section id="vision" aria-label="Vision" className="on-ink relative overflow-hidden bg-ink text-paper">
      <div className="frame py-28 md:py-44" ref={ref}>
        <SectionMarker index="12" label="Vision" />
        <h2 className="display text-giant">
          <span className="sr-only">We&apos;re not building another accelerator.</span>
          <span aria-hidden>
            {HEAD.map((w, i) => (
              <Word key={i} word={w} i={i} total={HEAD.length} progress={scrollYProgress} />
            ))}
          </span>
        </h2>
        <Reveal className="mt-14 grid gap-10 md:grid-cols-12">
          <p className="display text-big text-lime md:col-span-8">We&apos;re building the infrastructure for India&apos;s next generation of founders.</p>
          <p className="kicker leading-loose text-paper/75 md:col-span-3 md:col-start-10 md:self-end">
            Why now?
            <br />
            Why not you?
            <br />
            Why build alone?
          </p>
        </Reveal>
      </div>
    </section>
  );
}
