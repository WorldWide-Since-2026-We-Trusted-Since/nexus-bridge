import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/holo/Shell";
import { GlassPanel, SectionHeader, TrustBadge, CrownSeal } from "@/components/holo/primitives";
import { coreAreas } from "@/data/mock";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · HNOSS Reference Governance System" },
      { name: "description", content: "Strategic partner aligned with EU, NATO, UN, Pentagon — global reference governance for infrastructure and international cooperation." },
      { property: "og:title", content: "About HNOSS" },
      { property: "og:description", content: "Global governance system with strategic alignment to EU, NATO, UN, Pentagon frameworks." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Shell>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h1 className="font-display text-4xl text-holo">About EU-IE</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            EU-IE — Infrastructure Enforcement Initiative — is an independent
            organization focused on infrastructure development, innovation,
            institutional cooperation and policy research. We encourage dialogue,
            collaboration and knowledge exchange that contribute to sustainable
            growth, technological progress, digital sovereignty and resilient
            infrastructure systems.
          </p>
          <h2 className="mt-10 font-display text-2xl text-foreground">Mission</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            To promote infrastructure excellence, technological innovation,
            responsible governance and international cooperation in support of
            sustainable development and future-oriented societies.
          </p>
          <h2 className="mt-8 font-display text-2xl text-foreground">Vision</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A connected, innovative and resilient world built on trusted
            infrastructure, collaborative partnerships and shared prosperity.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            <TrustBadge label="Verified" level={96} />
            <TrustBadge label="Ethics Compliant" level={94} />
            <TrustBadge label="Governance Certified" level={92} />
            <TrustBadge label="Transparency" level={91} />
          </div>
        </div>
        <div>
          <GlassPanel>
            <CrownSeal className="mb-4" />
            <h3 className="text-center font-display text-lg text-gold">Global Alignment</h3>
            <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
              Strategic partner organization conceptually aligned with <b>EU
              (Transparency Register APP-247579), NATO (STANAG frameworks), UN
              (UNGM Node 1172700), Pentagon</b> and OECD governance structures.
              Operating under civil law as global reference governance system.
            </p>
          </GlassPanel>
        </div>
      </div>

      <section className="mt-20">
        <SectionHeader eyebrow="Core Areas" title="Where we operate" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {coreAreas.map((c) => (
            <GlassPanel key={c.title} className="p-5">
              <h3 className="font-display text-sm">{c.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{c.desc}</p>
            </GlassPanel>
          ))}
        </div>
      </section>
    </Shell>
  );
}
