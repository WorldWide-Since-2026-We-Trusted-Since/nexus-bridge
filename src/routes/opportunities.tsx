import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/holo/Shell";
import { GlassPanel, SectionHeader, HoloCard } from "@/components/holo/primitives";
import { opportunities } from "@/data/mock";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "Opportunities · EU-IE" },
      { name: "description", content: "Open contracts, partnerships, applications and research opportunities." },
      { property: "og:title", content: "Opportunities · EU-IE" },
      { property: "og:description", content: "Open calls and applications." },
    ],
  }),
  component: Page,
});

const kindColor: Record<string, string> = {
  Contract: "text-holo border-[var(--holo)]/40",
  Partnership: "text-gold border-[var(--gold)]/40",
  Application: "text-[var(--status-advisory)] border-[var(--status-advisory)]/40",
  Research: "text-[var(--status-active)] border-[var(--status-active)]/40",
};

function Page() {
  return (
    <Shell>
      <h1 className="font-display text-4xl text-holo">Opportunities</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Open contracts, partnerships, applications and research calls.
      </p>

      <SectionHeader eyebrow="Open Calls" title="Currently active" />
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {opportunities.map((o) => {
          const gray = o.status === "Gray Zone";
          return (
            <div key={o.title} className={gray ? "glass-panel-gray p-6" : "holo-card p-6"}>
              <div className="flex items-center justify-between">
                <span className={`rounded-full border bg-card/30 px-2 py-0.5 text-[10px] uppercase tracking-widest ${kindColor[o.kind] ?? "border-border text-muted-foreground"}`}>
                  {o.kind}
                </span>
                <span className="font-mono text-xs text-muted-foreground">Deadline {o.deadline}</span>
              </div>
              <h3 className="mt-3 font-display text-lg">{o.title}</h3>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className={gray ? "text-muted-foreground" : "text-[var(--status-active)]"}>● {o.status}</span>
                <button className="rounded-md border border-border bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10">
                  {gray ? "Request Access" : "Apply"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <SectionHeader eyebrow="Application Center" title="Multi-step intake" />
      <GlassPanel className="mt-8">
        <ol className="grid gap-4 md:grid-cols-4">
          {["Identity", "Organization", "Program", "Review"].map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--holo)]/50 bg-[oklch(0.78_0.16_230_/_0.1)] font-mono text-xs text-holo">{i + 1}</div>
              <div className="text-sm">{s}</div>
            </li>
          ))}
        </ol>
      </GlassPanel>
    </Shell>
  );
}
