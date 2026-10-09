import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  id: string;
  index: string;
  label: string;
  tone?: "paper" | "ink" | "paper-2";
  className?: string;
  children: ReactNode;
  /** Use when the section manages its own inner frame (e.g. sticky scroll). */
  bare?: boolean;
}

/** Every section gets an index label, which doubles as a technical annotation. */
export function Section({ id, index, label, tone = "paper", className, children, bare }: Props) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        "relative",
        tone === "ink" && "on-ink bg-ink text-paper",
        tone === "paper" && "bg-paper text-ink",
        tone === "paper-2" && "bg-paper-2 text-ink",
        className,
      )}
    >
      {bare ? (
        children
      ) : (
        <div className="frame py-16 md:py-24">
          <SectionMarker index={index} label={label} />
          {children}
        </div>
      )}
    </section>
  );
}

export function SectionMarker({ index, label, className }: { index: string; label: string; className?: string }) {
  return (
    <div className={cn("hairline mb-10 flex items-center justify-between border-t pt-4 md:mb-16", className)}>
      <span className="kicker opacity-60">
        {index} <span className="mx-2 opacity-40">/</span> {label}
      </span>
      <span className="kicker hidden opacity-30 sm:inline" aria-hidden>
        WHY.{index}
      </span>
    </div>
  );
}
