import Image from "next/image";
import type { CSSProperties } from "react";
import { organisations } from "@/content/ecosystem";
import type { Organisation } from "@/content/types";
import { visible } from "@/lib/content";

interface Props {
  label: string;
  kind: Organisation["kind"];
  tone?: "paper" | "paper-2";
}

export function LogoMarquee({ label, kind, tone = "paper" }: Props) {
  const logos = visible(organisations.filter((organisation) => organisation.kind === kind));
  if (logos.length === 0) return null;
  const repeated = [...logos, ...logos];

  return (
    <section aria-label={label} className={tone === "paper-2" ? "overflow-hidden bg-paper-2 py-7" : "overflow-hidden bg-paper py-7"}>
      <div className="frame">
        <div className="flex items-center gap-5">
          <span className="kicker shrink-0 text-ink/50">{label}</span>
          <span className="h-px flex-1 bg-ink/15" />
        </div>
      </div>
      <div className="marquee-host mt-6 overflow-hidden">
        <div className="marquee flex w-max items-center gap-12" style={{ "--marquee-duration": "34s" } as CSSProperties}>
          {repeated.map((organisation, index) => (
            <div key={`${organisation.name}-${index}`} className="flex h-16 min-w-[12rem] items-center justify-center border border-ink/10 bg-paper px-6">
              {organisation.logo ? (
                <Image unoptimized src={organisation.logo} alt={organisation.name} width={220} height={76} className="h-12 w-auto object-contain opacity-100 [filter:none]" />
              ) : (
                <span className="display text-lg">{organisation.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
