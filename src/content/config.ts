/**
 * Site-wide content switches and brand facts.
 *
 * SHOW_PLACEHOLDER_SLOTS
 *   true  → sections without verified content render labelled empty slots
 *           (useful while the team is collecting real data / photos).
 *   false → those slots are hidden; a section with zero verified records
 *           is removed from the page and from the navigation.
 *   Set to false before going live if any section is still empty.
 */
export const SHOW_PLACEHOLDER_SLOTS = false;

export const site = {
  name: "WHY Venture Studio",
  shortName: "WHY",
  url: "http://localhost:3000",
  description:
    "WHY Venture Studio finds ambitious young builders early and gives them the leverage, infrastructure, network, technology, knowledge, talent and capital access required to build meaningful companies.",
  location: "India",
  email: "",
  phone: "7780754541",
  socials: {
    linkedin: "https://www.linkedin.com",
    instagram: "https://www.instagram.com",
    x: "",
  },
} as const;

export const navItems = [
  { label: "Founders", href: "#stage" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Network", href: "#network" },
  { label: "Mentors", href: "#mentors" },
  { label: "About", href: "#vision" },
  { label: "Contact", href: "#apply" },
] as const;
