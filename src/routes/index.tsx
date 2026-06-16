import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/holo/Shell";
import {
  GlassPanel, HoloCard, BlackStar, TrustBadge, CrownSeal, SectionHeader, StatusDot,
} from "@/components/holo/primitives";
import { HNOSSKeyStream, HNOSSKeyTicker, HNOSSBadge } from "@/components/holo/HNOSSKeyStream";
import { KeyRound, UserPlus, Shield, ArrowRight, Globe2, Sparkles, Activity, Clock } from "lucide-react";
import { coreAreas, members, finance, milestones } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HNOSS · Reference Governance System" },
      { name: "description", content: "HNOSS Reference Governance System — Strategic Partner EU · NATO · UN · Pentagon" },
      { property: "og:title", content: "HNOSS Reference Governance System" },
      { property: "og:description", content: "Strategic Partner Platform — EU · NATO · UN · Pentagon" },
    ],
  }),
  component: Index,
});

function Welcome() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <CrownSeal className="mb-6" />
      
      <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
        <span className="text-holo">HNOSS</span>
      </h1>
      
      <p className="mt-2 text-lg tracking-widest text-gold uppercase">
        Reference Governance System
      </p>
      
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
        <span>EU</span>
        <span className="text-border">·</span>
        <span>NATO</span>
        <span className="text-border">·</span>
        <span>UN</span>
        <span className="text-border">·</span>
        <span>Pentagon</span>
      </div>

      <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
        Strategic partner organization for infrastructure, innovation and international cooperation. 
        Operating under civil law with conceptual alignment to EU, NATO, UN and Pentagon governance frameworks.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/auth/login"
          className="inline-flex items-center gap-2 rounded-md border border-[var(--holo)]/50 bg-[oklch(0.78_0.16_230_/_0.12)] px-5 py-2.5 text-sm font-medium text-holo shadow-[0_0_18px_oklch(0.78_0.16_230_/_0.35)]"
        >
          <KeyRound className="h-4 w-4" /> Sign In
        </Link>
        <Link
          to="/auth/register"
          className="inline-flex items-center gap-2 rounded-md border border-[var(--gold)]/40 px-5 py-2.5 text-sm font-medium text-gold"
        >
          <UserPlus className="h-4 w-4" /> Register
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <TrustBadge label="LEI 894500GBJSIW8L6ET310" level={100} />
        <TrustBadge label="EU Transparency APP-247579" level={100} />
        <TrustBadge label="UNGM 1172700" level={95} />
      </div>
      
      <div className="mt-8 flex items-center gap-2 text-[10px] text-muted-foreground">
        <Shield className="h-3 w-3" />
        <span>JWT Secured · GDPR · NIS2 · ISO 27001</span>
      </div>
    </section>
  );
}

