import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Partner with us",
  description: "Back the founders before they become obvious.",
};

const partnerTypes = [
  ["01", "Corporates", "Pilot programmes, problem statements, first enterprise customers."],
  ["02", "Universities", "Campus pipelines, labs, research commercialisation."],
  ["03", "Investors", "Angels and funds who want to see companies before the round."],
  ["04", "Operators", "Founders and CXOs who want to put time behind the next generation."],
  ["05", "Technology", "Credits and tooling that let young teams ship faster."],
  ["06", "Government", "Schemes and programmes that reach founders where they are."],
];

export default function PartnerPage() {
  return (
    <div className="on-ink min-h-screen bg-ink text-paper">
      <Header />
      <main id="main" className="frame pt-36">
        <section className="pb-20 md:pb-28">
          <p className="kicker text-volt">Partner</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <h1 className="display max-w-5xl text-[clamp(3.2rem,8.5vw,8.5rem)] leading-[0.88]">
              Back the founders
              <br />
              <span className="text-volt">before they&apos;re obvious.</span>
            </h1>
            <Link href="/#apply" className="btn-lime shrink-0">Start a conversation <ArrowUpRight size={14} aria-hidden /></Link>
          </div>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-paper/85">
            We work with organisations that want early, structured access to India&apos;s most ambitious young builders.
          </p>
        </section>

        <section aria-label="Partnership pathways" className="grid border-y border-paper/20 sm:grid-cols-2 lg:grid-cols-3">
          {partnerTypes.map(([number, title, description], index) => (
            <article key={number} className={`min-h-[13rem] border-b border-paper/20 p-6 ${index % 2 === 0 ? "sm:border-r" : ""} ${index % 3 !== 2 ? "lg:border-r" : ""}`}>
              <p className="kicker text-paper/70">{number}</p>
              <h2 className="display mt-5 text-3xl text-paper md:text-4xl">{title}</h2>
              <p className="mt-4 max-w-xs text-base leading-relaxed text-paper/80">{description}</p>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
