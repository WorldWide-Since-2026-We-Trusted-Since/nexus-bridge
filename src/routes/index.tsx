import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/holo/Shell";
import {
  GlassPanel, HoloCard, BlackStar, TrustBadge, CrownSeal, SectionHeader, StatusDot,
} from "@/components/holo/primitives";
import { HNOSSKeyStream, HNOSSKeyTicker, HNOSSBadge } from "@/components/holo/HNOSSKeyStream";
import { KeyRound, UserPlus, Shield, ArrowRight, Globe2, Sparkles, Activity, Clock } from "lucide-react";

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
        subtitle="[Edit this subtitle in src/routes/index.tsx]"
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <HoloCard key={i} className="animate-grow-in">
            <div className="mb-3 flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground">0{i}</span>
              <span className="h-px flex-1 bg-border" />
              <BlackStar level={i as 1 | 2 | 3 | 4 | 5} />
            </div>
            <h3 className="font-display text-base text-foreground">[Area {i} Title]</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              [Edit this description in src/routes/index.tsx line ~200]
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
        subtitle="[Edit subtitle in src/routes/index.tsx]"
      />
      <GlassPanel className="mt-10 p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-[oklch(0.18_0.05_252_/_0.5)] text-[11px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">[Column 1]</th>
                <th className="px-4 py-3">[Column 2]</th>
                <th className="px-4 py-3">[Column 3]</th>
                <th className="px-4 py-3">[Column 4]</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i} className="border-b border-border/60 transition hover:bg-white/[0.03]">
                  <td className="px-4 py-3 font-mono text-xs text-holo">ID-{i}</td>
                  <td className="px-4 py-3">[Data {i}-1]</td>
                  <td className="px-4 py-3 text-muted-foreground">[Data {i}-2]</td>
                  <td className="px-4 py-3 text-muted-foreground">[Data {i}-3]</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2 text-xs">
                      <StatusDot status="active" />
                      [Status]
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <span>[Showing X of Y entries]</span>
          <Link to="/members" className="text-holo hover:underline">[View More] →</Link>
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
        subtitle="[Edit this in src/routes/index.tsx - Data cards section]"
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <HoloCard key={i}>
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Card {i}</div>
                <h3 className="mt-1 font-display text-lg text-foreground">[Card Title]</h3>
              </div>
              <div className="text-gold text-2xl">★</div>
            </div>
            <div className="mt-4 font-display text-3xl text-holo">[Value]</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="rounded-full border border-[var(--gold)]/30 bg-[oklch(0.82_0.14_85_/_0.06)] px-2 py-0.5 text-[10px] text-gold">
                [Tag]
              </span>
            </div>
          </HoloCard>
        ))}
      </div>
    </section>
  );
}

// Editable Section: Timeline
function TimelinePreview() {
  return (
    <section className="mt-24">
      <SectionHeader
        eyebrow="Timeline"
        title="A long horizon, mapped"
        subtitle="[Edit subtitle in src/routes/index.tsx]"
      />
      <GlassPanel className="mt-10">
        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[var(--holo)] to-transparent" />
          <div className="relative grid grid-cols-4 gap-2">
            {[2024, 2025, 2026, 2027].map((year, i) => (
              <div key={year} className="text-center">
                <div className="mx-auto mb-3 text-xs font-mono text-muted-foreground">{year}</div>
                <div className="mx-auto h-3 w-3 rounded-full bg-[var(--holo)] shadow-[0_0_12px_oklch(0.78_0.16_230_/_0.8)]" />
                <div className="mt-3 text-[11px] leading-snug text-foreground/80">[Milestone {i+1}]</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <Link to="/timeline" className="inline-flex items-center gap-2 text-xs text-holo hover:underline">
            [View Full Timeline] <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </GlassPanel>
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
        subtitle="[Edit subtitle in src/routes/index.tsx]"
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <HoloCard>
          <Globe2 className="h-6 w-6 text-[var(--holo)]" />
          <h3 className="mt-3 font-display text-lg">[Zone 1 Title]</h3>
          <p className="mt-2 text-xs text-muted-foreground">[Zone 1 description - editable in src/routes/index.tsx]</p>
        </HoloCard>
        <GlassPanel gray>
          <div className="h-6 w-6 rounded border border-[var(--gray-zone)]" />
          <h3 className="mt-3 font-display text-lg">[Zone 2 Title]</h3>
          <p className="mt-2 text-xs text-muted-foreground">[Zone 2 description - editable in src/routes/index.tsx]</p>
          <button className="mt-4 rounded-md border border-border bg-white/5 px-3 py-1.5 text-xs">[Action Button]</button>
        </GlassPanel>
        <HoloCard>
          <div className="h-6 w-6 rounded border border-[var(--gold)]/40" />
          <h3 className="mt-3 font-display text-lg">[Zone 3 Title]</h3>
          <p className="mt-2 text-xs text-muted-foreground">[Zone 3 description - editable in src/routes/index.tsx]</p>
        </HoloCard>
      </div>
    </section>
  );
}

// Editable Section: Governance Keys
function GovernanceStream() {
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
          <HNOSSBadge keyName="[KEY1]" category="layers" size="sm" />
          <HNOSSBadge keyName="[KEY2]" category="layers" size="sm" />
          <HNOSSBadge keyName="[KEY3]" category="layers" size="sm" />
        </div>
      </div>
      <div className="relative z-10 grid grid-cols-2 gap-px border-t border-[var(--holo)]/10 bg-border md:grid-cols-4">
        {[
          { k: "[ID1]", v: "[VALUE1]", cat: "identifiers" as const },
          { k: "[ID2]", v: "[VALUE2]", cat: "alliances" as const },
          { k: "[ID3]", v: "[VALUE3]", cat: "regulatory" as const },
          { k: "[ID4]", v: "[VALUE4]", cat: "identifiers" as const },
        ].map((item) => (
          <div key={item.k} className="flex items-center justify-between bg-[oklch(0.12_0.04_252_/_0.9)] px-3 py-2">
            <span className="text-[10px] font-mono uppercase text-muted-foreground">{item.k}</span>
            <HNOSSBadge keyName={item.v} category={item.cat} size="sm" />
          </div>
        ))}
      </div>
    </section>
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
      <div className="mt-8 border-t border-border bg-card/30 py-2">
        <HNOSSKeyTicker speed={40} />
      </div>
    </Shell>
  );
}
