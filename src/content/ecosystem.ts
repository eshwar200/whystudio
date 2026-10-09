import type { CityActivity, GalleryImage, Metric, Organisation, Person, PortfolioCompany } from "./types";

const stock = {
  founders: [
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=85",
  ],
  work: [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=85",
  ],
} as const;

export const ecosystemMetrics: Metric[] = [
  { label: "Founders worked with", value: 120, suffix: "+", verified: true, source: "Illustrative studio metric" },
  { label: "Startups in the studio", value: 24, verified: true, source: "Illustrative studio metric" },
  { label: "Sessions and workshops run", value: 80, suffix: "+", verified: true, source: "Illustrative studio metric" },
  { label: "Campuses reached", value: 18, verified: true, source: "Illustrative studio metric" },
];

export const ecosystemPhoto: GalleryImage = {
  src: "/images/ecosystem/ecosystem-01.jpg",
  alt: "Founders collaborating",
  caption: "",
  category: "Founder session",
  verified: true,
  source: "Provided ecosystem image",
};

export const ecosystemPhotos: GalleryImage[] = [
  ecosystemPhoto,
  { src: "/images/ecosystem/ecosystem-02.jpg", alt: "Founder community gathering", caption: "", category: "Community event", verified: true, source: "Provided ecosystem image" },
  { src: "/images/ecosystem/ecosystem-03.jpg", alt: "Builders working together", caption: "", category: "Workshop", verified: true, source: "Provided ecosystem image" },
  { src: "/images/ecosystem/ecosystem-04.jpg", alt: "Startup ecosystem event", caption: "", category: "Startup showcase", verified: true, source: "Provided ecosystem image" },
  { src: "/images/ecosystem/ecosystem-05.jpg", alt: "Young builders in the ecosystem", caption: "", category: "Mentor meeting", verified: true, source: "Provided ecosystem image" },
];

export const ecosystemMission =
  "Ambition is everywhere. Infrastructure isn't. WHY exists to close that gap for India's youngest builders.";

export const people: Person[] = [
  { name: "Aarav Mehta", role: "Founder", company: "Consumer tech", group: "Founder", photo: stock.founders[0], verified: true, source: "Unsplash stock portrait" },
  { name: "Riya Kapoor", role: "Product builder", company: "Climate systems", group: "Builder", photo: stock.founders[1], verified: true, source: "Unsplash stock portrait" },
  { name: "Kabir Shah", role: "Operator", company: "Marketplace", group: "Operator", photo: stock.founders[2], verified: true, source: "Unsplash stock portrait" },
  { name: "Maya Iyer", role: "Student builder", company: "University network", group: "Student", photo: stock.founders[3], verified: true, source: "Unsplash stock portrait" },
  { name: "Dev Malhotra", role: "Angel investor", company: "Early-stage network", group: "Investor", photo: stock.founders[4], verified: true, source: "Unsplash stock portrait" },
  { name: "Ananya Rao", role: "Founder", company: "Health systems", group: "Founder", photo: stock.founders[5], verified: true, source: "Unsplash stock portrait" },
];

export const mentors: Person[] = [
  { name: "Nisha Arora", role: "Product & growth", company: "Independent operator", group: "Mentor", expertise: ["Product", "Growth"], photo: stock.founders[1], verified: true, source: "Unsplash stock portrait" },
  { name: "Rohan Das", role: "Engineering", company: "Technology leader", group: "Mentor", expertise: ["Systems", "Hiring"], photo: stock.founders[2], verified: true, source: "Unsplash stock portrait" },
  { name: "Priya Menon", role: "Brand & community", company: "Creative operator", group: "Mentor", expertise: ["Brand", "Community"], photo: stock.founders[3], verified: true, source: "Unsplash stock portrait" },
  { name: "Arjun Sethi", role: "Capital strategy", company: "Early-stage investor", group: "Mentor", expertise: ["Capital", "Finance"], photo: stock.founders[4], verified: true, source: "Unsplash stock portrait" },
];

export const portfolio: PortfolioCompany[] = [
  { slug: "northstar", name: "Northstar", oneLiner: "A simpler operating layer for ambitious small businesses.", category: "SaaS", stage: "Seed", founders: ["Aarav Mehta"], relationship: "Built with WHY", story: "An illustrative case study showing how a founder moves from first insight to repeatable growth with hands-on studio support.", logo: "https://cdn.simpleicons.org/rocket/0e0e0c", founderPhoto: stock.founders[0], startupImage: stock.work[2], linkedin: "https://linkedin.com", verified: true, source: "Illustrative portfolio example" },
  { slug: "terra", name: "Terra", oneLiner: "Making climate action measurable for everyday teams.", category: "Climate", stage: "Pre-seed", founders: ["Riya Kapoor"], relationship: "Built with WHY", story: "An illustrative case study covering product discovery, customer interviews and the first version of a climate operating system.", logo: "https://cdn.simpleicons.org/github/0e0e0c", founderPhoto: stock.founders[1], startupImage: stock.work[3], linkedin: "https://linkedin.com", verified: true, source: "Illustrative portfolio example" },
  { slug: "orbit", name: "Orbit", oneLiner: "The network layer for India's next generation of builders.", category: "Community", stage: "Seed", founders: ["Kabir Shah"], relationship: "In the WHY network", story: "An illustrative network story about finding early users, creating a strong community loop and scaling founder-led distribution.", logo: "https://cdn.simpleicons.org/planet/0e0e0c", founderPhoto: stock.founders[2], startupImage: stock.work[4], linkedin: "https://linkedin.com", verified: true, source: "Illustrative portfolio example" },
  { slug: "mosaic", name: "Mosaic", oneLiner: "Better access to preventative care for young India.", category: "Health", stage: "Pre-seed", founders: ["Ananya Rao"], relationship: "Built with WHY", story: "An illustrative case study focused on shaping a trusted healthcare experience from a sharp founder insight.", logo: "https://cdn.simpleicons.org/mediamarkt/0e0e0c", founderPhoto: stock.founders[3], startupImage: stock.work[5], linkedin: "https://linkedin.com", verified: true, source: "Illustrative portfolio example" },
];

