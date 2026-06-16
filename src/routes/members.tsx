import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/holo/Shell";
import { GlassPanel, SectionHeader, BlackStar, StatusDot } from "@/components/holo/primitives";
import { members } from "@/data/mock";
import { Search } from "lucide-react";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Members Registry · EU-IE" },
      { name: "description", content: "Verified members across categories and countries." },
      { property: "og:title", content: "Members · EU-IE" },
      { property: "og:description", content: "Searchable members registry." },
    ],
  }),
  component: Page,
});

function Page() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => members.filter((m) => (m.org + m.country + m.category + m.id).toLowerCase().includes(q.toLowerCase())),
    [q],
  );
  return (
    <Shell>
      <h1 className="font-display text-4xl text-holo">Members Registry</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Search verified members. Full administrative view available inside the secure portal.
      </p>

      <SectionHeader eyebrow="Public Registry" title="Verified members" />
      <GlassPanel className="mt-8 p-0">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by organization, country, category..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <span className="font-mono text-xs text-muted-foreground">{filtered.length} results</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-[oklch(0.18_0.05_252_/_0.5)] text-[11px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Member ID</th>
                <th className="px-4 py-3">Organization</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Trust</th>
                <th className="px-4 py-3">Black Star</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-border/60 hover:bg-white/[0.03]">
                  <td className="px-4 py-3 font-mono text-xs text-holo">{m.id}</td>
                  <td className="px-4 py-3">{m.org}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.country}</td>
                  <td className="px-4 py-3 font-mono text-xs">{m.joined}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full bg-[var(--holo)]" style={{ width: `${m.trust}%` }} />
                      </div>
                      <span className="font-mono text-xs text-holo">{m.trust}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><BlackStar level={m.star as 1 | 2 | 3 | 4 | 5} /></td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2 text-xs">
                      <StatusDot status={m.status === "Active" ? "active" : "advisory"} />
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </Shell>
  );
}
