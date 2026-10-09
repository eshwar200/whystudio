"use client";

import { useEffect, useState } from "react";
import { indiaStats, indiaStatsFootnote } from "@/content/stats";
import { Odometer } from "@/components/ui/Odometer";
import { RevealLines, Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

function ISTClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums" suppressHydrationWarning>{now ?? "--:--:--"}</span>;
}

export function StartupClock() {
  const [lead, ...rest] = indiaStats;

  return (
    <Section id="clock" index="02" label="India startup clock" tone="paper" className="overflow-hidden">
      <div className="relative">
        <div className="grid gap-12 xl:grid-cols-12 xl:gap-14">
          <div className="xl:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 animate-pulse rounded-full bg-flare" aria-hidden />
              <p className="kicker text-ink/50">IST <ISTClock /> · Live context</p>
            </div>
            <RevealLines lines={["India is", "building."]} className="display mt-8 text-[clamp(3.5rem,8vw,8rem)]" />
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/75 xl:max-w-sm">
              The largest young builder population on earth is coming online. Infrastructure decides who wins.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/65 xl:max-w-sm">{indiaStatsFootnote}</p>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:col-span-8 xl:gap-x-14 xl:gap-y-12">
            {[lead, ...rest].map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08} className="flex min-h-[10rem] flex-col justify-between border-t-2 border-ink pt-5 sm:min-h-[12rem]">
                <div>
                  <div className="display flex items-end text-[clamp(3.25rem,7vw,7rem)] leading-[0.88] tracking-[-0.06em]">
                    {m.value !== null && m.verified ? (
                      <>
                        <Odometer value={m.value} />
                        {m.suffix && <span className="ml-1 text-flare">{m.suffix}</span>}
                      </>
                    ) : (
                      <span className="text-ink/25">—</span>
                    )}
                  </div>
                  <p className="kicker mt-5 max-w-xs leading-relaxed text-ink">{m.label}</p>
                </div>
                {m.source ? (
                  <a href={m.source} target="_blank" rel="noreferrer" className="kicker mt-5 max-w-sm leading-relaxed text-ink/65 hover:text-ink">
                    {m.asOf} · {m.note}
                  </a>
                ) : (
                  <p className="kicker mt-5 max-w-sm leading-relaxed text-ink/65">{m.asOf} · {m.note}</p>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
