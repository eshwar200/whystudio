import { intentRules } from "@/content/intents";
import type { CapabilityId } from "@/content/types";

export interface Interpretation {
  capabilities: { id: CapabilityId; score: number; reply: string; hits: string[] }[];
  /** Best guess at the founder stage id from content/stages.ts, if any. */
  stage: string | null;
}

const STAGE_HINTS: { id: string; words: string[] }[] = [
  { id: "raising", words: ["fundraise", "fundraising", "raise", "raising", "investor", "investors", "seed", "round", "vc"] },
  { id: "talent", words: ["hire", "hiring", "talent", "cofounder", "co-founder", "team"] },
  { id: "growing", words: ["scale", "scaling", "growing", "growth"] },
  { id: "revenue", words: ["revenue", "paying", "customers", "sales", "mrr", "arr"] },
  { id: "users", words: ["users", "beta", "launched", "traction"] },
  { id: "building", words: ["building", "mvp", "prototype", "developing", "build"] },
  { id: "idea", words: ["idea", "thinking", "concept", "validate"] },
];

function tokens(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter(Boolean),
  );
}

/**
 * Lightweight, deterministic interpretation of free text.
 * Swap this for an API call later; keep the return type.
 */
export function interpret(text: string): Interpretation {
  const t = tokens(text);
  const lower = ` ${text.toLowerCase()} `;
  const has = (k: string) => (k.includes(" ") || k.includes("-") ? lower.includes(k) : t.has(k));

  const capabilities = intentRules
    .map((rule) => {
      const hits = rule.keywords.filter(has);
      return { id: rule.capability, score: hits.length, reply: rule.reply, hits };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  // "no technical cofounder" is a strong BUILD + TALENT signal.
  if (/no (technical )?co-?founder/.test(text.toLowerCase())) {
    for (const id of ["BUILD", "TALENT"] as CapabilityId[]) {
      const found = capabilities.find((c) => c.id === id);
      if (found) found.score += 2;
    }
    capabilities.sort((a, b) => b.score - a.score);
  }

  // Always give a useful answer, even for vague input.
  if (capabilities.length === 0) {
    const fallback = intentRules.find((r) => r.capability === "KNOWLEDGE")!;
    const eco = intentRules.find((r) => r.capability === "ECOSYSTEM")!;
    capabilities.push(
      { id: "KNOWLEDGE", score: 0, reply: fallback.reply, hits: [] },
      { id: "ECOSYSTEM", score: 0, reply: eco.reply, hits: [] },
    );
  }

  const stage = STAGE_HINTS.find((s) => s.words.some((w) => t.has(w)))?.id ?? null;

  return { capabilities: capabilities.slice(0, 3), stage };
}
