"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { capabilities } from "@/content/capabilities";
import { ecosystemMetrics, ecosystemMission, ecosystemPhotos, ecosystemPhoto, people } from "@/content/ecosystem";
import type { Metric } from "@/content/types";
import { Odometer } from "@/components/ui/Odometer";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Slot } from "@/components/ui/Slot";
import { visible } from "@/lib/content";
import { useJourney } from "@/lib/store";

function MetricValue({ m, big }: { m: Metric; big?: boolean }) {
  if (m.verified && m.value !== null) {
    return (
      <span className={big ? "display text-[clamp(4rem,11vw,10rem)] leading-[0.82] tracking-[-0.05em]" : "display text-5xl"}>
        <Odometer value={m.value} suffix={m.suffix} />
      </span>
    );
  }
  return (
    <span className={big ? "display text-[clamp(4rem,11vw,10rem)] leading-[0.82] tracking-[-0.05em] text-ink/15" : "display text-5xl text-ink/15"} aria-label="Pending verification">
      —
    </span>
  );
}

export function EcosystemProof() {
  const metrics = visible(ecosystemMetrics);
  const faces = visible(people).slice(0, 5);
  const { goTo } = useJourney();
  const photos = ecosystemPhotos;
  const [photoIndex, setPhotoIndex] = useState(0);
  const activePhoto = photos[photoIndex] ?? ecosystemPhoto;

  useEffect(() => {
    if (photos.length < 2) return;
    const timer = window.setInterval(() => setPhotoIndex((current) => (current + 1) % photos.length), 3000);
    return () => window.clearInterval(timer);
  }, [photos.length]);

  if (metrics.length === 0 && !ecosystemPhoto.verified) return null;
  const [lead, ...others] = metrics;

  return (
    <Section id="ecosystem" index="05" label="Ecosystem proof">
      <RevealLines lines={["The WHY", "ecosystem."]} className="display text-giant" />

      <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1">
          {lead && (
            <Reveal className="flex min-h-[11rem] flex-col justify-between rounded-[1.25rem] bg-volt p-6 text-paper">
              <MetricValue m={lead} />
              <span className="max-w-[10rem] text-lg leading-tight">{lead.label}</span>
            </Reveal>
          )}
          {others[0] && (
            <Reveal className="flex min-h-[11rem] flex-col justify-between rounded-[1.25rem] border border-ink/15 bg-paper-2 p-6">
              <MetricValue m={others[0]} />
              <span className="max-w-[10rem] text-lg leading-tight">{others[0].label}</span>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1} className="relative min-h-[24rem] overflow-hidden rounded-[1.25rem] lg:col-span-5 lg:row-span-2">
          {activePhoto.verified && activePhoto.src ? (
            photos.map((photo, index) => (
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className={`object-cover transition-opacity duration-700 ${index === photoIndex ? "opacity-100" : "opacity-0"}`}
                priority={index === 0}
              />
            ))
          ) : (
            <Slot label="Founder session" file="content/ecosystem.ts → ecosystemPhoto" className="absolute inset-0 rounded-[1.25rem]" />
          )}
        </Reveal>

        <Reveal className="relative flex min-h-[14rem] flex-col justify-between overflow-hidden rounded-[1.25rem] bg-ink p-6 text-paper lg:col-span-4">
          {faces.length > 0 && (
            <ul className="flex -space-x-3" aria-label="Founders in the WHY ecosystem">
              {faces.map((p, i) => (
                <li key={i} className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-volt bg-paper-2">
                  {p.photo && <Image src={p.photo} alt={p.name} fill sizes="44px" className="object-cover" />}
                </li>
              ))}
            </ul>
          )}
          <div>
            <MetricValue m={others[1] ?? lead} />
            <p className="mt-5 max-w-xs text-lg leading-tight">{(others[1] ?? lead).label}</p>
          </div>
          <span className="absolute -right-5 top-16 text-[9rem] leading-none text-ink/10" aria-hidden>✽</span>
        </Reveal>

        <Reveal className="flex min-h-[14rem] flex-col justify-between rounded-[1.25rem] bg-volt p-6 text-paper lg:col-span-4">
          <p className="text-lg font-medium">How WHY helps?</p>
          <p className="display max-w-sm text-2xl leading-none">{ecosystemMission}</p>
        </Reveal>
      </div>

      <Reveal className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-[1rem] bg-ink/15 sm:grid-cols-3 lg:grid-cols-6">
        {capabilities.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => goTo("#stage")}
            className="group flex flex-col gap-6 bg-paper p-4 text-left transition-colors hover:bg-ink hover:text-paper"
          >
            <span className="kicker text-ink/75 group-hover:text-paper/85">How WHY helps · {c.index}</span>
            <span>
              <span className="display block text-xl">{c.id}</span>
              <span className="mt-1 block text-sm text-ink/75 group-hover:text-paper/85">{c.short}</span>
            </span>
          </button>
        ))}
      </Reveal>
    </Section>
  );
}
