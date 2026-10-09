"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cities as allCities } from "@/content/ecosystem";
import { RevealLines } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { visible } from "@/lib/content";

/** Plain equirectangular projection over India's bounding box. */
const LON0 = 68, LON1 = 98, LAT0 = 6, LAT1 = 37;
const W = 600, H = 620;
const px = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * W;
const py = (lat: number) => ((LAT1 - lat) / (LAT1 - LAT0)) * H;

/** Label placement to stop neighbouring cities colliding. */
const LABEL_LEFT = new Set(["Mumbai", "Bengaluru"]);

const fmt = (v: number, pos: string, neg: string) => `${Math.abs(v).toFixed(2)}°${v >= 0 ? pos : neg}`;

export function IndiaMap() {
  const cities = visible(allCities);
  const [active, setActive] = useState(cities[0]?.city ?? "");
  if (cities.length === 0) return null;
  const city = cities.find((c) => c.city === active) ?? cities[0];

  return (
    <Section id="map" index="09" label="India network map">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <RevealLines lines={["Where builders", "are building."]} className="display text-huge" />
          <p className="mt-8 max-w-sm text-ink/60">Select a city to see verified WHY activity there.</p>

          <ul className="mt-10 border-t border-ink/15">
            {cities.map((c) => (
              <li key={c.city}>
                <button
                  type="button"
                  onClick={() => setActive(c.city)}
                  aria-pressed={c.city === city.city}
                  className={cn("flex w-full items-center justify-between border-b border-ink/15 py-3 text-left transition-colors", c.city === city.city ? "text-ink" : "text-ink/40 hover:text-ink")}
                >
                  <span className="display text-2xl">{c.city}</span>
                  <span className="kicker">{c.verified ? `${c.activity.length} activities` : "Not yet verified"}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-7">
          <svg viewBox={`-40 -10 ${W + 60} ${H + 40}`} className="w-full" role="img" aria-label="Coordinate plot of WHY cities in India">
            {/* dot matrix */}
            {Array.from({ length: LON1 - LON0 + 1 }, (_, i) =>
              Array.from({ length: LAT1 - LAT0 + 1 }, (_, j) => (
                <circle key={`${i}-${j}`} cx={px(LON0 + i)} cy={py(LAT0 + j)} r={1.1} fill="rgb(var(--ink) / 0.14)" />
              )),
            )}
            {/* graticule every 5° */}
            {[70, 75, 80, 85, 90, 95].map((lon) => (
              <g key={`lon${lon}`}>
                <line x1={px(lon)} x2={px(lon)} y1={0} y2={H} stroke="rgb(var(--ink) / 0.1)" />
                <text x={px(lon)} y={H + 22} textAnchor="middle" className="fill-ink/40 font-mono text-[11px]">
                  {lon}°E
                </text>
              </g>
            ))}
            {[10, 15, 20, 25, 30, 35].map((lat) => (
              <g key={`lat${lat}`}>
                <line x1={0} x2={W} y1={py(lat)} y2={py(lat)} stroke="rgb(var(--ink) / 0.1)" />
                <text x={-8} y={py(lat) + 4} textAnchor="end" className="fill-ink/40 font-mono text-[11px]">
                  {lat}°N
                </text>
              </g>
            ))}
            {/* Tropic of Cancer annotation */}
            <line x1={0} x2={W} y1={py(23.44)} y2={py(23.44)} stroke="rgb(var(--flare) / 0.6)" strokeDasharray="4 4" />
            <text x={W - 4} y={py(23.44) - 6} textAnchor="end" className="fill-flare font-mono text-[10px] uppercase tracking-widest">
              Tropic of Cancer
            </text>

            {cities.map((c) => {
              const on = c.city === city.city;
              return (
                <g
                  key={c.city}
                  transform={`translate(${px(c.lon)} ${py(c.lat)})`}
                  className="cursor-pointer"
                  onClick={() => setActive(c.city)}
                  role="button"
                  tabIndex={-1}
                  aria-label={c.city}
                >
                  {on && <circle r={10} className="pulse-ring" fill="none" stroke={c.verified ? "rgb(var(--flare))" : "rgb(var(--ink) / 0.5)"} strokeWidth={1.5} />}
                  <circle r={on ? 7 : 5} fill={c.verified ? "rgb(var(--flare))" : on ? "rgb(var(--ink))" : "rgb(var(--paper))"} stroke="rgb(var(--ink))" strokeWidth={1.5} />
                  <text x={LABEL_LEFT.has(c.city) ? -12 : 12} y={4} textAnchor={LABEL_LEFT.has(c.city) ? "end" : "start"} className={cn("font-mono text-[12px] uppercase tracking-wider", on ? "fill-ink" : "fill-ink/50")}>
                    {c.city}
                  </text>
                </g>
              );
            })}
          </svg>

          <AnimatePresence mode="wait">
            <motion.div
              key={city.city}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="on-ink mt-4 rounded-[1rem] bg-ink p-5 text-paper lg:absolute lg:bottom-10 lg:right-0 lg:mt-0 lg:w-80"
              aria-live="polite"
            >
              <div className="flex items-baseline justify-between">
                <p className="display text-3xl">{city.city}</p>
                <p className="kicker text-paper/40">
                  {fmt(city.lat, "N", "S")} {fmt(city.lon, "E", "W")}
                </p>
              </div>
              {city.verified && city.activity.length > 0 ? (
                <ul className="mt-4 space-y-1.5 text-sm">
                  {city.activity.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="text-flare">●</span>
                      {a}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-paper/50">Activity not yet verified. Add it in content/ecosystem.ts → cities.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
