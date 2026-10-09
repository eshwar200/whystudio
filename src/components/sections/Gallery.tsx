import Image from "next/image";
import { gallery } from "@/content/ecosystem";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { visible } from "@/lib/content";

export function Gallery() {
  const images = visible(gallery);
  if (images.length === 0) return null;

  return (
    <Section id="gallery" index="12" label="Real world gallery">
      <div className="grid gap-6 lg:grid-cols-12">
        <RevealLines lines={["WHY, in the", "real world."]} className="display text-giant lg:col-span-9" />
        <p className="kicker self-end text-flare lg:col-span-3 lg:text-right">Built beyond the screen.</p>
      </div>

      <ul className="mt-14 grid grid-cols-1 gap-4 [grid-auto-flow:dense] sm:grid-cols-2 lg:grid-cols-4 lg:[grid-auto-rows:16rem]">
        {images.map((img, i) => (
          <li
            key={`${img.category}-${i}`}
            className={cn(
              "lg:row-span-1",
              img.shape === "tall" && "lg:row-span-2",
              img.shape === "wide" && "sm:col-span-2",
            )}
          >
            <Reveal delay={(i % 4) * 0.06} className="group relative h-full min-h-[14rem] overflow-hidden rounded-[1rem] sm:min-h-[16rem]">
              {img.verified && img.src ? (
                <>
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 pt-16 text-paper">
                    <p className="kicker opacity-70">{img.category}</p>
                    <p className="mt-1">{img.caption}</p>
                  </div>
                </>
              ) : (
                <div className="slot absolute inset-0 flex flex-col justify-between rounded-[1rem] p-4">
                  <span className="kicker opacity-60">{String(i + 1).padStart(2, "0")} · {img.category}</span>
                  <span className="text-sm text-ink/45">Real WHY photo only. Add in content/ecosystem.ts → gallery</span>
                </div>
              )}
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
