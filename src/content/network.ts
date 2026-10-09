/**
 * "ONE FOUNDER. AN ENTIRE NETWORK."
 * Nodes describe categories of the ecosystem, not named organisations, so they
 * make no relationship claims. Named organisations live in ./organisations.ts.
 */
export interface NetworkNode {
  id: string;
  label: string;
  blurb: string;
  /** Other node ids this node commonly connects to through WHY. */
  links: string[];
}

export const networkNodes: NetworkNode[] = [
  { id: "universities", label: "UNIVERSITIES", blurb: "Where young builders start. Campus programmes surface founders before anyone else sees them.", links: ["talent", "founders", "mentors"] },
  { id: "technology", label: "TECHNOLOGY", blurb: "Platforms, credits and tooling that let a two-person team ship like twenty.", links: ["founders", "corporates"] },
  { id: "mentors", label: "MENTORS", blurb: "Operators who have built, scaled or sold. Time from them is the scarcest resource we route.", links: ["founders", "vc", "universities"] },
  { id: "founders", label: "FOUNDERS", blurb: "The centre of the system. Every other node exists to make one founder more likely to win.", links: ["mentors", "vc", "talent", "technology", "corporates", "government", "universities"] },
  { id: "corporates", label: "CORPORATES", blurb: "First customers, pilots and distribution. Often the fastest route from product to revenue.", links: ["founders", "technology", "government"] },
  { id: "vc", label: "VC FIRMS", blurb: "Capital when the company is ready for it, through a network built on introductions, not cold decks.", links: ["founders", "mentors"] },
  { id: "talent", label: "TALENT", blurb: "Builders, specialists and early hires who want to work on something that matters.", links: ["founders", "universities"] },
  { id: "government", label: "GOVERNMENT", blurb: "Schemes, grants, recognition and public-sector buyers that most first-time founders never find.", links: ["founders", "corporates"] },
];
