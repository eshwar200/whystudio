"use client";

import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CornerDownLeft, RotateCcw } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { capabilities } from "@/content/capabilities";
import { heroExamples } from "@/content/intents";
import { founderStages } from "@/content/stages";
import { cn } from "@/lib/cn";
import { interpret, type Interpretation } from "@/lib/interpret";
import { useJourney } from "@/lib/store";

type Phase = "idle" | "reading" | "answer";

const READING_LINES = ["reading what you wrote", "mapping it to the WHY operating system", "finding the right part of the network"];

export function Hero() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<Interpretation | null>(null);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const reduce = useReducedMotion();
  const ids = useId();
  const { setBuildingText, setStageId, goTo } = useJourney();

  // Cursor spotlight on the grid.
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, black, transparent 70%)`;

  // Typewriter placeholder cycling through example prompts.
  const [ph, setPh] = useState("");
  useEffect(() => {
    if (reduce || text || focused) {
      setPh("Describe what you're building...");
      return;
    }
    let ex = 0;
    let ch = 0;
    let deleting = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const target = heroExamples[ex];
      if (!deleting) {
        ch++;
        setPh(target.slice(0, ch));
        if (ch === target.length) {
          deleting = true;
          t = setTimeout(tick, 1800);
          return;
        }
      } else {
        ch -= 2;
        setPh(target.slice(0, Math.max(ch, 0)));
        if (ch <= 0) {
          deleting = false;
          ex = (ex + 1) % heroExamples.length;
        }
      }
      t = setTimeout(tick, deleting ? 18 : 42);
    };
    t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, [reduce, text, focused]);

  const submit = (value: string) => {
    const v = value.trim();
    if (!v) {
      inputRef.current?.focus();
      return;
    }
    setSubmitted(v);
    setResult(interpret(v));
    setPhase("reading");
    window.setTimeout(() => setPhase("answer"), reduce ? 0 : 1400);
  };

  const reset = () => {
    setPhase("idle");
    setText("");
    setResult(null);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const top = result?.capabilities[0];
  const stage = result?.stage ? founderStages.find((s) => s.id === result.stage) : null;
  return (
    <section
      id="top"
      aria-label="What are you building?"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-paper pt-20"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
    >
      {/* texture: faint grid everywhere, stronger grid under the cursor */}
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
        style={{
          WebkitMaskImage: spotlight,
          maskImage: spotlight,
          backgroundImage:
            "linear-gradient(to right, rgb(var(--ink) / 0.16) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--ink) / 0.16) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* oversized outlined WHY */}
      <div
        aria-hidden
        className="display pointer-events-none absolute -bottom-[0.18em] -right-[0.04em] -z-10 select-none text-mega text-transparent"
        style={{ WebkitTextStroke: "1px rgb(var(--ink) / 0.12)" }}
      >
        WHY
      </div>

      <div className="frame flex flex-1 flex-col pb-10 pt-8 md:pt-12">
        <div className="flex items-start justify-between gap-6">
          <p className="kicker max-w-[16rem] leading-relaxed opacity-60">
            WHY Venture Studio
            <br />
            Infrastructure for India&apos;s next generation of founders
          </p>
          <p className="kicker hidden text-right leading-relaxed opacity-60 md:block">
            01 / Talk
            <br />
            Understand → Explore → Meet → Believe → Apply
          </p>
        </div>

        <div className="mt-10 grid items-end gap-8 md:mt-14 lg:grid-cols-12">
          <h1 className="display text-giant lg:col-span-8">
            <span className="block overflow-hidden">
              <motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>
                What are you
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="relative inline-block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}>
                <motion.span
                  aria-hidden
                  className="absolute inset-x-[-0.06em] bottom-[0.06em] top-[0.12em] -z-10 origin-left bg-lime"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                />
                building?
              </motion.span>
            </span>
          </h1>

          <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-ink lg:col-span-4">
            <video
              className="h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster="/why-logo.png"
              aria-label="WHY Venture Studio introduction"
            >
              <source src="/why-video.mp4" type="video/mp4" />
              Your browser does not support the WHY introduction video.
            </video>
            <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink">
              WHY?
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12">
          <p className="max-w-sm text-lg leading-snug text-ink/70 lg:col-span-4">
            Tell WHY what you&apos;re building. We&apos;ll show you which part of the studio is built for exactly where you are.
          </p>

          {/* The console */}
          <div className="on-ink relative rounded-[1.25rem] bg-ink text-paper shadow-[0_40px_80px_-40px_rgb(var(--ink)/0.6)] lg:col-span-8">
            <div className="hairline flex items-center justify-between border-b px-5 py-3">
              <span className="kicker flex items-center gap-2 opacity-70">
                <span className={cn("h-1.5 w-1.5 rounded-full", phase === "reading" ? "animate-pulse bg-acid" : "bg-lime")} />
                why://conversation
              </span>
              <span className="kicker text-paper/75">{phase === "answer" ? "response" : phase === "reading" ? "thinking" : "ready"}</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {phase === "idle" && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    submit(text);
                  }}
                  className="p-5 md:p-6"
                >
                  <label htmlFor={`${ids}-q`} className="sr-only">
                    Describe what you&apos;re building
                  </label>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 font-mono text-lime" aria-hidden>
                      &gt;
                    </span>
                    <textarea
                      id={`${ids}-q`}
                      ref={inputRef}
                      rows={3}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          submit(text);
                        }
                      }}
                      placeholder={ph}
                      className="min-h-[5.5rem] w-full resize-none bg-transparent text-xl leading-snug text-paper placeholder:text-paper/35 focus:outline-none md:text-2xl"
                    />
                  </div>
                  <div className="mt-4 flex flex-col-reverse gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex flex-wrap gap-2" aria-label="Example prompts">
                      {heroExamples.map((ex) => (
                        <button
                          key={ex}
                          type="button"
                          onClick={() => {
                            setText(ex);
                            submit(ex);
                          }}
                          className="rounded-full border border-paper/15 px-3 py-1.5 text-left text-xs text-paper/70 transition-colors hover:border-lime hover:text-lime"
                        >
                          {ex}
                        </button>
                      ))}
                    </div>
                    <button type="submit" className="btn-lime shrink-0 hover:!bg-paper hover:!text-ink">
                      Talk to WHY <CornerDownLeft size={14} aria-hidden />
                    </button>
                  </div>
                </motion.form>
              )}

              {phase === "reading" && (
                <motion.div key="reading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2 p-5 font-mono text-sm md:p-6" aria-live="polite">
                  <p className="text-paper/90">&gt; {submitted}</p>
                  {READING_LINES.map((l, i) => (
                    <motion.p key={l} className="text-paper/75" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.35 }}>
                      … {l}
                    </motion.p>
                  ))}
                </motion.div>
              )}

              {phase === "answer" && result && top && (
                <motion.div key="answer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 md:p-6" aria-live="polite">
                  <p className="kicker opacity-50">You said</p>
                  <p className="mt-2 text-lg leading-snug text-paper/80">&ldquo;{submitted}&rdquo;</p>

                  <p className="kicker mt-6 opacity-50">What we hear</p>
                  <ul className="mt-2 space-y-1.5">
                    {result.capabilities.map((c) => (
                      <li key={c.id} className="flex gap-3 text-lg leading-snug md:text-xl">
                        <span className="kicker mt-1.5 w-20 shrink-0 text-lime">{c.id}</span>
                        <span>{c.reply}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 grid grid-cols-3 gap-1.5 sm:grid-cols-6" aria-label="WHY capabilities that match">
                    {capabilities.map((c, i) => {
                      const hit = result.capabilities.some((r) => r.id === c.id);
                      return (
                        <motion.div
                          key={c.id}
                          initial={{ opacity: 0.2 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.05 * i }}
                          className={cn(
                            "rounded-md border px-2 py-2.5 text-center font-mono text-[0.62rem] tracking-[0.12em]",
                            hit ? "border-lime bg-lime text-ink" : "border-paper/10 text-paper/35",
                          )}
                        >
                          {c.id}
                          <span className="sr-only">{hit ? " (relevant)" : ""}</span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {stage && (
                    <p className="mt-5 text-sm text-paper/60">
                      Sounds like: <span className="text-paper">{stage.label.charAt(0) + stage.label.slice(1).toLowerCase()}</span>.
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn-lime hover:!bg-paper hover:!text-ink"
                      onClick={() => {
                        setBuildingText(submitted);
                        if (result.stage) setStageId(result.stage);
                        goTo("#apply");
                      }}
                    >
                      Start a conversation <ArrowUpRight size={14} aria-hidden />
                    </button>
                    <button
                      type="button"
                      className="btn-ghost text-paper/80 hover:text-lime"
                      onClick={() => {
                        goTo("#stage");
                      }}
                    >
                      Explore your stage <ArrowRight size={14} aria-hidden />
                    </button>
                    <button type="button" onClick={reset} className="btn text-paper/75 hover:text-paper">
                      <RotateCcw size={13} aria-hidden /> Ask again
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between pt-12">
          <p className="kicker opacity-50">Scroll · India is building</p>
          <motion.span aria-hidden className="kicker opacity-50" animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            ↓
          </motion.span>
        </div>
      </div>
    </section>
  );
}
