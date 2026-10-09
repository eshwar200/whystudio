"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { site } from "@/content/config";
import { founderStages } from "@/content/stages";
import { RevealLines } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { useJourney } from "@/lib/store";

type Status = "idle" | "sending" | "done" | "error";

interface FieldDef {
  name: string;
  label: string;
  type?: "text" | "email" | "url" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  span?: "full" | "half";
}

const FIELDS: FieldDef[] = [
  { name: "name", label: "Full name", required: true, autoComplete: "name", span: "half" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", span: "half" },
  { name: "linkedin", label: "LinkedIn", type: "url", placeholder: "https://linkedin.com/in/…", span: "half" },
  { name: "company", label: "Company / project", required: true, autoComplete: "organization", span: "half" },
  { name: "website", label: "Website", type: "url", placeholder: "https://", autoComplete: "url", span: "half" },
  { name: "stage", label: "Current stage", type: "select", required: true, span: "half" },
  { name: "building", label: "What are you building?", type: "textarea", required: true, span: "full" },
  { name: "whyNow", label: "Why now?", type: "textarea", required: true, span: "half" },
  { name: "help", label: "What do you need help with?", type: "textarea", required: true, span: "half" },
];

export function Apply() {
  const { buildingText, stageId } = useJourney();
  const uid = useId();
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");

  // Carry context forward from the hero and stage selector.
  useEffect(() => {
    if (buildingText) setValues((v) => (v.building ? v : { ...v, building: buildingText }));
  }, [buildingText]);
  useEffect(() => {
    if (stageId) setValues((v) => ({ ...v, stage: stageId }));
  }, [stageId]);

  const validate = () => {
    const e: Record<string, string> = {};
    for (const f of FIELDS) {
      const val = (values[f.name] ?? "").trim();
      if (f.required && !val) e[f.name] = "Required";
      else if (val && f.type === "email" && !/^\S+@\S+\.\S+$/.test(val)) e[f.name] = "Enter a valid email";
      else if (val && f.type === "url" && !/^https?:\/\/\S+\.\S+/.test(val)) e[f.name] = "Start with https://";
    }
    setErrors(e);
    return e;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = validate();
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (!res.ok || !data.ok) throw new Error(data.message || "Something went wrong.");
      setStatus("done");
    } catch (err) {
      setServerMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const set = (name: string, v: string) => {
    setValues((s) => ({ ...s, [name]: v }));
    if (errors[name]) setErrors((s) => ({ ...s, [name]: "" }));
  };

  const inputCls = "w-full border border-ink/45 bg-transparent px-5 py-4 text-lg outline-none transition-colors placeholder:text-ink/30 focus:border-ink focus-visible:outline-none";

  return (
    <Section id="apply" index="13" label="Application" className="overflow-hidden">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <RevealLines lines={["Building", "something that", "matters?"]} className="display text-huge" />
          <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/60">
            No decks required. No warm intro required. Tell us what you&apos;re building and why now — the conversation starts there.
          </p>
          <ul className="mt-14 space-y-5">
            {["Why build alone?", "Why wait?", "Why not you?"].map((prompt) => (
              <li key={prompt} className="kicker flex items-center gap-4">
                <span className="h-3 w-3 shrink-0 rounded-full bg-flare" aria-hidden />
                {prompt}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-ink bg-paper/70 p-6 sm:p-8 lg:col-span-7 lg:p-10">
          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="on-ink flex min-h-[28rem] flex-col justify-between bg-ink p-8 text-paper"
                role="status"
              >
                <span className="kicker text-lime">why://received</span>
                <div>
                  <p className="display text-huge">
                    You&apos;re in the <span className="text-lime">system.</span>
                  </p>
                  <p className="mt-6 max-w-md text-lg text-paper/70">We&apos;ll review what you&apos;re building and get back to you.</p>
                </div>
                <span className="kicker text-paper/40">{values.company}</span>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-8 sm:grid-cols-2" exit={{ opacity: 0 }}>
                {FIELDS.map((f) => {
                  const id = `${uid}-${f.name}`;
                  const err = errors[f.name];
                  const common = {
                    id,
                    name: f.name,
                    required: f.required,
                    "aria-invalid": err ? true : undefined,
                    "aria-describedby": err ? `${id}-err` : undefined,
                    value: values[f.name] ?? "",
                  };
                  return (
                    <div key={f.name} className={cn(f.span === "full" && "sm:col-span-2")}>
                      <label htmlFor={id} className="kicker flex justify-between text-ink/60">
                        {f.label}
                        {f.required ? <span aria-hidden>*</span> : <span className="opacity-60">Optional</span>}
                      </label>
                      {f.type === "textarea" ? (
                        <textarea {...common} rows={f.span === "full" ? 3 : 4} className={cn(inputCls, "resize-y")} onChange={(e) => set(f.name, e.target.value)} placeholder={f.placeholder} />
                      ) : f.type === "select" ? (
                        <select {...common} className={cn(inputCls, "appearance-none")} onChange={(e) => set(f.name, e.target.value)}>
                          <option value="">Select…</option>
                          {founderStages.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.label.charAt(0) + s.label.slice(1).toLowerCase()}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input {...common} type={f.type ?? "text"} autoComplete={f.autoComplete} placeholder={f.placeholder} className={inputCls} onChange={(e) => set(f.name, e.target.value)} />
                      )}
                      {err && (
                        <p id={`${id}-err`} className="kicker mt-2 text-flare">
                          {err}
                        </p>
                      )}
                    </div>
                  );
                })}

                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-ink/50" aria-live="polite">
                    {status === "error" ? (
                      <span className="text-flare">
                        {serverMsg}
                        {site.email && (
                          <>
                            {" "}
                            Or email <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
                          </>
                        )}
                      </span>
                    ) : (
                      "We only use this to reply to you."
                    )}
                  </p>
                  <button type="submit" disabled={status === "sending"} className="btn-ink !px-8 !py-5 text-sm disabled:opacity-60">
                    {status === "sending" ? <Loader2 size={16} className="animate-spin" aria-hidden /> : null}
                    Start a conversation <ArrowUpRight size={16} aria-hidden />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
