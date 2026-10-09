import type { CapabilityId } from "./types";

/** "What does a venture studio actually do?" — the founder journey. */
export interface JourneyStage {
  id: string;
  label: string;
  problem: string;
  support: string[];
  capabilities: CapabilityId[];
}

export const journey: JourneyStage[] = [
  {
    id: "idea",
    label: "IDEA",
    problem: "Everyone has an idea. Very few know which part of it is worth a year of their life.",
    support: ["Problem validation", "Founder peers", "Operator feedback", "Co-founder discovery"],
    capabilities: ["KNOWLEDGE", "ECOSYSTEM", "TALENT"],
  },
  {
    id: "mvp",
    label: "MVP",
    problem: "The first version takes three times longer than planned, usually because nobody scoped it.",
    support: ["Product scoping", "Engineering support", "AI tooling", "Weekly build rhythm"],
    capabilities: ["BUILD", "TALENT"],
  },
  {
    id: "first-user",
    label: "FIRST USER",
    problem: "Building is easier than finding the first people who care.",
    support: ["Founder community", "Distribution", "Campus network", "Partners", "Early users"],
    capabilities: ["GROW", "ECOSYSTEM"],
  },
  {
    id: "revenue",
    label: "REVENUE",
    problem: "Users who love you for free do not always pay. Pricing is a product decision, not a spreadsheet.",
    support: ["Pricing reviews", "Sales playbooks", "Corporate introductions", "Unit-economics basics"],
    capabilities: ["GROW", "KNOWLEDGE"],
  },
  {
    id: "growth",
    label: "GROWTH",
    problem: "What got you to 100 customers breaks at 1,000. The team, the stack and the founder all have to change.",
    support: ["Hiring pipelines", "Operator office hours", "Process and systems", "Partnership channels"],
    capabilities: ["TALENT", "GROW", "BUILD"],
  },
  {
    id: "capital",
    label: "CAPITAL",
    problem: "Raising is a full-time job that arrives while you already have one.",
    support: ["Narrative and deck", "Data-room readiness", "Grant pathways", "Investor network introductions"],
    capabilities: ["CAPITAL", "ECOSYSTEM"],
  },
];
