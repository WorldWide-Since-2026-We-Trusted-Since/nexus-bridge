import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/holo/Shell";
import { CrownSeal, TrustBadge } from "@/components/holo/primitives";
import { HNOSSBadge } from "@/components/holo/HNOSSKeyStream";
import { KeyRound, UserPlus, Shield } from "lucide-react";

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

function Index() {
  return (
    <Shell>
      <Welcome />
    </Shell>
  );
}
