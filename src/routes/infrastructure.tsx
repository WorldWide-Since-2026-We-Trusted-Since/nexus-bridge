import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/holo/Shell";
import { HoloCard, SectionHeader, GlassPanel } from "@/components/holo/primitives";
import { Network, Zap, Train, Satellite, Cpu, Wind } from "lucide-react";

export const Route = createFileRoute("/infrastructure")({
  head: () => ({
    meta: [
      { title: "Infrastructure · EU-IE" },
      { name: "description", content: "Transport, energy, digital and research infrastructure corridors." },
      { property: "og:title", content: "Infrastructure · EU-IE" },
      { property: "og:description", content: "Corridors, networks and programs across the initiative." },
    ],
  }),
  component: Page,
});

const sectors = [
  { icon: Train, name: "Transport Corridors", desc: "High-speed rail and multimodal logistics corridors." },
  { icon: Zap, name: "Energy Networks", desc: "Cross-border energy interconnection and storage." },
  { icon: Network, name: "Digital Infrastructure", desc: "Trusted cloud and sovereign data exchange." },
  { icon: Satellite, name: "Satellite & Comms", desc: "Resilient communications and observation layers." },
  { icon: Cpu, name: "Compute & AI", desc: "Public-interest compute capacity and AI systems." },
  { icon: Wind, name: "Sustainable Power", desc: "Wind, solar and renewable backbones." },
];

function Page() {
  return (
    <Shell>
      <h1 className="font-display text-4xl text-holo">Infrastructure Hub</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Programs and corridors operated jointly with institutional partners.
      </p>

      <section className="mt-12">
        <SectionHeader eyebrow="Sectors" title="Six operational domains" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s) => (
            <HoloCard key={s.name}>
              <s.icon className="h-6 w-6 text-[var(--holo)]" />
              <h3 className="mt-3 font-display text-lg">{s.name}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{s.desc}</p>
            </HoloCard>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeader eyebrow="Geolocation Geometry" title="Network preview" subtitle="Static preview — interactive globe in a future release." />
        <GlassPanel className="mt-8 p-8">
          <svg viewBox="0 0 800 280" className="h-72 w-full">
            <defs>
              <linearGradient id="line" x1="0" x2="1">
                <stop offset="0" stopColor="oklch(0.78 0.16 230)" stopOpacity="0" />
                <stop offset="0.5" stopColor="oklch(0.78 0.16 230)" stopOpacity="0.9" />
                <stop offset="1" stopColor="oklch(0.82 0.14 85)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {Array.from({ length: 20 }).map((_, i) => {
              const x1 = Math.random() * 800;
              const y1 = Math.random() * 280;
              const x2 = Math.random() * 800;
              const y2 = Math.random() * 280;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#line)" strokeWidth="1" />;
            })}
            {Array.from({ length: 40 }).map((_, i) => (
              <circle key={i} cx={Math.random() * 800} cy={Math.random() * 280} r="2"
                fill="oklch(0.82 0.18 220)" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin={`${i * 0.1}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </svg>
        </GlassPanel>
      </section>
    </Shell>
  );
}
