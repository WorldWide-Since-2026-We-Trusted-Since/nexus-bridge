export const newsItems = [
  { time: "22:31 UTC", tag: "LIVE", text: "Infrastructure Development Program — Phase II approved" },
  { time: "21:52 UTC", tag: "TREATY", text: "Cross-Border Cooperation Framework updated" },
  { time: "20:11 UTC", tag: "PARTNER", text: "New institutional partner added — Northern Energy Corridor" },
  { time: "18:04 UTC", tag: "RESEARCH", text: "Digital Sovereignty white paper published" },
  { time: "16:40 UTC", tag: "ALERT", text: "Open call: Strategic Investment Framework 2027" },
  { time: "14:12 UTC", tag: "MILESTONE", text: "1,200+ verified members across 34 countries" },
];

export const opportunityRibbon = [
  "Open Contracts",
  "New Partnerships",
  "Corporate Applications",
  "New Members",
  "Research Opportunities",
  "Active Projects",
  "Treaty Frameworks",
  "Strategic Initiatives",
];

export const coreAreas = [
  { title: "Infrastructure Development", desc: "Modernization of transport, energy and digital corridors across regions." },
  { title: "Digital Sovereignty", desc: "Trusted cloud, data governance and resilient public technology." },
  { title: "Technology & Innovation", desc: "Emerging tech, AI systems and applied research programs." },
  { title: "International Cooperation", desc: "Cross-border treaties, dialogue and shared infrastructure." },
  { title: "Economic Development", desc: "Sustainable growth, investment frameworks and public-private models." },
  { title: "Research & Policy", desc: "Evidence-based policy research and strategic foresight." },
  { title: "Sustainable Growth", desc: "Long-horizon programs balancing resilience and prosperity." },
  { title: "Governance & Treaties", desc: "Frameworks, compliance and transparent oversight." },
];

export const members = [
  { id: "MEM-001", org: "Strategic Partner GmbH", category: "Institutional", status: "Active", country: "Germany", joined: "2026", trust: 96, star: 4 },
  { id: "MEM-002", org: "Recherche Européenne", category: "Professional", status: "Active", country: "France", joined: "2026", trust: 88, star: 3 },
  { id: "MEM-003", org: "Infrastructure Network NL", category: "Executive", status: "Active", country: "Netherlands", joined: "2026", trust: 92, star: 5 },
  { id: "MEM-004", org: "Nordic Energy Initiative", category: "Corporate", status: "Active", country: "Sweden", joined: "2026", trust: 84, star: 3 },
  { id: "MEM-005", org: "Iberia Innovation Council", category: "Institutional", status: "Pending", country: "Spain", joined: "2026", trust: 71, star: 2 },
  { id: "MEM-006", org: "Adriatic Research Forum", category: "Professional", status: "Active", country: "Italy", joined: "2026", trust: 79, star: 3 },
  { id: "MEM-007", org: "Baltic Digital Trust", category: "Strategic", status: "Active", country: "Estonia", joined: "2026", trust: 90, star: 4 },
  { id: "MEM-008", org: "Hellenic Infrastructure Group", category: "Corporate", status: "Active", country: "Greece", joined: "2026", trust: 82, star: 3 },
];

export const sponsors = [
  { name: "Northern Capital Foundation", tier: "Platinum", since: 2026 },
  { name: "Continental Industrial Trust", tier: "Gold", since: 2026 },
  { name: "Atlas Research Endowment", tier: "Gold", since: 2026 },
  { name: "Mediterra Development Fund", tier: "Silver", since: 2027 },
  { name: "Aurora Innovation Capital", tier: "Strategic", since: 2026 },
  { name: "Vanguard Infrastructure Group", tier: "Innovation", since: 2027 },
];

export const milestones = [
  { year: 2023, kind: "founding", label: "Initiative chartered" },
  { year: 2024, kind: "program", label: "First research framework" },
  { year: 2025, kind: "partnership", label: "Cross-border partnership cluster" },
  { year: 2026, kind: "infra", label: "Infrastructure Program Phase II" },
  { year: 2027, kind: "finance", label: "Strategic Investment Framework" },
  { year: 2028, kind: "expansion", label: "Global Expansion Initiative" },
  { year: 2030, kind: "vision", label: "Long-horizon Treaty Network" },
];

export const finance = [
  { star: "Funding", value: "€ 142M", trust: ["Verified Funding", "Audited"] },
  { star: "Sponsorship", value: "€ 38M", trust: ["Transparent Reporting"] },
  { star: "Grants", value: "€ 64M", trust: ["Governance Approved"] },
  { star: "Infrastructure Capital", value: "€ 220M", trust: ["Audited", "Public Disclosure"] },
  { star: "Research Resources", value: "€ 27M", trust: ["Ethics Compliant"] },
  { star: "Strategic Programs", value: "€ 91M", trust: ["Verified Funding"] },
];

export const opportunities = [
  { kind: "Contract", title: "Northern Energy Corridor — Phase II Studies", deadline: "2026-09-30", status: "Open" },
  { kind: "Partnership", title: "Digital Sovereignty Working Group", deadline: "2026-08-15", status: "Open" },
  { kind: "Application", title: "Corporate Membership 2027 Intake", deadline: "2026-11-01", status: "Open" },
  { kind: "Research", title: "Resilient Infrastructure Foresight Programme", deadline: "2026-10-12", status: "Open" },
  { kind: "Contract", title: "Cross-Border Data Trust Framework", deadline: "2026-12-01", status: "Gray Zone" },
];

export const nav = [
  { to: "/", label: "Headquarters", icon: "command" },
  { to: "/about", label: "About", icon: "info" },
  { to: "/infrastructure", label: "Infrastructure", icon: "network" },
  { to: "/treaties", label: "Treaties", icon: "scroll" },
  { to: "/partnerships", label: "Partnerships", icon: "handshake" },
  { to: "/members", label: "Members", icon: "users" },
  { to: "/sponsors", label: "Sponsors", icon: "star" },
  { to: "/timeline", label: "Timeline", icon: "clock" },
  { to: "/opportunities", label: "Opportunities", icon: "target" },
  { to: "/support", label: "Support", icon: "life-buoy" },
  { to: "/auth/login", label: "Sign In", icon: "key" },
] as const;
