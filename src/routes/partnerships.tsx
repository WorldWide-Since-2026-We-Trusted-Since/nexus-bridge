import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/holo/Shell";
import { HoloCard, SectionHeader, GlassPanel } from "@/components/holo/primitives";

export const Route = createFileRoute("/partnerships")({
  head: () => ({
    meta: [
      { title: "Partnerships · EU-IE" },
      { name: "description", content: "Government, research, industry and infrastructure partners." },
      { property: "og:title", content: "Partnerships · EU-IE" },
      { property: "og:description", content: "Strategic partner network." },
    ],
  }),
  component: Page,
});

const tiers = [
  { tier: "Government Bodies", count: 22 },
  { tier: "Research Institutions", count: 38 },
  { tier: "Universities", count: 26 },
  { tier: "Foundations", count: 14 },
  { tier: "Industry Partners", count: 31 },
  { tier: "Infrastructure Organizations", count: 15 },
];

function Page() {
  return (
    <Shell>
      <h1 className="font-display text-4xl text-holo">Partnership Network</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        146+ institutional, research and corporate partners across the network.
      </p>

      <SectionHeader eyebrow="By category" title="Partner composition" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((t) => (
          <HoloCard key={t.tier}>
            <div className="flex items-end justify-between">
              <h3 className="font-display text-base">{t.tier}</h3>
              <div className="font-display text-3xl text-holo">{t.count}</div>
            </div>
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-[var(--holo)] shadow-[0_0_8px_oklch(0.78_0.16_230_/_0.7)]" style={{ width: `${Math.min(100, t.count * 2.5)}%` }} />
            </div>
          </HoloCard>
        ))}
      </div>

      <SectionHeader eyebrow="Become a partner" title="Open invitations" />
      <GlassPanel className="mt-8">
        <p className="text-sm text-muted-foreground">
          Government, industry, academia, finance and civil society organizations can apply for
          institutional, strategic or research partnerships through the Application Center.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="/opportunities" className="rounded-md border border-[var(--holo)]/50 bg-[oklch(0.78_0.16_230_/_0.1)] px-4 py-2 text-sm text-holo">View opportunities</a>
          <a href="/auth/register" className="rounded-md border border-[var(--gold)]/40 px-4 py-2 text-sm text-gold">Request invitation</a>
        </div>
      </GlassPanel>
    </Shell>
  );
}
