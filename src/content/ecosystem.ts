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
  src: "",
  alt: "",
  caption: "",
  category: "Founder session",
  verified: false,
  source: "Awaiting replacement image",
};

export const ecosystemPhotos: GalleryImage[] = [];

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
  { name: "AWS", kind: "Technology partner", logo: "/images/technology-support/technology-01.png", url: "https://aws.amazon.com", verified: true, source: "Provided logo" },
  { name: "Amazon", kind: "Technology partner", logo: "/images/technology-support/technology-02.png", url: "https://www.amazon.com", verified: true, source: "Provided logo" },
  { name: "Google Cloud", kind: "Technology partner", logo: "/images/technology-support/technology-03.png", url: "https://cloud.google.com", verified: true, source: "Provided logo" },
  { name: "ElevenLabs", kind: "Technology partner", logo: "/images/technology-support/technology-04.png", url: "https://elevenlabs.io", verified: true, source: "Provided logo" },
  { name: "Sarvam", kind: "Technology partner", logo: "/images/technology-support/technology-05.png", url: "https://www.sarvam.ai", verified: true, source: "Provided logo" },
  { name: "n8n", kind: "Technology partner", logo: "/images/technology-support/technology-06.png", url: "https://n8n.io", verified: true, source: "Provided logo" },
  { name: "Keka", kind: "Technology partner", logo: "/images/technology-support/technology-07.png", verified: true, source: "Provided logo" },
  { name: "HubSpot", kind: "Technology partner", logo: "/images/technology-support/technology-08.png", url: "https://www.hubspot.com", verified: true, source: "Provided logo" },
  { name: "Technology partner", kind: "Technology partner", logo: "/images/technology-support/technology-09.png", verified: true, source: "Provided logo" },
  { name: "Notion", kind: "Technology partner", logo: "/images/technology-support/technology-10.png", url: "https://notion.so", verified: true, source: "Provided logo" },
  { name: "GitHub", kind: "Technology partner", logo: "/images/technology-support/technology-11.png", url: "https://github.com", verified: true, source: "Provided logo" },
  { name: "IIMA Ventures", kind: "Investor network", logo: "/images/investment-network/investment-01.png", verified: true, source: "Provided logo" },
  { name: "India Accelerator", kind: "Investor network", logo: "/images/investment-network/investment-02.png", verified: true, source: "Provided logo" },
  { name: "Atomic Capital", kind: "Investor network", logo: "/images/investment-network/investment-03.png", verified: true, source: "Provided logo" },
  { name: "Pune Angels Network", kind: "Investor network", logo: "/images/investment-network/investment-04.png", verified: true, source: "Provided logo" },
  { name: "AUM Ventures", kind: "Investor network", logo: "/images/investment-network/investment-05.png", verified: true, source: "Provided logo" },
  { name: "Hyderabad Angels", kind: "Investor network", logo: "/images/investment-network/investment-06.png", verified: true, source: "Provided logo" },
  { name: "IvyCap Ventures", kind: "Investor network", logo: "/images/investment-network/investment-07.png", verified: true, source: "Provided logo" },
  { name: "Arkam Ventures", kind: "Investor network", logo: "/images/investment-network/investment-08.png", verified: true, source: "Provided logo" },
  { name: "IIML HUTM EIC", kind: "Investor network", logo: "/images/investment-network/investment-09.png", verified: true, source: "Provided logo" },
  { name: "IIMB NSRCEL", kind: "Investor network", logo: "/images/investment-network/investment-10.png", verified: true, source: "Provided logo" },
  { name: "Pilani Innovation and Entrepreneurship Development Society", kind: "Investor network", logo: "/images/investment-network/investment-11.png", verified: true, source: "Provided logo" },
  { name: "Indian Institute of Technology Madras", kind: "University", logo: "/images/universities/university-01.png", verified: true, source: "Provided logo" },
  { name: "Sri Sri Institute of Science and Technology", kind: "University", logo: "/images/universities/university-02.png", verified: true, source: "Provided logo" },
  { name: "Indian Institute of Technology Bombay", kind: "University", logo: "/images/universities/university-03.png", verified: true, source: "Provided logo" },
  { name: "Provided university partner", kind: "University", logo: "/images/universities/university-04.png", verified: true, source: "Provided logo" },
  { name: "Jawaharlal Nehru Technological University Hyderabad", kind: "University", logo: "/images/universities/university-05.png", verified: true, source: "Provided logo" },
  { name: "Provided institutional partner", kind: "University", logo: "/images/universities/university-06.png", verified: true, source: "Provided logo" },
  { name: "Vellore Institute of Technology", kind: "University", logo: "/images/universities/university-07.png", verified: true, source: "Provided logo" },
  { name: "Vishnu Universal Learning", kind: "University", logo: "/images/universities/university-08.png", verified: true, source: "Provided logo" },
  { name: "Indian Institute of Technology Hyderabad", kind: "University", logo: "/images/universities/university-09.png", verified: true, source: "Provided logo" },
  { name: "Tech Mahindra", kind: "University", logo: "/images/universities/university-10.png", verified: true, source: "Provided logo" },
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
