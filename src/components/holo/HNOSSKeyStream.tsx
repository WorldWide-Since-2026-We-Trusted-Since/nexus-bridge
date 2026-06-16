import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

// HNOSS Governance Keys - extracted from comprehensive reference document
const GOVERNANCE_KEYS = {
  // Strategic Layers
  layers: [
    { key: "TX", label: "Transcendence", desc: "Meta-Governance Layer" },
    { key: "TXA", label: "Transcendent Authority", desc: "Supervisory AI Infrastructure" },
    { key: "GOV", label: "Government Layer", desc: "Sovereign Infrastructure" },
    { key: "FI", label: "Financial Layer", desc: "Capital Coordination" },
    { key: "SWF", label: "Sovereign Wealth", desc: "Global Fund Networks" },
  ],

  // Regulatory Frameworks (80+)
  regulatory: [
    "DSA Art.40", "DMA", "Data Act", "AI Act", "GDPR", "DORA", "CRA",
    "NIS-2", "TIBER-EU", "FedRAMP", "FISMA", "NIST 800-53", "ISO 27001",
    "PSD2", "PSD3", "MiFID II", "MiFIR", "EMIR", "Basel IV", "FinfraG",
    "Solvency II", "AIFMD", "UCITS", "FATF Travel Rule", "SOX",
    "SEC 10b-5", "Dodd-Frank", "FATCA", "CRS", "UNCAC", "CSDDD",
    "CSRD", "EU-Taxonomie", "NATO STANAG", "UNGM"
  ],

  // Institutional Identifiers
  identifiers: [
    { code: "LEI 894500GBJSIW8L6ET310", type: "GLEIF" },
    { code: "315676980", type: "D-U-N-S" },
    { code: "317066336", type: "D-U-N-S" },
    { code: "1172700", type: "UNGM" },
    { code: "873042778", type: "UNGM" },
    { code: "DE441892129", type: "VAT" },
    { code: "EX2025D1218310", type: "EU-Ref" },
    { code: "756.6199.0539.28", type: "Swiss ID" },
    { code: "APP-247579", type: "EU Transparency" },
  ],

  // Legal Forms & Entities
  legalForms: [
    "AG", "SE", "SA", "GmbH", "gGmbH", "Ltd.", "Inc.", "Corp.",
    "KGaA", "Foundation", "Charity", "Trust", "DAF", "CSR", "Impact"
  ],

  // Financial Actors
  financialActors: [
    "World's Star SWFs", "Anchor LP", "GPs", "LPs",
    "SAGA-PEZ", "PgEz", "EpsLGSEz", "GLp", "pGz"
  ],

  // Governance Systems
  systems: [
    "HNOSS", "PrisMaTHarIOn", "SAGA-PEZ", "GovID", "GovAPI",
    "GovCore", "GovNet", "GovX", "TX Layer", "TXA Layer"
  ],

  // Alliance References
  alliances: [
    "NATO", "EU", "UN", "UNGM", "Pentagon", "OECD", "GLEIF"
  ]
};

interface FloatingKey {
  id: string;
  text: string;
  subtext?: string;
  category: "layers" | "regulatory" | "identifiers" | "legal" | "financial" | "systems" | "alliances";
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  opacity: number;
  scale: number;
  phase: number;
}

function generateFloatingKeys(count: number): FloatingKey[] {
  const keys: FloatingKey[] = [];
  const categories = ["layers", "regulatory", "identifiers", "legal", "financial", "systems", "alliances"] as const;

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    let text = "";
    let subtext = "";

    switch (category) {
      case "layers":
        const layer = GOVERNANCE_KEYS.layers[Math.floor(Math.random() * GOVERNANCE_KEYS.layers.length)];
        text = layer.key;
        subtext = layer.label;
        break;
      case "regulatory":
        text = GOVERNANCE_KEYS.regulatory[Math.floor(Math.random() * GOVERNANCE_KEYS.regulatory.length)];
        break;
      case "identifiers":
        const id = GOVERNANCE_KEYS.identifiers[Math.floor(Math.random() * GOVERNANCE_KEYS.identifiers.length)];
        text = id.code;
        subtext = id.type;
        break;
      case "legal":
        text = GOVERNANCE_KEYS.legalForms[Math.floor(Math.random() * GOVERNANCE_KEYS.legalForms.length)];
        break;
      case "financial":
        text = GOVERNANCE_KEYS.financialActors[Math.floor(Math.random() * GOVERNANCE_KEYS.financialActors.length)];
        break;
      case "systems":
        text = GOVERNANCE_KEYS.systems[Math.floor(Math.random() * GOVERNANCE_KEYS.systems.length)];
        break;
      case "alliances":
        text = GOVERNANCE_KEYS.alliances[Math.floor(Math.random() * GOVERNANCE_KEYS.alliances.length)];
        break;
    }

    keys.push({
      id: `key-${i}-${Date.now()}`,
      text,
      subtext,
      category,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speedX: (Math.random() - 0.5) * 0.03,
      speedY: (Math.random() - 0.5) * 0.02,
      opacity: 0.3 + Math.random() * 0.4,
      scale: 0.8 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
    });
  }

  return keys;
}

