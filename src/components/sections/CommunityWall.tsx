import Image from "next/image";
import { mentors, organisations, people } from "@/content/ecosystem";
import { RevealLines } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { visible } from "@/lib/content";

interface WallItem {
  label: string;
  sub: string;
  logo?: string;
  verified: boolean;
}

function Row({ items, reverse, duration, big }: { items: WallItem[]; reverse?: boolean; duration: number; big?: boolean }) {
  if (items.length === 0) return null;
  // Repeat so the strip is always wider than the viewport, then double it for a seamless loop.
  const base = Array.from({ length: Math.max(1, Math.ceil(10 / items.length)) }, () => items).flat();
  const loop = [...base, ...base];
  return (
    <div className="marquee-host overflow-hidden border-b border-ink/15 py-5" aria-hidden>
      <div className={cn("marquee flex w-max items-center gap-10 pr-10", reverse && "marquee-reverse")} style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        {loop.map((it, i) => (
          <span key={i} className="flex shrink-0 items-center gap-4">
            {it.logo && it.verified ? (
              <Image src={it.logo} alt="" width={120} height={40} className="h-8 w-auto" />
            ) : (
              <span className={cn(big ? "display text-[clamp(2rem,5vw,4.5rem)] leading-none" : "text-2xl", !it.verified && "text-ink/25")}>{it.label}</span>
            )}
            <span className={cn("kicker", it.verified ? "opacity-50" : "opacity-30")}>{it.sub}</span>
            <span className="h-2 w-2 rotate-45 bg-acid" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function CommunityWall() {
  const peopleItems: WallItem[] = visible([...people, ...mentors]).map((p) => ({ label: p.name, sub: p.company ? `${p.group} · ${p.company}` : p.group, verified: p.verified }));
  const orgItems: WallItem[] = visible(organisations).map((o) => ({ label: o.name, sub: o.kind, logo: o.logo, verified: o.verified }));
  if (peopleItems.length + orgItems.length === 0) return null;

  const all = [...peopleItems, ...orgItems];
  const verifiedList = all.filter((i) => i.verified);

  return (
    <Section id="community" index="07" label="Community wall" tone="paper-2" bare className="overflow-hidden py-24 md:py-36">
      <div className="frame">
        <div className="hairline mb-10 flex items-center justify-between border-t pt-4 md:mb-16">
          <span className="kicker opacity-60">07 / Community wall</span>
        </div>
        <RevealLines lines={["The people", "building with us."]} className="display text-huge" />
      </div>

      <div className="mt-14 border-t border-ink/15">
        <Row items={peopleItems} duration={70} big />
        <Row items={orgItems} duration={55} reverse />
        <Row items={[...orgItems].reverse()} duration={80} big />
      </div>

      {/* Screen-reader and no-motion equivalent of the marquee */}
      <div className="frame">
        <p className="kicker mt-6 opacity-50">
          {verifiedList.length > 0 ? `${verifiedList.length} verified names` : "Placeholder names shown · add verified names in content/ecosystem.ts"}
        </p>
        <ul className="sr-only">
          {verifiedList.map((i) => (
            <li key={`${i.label}-${i.sub}`}>
              {i.label}, {i.sub}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
