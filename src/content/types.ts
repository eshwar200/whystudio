/**
 * Shared content types.
 *
 * CONTENT INTEGRITY RULE
 * Every record that makes a factual claim about WHY (a company, a person,
 * a partner, a number, a photo) carries `verified`. Only set it to `true`
 * once the claim has been confirmed by the WHY team. Records with
 * `verified: false` render as clearly-labelled empty slots (or are hidden
 * entirely when SHOW_PLACEHOLDER_SLOTS is false in ./config.ts).
 */

export type CapabilityId = "BUILD" | "GROW" | "TALENT" | "ECOSYSTEM" | "CAPITAL" | "KNOWLEDGE";

export interface Verifiable {
  verified: boolean;
  /** Where the claim was confirmed: a URL, a document name, or a person. */
  source?: string;
}

export interface Person extends Verifiable {
  name: string;
  role: string;
  company?: string;
  /** Founder | Builder | Operator | Mentor | Investor | Student */
  group: "Founder" | "Builder" | "Operator" | "Mentor" | "Investor" | "Student";
  expertise?: string[];
  /** Path under /public, e.g. /images/people/jane.jpg */
  photo?: string;
  linkedin?: string;
}

export interface PortfolioCompany extends Verifiable {
  slug: string;
  name: string;
  oneLiner: string;
  category: string;
  stage: string;
  founders: string[];
  logo?: string;
  founderPhoto?: string;
  startupImage?: string;
  linkedin?: string;
  website?: string;
  /** Longer case-study text shown in the modal. */
  story?: string;
  /** "Backed by WHY" may only be used when investment is verified. */
  relationship: "Built with WHY" | "Backed by WHY" | "In the WHY network";
}

export interface Organisation extends Verifiable {
  name: string;
  logo?: string;
  url?: string;
  /**
   * Relationship language is fixed by type, see content-integrity notes:
   *  - "Partner"            → verified partnership
   *  - "Technology partner" → verified technology partnership / credits
   *  - "Investor network"   → network relationship only (never "Backed by")
   *  - "Mentors from"       → mentors employed at / affiliated with
   *  - "University"         → campus relationship
   */
  kind: "Partner" | "Technology partner" | "Investor network" | "Mentors from" | "University" | "Community";
}

export interface GalleryImage extends Verifiable {
  src: string;
  alt: string;
  caption: string;
  category:
    | "Campus activation"
    | "Founder session"
    | "Workshop"
    | "Hackathon"
    | "Mentor meeting"
    | "Community event"
    | "Startup showcase";
  /** Layout hint for the masonry grid. */
  shape?: "tall" | "wide" | "square";
}

export interface Metric extends Verifiable {
  label: string;
  /** null = not yet verified; the UI shows a pending state, never a guess. */
  value: number | null;
  /** Rendered after the number, e.g. "+" or "%". */
  suffix?: string;
  note?: string;
  asOf?: string;
}

export interface CityActivity extends Verifiable {
  city: string;
  lat: number;
  lon: number;
  activity: string[];
}
