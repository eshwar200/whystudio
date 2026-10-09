"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { formatIN } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Odometer-style number. Each digit is a vertical strip 0–9 that rolls into
 * place when the number scrolls into view. Commas stay static.
 */
export function Odometer({ value, suffix, className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const chars = formatIN(value).split("");
  let digitIndex = 0;

  return (
    <span ref={ref} className={cn("inline-flex tabular-nums", className)} aria-label={`${formatIN(value)}${suffix ?? ""}`} role="img">
      {chars.map((ch, i) => {
        if (!/\d/.test(ch)) {
          return (
            <span key={i} aria-hidden className="opacity-40">
              {ch}
            </span>
          );
        }
        const d = Number(ch);
        const order = digitIndex++;
        return (
          <span key={i} aria-hidden className="relative inline-block h-[1em] overflow-hidden leading-none">
            <motion.span
              className="flex flex-col"
              initial={{ y: reduce ? `-${d}0%` : "0%" }}
              animate={inView ? { y: `-${d}0%` } : undefined}
              transition={{ duration: 1.6 + order * 0.12, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              {Array.from({ length: 10 }, (_, n) => (
                <span key={n} className="block h-[1em] leading-none">
                  {n}
                </span>
              ))}
            </motion.span>
          </span>
        );
      })}
      {suffix && <span aria-hidden>{suffix}</span>}
    </span>
  );
}