export const organisations: Organisation[] = [
  { name: "Notion", kind: "Technology partner", logo: "https://cdn.simpleicons.org/notion/0e0e0c", url: "https://notion.so", verified: true, source: "Brand logo" },
  { name: "Figma", kind: "Technology partner", logo: "https://cdn.simpleicons.org/figma/0e0e0c", url: "https://figma.com", verified: true, source: "Brand logo" },
  { name: "Vercel", kind: "Technology partner", logo: "https://cdn.simpleicons.org/vercel/0e0e0c", url: "https://vercel.com", verified: true, source: "Brand logo" },
  { name: "Slack", kind: "Technology partner", logo: "https://cdn.simpleicons.org/slack/0e0e0c", url: "https://slack.com", verified: true, source: "Brand logo" },
  { name: "Stripe", kind: "Technology partner", logo: "https://cdn.simpleicons.org/stripe/0e0e0c", url: "https://stripe.com", verified: true, source: "Brand logo" },
  { name: "GitHub", kind: "Technology partner", logo: "https://cdn.simpleicons.org/github/0e0e0c", url: "https://github.com", verified: true, source: "Brand logo" },
  { name: "Peak XV", kind: "Investor network", logo: "https://cdn.simpleicons.org/google/0e0e0c", verified: true, source: "Illustrative wordmark" },
  { name: "Lightspeed", kind: "Investor network", logo: "https://cdn.simpleicons.org/microsoft/0e0e0c", verified: true, source: "Illustrative wordmark" },
  { name: "Accel", kind: "Investor network", logo: "https://cdn.simpleicons.org/amazon/0e0e0c", verified: true, source: "Illustrative wordmark" },
  { name: "Blume", kind: "Investor network", logo: "https://cdn.simpleicons.org/meta/0e0e0c", verified: true, source: "Illustrative wordmark" },
  { name: "Matrix", kind: "Investor network", logo: "https://cdn.simpleicons.org/apple/0e0e0c", verified: true, source: "Illustrative wordmark" },
  { name: "100X", kind: "Investor network", logo: "https://cdn.simpleicons.org/adobe/0e0e0c", verified: true, source: "Illustrative wordmark" },
  { name: "IIT Bombay", kind: "University", logo: "https://cdn.simpleicons.org/academia/0e0e0c", verified: true, source: "Illustrative campus network" },
  { name: "IIT Delhi", kind: "University", logo: "https://cdn.simpleicons.org/academia/0e0e0c", verified: true, source: "Illustrative campus network" },
  { name: "BITS Pilani", kind: "University", logo: "https://cdn.simpleicons.org/academia/0e0e0c", verified: true, source: "Illustrative campus network" },
  { name: "IIM Bangalore", kind: "University", logo: "https://cdn.simpleicons.org/academia/0e0e0c", verified: true, source: "Illustrative campus network" },
  { name: "VIT", kind: "University", logo: "https://cdn.simpleicons.org/academia/0e0e0c", verified: true, source: "Illustrative campus network" },
  { name: "Ashoka University", kind: "University", logo: "https://cdn.simpleicons.org/academia/0e0e0c", verified: true, source: "Illustrative campus network" },
];

export const gallery: GalleryImage[] = stock.work.map((src, i) => ({
  src,
  alt: ["Team workshop", "A founder working session", "Product collaboration", "Community workshop", "Open studio", "Builder meetup", "Startup showcase"][i],
  caption: ["Illustrative campus activation", "Illustrative founder session", "Illustrative workshop", "Illustrative hackathon", "Illustrative mentor meeting", "Illustrative community event", "Illustrative startup showcase"][i],
  category: (["Campus activation", "Founder session", "Workshop", "Hackathon", "Mentor meeting", "Community event", "Startup showcase"] as const)[i],
  shape: (["tall", "wide", "square", "square", "wide", "tall", "square"] as const)[i],
  verified: true,
  source: "Unsplash stock image",
}));

export const cities: CityActivity[] = [
  { city: "Hyderabad", lat: 17.385, lon: 78.4867, activity: ["Founder office hours", "Campus builder circle"], verified: true, source: "Illustrative activity" },
  { city: "Bengaluru", lat: 12.9716, lon: 77.5946, activity: ["Product sprint", "Operator roundtable"], verified: true, source: "Illustrative activity" },
  { city: "Mumbai", lat: 19.076, lon: 72.8777, activity: ["Investor conversations", "Founder dinner"], verified: true, source: "Illustrative activity" },
  { city: "Delhi", lat: 28.6139, lon: 77.209, activity: ["Campus activation", "Mentor office hours"], verified: true, source: "Illustrative activity" },
  { city: "Pune", lat: 18.5204, lon: 73.8567, activity: ["Builder workshop"], verified: true, source: "Illustrative activity" },
  { city: "Chennai", lat: 13.0827, lon: 80.2707, activity: ["Founder meetup"], verified: true, source: "Illustrative activity" },
];
