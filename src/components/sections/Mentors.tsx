"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { mentors } from "@/content/ecosystem";
import { RevealLines } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { visible } from "@/lib/content";

export function Mentors() {
  const list = visible(mentors);
  const track = useRef<HTMLUListElement>(null);
  if (list.length === 0) return null;

  const scroll = (direction: 1 | -1) => {
    track.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  return (
    <Section id="mentors" index="10" label="Mentors">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <RevealLines lines={["Learn from", "people who have been there."]} className="display text-huge" />
        <div className="flex gap-2">
          <button type="button" onClick={() => scroll(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-ink/25 hover:bg-ink hover:text-paper" aria-label="Previous mentors">
            <ArrowLeft size={17} />
          </button>
          <button type="button" onClick={() => scroll(1)} className="grid h-11 w-11 place-items-center rounded-full border border-ink/25 hover:bg-ink hover:text-paper" aria-label="Next mentors">
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <ul ref={track} className="no-scrollbar mt-10 flex snap-x gap-4 overflow-x-auto pb-2" aria-label="Mentors">
        {list.map((mentor, index) => (
          <li key={`${mentor.name}-${index}`} className="group min-w-[calc(85vw-1rem)] snap-start rounded-[1.25rem] border border-ink/15 bg-paper-2 p-3 sm:min-w-[17rem] lg:min-w-[calc(25%-0.75rem)]">
            <div className="relative aspect-[1.1] overflow-hidden rounded-[1rem] bg-paper">
              {mentor.photo && <Image src={mentor.photo} alt={mentor.name} fill sizes="(min-width: 1024px) 22vw, 85vw" className="object-cover transition duration-500 group-hover:scale-105" />}
              <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-flare text-paper">
                <ArrowUpRight size={17} />
              </span>
            </div>
            <div className="px-2 pb-2 pt-4 text-center">
              <p className="display text-xl leading-none">{mentor.name}</p>
              <p className="mt-3 text-sm text-ink/65">{mentor.role}</p>
              <p className="kicker mt-2 text-ink/50">{mentor.company}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
