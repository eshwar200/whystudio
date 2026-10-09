import type { CapabilityId } from "./types";

/**
 * The WHY Operating System. These describe what WHY offers (positioning copy),
 * not third-party relationships, so they are not gated by `verified`.
 * TODO(WHY): the `details` bullets expand the brief's one-line descriptions;
 * confirm each one reflects something WHY actually offers today.
 */
export interface Capability {
  id: CapabilityId;
  index: string;
  short: string;
  description: string;
  details: string[];
  /** Accent token used when this capability is active. */
  accent: "lime" | "acid" | "flare" | "volt";
}

export const capabilities: Capability[] = [
  {
    id: "CAPITAL",
    index: "01",
    short: "Money, when it matters.",
    description: "Funding pathways, grants and investor access.",
    details: ["Grant and non-dilutive pathways", "Fundraise readiness and narrative", "Introductions to the investor network", "Round structuring basics"],
    accent: "acid",
  },
  {
    id: "BUILD",
    index: "02",
    short: "Ship the thing.",
    description: "Product, engineering, AI and execution support.",
    details: ["Product scoping and MVP sprints", "Engineering and AI build support", "Technical co-founder matching", "Weekly execution rhythm"],
    accent: "lime",
  },
  {
    id: "GROW",
    index: "03",
    short: "Find the people who care.",
    description: "Go-to-market, distribution, partnerships and growth.",
    details: ["First-100-users playbooks", "Distribution through the community", "Partnership introductions", "Pricing and positioning"],
    accent: "flare",
  },
  {
    id: "TALENT",
    index: "04",
    short: "Build the team.",
    description: "Access to builders, specialists and hiring networks.",
    details: ["Early hires and interns", "Specialists on demand", "Co-founder discovery", "Campus talent pipelines"],
    accent: "volt",
  },
  {
    id: "ECOSYSTEM",
    index: "05",
    short: "Never build alone.",
    description: "Founders, mentors, corporates, universities and investors.",
    details: ["Peer founder cohorts", "Corporate and university access", "Operator office hours", "Events built for builders"],
    accent: "lime",
  },
  {
    id: "KNOWLEDGE",
    index: "06",
    short: "Learn from people who did it.",
    description: "Operators, playbooks, workshops and practical knowledge.",
    details: ["Operator-led workshops", "Stage-specific playbooks", "Teardowns of real companies", "Legal, finance and compliance basics"],
    accent: "acid",
  },
];

export const capabilityById = Object.fromEntries(capabilities.map((c) => [c.id, c])) as Record<CapabilityId, Capability>;
