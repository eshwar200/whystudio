import type { CapabilityId } from "./types";

/** "WHERE ARE YOU?" founder stage selector. */
export interface FounderStage {
  id: string;
  label: string;
  stage: string;
  needs: string[];
  help: string;
  capabilities: CapabilityId[];
  ecosystem: string[];
}

export const founderStages: FounderStage[] = [
  {
    id: "idea",
    label: "I HAVE AN IDEA",
    stage: "Pre-product. The idea is real to you and invisible to everyone else.",
    needs: ["A sharp problem statement", "Ten honest conversations with users", "A co-founder who complements you"],
    help: "We pressure-test the problem with operators and peers before you write a line of code, then help you find the people to build it with.",
    capabilities: ["KNOWLEDGE", "TALENT", "ECOSYSTEM"],
    ecosystem: ["Founders", "Operators", "Students"],
  },
  {
    id: "building",
    label: "I'M BUILDING",
    stage: "Building the first version.",
    needs: ["Ruthless scope", "Technical help where you are thin", "A weekly shipping rhythm"],
    help: "Product and engineering support to get a usable version into real hands fast, with AI tooling where it actually saves time.",
    capabilities: ["BUILD", "TALENT"],
    ecosystem: ["Builders", "Technology partners"],
  },
  {
    id: "users",
    label: "I HAVE USERS",
    stage: "Early users. Some love it, most are quiet.",
    needs: ["Retention you can explain", "A repeatable acquisition channel", "Feedback loops that change the product"],
    help: "Distribution through the community and campus networks, plus operators who have taken products from early users to real usage.",
    capabilities: ["GROW", "ECOSYSTEM"],
    ecosystem: ["Universities", "Founders", "Operators"],
  },
  {
    id: "revenue",
    label: "I HAVE REVENUE",
    stage: "Customers are paying.",
    needs: ["Pricing confidence", "A sales motion someone else can run", "Clean books"],
    help: "Pricing and go-to-market reviews, corporate introductions and the finance and compliance basics that investors check first.",
    capabilities: ["GROW", "KNOWLEDGE"],
    ecosystem: ["Corporates", "Operators"],
  },
  {
    id: "growing",
    label: "I'M GROWING",
    stage: "Growth is outpacing the team.",
    needs: ["Senior hires", "Systems that scale", "Partnership channels"],
    help: "Hiring pipelines, operator office hours and partnership channels so the company can grow without the founder becoming the bottleneck.",
    capabilities: ["TALENT", "GROW", "BUILD"],
    ecosystem: ["Talent", "Corporates", "Mentors"],
  },
  {
    id: "raising",
    label: "I'M RAISING",
    stage: "Preparing a round.",
    needs: ["A narrative investors repeat", "A clean data room", "The right first meetings"],
    help: "Narrative, deck and data-room preparation, grant pathways, and introductions through the WHY investor network when you are ready.",
    capabilities: ["CAPITAL", "ECOSYSTEM", "KNOWLEDGE"],
    ecosystem: ["Investor network", "Angels", "Government programmes"],
  },
  {
    id: "talent",
    label: "I'M LOOKING FOR TALENT",
    stage: "The bottleneck is people.",
    needs: ["Builders who want early-stage risk", "Specialists for short sprints", "A co-founder"],
    help: "Access to the builders, students and specialists in the WHY network, and introductions to co-founders who want what you are building.",
    capabilities: ["TALENT", "ECOSYSTEM"],
    ecosystem: ["Builders", "Students", "Universities"],
  },
];
