import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/holo/Shell";
import { HoloCard, SectionHeader, GlassPanel } from "@/components/holo/primitives";
import { sponsors, finance } from "@/data/mock";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsors & Finance · EU-IE" },
      { name: "description", content: "Sponsorship wall, funding programs and finance constellation." },
      { property: "og:title", content: "Sponsors · EU-IE" },
      { property: "og:description", content: "Supporters and financial transparency." },
    ],
  }),
  component: Page,
});

const tierColor: Record<string, string> = {
  Platinum: "border-white/40 text-white",
  Gold: "border-[var(--gold)]/60 text-gold",
  Silver: "border-zinc-300/40 text-zinc-200",
  Strategic: "border-[var(--holo)]/50 text-holo",
  Innovation: "border-[var(--holo)]/50 text-holo",
};

function Page() {
  return (
    <Shell>
      <h1 className="font-display text-4xl text-holo">Sponsors & Finance</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Supporters of the initiative and a transparent view of resources at work.
      </p>

      <SectionHeader eyebrow="Sponsor Wall" title="Tiers & supporters" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sponsors.map((s) => (
          <HoloCard key={s.name}>
            <div className={`inline-flex items-center gap-2 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest ${tierColor[s.tier] ?? "border-border"}`}>
              {s.tier}
            </div>
            <h3 className="mt-3 font-display text-base">{s.name}</h3>
            <div className="mt-2 text-xs text-muted-foreground">Supporting since {s.since}</div>
          </HoloCard>
        ))}
      </div>

      <SectionHeader eyebrow="Finance Constellation" title="Resource overview" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {finance.map((f) => (
          <GlassPanel key={f.star} className="p-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{f.star}</div>
            <div className="mt-2 font-display text-3xl text-holo">{f.value}</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {f.trust.map((t) => (
                <span key={t} className="rounded-full border border-[var(--gold)]/30 px-2 py-0.5 text-[10px] text-gold">⭐ {t}</span>
              ))}
            </div>
          </GlassPanel>
        ))}
      </div>
    </Shell>
  );
}
