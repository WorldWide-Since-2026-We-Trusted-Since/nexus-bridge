import { Link, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";
import {
  Command, Info, Network, ScrollText, Handshake, Users, Star,
  Clock, Target, LifeBuoy, KeyRound, ShieldCheck, Crown, Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, newsItems, opportunityRibbon } from "@/data/mock";
import { StatusDot } from "./primitives";

const BOOKING_URL = "https://book.morgen.so/magicsacredtreatyveto611";
const TEAM_URL = "https://huly.app/login/join?inviteId=1184623558632636417";

const iconMap: Record<string, typeof Command> = {
  command: Command, info: Info, network: Network, scroll: ScrollText,
  handshake: Handshake, users: Users, star: Star, clock: Clock,
  target: Target, "life-buoy": LifeBuoy, key: KeyRound,
};

function SideNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="glass-panel flex flex-col gap-1 p-2">
        {nav.map((item) => {
          const Icon = iconMap[item.icon] ?? Command;
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-all",
                active
                  ? "bg-[oklch(0.78_0.16_230_/_0.12)] text-holo"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
              )}
            >
              <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card/40">
                <Icon className="h-4 w-4" />
                {active && (
                  <span className="absolute inset-0 rounded-md ring-1 ring-[var(--holo)] shadow-[0_0_12px_oklch(0.78_0.16_230_/_0.6)]" />
                )}
              </span>
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs opacity-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

function ExecutiveAlert() {
  return (
    <div className="border-b border-border bg-[oklch(0.18_0.05_252_/_0.6)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-1.5 text-xs">
        <StatusDot status="advisory" />
        <span className="font-mono uppercase tracking-widest text-[var(--status-advisory)]">Advisory</span>
        <span className="hidden text-[var(--holo)] sm:inline">
          Strategic Partner — aligned with EU · NATO · UN · Pentagon · OECD frameworks
        </span>
        <span className="ml-auto hidden font-mono text-muted-foreground sm:inline">
          {new Date().toUTCString().slice(5, 22)} UTC
        </span>
      </div>
    </div>
  );
}

function NewsLine() {
  const doubled = [...newsItems, ...newsItems];
  return (
    <div className="relative overflow-hidden border-b border-border bg-[oklch(0.10_0.03_250_/_0.7)] backdrop-blur">
      <div className="flex w-max animate-ticker gap-10 py-2 pl-4 text-xs">
        {doubled.map((n, i) => (
          <span key={i} className="flex items-center gap-3 whitespace-nowrap">
            <span className="rounded-sm border border-[var(--holo)]/40 bg-[oklch(0.78_0.16_230_/_0.1)] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-holo">
              {n.tag}
            </span>
            <span className="font-mono text-muted-foreground">{n.time}</span>
            <span className="text-foreground/85">{n.text}</span>
            <span className="text-[var(--gold)]">◆</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

function OpportunityRibbon() {
  const doubled = [...opportunityRibbon, ...opportunityRibbon];
  return (
    <div className="relative overflow-hidden border-y border-border bg-gradient-to-r from-[oklch(0.18_0.05_252_/_0.6)] via-[oklch(0.22_0.08_245_/_0.5)] to-[oklch(0.18_0.05_252_/_0.6)] backdrop-blur">
      <div className="flex w-max animate-ribbon gap-12 py-2.5 pl-6 text-xs font-medium uppercase tracking-[0.18em]">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-3 whitespace-nowrap text-foreground/80">
            <span className="text-[var(--gold)]">★</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-30">
      <ExecutiveAlert />
      <div className="border-b border-border bg-[oklch(0.10_0.03_250_/_0.75)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-md bg-[var(--holo)] opacity-30 blur-md transition group-hover:opacity-60" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-md border border-[oklch(0.82_0.14_85_/_0.5)] bg-[oklch(0.10_0.03_250)]">
                <ShieldCheck className="h-5 w-5 text-[var(--gold)]" />
              </div>
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm font-semibold tracking-widest text-holo">EU-IE</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Infrastructure · Treaties · Cooperation
              </div>
            </div>
          </Link>
          <nav className="ml-6 hidden items-center gap-4 text-xs text-muted-foreground md:flex">
            {nav.slice(1, 8).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="transition-colors hover:text-foreground"
                activeProps={{ className: "text-holo" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md border border-[var(--gold)]/30 px-3 py-1.5 text-xs text-gold hover:bg-[oklch(0.82_0.14_85_/_0.1)] sm:inline-flex sm:items-center sm:gap-1.5"
            >
              <Calendar className="h-3.5 w-3.5" />
              Book
            </a>
            <a
              href={TEAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground sm:inline-flex sm:items-center sm:gap-1.5"
            >
              <Users className="h-3.5 w-3.5" />
              Team
            </a>
            <Link
              to="/support"
              className="hidden rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground sm:inline-block"
            >
              Support
            </Link>
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--holo)]/50 bg-[oklch(0.78_0.16_230_/_0.1)] px-3 py-1.5 text-xs font-medium text-holo shadow-[0_0_12px_oklch(0.78_0.16_230_/_0.25)] transition hover:shadow-[0_0_18px_oklch(0.78_0.16_230_/_0.45)]"
            >
              <Crown className="h-3.5 w-3.5" />
              Member Sign-In
            </Link>
          </div>
        </div>
      </div>
      <NewsLine />
      <OpportunityRibbon />
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[oklch(0.10_0.03_250_/_0.85)] backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[var(--gold)]" />
            <span className="font-display tracking-widest text-holo">EU-IE</span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Infrastructure Enforcement Initiative — an independent organization
            advancing infrastructure, innovation and international cooperation.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-xs uppercase tracking-widest text-foreground">Headquarters</h4>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {nav.slice(0, 5).map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-foreground">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs uppercase tracking-widest text-foreground">Programs</h4>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {nav.slice(5, 10).map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-foreground">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs uppercase tracking-widest text-foreground">Disclaimer</h4>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Registered entity operating under civil law. Conceptually aligned with EU, NATO, UN, 
            Pentagon and OECD governance frameworks. EU Transparency Register APP-247579 · 
            UNGM Node 1172700 · NATO STANAG compliant · LEI 894500GBJSIW8L6ET310
          </p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-[11px] text-muted-foreground">
        © {new Date().getFullYear()} EU-IE Infrastructure Enforcement Initiative · Open in the Gray
      </div>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <TopBar />
      <SideNav />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-8 lg:pl-20">{children}</main>
      <Footer />
    </div>
  );
}
