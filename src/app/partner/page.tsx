import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Partner with us",
  description: "Partner with WHY Venture Studio to help India's next generation of builders move earlier and faster.",
};

const partnerTypes = [
  ["01", "Corporates", "Pilot programmes, problem statements, first enterprise customers."],
  ["02", "Universities", "Campus pipelines, labs, research commercialisation."],
  ["03", "Investors", "Angels and funds who want to see companies before the round."],
  ["04", "Operators", "Founders and CXOs who want to put time behind the next generation."],
  ["05", "Technology", "Credits and tooling that let young teams ship faster."],
  ["06", "Government", "Schemes and programmes that reach founders where they are."],
] as const;

export default function PartnerPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-ink text-paper">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-5 py-5 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3" aria-label="Back to WHY Venture Studio home">
            <span className="display text-2xl tracking-[-0.04em] text-paper">WHY</span>
            <span className="kicker text-paper/70 transition-colors group-hover:text-volt">Venture Studio</span>
          </Link>
          <Link href="/" className="kicker inline-flex items-center gap-2 text-paper/70 transition-colors hover:text-paper">
            <ArrowLeft size={14} aria-hidden /> Back to site
          </Link>
        </header>

        <section className="flex flex-1 flex-col justify-center py-20 md:py-28">
          <p className="kicker text-volt">Partner</p>
          <div className="mt-6 max-w-6xl">
            <h1 className="display text-[clamp(3.25rem,9.5vw,9rem)] leading-[0.88] tracking-[-0.055em]">
              Back the founders
              <br />
              <span className="text-volt">before they&apos;re obvious.</span>
            </h1>
            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md text-base leading-relaxed text-paper/85 md:text-lg">
                We work with organisations that want early, structured access to India&apos;s most ambitious young builders.
              </p>
              <Link href="/#apply" className="btn-lime w-fit">
                Start a conversation <ArrowUpRight size={14} aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        <section aria-label="Ways to partner with WHY" className="grid border-l border-t border-paper/20 sm:grid-cols-2 lg:grid-cols-3">
          {partnerTypes.map(([number, title, description]) => (
            <article key={number} className="min-h-[12rem] border-b border-r border-paper/20 p-6 transition-colors hover:bg-paper/[0.06] md:p-8">
              <p className="kicker text-paper/70">{number}</p>
              <h2 className="display mt-8 text-3xl leading-none text-paper md:text-4xl">{title}</h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/80">{description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
