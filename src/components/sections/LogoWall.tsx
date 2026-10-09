import Image from "next/image";
import { organisations } from "@/content/ecosystem";
import type { Organisation } from "@/content/types";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { visible } from "@/lib/content";

interface Props {
  id: string;
  index: string;
  sectionLabel: string;
  headline: string[];
  label: string;
  kind: Organisation["kind"];
  tone?: "paper" | "ink" | "paper-2";
  disclaimer?: string;
}

/** Minimal institutional logo wall, used for technology partners and the investor network. */
export function LogoWall({ id, index, sectionLabel, headline, label, kind, tone = "paper", disclaimer }: Props) {
  const orgs = visible(organisations.filter((o) => o.kind === kind));
  if (orgs.length === 0) return null;
  const dark = tone === "ink";

  return (
    <Section id={id} index={index} label={sectionLabel} tone={tone}>
      <div className="grid gap-8 lg:grid-cols-12">
        <RevealLines lines={headline} className="display text-huge lg:col-span-8" />
        <div className="lg:col-span-4 lg:self-end">
          <p className="kicker">{label}</p>
          {disclaimer && <p className={dark ? "mt-3 text-sm text-paper/50" : "mt-3 text-sm text-ink/50"}>{disclaimer}</p>}
        </div>
      </div>

      <Reveal>
        <ul className={`mt-14 grid grid-cols-2 border-l border-t sm:grid-cols-3 lg:grid-cols-6 ${dark ? "border-paper/15" : "border-ink/15"}`}>
          {orgs.map((o, i) => (
            <li key={`${o.name}-${i}`} className={`group relative grid aspect-[3/2] place-items-center border-b border-r p-6 ${dark ? "border-paper/15" : "border-ink/15"}`}>
              {o.verified ? (
                o.logo ? (
                  <Image unoptimized src={o.logo} alt={o.name} width={160} height={64} className="h-10 w-auto object-contain opacity-70 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0" />
                ) : (
                  <span className="display text-center text-lg">{o.name}</span>
                )
              ) : (
                <span className="slot absolute inset-3 flex items-end p-3">
                  <span className="kicker opacity-50">{o.kind} · placeholder</span>
                </span>
              )}
              {o.url && o.verified && <a href={o.url} target="_blank" rel="noreferrer" className="absolute inset-0" aria-label={o.name} />}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