// Editable Section: Company Information
function CompanyInfo() {
  return (
    <section className="relative pt-6">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="animate-grow-in">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-holo">
            <Sparkles className="h-3 w-3" /> Global Infrastructure Command
          </div>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-holo">Infrastructure Enforcement</span>
            <br />
            <span className="text-foreground/90">for a connected world.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            HNOSS Reference Governance System — strategic partner aligned with EU, NATO,
            UN, Pentagon advancing infrastructure, innovation and international cooperation
            through sovereign wealth coordination, transparent governance and long-horizon
            programs. <span className="text-foreground/80">Open in the Gray</span> — open where possible, protected where necessary.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/auth/login"
              className="group inline-flex items-center gap-2 rounded-md border border-[var(--holo)]/50 bg-[oklch(0.78_0.16_230_/_0.12)] px-4 py-2.5 text-sm font-medium text-holo shadow-[0_0_18px_oklch(0.78_0.16_230_/_0.35)]"
            >
              Sign In <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/auth/register"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--gold)]/40 px-4 py-2.5 text-sm font-medium text-gold"
            >
              Register
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            <TrustBadge label="Governance Certified" level={96} />
            <TrustBadge label="Ethics Compliant" level={94} />
            <TrustBadge label="Transparency" level={91} />
          </div>
        </div>

        <div className="relative">
          <div className="glass-panel relative p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--holo)] to-transparent" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <Activity className="h-3.5 w-3.5 text-[var(--holo)]" /> Live Intelligence
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">{new Date().toISOString().slice(11, 19)} UTC</span>
            </div>
            <CrownSeal className="my-6" />
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { k: "Members", v: "1,284" },
                { k: "Partners", v: "146" },
                { k: "Countries", v: "34" },
              ].map((s) => (
                <div key={s.k} className="rounded-lg border border-border bg-card/40 p-3">
                  <div className="font-display text-xl text-holo">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.k}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 text-xs">
              {[
                { t: "Treaty Framework V updated", s: "active" as const },
                { t: "New Strategic Partner onboarded", s: "active" as const },
                { t: "Funding milestone reached — Phase II", s: "advisory" as const },
              ].map((e, i) => (
                <div key={i} className="flex items-center gap-3 rounded-md border border-border bg-card/30 px-3 py-2">
                  <StatusDot status={e.s} />
                  <span className="flex-1 text-foreground/85">{e.t}</span>
                  <Clock className="h-3 w-3 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(circle,_oklch(0.78_0.16_230_/_0.25),_transparent_70%)] blur-2xl" />
        </div>
      </div>
    </section>
  );
}

// Editable Section: Core Areas
function CoreAreas() {
  return (
    <section className="mt-24">
      <SectionHeader
        eyebrow="Core Areas"
        title="Eight pillars of cooperation"
        subtitle="Modern infrastructure, digital sovereignty, and international governance frameworks"
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {coreAreas.map((area, i) => (
          <HoloCard key={i} className="animate-grow-in">
            <div className="mb-3 flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
              <span className="h-px flex-1 bg-border" />
              <BlackStar level={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5} />
            </div>
            <h3 className="font-display text-base text-foreground">{area.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {area.desc}
            </p>
          </HoloCard>
        ))}
      </div>
    </section>
  );
}

// Editable Section: Members
function MembersStrip() {
  return (
    <section className="mt-24">
      <SectionHeader
        eyebrow="Members"
        title="Verified network"
        subtitle="{members.length} verified members across {new Set(members.map(m => m.country)).size} countries"
      />
      <GlassPanel className="mt-10 p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-[oklch(0.18_0.05_252_/_0.5)] text-[11px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Organization</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Trust Level</th>
              </tr>
            </thead>
            <tbody>
              {members.slice(0, 5).map((member) => (
                <tr key={member.id} className="border-b border-border/60 transition hover:bg-white/[0.03]">
                  <td className="px-4 py-3 font-mono text-xs text-holo">{member.id}</td>
                  <td className="px-4 py-3">{member.org}</td>
                  <td className="px-4 py-3 text-muted-foreground">{member.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{member.country}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2 text-xs">
                      <StatusDot status={member.status === "Active" ? "active" : "advisory"} />
                      {member.trust}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <span>Showing 5 of {members.length} entries</span>
          <Link to="/members" className="text-holo hover:underline">View All Members →</Link>
        </div>
      </GlassPanel>
    </section>
  );
}

// Editable Section: Data Cards
function DataCards() {
  return (
    <section className="mt-24">
      <SectionHeader
        eyebrow="Finance Constellation"
        title="Resources as a network of stars"
        subtitle="Verified funding streams and transparent capital allocation"
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {finance.map((item, i) => (
          <HoloCard key={i}>
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{item.star}</div>
                <h3 className="mt-1 font-display text-lg text-foreground">{item.star}</h3>
              </div>
              <div className="text-gold text-2xl">★</div>
            </div>
            <div className="mt-4 font-display text-3xl text-holo">{item.value}</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.trust.map((tag, j) => (
                <span key={j} className="rounded-full border border-[var(--gold)]/30 bg-[oklch(0.82_0.14_85_/_0.06)] px-2 py-0.5 text-[10px] text-gold">
                  {tag}
                </span>
              ))}
            </div>
          </HoloCard>
        ))}
      </div>
    </section>
  );
}

// Editable Section: Timeline - Live Ticker Style
function TimelinePreview() {
  // Duplicate milestones for seamless infinite scroll
  const tickerItems = useMemo(() => {
    const copies = 6;
    return Array(copies).fill(milestones).flat();
  }, []);

  return (
    <section className="mt-24">
      <SectionHeader
        eyebrow="Timeline"
        title="A long horizon, mapped"
        subtitle="Strategic milestones from founding to 2030 vision"
      />
      <GlassPanel className="mt-10 overflow-hidden">
        {/* Live Ticker Timeline */}
        <div className="timeline-ticker relative py-6">
          {/* Background gradient line */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[var(--holo)]/50 to-transparent" />

          {/* Scrolling container */}
          <div className="timeline-track flex items-center">
            {tickerItems.map((milestone: typeof milestones[0], i: number) => (
              <div
                key={`${milestone.year}-${i}`}
                className="timeline-milestone flex flex-shrink-0 items-center"
              >
                {/* Milestone card */}
                <div className="flex flex-col items-center px-6">
                  <div className="text-xs font-mono text-muted-foreground mb-2">
                    {milestone.year}
                  </div>
                  <div className="h-3 w-3 rounded-full bg-[var(--holo)] shadow-[0_0_12px_oklch(0.78_0.16_230_/_0.8)] timeline-pulse-dot" />
                  <div className="mt-2 text-[11px] leading-snug text-foreground/80 text-center max-w-[120px]">
                    {milestone.label}
                  </div>
                </div>

                {/* Connector line to next item */}
                <div className="h-px w-8 bg-gradient-to-r from-[var(--holo)]/30 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-center border-t border-border/50 pt-4">
          <Link to="/timeline" className="inline-flex items-center gap-2 text-xs text-holo hover:underline">
            View Full Timeline <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </GlassPanel>

      <style>{`
        .timeline-ticker {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .timeline-track {
          animation: timeline-scroll 40s linear infinite;
          width: fit-content;
        }

        .timeline-track:hover {
          animation-play-state: paused;
        }

        @keyframes timeline-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .timeline-pulse-dot {
          animation: dot-pulse 2s ease-in-out infinite;
        }

        @keyframes dot-pulse {
          0%, 100% {
            box-shadow: 0 0 8px oklch(0.78 0.16 230 / 0.6);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 16px oklch(0.78 0.16 230 / 1);
            transform: scale(1.1);
          }
        }

        .timeline-milestone {
          transition: opacity 0.3s ease;
        }

        .timeline-track:hover .timeline-milestone {
          opacity: 0.7;
        }

        .timeline-track:hover .timeline-milestone:hover {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}

// Editable Section: Zones
function AccessZones() {
  return (
    <section className="mt-24">
      <SectionHeader
        eyebrow="Open in the Gray"
        title="Transparency through controlled visibility"
        subtitle="Three access tiers for different levels of partnership"
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <HoloCard>
          <Globe2 className="h-6 w-6 text-[var(--holo)]" />
          <h3 className="mt-3 font-display text-lg">Public Zone</h3>
          <p className="mt-2 text-xs text-muted-foreground">Open access to governance frameworks, published research, and public transparency reports. Available to all visitors.</p>
        </HoloCard>
        <GlassPanel gray>
          <div className="h-6 w-6 rounded border border-[var(--gray-zone)]" />
          <h3 className="mt-3 font-display text-lg">Gray Zone</h3>
          <p className="mt-2 text-xs text-muted-foreground">Restricted access for verified members and partners. Includes active projects, contracts, and partnership opportunities.</p>
          <button className="mt-4 rounded-md border border-border bg-white/5 px-3 py-1.5 text-xs">Apply for Access</button>
        </GlassPanel>
        <HoloCard>
          <div className="h-6 w-6 rounded border border-[var(--gold)]/40" />
          <h3 className="mt-3 font-display text-lg">Gold Zone</h3>
          <p className="mt-2 text-xs text-muted-foreground">Executive access for strategic partners and institutional members. Full governance visibility and decision-making participation.</p>
        </HoloCard>
      </div>
    </section>
  );
}

// Editable Section: Governance Keys
function GovernanceStream() {
  const governanceKeys = [
    { k: "TX", v: "Transcendence", cat: "layers" as const },
    { k: "GOV", v: "Government", cat: "layers" as const },
    { k: "FI", v: "Financial", cat: "layers" as const },
    { k: "SWF", v: "Sovereign Wealth", cat: "layers" as const },
  ];

  const identifiers = [
    { k: "LEI", v: "894500GBJSIW8L6ET310", cat: "identifiers" as const },
    { k: "UNGM", v: "1172700", cat: "identifiers" as const },
    { k: "EU-Ref", v: "APP-247579", cat: "identifiers" as const },
    { k: "VAT", v: "DE441892129", cat: "identifiers" as const },
  ];

  return (
    <section className="relative mt-16 overflow-hidden rounded-xl border border-[var(--holo)]/20 bg-[oklch(0.15_0.05_252_/_0.6)]">
      <div className="absolute inset-0 pointer-events-none">
        <HNOSSKeyStream keyCount={20} className="h-[150px] w-full" />
      </div>
      <div className="relative z-10 flex items-center justify-between border-b border-[var(--holo)]/20 bg-[oklch(0.12_0.04_252_/_0.8)] px-4 py-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-[var(--holo)]" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-holo">
            HNOSS Governance Keys
          </span>
        </div>
        <div className="flex items-center gap-2">
          {governanceKeys.slice(0, 3).map((key) => (
            <HNOSSBadge key={key.k} keyName={key.k} category={key.cat} size="sm" />
          ))}
        </div>
      </div>
      <div className="relative z-10 grid grid-cols-2 gap-px border-t border-[var(--holo)]/10 bg-border md:grid-cols-4">
        {identifiers.map((item) => (
          <div key={item.k} className="flex items-center justify-between bg-[oklch(0.12_0.04_252_/_0.9)] px-3 py-2">
            <span className="text-[10px] font-mono uppercase text-muted-foreground">{item.k}</span>
            <HNOSSBadge keyName={item.v} category={item.cat} size="sm" />
          </div>
        ))}
      </div>
    </section>
  );
}

// Live News Ticker with real-time feed
function LiveNewsTicker() {
  const newsItems = useMemo(() => [
    { type: "LIVE", time: "22:31 UTC", text: "Infrastructure Development Program — Phase II approved" },
    { type: "TREATY", time: "21:52 UTC", text: "Cross-Border Cooperation Framework updated" },
    { type: "PARTNER", time: "20:11 UTC", text: "New institutional partner added — Northern Energy Corridor" },
    { type: "RESEARCH", time: "18:04 UTC", text: "Digital Sovereignty white paper published" },
    { type: "ALERT", time: "16:40 UTC", text: "Open call: Strategic Investment Framework 2027" },
    { type: "MILESTONE", time: "14:12 UTC", text: "1,200+ verified members across 34 countries" },
  ], []);

  // Duplicate for seamless loop
  const tickerItems = useMemo(() => {
    const copies = 8;
    return Array(copies).fill(newsItems).flat();
  }, [newsItems]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "LIVE": return "text-red-400";
      case "TREATY": return "text-amber-400";
      case "PARTNER": return "text-emerald-400";
      case "RESEARCH": return "text-cyan-400";
      case "ALERT": return "text-rose-400";
      case "MILESTONE": return "text-violet-400";
      default: return "text-holo";
    }
  };

  return (
    <div className="news-ticker mt-8 overflow-hidden border-y border-border/50 bg-[oklch(0.1_0.05_252_/_0.8)] py-3">
      <div className="news-track flex items-center">
        {tickerItems.map((item: typeof newsItems[0], i: number) => (
          <div key={`${item.type}-${i}`} className="news-item flex flex-shrink-0 items-center px-6">
            <span className={`text-xs font-bold tracking-wider ${getTypeColor(item.type)}`}>
              {item.type}
            </span>
            <span className="mx-2 text-[10px] font-mono text-muted-foreground/60">
              {item.time}
            </span>
            <span className="text-xs text-foreground/80">
              {item.text}
            </span>
            <span className="mx-4 text-[var(--holo)]/40">◆</span>
          </div>
        ))}
      </div>

      <style>{`
        .news-ticker {
          mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
        }

        .news-track {
          animation: news-scroll 50s linear infinite;
          width: fit-content;
        }

        .news-track:hover {
          animation-play-state: paused;
        }

        @keyframes news-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .news-item {
          transition: opacity 0.2s ease;
        }

        .news-track:hover .news-item {
          opacity: 0.6;
        }

        .news-track:hover .news-item:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

// Category Tags Ticker
function CategoryTicker() {
  const categories = useMemo(() => [
    "★ Open Contracts",
    "★ New Partnerships",
    "★ Corporate Applications",
    "★ New Members",
    "★ Research Opportunities",
    "★ Active Projects",
    "★ Treaty Frameworks",
  ], []);

  // Duplicate for seamless loop
  const tickerItems = useMemo(() => {
    const copies = 10;
    return Array(copies).fill(categories).flat();
  }, [categories]);

  return (
    <div className="category-ticker overflow-hidden">
      <div className="category-track flex items-center justify-center">
        {tickerItems.map((item: string, i: number) => (
          <span
            key={`${item}-${i}`}
            className="category-item flex-shrink-0 px-4 text-[11px] font-medium text-gold/80 tracking-wide"
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        .category-ticker {
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }

        .category-track {
          animation: category-scroll 35s linear infinite;
          width: fit-content;
        }

        .category-track:hover {
          animation-play-state: paused;
        }

        @keyframes category-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .category-item {
          transition: all 0.2s ease;
        }

        .category-item:hover {
          color: var(--gold);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

function Index() {
  return (
    <Shell>
      <Welcome />
      <CompanyInfo />
      <GovernanceStream />
      <CoreAreas />
      <MembersStrip />
      <DataCards />
      <TimelinePreview />
      <AccessZones />
      {/* Live News Ticker */}
      <LiveNewsTicker />

      {/* Category Tags Ticker */}
      <div className="border-t border-border/50 bg-[oklch(0.12_0.04_252_/_0.6)] py-2">
        <CategoryTicker />
      </div>
    </Shell>
  );
}
