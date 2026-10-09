import { cn } from "@/lib/cn";

/**
 * Placeholder for content that must come from verified WHY data.
 * Shows what belongs here and which file to edit. Never fake content.
 */
export function Slot({ label, file, className, children }: { label: string; file?: string; className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("slot flex flex-col justify-between p-4", className)} data-placeholder="true">
      <span className="kicker opacity-60">{label}</span>
      {children}
      {file && <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] opacity-40">Placeholder · {file}</span>}
    </div>
  );
}

export function PlaceholderTag({ className }: { className?: string }) {
  return <span className={cn("kicker inline-block bg-acid px-1.5 py-1 text-ink", className)}>Placeholder</span>;
}
