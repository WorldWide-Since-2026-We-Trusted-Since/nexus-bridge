import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Shell } from "@/components/holo/Shell";
import { GlassPanel, CrownSeal, TrustBadge } from "@/components/holo/primitives";
import { Fingerprint, KeyRound, ShieldCheck, AlertCircle } from "lucide-react";
import { authAPI } from "@/lib/api";

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
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"arrival" | "verifying" | "ready" | "mfa" | "error">("arrival");
  const [error, setError] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [mfaCode, setMfaCode] = useState("");

  // Check if already logged in
  useEffect(() => {
    if (authAPI.isAuthenticated()) {
      setPhase("ready");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPhase("verifying");
    setError("");

    try {
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password,
      });

      if (response.requiresMFA) {
        setTempToken(response.tempToken);
        setPhase("mfa");
        return;
      }

      if (response.success) {
        setPhase("ready");
        // Redirect after brief delay
        setTimeout(() => {
          window.location.href = "/member/dashboard";
        }, 1500);
      }
    } catch (err: any) {
      setPhase("error");
      setError(err.message || "Authentication failed");
    }
  }

  async function handleMFASubmit(e: React.FormEvent) {
    e.preventDefault();
    setPhase("verifying");
    setError("");

    try {
      const response = await authAPI.verifyMFA({
        tempToken,
        code: mfaCode,
      });

      if (response.success) {
        setPhase("ready");
        setTimeout(() => {
          window.location.href = "/member/dashboard";
        }, 1500);
      }
    } catch (err: any) {
      setPhase("error");
      setError(err.message || "MFA verification failed");
    }
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
              <div className="flex items-center justify-center gap-2 text-[var(--status-active)]">
                <ShieldCheck className="h-4 w-4" /> Identity Verified
              </div>
              <div className="text-[var(--status-active)]">✓ Trust Layer Active</div>
              <div className="text-[var(--status-active)]">✓ Secure Session Established</div>
              <p className="mt-4 text-xs text-muted-foreground">
                Redirecting to member portal...
              </p>
            </div>
          ) : phase === "mfa" ? (
            <form onSubmit={handleMFASubmit} className="mt-6 space-y-3">
              <p className="text-center text-xs text-muted-foreground">
                Two-factor authentication required
              </p>
              <input
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-center text-lg font-mono tracking-widest outline-none focus:border-[var(--holo)]"
                placeholder="000000"
                maxLength={6}
                required
              />
              {error && (
                <div className="flex items-center gap-1.5 text-xs text-[var(--status-closed)]">
                  <AlertCircle className="h-3.5 w-3.5" /> {error}
                </div>
              )}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-[var(--holo)]/50 bg-[oklch(0.78_0.16_230_/_0.12)] px-4 py-2.5 text-sm font-medium text-holo shadow-[0_0_18px_oklch(0.78_0.16_230_/_0.35)]"
              >
                <KeyRound className="h-4 w-4" />
                Verify Code
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-[var(--holo)]"
                placeholder="Email or Member ID"
                required
              />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full rounded-md border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-[var(--holo)]"
                placeholder="Passphrase (min. 12 chars)"
                minLength={12}
                required
              />
              {error && (
                <div className="flex items-center gap-1.5 text-xs text-[var(--status-closed)]">
                  <AlertCircle className="h-3.5 w-3.5" /> {error}
                </div>
              )}
              <button
                type="submit"
                disabled={phase === "verifying"}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-[var(--holo)]/50 bg-[oklch(0.78_0.16_230_/_0.12)] px-4 py-2.5 text-sm font-medium text-holo shadow-[0_0_18px_oklch(0.78_0.16_230_/_0.35)] disabled:opacity-60"
              >
                <KeyRound className="h-4 w-4" />
                {phase === "verifying" ? "Verifying identity..." : "Enter Portal"}
              </button>
              <button
                type="button"
                onClick={() => alert("Passkey authentication coming in Phase 2")}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-xs text-muted-foreground hover:border-[var(--holo)]/30"
              >
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
