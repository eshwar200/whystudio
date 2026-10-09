"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { flywheelSteps } from "@/content/flywheel";
import { SectionMarker } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

const N = flywheelSteps.length;

export function Flywheel() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.35"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const arc = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N)))));

  return (
    <section id="flywheel" aria-label="The WHY flywheel" className="on-ink relative overflow-hidden bg-ink text-paper">
      <div ref={ref} className="frame py-24 md:py-36">
        <SectionMarker index="16" label="Flywheel" />
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="display text-huge">
              Every founder makes the next founder <span className="text-lime">stronger.</span>
            </h2>
            <ol className="mt-10 space-y-1">
              {flywheelSteps.map((s, i) => (
                <li key={s} className={cn("flex items-baseline gap-4 transition-colors duration-300", i === active ? "text-lime" : i < active ? "text-paper/70" : "text-paper/30")}>
                  <span className="kicker w-6">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display-narrow text-2xl md:text-3xl">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[40rem] lg:col-span-7">
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
              <circle cx="200" cy="200" r="160" fill="none" stroke="rgb(var(--paper) / 0.12)" strokeWidth="1" />
              <motion.circle
                cx="200"
                cy="200"
                r="160"
                fill="none"
                stroke="rgb(var(--lime))"
                strokeWidth="3"
                strokeLinecap="round"
                transform="rotate(-90 200 200)"
                style={{ pathLength: arc }}
              />
              <motion.g style={{ rotate: reduce ? 0 : rotate, originX: "200px", originY: "200px" }}>
                <circle cx="200" cy="200" r="186" fill="none" stroke="rgb(var(--paper) / 0.18)" strokeDasharray="1 7" />
                <circle cx="200" cy="200" r="120" fill="none" stroke="rgb(var(--paper) / 0.08)" strokeDasharray="20 10" />
              </motion.g>
              {flywheelSteps.map((_, i) => {
                const a = (i / N) * Math.PI * 2 - Math.PI / 2;
                const x = 200 + 160 * Math.cos(a);
                const y = 200 + 160 * Math.sin(a);
                return <circle key={i} cx={x} cy={y} r={i === active ? 9 : 5} fill={i <= active ? "rgb(var(--lime))" : "rgb(var(--ink))"} stroke="rgb(var(--lime))" strokeWidth="1.5" style={{ transition: "r .3s" }} />;
              })}
            </svg>

            {/* labels around the wheel (md+) */}
            {flywheelSteps.map((s, i) => {
              const a = (i / N) * Math.PI * 2 - Math.PI / 2;
              const cos = Math.cos(a);
              const x = 50 + 45 * cos;
              const y = 50 + 47.5 * Math.sin(a);
              const shift = cos > 0.25 ? "translate-x-0 text-left" : cos < -0.25 ? "-translate-x-full text-right" : "-translate-x-1/2 text-center";
              return (
                <span
                  key={s}
                  aria-hidden
                  className={cn(
                    "kicker absolute hidden w-max max-w-[9rem] -translate-y-1/2 transition-colors md:block",
                    shift,
                    i === active ? "text-lime" : "text-paper/40",
                  )}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {s}
                </span>
              );
            })}

            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <p className="kicker text-paper/40">Step {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</p>
                <p className="display mx-auto mt-3 max-w-[12rem] text-[clamp(1.4rem,3vw,2.4rem)] leading-[0.95]">{flywheelSteps[active]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
