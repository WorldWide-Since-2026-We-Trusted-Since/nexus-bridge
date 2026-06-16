import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/holo/Shell";
import { GlassPanel, CrownSeal, TrustBadge } from "@/components/holo/primitives";
import { Fingerprint, KeyRound, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Sign In · EU-IE Member Portal" },
      { name: "description", content: "Slow magic sign-in to the EU-IE Member Portal." },
      { property: "og:title", content: "Sign In · EU-IE" },
      { property: "og:description", content: "Secure access to the member portal." },
    ],
  }),
  component: Page,
});

function Page() {
  const [phase, setPhase] = useState<"arrival" | "verifying" | "ready">("arrival");
  function handle(e: React.FormEvent) {
    e.preventDefault();
    setPhase("verifying");
    setTimeout(() => setPhase("ready"), 1800);
  }
  return (
    <Shell>
      <div className="mx-auto mt-6 max-w-md">
        <GlassPanel className="p-8">
          <CrownSeal className="mb-4" />
          <h1 className="text-center font-display text-2xl text-holo">Member Sign-In</h1>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Slow Magic Identity Gateway — invitation-only access.
          </p>

          {phase === "ready" ? (
            <div className="mt-6 space-y-2 text-center text-sm">
              <div className="text-[var(--status-active)]">✓ Identity Verified</div>
              <div className="text-[var(--status-active)]">✓ Trust Layer Active</div>
              <div className="text-[var(--status-active)]">✓ Secure Session Established</div>
              <p className="mt-4 text-xs text-muted-foreground">
                Member portal will open in Phase 2. (Auth wiring coming next.)
              </p>
            </div>
          ) : (
            <form onSubmit={handle} className="mt-6 space-y-3">
              <input className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-[var(--holo)]" placeholder="Email or Member ID" required />
              <input type="password" className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-[var(--holo)]" placeholder="Passphrase" required />
              <button
                type="submit"
                disabled={phase === "verifying"}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-[var(--holo)]/50 bg-[oklch(0.78_0.16_230_/_0.12)] px-4 py-2.5 text-sm font-medium text-holo shadow-[0_0_18px_oklch(0.78_0.16_230_/_0.35)] disabled:opacity-60"
              >
                <KeyRound className="h-4 w-4" />
                {phase === "verifying" ? "Verifying identity..." : "Enter Portal"}
              </button>
              <button type="button" className="flex w-full items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-xs text-muted-foreground">
                <Fingerprint className="h-4 w-4" /> Sign in with Passkey
              </button>
            </form>
          )}

          <div className="mt-6 flex justify-center gap-2">
            <TrustBadge label="Zero-Trust" level={98} />
            <TrustBadge label="MFA" level={100} />
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            New here?{" "}
            <Link to="/auth/register" className="text-holo hover:underline">
              Request an invitation
            </Link>
          </p>
        </GlassPanel>
        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          <ShieldCheck className="mr-1 inline h-3 w-3" />
          GDPR · eIDAS · ISO 27001 · NIS2
        </p>
      </div>
    </Shell>
  );
}
