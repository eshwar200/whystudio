"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navItems, site } from "@/content/config";
import { Magnetic } from "@/components/ui/Magnetic";
import { useJourney } from "@/lib/store";

const WORDPLAY = ["Why now?", "Why not you?", "Why wait?", "Why build alone?", "Why this?"];

/** Vertical lines that bend away from the cursor. Paused off-screen. */
function FieldLines({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number; active: boolean }> }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let visible = false;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ease = { x: -9999, y: -9999, s: 0 };

    const resize = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const p = pointer.current;
      const targetS = p.active && !reduce ? 1 : 0;
      ease.s += (targetS - ease.s) * 0.08;
      if (p.active) {
        ease.x += (p.x - ease.x) * 0.15;
        ease.y += (p.y - ease.y) * 0.15;
      }
      ctx.clearRect(0, 0, w, h);
      const gap = w < 640 ? 22 : 30;
      const R = Math.min(260, w * 0.3);
      for (let x = gap / 2; x < w; x += gap) {
        const dx = x - ease.x;
        const near = Math.abs(dx) < R * 1.4;
        ctx.beginPath();
        if (!near || ease.s < 0.01) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.strokeStyle = "rgba(243,241,234,0.07)";
        } else {
          for (let y = 0; y <= h; y += 8) {
            const dy = y - ease.y;
            const d2 = dx * dx + dy * dy;
            const f = Math.exp(-d2 / (2 * (R / 2) ** 2));
            const off = Math.sign(dx || 1) * f * 46 * ease.s;
            if (y === 0) ctx.moveTo(x + off, y);
            else ctx.lineTo(x + off, y);
          }
          const glow = Math.exp(-(dx * dx) / (2 * (R / 2) ** 2));
          ctx.strokeStyle = `rgba(198,255,61,${0.07 + glow * 0.45 * ease.s})`;
        }
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      if (visible) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    resize();
    io.observe(c);
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    draw();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [pointer, reduce]);

  return <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}

/** WHY letters whose width and weight respond to the cursor. */
function Wordmark({ px }: { px: number | null }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduce = useReducedMotion();
  return (
    <p aria-label="WHY" className="font-display flex select-none justify-center whitespace-nowrap text-[clamp(6rem,34vw,34rem)] uppercase leading-[0.78] tracking-[-0.05em]">
      {"WHY".split("").map((ch, i) => {
        let wdth = 100, wght = 800;
        const el = refs.current[i];
        if (px !== null && el && !reduce) {
          const r = el.getBoundingClientRect();
          const d = Math.abs(px - (r.left + r.width / 2)) / window.innerWidth;
          const k = Math.max(0, 1 - d * 2.2);
          wdth = 100 + 25 * k;
          wght = 800 + 100 * k - 500 * (1 - k) * 0.4;
        }
        return (
          <span
            key={ch + i}
            ref={(n) => {
              refs.current[i] = n;
            }}
            aria-hidden
            className="inline-block"
            style={{ fontVariationSettings: `"wdth" ${wdth.toFixed(0)}, "wght" ${wght.toFixed(0)}`, transition: "font-variation-settings .35s cubic-bezier(.16,1,.3,1)" }}
          >
            {ch}
          </span>
        );
      })}
    </p>
  );
}

export function Footer() {
  const pointer = useRef({ x: -9999, y: -9999, active: false });
  const [px, setPx] = useState<number | null>(null);
  const [wp, setWp] = useState(0);
  const reduce = useReducedMotion();
  const { goTo } = useJourney();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const frame = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setWp((n) => (n + 1) % WORDPLAY.length), 2200);
    return () => clearInterval(id);
  }, [reduce]);

  const socials = [
    { label: "LinkedIn", href: site.socials.linkedin },
    { label: "Instagram", href: site.socials.instagram },
    { label: "X", href: site.socials.x },
  ].filter((s) => s.href);

  return (
    <footer
      id="footer"
      className="on-ink relative isolate overflow-hidden bg-ink text-paper"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
        const cx = e.clientX;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => setPx(cx));
      }}
      onPointerLeave={() => {
        pointer.current.active = false;
        setPx(null);
      }}
    >
      <FieldLines pointer={pointer} />

      <div className="frame relative pb-8 pt-24 md:pt-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="kicker text-paper/40">19 / End of page, start of company</p>
            <div className="display mt-6 h-[1em] overflow-hidden whitespace-nowrap text-[clamp(2.2rem,5vw,4.5rem)] leading-none text-lime" aria-live="off">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p key={wp} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  {WORDPLAY[wp]}
                </motion.p>
              </AnimatePresence>
            </div>
            <button type="button" onClick={() => goTo("#apply")} className="btn-lime mt-10 hover:!bg-paper hover:!text-ink">
              Start a conversation <ArrowUpRight size={14} aria-hidden />
            </button>
          </div>

          <nav aria-label="Footer" className="lg:col-span-6">
            <ul className="flex flex-wrap gap-x-2 gap-y-3 lg:justify-end">
              {navItems.map((n, i) => (
                <li key={n.href}>
                  <Magnetic>
                    <motion.a
                      href={onHome ? n.href : `/${n.href}`}
                      onClick={(e) => {
                        if (onHome) {
                          e.preventDefault();
                          goTo(n.href);
                        }
                      }}
                      className="group inline-flex items-center gap-2 rounded-full border border-paper/20 bg-ink px-5 py-3 font-mono text-sm uppercase tracking-[0.12em] transition-colors hover:border-lime hover:bg-lime hover:text-ink"
                      animate={reduce ? undefined : { y: [0, -5, 0] }}
                      transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    >
                      <span className="text-paper/40 group-hover:text-ink/50">{String(i + 1).padStart(2, "0")}</span>
                      {n.label}
                    </motion.a>
                  </Magnetic>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-20 md:mt-28">
          <Wordmark px={px} />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-paper/20 pt-6 text-sm text-paper/80 md:flex-row md:items-center md:justify-between">
          <p>
            {site.name} · {site.location}
          </p>
          <ul className="flex flex-wrap gap-5">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-lime">
                  {s.label}
                </a>
              </li>
            ))}
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-lime">
                  {site.email}
                </a>
              </li>
            )}
            {site.phone && (
              <li>
                <a href={`tel:${site.phone}`} className="hover:text-lime">
                  {site.phone}
                </a>
              </li>
            )}
          </ul>
          <p>© {new Date().getFullYear()} {site.name}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-paper/15 pt-4 text-sm text-paper/75">
          <a href="/privacy" className="hover:text-lime">Privacy policy</a>
          <a href="/terms" className="hover:text-lime">Terms of service</a>
          <a href="/accessibility" className="hover:text-lime">Accessibility</a>
          <a href="/cookies" className="hover:text-lime">Cookie notice</a>
        </div>
      </div>
    </footer>
  );
}
