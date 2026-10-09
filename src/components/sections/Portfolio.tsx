"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { portfolio } from "@/content/ecosystem";
import type { PortfolioCompany } from "@/content/types";
import { RevealLines } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { PlaceholderTag } from "@/components/ui/Slot";
import { cn } from "@/lib/cn";
import { visible } from "@/lib/content";

function Card({ c, i, onOpen }: { c: PortfolioCompany; i: number; onOpen: () => void }) {
  return (
    <li className="w-[82vw] shrink-0 snap-start sm:w-[24rem] lg:w-[calc((100%-2rem)/3)]">
      <button
        type="button"
        onClick={onOpen}
        className={cn(
          "group relative flex w-full flex-col overflow-hidden rounded-[1.25rem] p-3 text-left transition-colors duration-500",
          c.verified ? "bg-paper text-ink hover:bg-lime" : "slot text-paper",
        )}
        aria-haspopup="dialog"
      >
        <div className="flex items-start justify-between">
          <span className="kicker opacity-60">{String(i + 1).padStart(2, "0")} · {c.category}</span>
          {!c.verified && <PlaceholderTag />}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {c.founderPhoto && <div className="relative aspect-square overflow-hidden rounded-lg"><Image src={c.founderPhoto} alt={`${c.founders[0]} portrait`} fill sizes="180px" className="object-cover" /></div>}
          {c.startupImage && <div className="relative aspect-square overflow-hidden rounded-lg"><Image src={c.startupImage} alt={`${c.name} workspace`} fill sizes="180px" className="object-cover" /></div>}
        </div>

        <div className="px-2 pb-2 pt-5">
          <p className="display text-2xl leading-none">{c.name}</p>
          <p className="mt-3 text-sm opacity-70">{c.oneLiner}</p>
          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-ink/15 pt-4">
            <div><dt className="kicker opacity-50">Stage</dt><dd className="mt-1 text-sm">{c.stage}</dd></div>
            <div><dt className="kicker opacity-50">Founder</dt><dd className="mt-1 text-sm">{c.founders[0]}</dd></div>
          </dl>
          <div className="mt-4 flex items-center justify-between">
            {c.linkedin && <a href={c.linkedin} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} className="kicker text-volt underline">LinkedIn ↗</a>}
            <span className="kicker ml-auto text-flare">View story <ArrowUpRight size={14} className="inline" /></span>
          </div>
        </div>
      </button>
    </li>
  );
}

export function Portfolio() {
  const companies = visible(portfolio);
  const track = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<PortfolioCompany | null>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  if (companies.length === 0) return null;

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 420), behavior: "smooth" });
  };

  return (
    <Section id="portfolio" index="08" label="Portfolio" tone="ink" className="overflow-hidden">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <RevealLines lines={["Built with", "WHY."]} className="display text-giant" />
          <p className="mt-4 text-xl text-paper/60">Companies we&apos;re building.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => scroll(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-paper/25 transition-colors hover:bg-lime hover:text-ink" aria-label="Previous companies">
            <ArrowLeft size={18} />
          </button>
          <button type="button" onClick={() => scroll(1)} className="grid h-12 w-12 place-items-center rounded-full border border-paper/25 transition-colors hover:bg-lime hover:text-ink" aria-label="Next companies">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <ul ref={track} className="no-scrollbar -mx-[var(--gutter)] mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-2" aria-label="Portfolio companies">
        {companies.map((c, i) => (
          <Card key={c.slug} c={c} i={i} onOpen={() => setOpen(c)} />
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && setOpen(null)}
        className="m-auto w-[min(56rem,calc(100vw-2rem))] rounded-[1.25rem] bg-paper p-0 text-ink backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
        aria-labelledby="case-title"
      >
        {open && (
          <div className="p-6 md:p-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="kicker opacity-50">
                  {open.relationship} · {open.category} · {open.stage}
                </p>
                <h3 id="case-title" className="display mt-3 text-huge">
                  {open.name}
                </h3>
              </div>
              <button type="button" onClick={() => setOpen(null)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-paper hover:bg-lime hover:text-ink" aria-label="Close case study">
                <X size={18} />
              </button>
            </div>
            {!open.verified && <PlaceholderTag className="mt-4" />}
            <p className="mt-6 text-2xl leading-snug">{open.oneLiner}</p>
            <div className="mt-8 grid gap-8 border-t border-ink/15 pt-6 md:grid-cols-3">
              <div>
                <p className="kicker opacity-50">Founders</p>
                <p className="mt-2">{open.founders.join(", ")}</p>
              </div>
              <div className="md:col-span-2">
                <p className="kicker opacity-50">Case study</p>
                <p className="mt-2 text-ink/75">{open.story ?? "Case study coming soon."}</p>
              </div>
            </div>
            {open.website && open.verified && (
              <a href={open.website} target="_blank" rel="noreferrer" className="btn-ink mt-8">
                Visit {open.name} <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        )}
      </dialog>
    </Section>
  );
}
