import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/holo/Shell";
import { GlassPanel, CrownSeal } from "@/components/holo/primitives";

export const Route = createFileRoute("/auth/register")({
  head: () => ({
    meta: [
      { title: "Request Invitation · EU-IE" },
      { name: "description", content: "Invitation-only onboarding — request access to the EU-IE Member Portal." },
      { property: "og:title", content: "Request Invitation · EU-IE" },
      { property: "og:description", content: "Invitation-only onboarding." },
    ],
  }),
  component: Page,
});

const steps = ["Invitation", "Identity", "Organization", "Security"];

function Page() {
  const [step, setStep] = useState(0);
  return (
    <Shell>
      <div className="mx-auto mt-6 max-w-2xl">
        <GlassPanel className="p-8">
          <CrownSeal className="mb-4" />
          <h1 className="text-center font-display text-2xl text-holo">Request Invitation</h1>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Premium onboarding · four steps · invitation-only access
          </p>

          <ol className="mt-8 grid grid-cols-4 gap-2">
            {steps.map((s, i) => (
              <li key={s} className="text-center">
                <div className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full border font-mono text-xs ${i <= step ? "border-[var(--holo)] bg-[oklch(0.78_0.16_230_/_0.15)] text-holo shadow-[0_0_12px_oklch(0.78_0.16_230_/_0.4)]" : "border-border text-muted-foreground"}`}>
                  {i + 1}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">{s}</div>
              </li>
            ))}
          </ol>

          <div className="mt-8 space-y-3">
            {step === 0 && (
              <input className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-[var(--holo)]" placeholder="Invitation code" />
            )}
            {step === 1 && (
              <>
                <input className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none" placeholder="Full name" />
                <input className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none" placeholder="Email" />
              </>
            )}
            {step === 2 && (
              <>
                <input className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none" placeholder="Organization" />
                <input className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none" placeholder="Position / Role" />
                <input className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none" placeholder="Country" />
              </>
            )}
            {step === 3 && (
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Email verification</label>
                <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> MFA (TOTP)</label>
                <label className="flex items-center gap-2"><input type="checkbox" /> Passkey / WebAuthn</label>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="rounded-md border border-border px-3 py-1.5 text-xs disabled:opacity-40"
              disabled={step === 0}
            >
              Back
            </button>
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="rounded-md border border-[var(--holo)]/50 bg-[oklch(0.78_0.16_230_/_0.12)] px-4 py-1.5 text-xs text-holo"
              >
                Continue
              </button>
            ) : (
              <button className="rounded-md border border-[var(--gold)]/50 bg-[oklch(0.82_0.14_85_/_0.1)] px-4 py-1.5 text-xs text-gold">
                Submit request
              </button>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Already invited?{" "}
            <Link to="/auth/login" className="text-holo hover:underline">Sign in</Link>
          </p>
        </GlassPanel>
      </div>
    </Shell>
  );
}
