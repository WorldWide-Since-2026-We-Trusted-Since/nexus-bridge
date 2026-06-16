import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Shell } from "@/components/holo/Shell";
import { GlassPanel, CrownSeal, TrustBadge } from "@/components/holo/primitives";
import { AlertCircle, ShieldCheck, KeyRound } from "lucide-react";
import { authAPI } from "@/lib/api";

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

interface FormData {
  invitationCode: string;
  email: string;
  password: string;
  fullName: string;
  organization: string;
  position: string;
  country: string;
  mfaEnabled: boolean;
  passkeyEnabled: boolean;
}

function Page() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    invitationCode: "",
    email: "",
    password: "",
    fullName: "",
    organization: "",
    position: "",
    country: "",
    mfaEnabled: false,
    passkeyEnabled: false,
  });

  async function handleSubmit() {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await authAPI.register({
        invitationCode: formData.invitationCode,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        organization: formData.organization,
        position: formData.position,
        country: formData.country,
        mfaEnabled: formData.mfaEnabled,
        passkeyEnabled: formData.passkeyEnabled,
      });

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/member/dashboard";
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  }

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

          {success ? (
            <div className="mt-8 space-y-3 text-center">
              <div className="flex items-center justify-center gap-2 text-[var(--status-active)]">
                <ShieldCheck className="h-5 w-5" />
                <span className="font-medium">Registration Successful</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Your account has been created. Redirecting to member portal...
              </p>
              <div className="flex justify-center gap-2 pt-4">
                <TrustBadge label="Identity Verified" level={100} />
                <TrustBadge label="Trust Layer Active" level={90} />
              </div>
            </div>
          ) : (
            <>
              <div className="mt-8 space-y-3">
                {step === 0 && (
                  <input
                    type="text"
                    value={formData.invitationCode}
                    onChange={(e) => setFormData({ ...formData, invitationCode: e.target.value })}
                    className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm font-mono uppercase outline-none focus:border-[var(--holo)]"
                    placeholder="Invitation code (e.g., HNOSS-VIP-2026)"
                    required
                  />
                )}
                {step === 1 && (
                  <>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-[var(--holo)]"
                      placeholder="Full name"
                      required
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-[var(--holo)]"
                      placeholder="Email"
                      required
                    />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-[var(--holo)]"
                      placeholder="Password (min. 12 characters)"
                      minLength={12}
                      required
                    />
                  </>
                )}
                {step === 2 && (
                  <>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-[var(--holo)]"
                      placeholder="Organization"
                    />
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-[var(--holo)]"
                      placeholder="Position / Role"
                    />
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-[var(--holo)]"
                      placeholder="Country"
                    />
                  </>
                )}
                {step === 3 && (
                  <div className="space-y-3 text-sm">
                    <p className="text-xs text-muted-foreground">Configure your security settings:</p>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.mfaEnabled}
                        onChange={(e) => setFormData({ ...formData, mfaEnabled: e.target.checked })}
                      />
                      <span>Enable MFA (TOTP) - Recommended</span>
                    </label>
                    <label className="flex items-center gap-2 opacity-50">
                      <input
                        type="checkbox"
                        checked={formData.passkeyEnabled}
                        onChange={(e) => setFormData({ ...formData, passkeyEnabled: e.target.checked })}
                        disabled
                      />
                      <span>Passkey / WebAuthn (Coming Phase 2)</span>
                    </label>
                  </div>
                )}
                {error && (
                  <div className="flex items-center gap-1.5 text-xs text-[var(--status-closed)]">
                    <AlertCircle className="h-3.5 w-3.5" /> {error}
                  </div>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="rounded-md border border-border px-3 py-1.5 text-xs disabled:opacity-40"
                  disabled={step === 0 || isSubmitting}
                >
                  Back
                </button>
                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={isSubmitting}
                    className="rounded-md border border-[var(--holo)]/50 bg-[oklch(0.78_0.16_230_/_0.12)] px-4 py-1.5 text-xs text-holo disabled:opacity-60"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-1.5 rounded-md border border-[var(--gold)]/50 bg-[oklch(0.82_0.14_85_/_0.1)] px-4 py-1.5 text-xs text-gold disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <KeyRound className="h-3.5 w-3.5 animate-spin" /> Processing...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                )}
              </div>
            </>
          )}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Already invited?{" "}
            <Link to="/auth/login" className="text-holo hover:underline">Sign in</Link>
          </p>
        </GlassPanel>
      </div>
    </Shell>
  );
}
