import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/holo/Shell";
import { GlassPanel, SectionHeader, HoloCard } from "@/components/holo/primitives";
import { milestones } from "@/data/mock";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Timeline · EU-IE" },
      { name: "description", content: "Strategic milestones from founding to long-horizon vision." },
      { property: "og:title", content: "Timeline · EU-IE" },
      { property: "og:description", content: "Milestones and roadmap." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <Shell>
      <h1 className="font-display text-4xl text-holo">Strategic Timeline</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Founding, programs, partnerships, infrastructure phases and long-horizon vision.
      </p>

      <SectionHeader eyebrow="Horizontal View" title="2023 → 2030" />
      <GlassPanel className="mt-8">
        <div className="relative py-6">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[var(--holo)] to-transparent" />
          <div className="relative grid grid-cols-7 gap-2">
            {milestones.map((m) => (
              <div key={m.year} className="text-center">
                <div className="text-xs font-mono text-muted-foreground">{m.year}</div>
                <div className="mx-auto my-3 h-3 w-3 rounded-full bg-[var(--holo)] shadow-[0_0_12px_oklch(0.78_0.16_230_/_0.8)]" />
                <div className="text-[11px] leading-snug text-foreground/80">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>

      <SectionHeader eyebrow="Constellation" title="Financial milestones as stars" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {milestones.map((m) => (
          <HoloCard key={m.year}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">{m.year}</span>
              <span className="animate-twinkle text-gold text-xl">★</span>
            </div>
            <h3 className="mt-2 font-display text-sm">{m.label}</h3>
            <div className="mt-2 text-[11px] uppercase tracking-widest text-muted-foreground">{m.kind}</div>
          </HoloCard>
        ))}
      </div>

      <SectionHeader eyebrow="Gray Timeline" title="Planned and scheduled" subtitle="Future content is previewed without revealing all details." />
      <GlassPanel gray className="mt-8">
        <ul className="space-y-3 text-sm">
          <li>2026 ✓ Published — Phase II Programs</li>
          <li>2027 ◻ Scheduled — Strategic Investment Framework</li>
          <li>2028 ◻ Planned — Infrastructure Resilience Pact</li>
          <li>2030 ◻ Strategic Vision — Long-horizon Treaty Network</li>
        </ul>
      </GlassPanel>
    </Shell>
  );
}