const categoryColors: Record<string, string> = {
  layers: "holo",
  regulatory: "gold",
  identifiers: "azure",
  legal: "mint",
  financial: "rose",
  systems: "violet",
  alliances: "amber",
};

const categoryGlow: Record<string, string> = {
  layers: "oklch(0.78 0.16 230 / 0.6)",
  regulatory: "oklch(0.82 0.14 85 / 0.5)",
  identifiers: "oklch(0.7 0.15 260 / 0.5)",
  legal: "oklch(0.75 0.12 160 / 0.5)",
  financial: "oklch(0.75 0.14 15 / 0.5)",
  systems: "oklch(0.7 0.16 300 / 0.5)",
  alliances: "oklch(0.8 0.13 75 / 0.5)",
};

interface HNOSSKeyStreamProps {
  className?: string;
  keyCount?: number;
  showBackground?: boolean;
}

export function HNOSSKeyStream({ 
  className, 
  keyCount = 25,
  showBackground = true 
}: HNOSSKeyStreamProps) {
  const [keys, setKeys] = useState<FloatingKey[]>(() => generateFloatingKeys(keyCount));
  const [time, setTime] = useState(0);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  useEffect(() => {
    let animationId: number;
    let lastTime = 0;

    const animate = (timestamp: number) => {
      if (timestamp - lastTime > 16) {
        setTime(t => t + 0.016);
        lastTime = timestamp;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Update positions periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setKeys(prevKeys => prevKeys.map(key => {
        let newX = key.x + key.speedX;
        let newY = key.y + key.speedY;

        // Wrap around edges
        if (newX < -10) newX = 110;
        if (newX > 110) newX = -10;
        if (newY < -5) newY = 105;
        if (newY > 105) newY = -5;

        return { ...key, x: newX, y: newY };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      layers: "LAYER",
      regulatory: "REG",
      identifiers: "ID",
      legal: "LEGAL",
      financial: "FIN",
      systems: "SYS",
      alliances: "ALLIANCE",
    };
    return labels[cat] || cat.toUpperCase();
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Background gradient mesh */}
      {showBackground && (
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 20% 40%, oklch(0.78 0.16 230 / 0.15), transparent),
                radial-gradient(ellipse 60% 40% at 80% 60%, oklch(0.82 0.14 85 / 0.1), transparent),
                radial-gradient(ellipse 50% 30% at 50% 50%, oklch(0.7 0.15 260 / 0.08), transparent)
              `,
            }}
          />
        </div>
      )}

      {/* Floating keys */}
      <div className="absolute inset-0">
        {keys.map((key) => {
          const colorClass = categoryColors[key.category];
          const glowColor = categoryGlow[key.category];
          const isHovered = hoveredKey === key.id;
          
          // Calculate floating motion
          const floatY = Math.sin(time + key.phase) * 3;
          const floatX = Math.cos(time * 0.5 + key.phase) * 2;
          const pulseOpacity = 0.6 + Math.sin(time * 2 + key.phase) * 0.2;
          
          return (
            <div
              key={key.id}
              className={cn(
                "absolute cursor-default select-none transition-all duration-300",
                "font-mono text-xs tracking-wider",
                isHovered ? "z-50 scale-125" : "z-10",
                colorClass === "holo" && "text-[var(--holo)]",
                colorClass === "gold" && "text-[var(--gold)]",
                colorClass === "azure" && "text-[oklch(0.7_0.15_260)]",
                colorClass === "mint" && "text-[oklch(0.75_0.12_160)]",
                colorClass === "rose" && "text-[oklch(0.75_0.14_15)]",
                colorClass === "violet" && "text-[oklch(0.7_0.16_300)]",
                colorClass === "amber" && "text-[oklch(0.8_0.13_75)]",
              )}
              style={{
                left: `${key.x + floatX}%`,
                top: `${key.y + floatY}%`,
                opacity: isHovered ? 1 : key.opacity * pulseOpacity,
                transform: `scale(${isHovered ? 1.3 : key.scale})`,
                textShadow: isHovered 
                  ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`
                  : `0 0 10px ${glowColor}`,
                filter: isHovered ? "brightness(1.3)" : "brightness(1)",
              }}
              onMouseEnter={() => setHoveredKey(key.id)}
              onMouseLeave={() => setHoveredKey(null)}
            >
              {/* Category badge */}
              <span 
                className={cn(
                  "mb-0.5 block text-[8px] opacity-60",
                  colorClass === "holo" && "text-[var(--holo)]",
                  colorClass === "gold" && "text-[var(--gold)]",
                  colorClass === "azure" && "text-[oklch(0.7_0.15_260)]",
                  colorClass === "mint" && "text-[oklch(0.75_0.12_160)]",
                  colorClass === "rose" && "text-[oklch(0.75_0.14_15)]",
                  colorClass === "violet" && "text-[oklch(0.7_0.16_300)]",
                  colorClass === "amber" && "text-[oklch(0.8_0.13_75)]",
                )}
              >
                {getCategoryLabel(key.category)}
              </span>
              
              {/* Main key text */}
              <span className="font-semibold">{key.text}</span>
              
              {/* Subtext (if exists) */}
              {key.subtext && (
                <span className="ml-1.5 text-[9px] opacity-50">
                  [{key.subtext}]
                </span>
              )}

              {/* Hover connector line */}
              {isHovered && (
                <div 
                  className="absolute -bottom-1 left-0 h-px w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Animated scanlines */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.1) 2px,
            rgba(255,255,255,0.1) 4px
          )`,
        }}
      />

      {/* Central HNOSS emblem pulse */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div 
          className="h-32 w-32 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, oklch(0.78 0.16 230 / 0.3) 0%, transparent 70%)`,
            transform: `scale(${1 + Math.sin(time) * 0.1})`,
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}

// Compact ticker version for header/footer
interface HNOSSKeyTickerProps {
  className?: string;
  speed?: number;
}

export function HNOSSKeyTicker({ className, speed = 30 }: HNOSSKeyTickerProps) {
  const allKeys = useMemo(() => [
    ...GOVERNANCE_KEYS.layers.map(l => l.key),
    ...GOVERNANCE_KEYS.regulatory,
    ...GOVERNANCE_KEYS.legalForms,
    ...GOVERNANCE_KEYS.financialActors,
    ...GOVERNANCE_KEYS.systems,
    ...GOVERNANCE_KEYS.alliances,
  ], []);

  // Duplicate for seamless loop
  const tickerKeys = useMemo(() => [...allKeys, ...allKeys, ...allKeys], [allKeys]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div 
        className="flex whitespace-nowrap"
        style={{
          animation: `hnoss-ticker ${speed}s linear infinite`,
        }}
      >
        {tickerKeys.map((key, i) => (
          <span 
            key={`${key}-${i}`}
            className="mx-4 inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-muted-foreground/60"
          >
            <span className="h-1 w-1 rounded-full bg-[var(--holo)]/50" />
            {key}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes hnoss-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}

// Static badge for single key display
interface HNOSSBadgeProps {
  keyName: string;
  category?: "layers" | "regulatory" | "identifiers" | "legal" | "financial" | "systems" | "alliances";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function HNOSSBadge({ 
  keyName, 
  category = "systems", 
  size = "md",
  className 
}: HNOSSBadgeProps) {
  const colorClass = categoryColors[category];
  
  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-[10px]",
    md: "px-2 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded border font-mono tracking-wider",
        sizeClasses[size],
        colorClass === "holo" && "border-[var(--holo)]/30 bg-[oklch(0.78_0.16_230_/0.1)] text-[var(--holo)]",
        colorClass === "gold" && "border-[var(--gold)]/30 bg-[oklch(0.82_0.14_85_/0.1)] text-[var(--gold)]",
        colorClass === "azure" && "border-[oklch(0.7_0.15_260)]/30 bg-[oklch(0.7_0.15_260_/0.1)] text-[oklch(0.7_0.15_260)]",
        colorClass === "mint" && "border-[oklch(0.75_0.12_160)]/30 bg-[oklch(0.75_0.12_160_/0.1)] text-[oklch(0.75_0.12_160)]",
        colorClass === "rose" && "border-[oklch(0.75_0.14_15)]/30 bg-[oklch(0.75_0.14_15_/0.1)] text-[oklch(0.75_0.14_15)]",
        colorClass === "violet" && "border-[oklch(0.7_0.16_300)]/30 bg-[oklch(0.7_0.16_300_/0.1)] text-[oklch(0.7_0.16_300)]",
        colorClass === "amber" && "border-[oklch(0.8_0.13_75)]/30 bg-[oklch(0.8_0.13_75_/0.1)] text-[oklch(0.8_0.13_75)]",
        className,
      )}
    >
      {keyName}
    </span>
  );
}
