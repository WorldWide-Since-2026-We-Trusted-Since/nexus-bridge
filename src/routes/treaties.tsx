import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/holo/Shell";
import { HoloCard, SectionHeader, BlackStar, GlassPanel } from "@/components/holo/primitives";

export const Route = createFileRoute("/treaties")({
  head: () => ({
    meta: [
      { title: "Treaty Center · EU-IE" },
      { name: "description", content: "International treaties, memoranda and governance frameworks." },
      { property: "og:title", content: "Treaty Center · EU-IE" },
      { property: "og:description", content: "Treaties, frameworks and policies." },
    ],
  }),
  component: Page,
});

const treaties = [
  { id: "TR-2026-01", title: "Cross-Border Cooperation Framework", status: "Active", year: 2026, star: 5 },
  { id: "TR-2026-02", title: "Digital Sovereignty Charter", status: "Active", year: 2026, star: 4 },
  { id: "TR-2027-01", title: "Strategic Investment Framework", status: "Drafting", year: 2027, star: 3 },
  { id: "TR-2027-02", title: "Research Cooperation Memorandum", status: "Open", year: 2027, star: 3 },
  { id: "TR-2028-01", title: "Infrastructure Resilience Pact", status: "Planned", year: 2028, star: 4 },
];

function Page() {
  return (
    <Shell>
      <h1 className="font-display text-4xl text-holo">Treaty Center</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Frameworks, memoranda and governance documents that anchor cooperation.
      </p>

      <SectionHeader eyebrow="Frameworks" title="Active and forthcoming treaties" />
      <GlassPanel className="mt-8 p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-[oklch(0.18_0.05_252_/_0.5)] text-[11px] uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Treaty</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Significance</th>
            </tr>
          </thead>
          <tbody>
            {treaties.map((t) => (
              <tr key={t.id} className="border-b border-border/60 hover:bg-white/[0.03]">
                <td className="px-4 py-3 font-mono text-xs text-holo">{t.id}</td>
                <td className="px-4 py-3">{t.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{t.status}</td>
                <td className="px-4 py-3 font-mono text-xs">{t.year}</td>
                <td className="px-4 py-3"><BlackStar level={t.star as 1 | 2 | 3 | 4 | 5} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassPanel>

      <section className="mt-16 grid gap-4 md:grid-cols-3">
        {["Governance", "Compliance", "Transparency"].map((k) => (
          <HoloCard key={k}>
            <h3 className="font-display text-lg text-gold">{k}</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Principles applied to every framework, validated and published in the public registry.
            </p>
          </HoloCard>
        ))}
      </section>
    </Shell>
  );
}
