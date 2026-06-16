import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/holo/Shell";
import { GlassPanel, SectionHeader, HoloCard } from "@/components/holo/primitives";
import { LifeBuoy, FileQuestion, MessageSquare, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support · EU-IE" },
      { name: "description", content: "Help center, tickets, knowledge base and technical support." },
      { property: "og:title", content: "Support · EU-IE" },
      { property: "og:description", content: "Help center and assistance." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <Shell>
      <h1 className="font-display text-4xl text-holo">Support Center</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Help center, ticketing and knowledge base — fully integrated into the headquarters.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { i: LifeBuoy, t: "Help Center", d: "Guides for members, partners and organizations." },
          { i: FileQuestion, t: "Knowledge Base", d: "FAQ, policy explanations, governance docs." },
          { i: MessageSquare, t: "Open a Ticket", d: "Submit a support request — tracked end-to-end." },
          { i: ShieldAlert, t: "Compliance Support", d: "GDPR, eIDAS, NIS2 and ethics inquiries." },
        ].map((x) => (
          <HoloCard key={x.t}>
            <x.i className="h-6 w-6 text-[var(--holo)]" />
            <h3 className="mt-3 font-display text-base">{x.t}</h3>
            <p className="mt-2 text-xs text-muted-foreground">{x.d}</p>
          </HoloCard>
        ))}
      </div>

      <SectionHeader eyebrow="Contact" title="Reach the operations team" />
      <GlassPanel className="mt-8">
        <form className="grid gap-4 md:grid-cols-2">
          <input className="rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-[var(--holo)]" placeholder="Your name" />
          <input className="rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-[var(--holo)]" placeholder="Email" />
          <input className="rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-[var(--holo)] md:col-span-2" placeholder="Subject" />
          <textarea rows={5} className="rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-[var(--holo)] md:col-span-2" placeholder="How can we help?" />
          <button type="button" className="md:col-span-2 rounded-md border border-[var(--holo)]/50 bg-[oklch(0.78_0.16_230_/_0.1)] px-4 py-2 text-sm text-holo">
            Submit ticket
          </button>
        </form>
      </GlassPanel>
    </Shell>
  );
}
