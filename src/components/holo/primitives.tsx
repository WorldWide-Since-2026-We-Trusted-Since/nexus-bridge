import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassPanel({
  children,
  className,
  gray = false,
}: {
  children: ReactNode;
  className?: string;
  gray?: boolean;
}) {
  return (
    <div className={cn(gray ? "glass-panel-gray" : "glass-panel", "p-6", className)}>
      {children}
    </div>
  );
}

export function HoloCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("holo-card p-6", className)}>{children}</div>;
}

export function BlackStar({ level = 1 }: { level?: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span
      className="inline-flex items-center gap-0.5 text-gold"
      title={`Black Star ${["I", "II", "III", "IV", "V"][level - 1]}`}
      aria-label={`Black Star level ${level}`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={cn(
            "h-3.5 w-3.5",
            i < level ? "fill-current drop-shadow-[0_0_4px_oklch(0.82_0.14_85_/_0.7)]" : "fill-current opacity-15",
          )}
        >
          <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7-6.3-3.8L5.7 21.2l1.7-7L2 9.5l7.1-.6z" />
        </svg>
      ))}
    </span>
  );
}

export function TrustBadge({
  label,
  level = 92,
}: {
  label: string;
  level?: number;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs backdrop-blur">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[var(--holo)] drop-shadow-[0_0_6px_oklch(0.78_0.16_230_/_0.7)]">
        <path d="M12 2l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5z" />
      </svg>
      <span className="text-foreground/90">{label}</span>
      <span className="text-muted-foreground">·</span>
      <span className="text-holo font-mono">{level}%</span>
    </div>
  );
}

export function CrownSeal({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto h-28 w-28", className)}>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_oklch(0.78_0.16_230_/_0.45),_transparent_70%)] animate-holo-pulse" />
      <div className="absolute inset-2 rounded-full border border-[oklch(0.82_0.14_85_/_0.5)] bg-gradient-to-br from-[oklch(0.18_0.05_252)] to-[oklch(0.10_0.03_250)] shadow-[inset_0_0_24px_oklch(0.78_0.16_230_/_0.4)]" />
      <svg viewBox="0 0 64 64" className="absolute inset-0 m-auto h-16 w-16 fill-[var(--gold)] drop-shadow-[0_0_8px_oklch(0.82_0.14_85_/_0.7)]">
        <path d="M8 26l10 8 14-18 14 18 10-8-4 22H12z" />
        <circle cx="18" cy="26" r="3" />
        <circle cx="32" cy="14" r="3" />
        <circle cx="46" cy="26" r="3" />
      </svg>
    </div>
  );
}

export function StatusDot({ status }: { status: "active" | "advisory" | "important" | "critical" }) {
  const color = {
    active: "bg-[var(--status-active)]",
    advisory: "bg-[var(--status-advisory)]",
    important: "bg-[var(--status-important)]",
    critical: "bg-[var(--status-critical)]",
  }[status];
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping", color)} />
      <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", color)} />
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center animate-grow-in">
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-holo">
          <span className="h-1 w-6 rounded-full bg-[var(--holo)]" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        <span className="text-holo">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
      )}
      <div className="gold-divider mx-auto mt-6 w-32" />
    </div>
  );
}
