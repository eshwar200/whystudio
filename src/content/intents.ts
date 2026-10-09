import type { CapabilityId } from "./types";

/**
 * Deterministic keyword interpreter for the conversational hero.
 * No backend is required. To plug in an AI endpoint later, replace
 * `interpret()` in src/lib/interpret.ts and keep the same return shape.
 */
export const heroExamples = [
  "I have an idea but no technical cofounder.",
  "We're building an AI product for students.",
  "We have users and are looking to scale.",
  "We're preparing for our first fundraise.",
];

export interface IntentRule {
  capability: CapabilityId;
  /** Lower-case keywords or short phrases. Matched on word boundaries. */
  keywords: string[];
  /** One-line response shown when this capability matches. */
  reply: string;
}

export const intentRules: IntentRule[] = [
  {
    capability: "BUILD",
    keywords: ["technical", "cofounder", "co-founder", "cto", "mvp", "prototype", "build", "building", "code", "engineer", "developer", "app", "product", "ai", "ml", "platform", "software", "hardware", "no-code"],
    reply: "You need the product to exist, and work, in front of real people.",
  },
  {
    capability: "GROW",
    keywords: ["users", "customers", "scale", "growth", "grow", "marketing", "sales", "distribution", "launch", "traction", "go-to-market", "gtm", "retention", "revenue", "pricing"],
    reply: "The bottleneck is distribution, not the product.",
  },
  {
    capability: "TALENT",
    keywords: ["hire", "hiring", "team", "talent", "cofounder", "co-founder", "intern", "developer", "designer", "engineer", "people"],
    reply: "You need the right people around the table, early.",
  },
  {
    capability: "ECOSYSTEM",
    keywords: ["students", "student", "campus", "college", "university", "community", "network", "partners", "corporate", "government", "alone", "connect"],
    reply: "The right room will save you a year.",
  },
  {
    capability: "CAPITAL",
    keywords: ["fundraise", "fundraising", "raise", "raising", "funding", "investor", "investors", "vc", "angel", "seed", "pre-seed", "grant", "grants", "capital", "money", "round"],
    reply: "Capital is a tool. We help you raise the right amount, from the right people, at the right time.",
  },
  {
    capability: "KNOWLEDGE",
    keywords: ["idea", "validate", "validation", "learn", "how", "first", "legal", "compliance", "finance", "strategy", "unsure", "confused", "stuck", "pivot"],
    reply: "You need someone who has been here before.",
  },
];
