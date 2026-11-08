import type { ReactNode } from "react";
import type { LogoKind } from "@/data/portfolio";

/* Placeholder artwork. Ignored once real images are switched on in data/portfolio.ts. */

export function LogoArt({ kind }: { kind: LogoKind }) {
  const common = { viewBox: "0 0 100 100", className: "h-full w-full", "aria-hidden": true } as const;
  switch (kind) {
    case "orbit":
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="10" />
          <circle cx="76" cy="28" r="10" fill="var(--accent)" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M50 86C20 70 20 30 50 14c30 16 30 56 0 72Z" fill="currentColor" />
          <path d="M50 86V40" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
    case "mono":
      return (
        <svg {...common}>
          <path d="M50 14 88 84H12Z" fill="currentColor" />
          <path d="M50 52 66 84H34Z" fill="var(--accent)" />
        </svg>
      );
    case "hex":
      return (
        <svg {...common}>
          <path d="M50 8 86 29v42L50 92 14 71V29Z" fill="currentColor" />
          <path d="M55 26 36 54h14l-5 20 20-28H51Z" fill="var(--accent)" />
        </svg>
      );
    case "wave":
      return (
        <svg {...common} fill="none" strokeWidth="9" strokeLinecap="round">
          <path d="M10 34q20-22 40 0t40 0" stroke="currentColor" />
          <path d="M10 54q20-22 40 0t40 0" stroke="currentColor" />
          <path d="M10 74q20-22 40 0t40 0" stroke="var(--accent)" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <rect x="16" y="14" width="68" height="68" rx="22" fill="currentColor" />
          <circle cx="50" cy="44" r="15" fill="var(--accent)" />
          <path d="M40 82h20l-10 10Z" fill="currentColor" />
        </svg>
      );
  }
}

/* ---------- Sketch placeholders: generated pencil drawings ---------- */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (v: number) => v.toFixed(1);

function hatch(x: number, y: number, w: number, h: number, gap: number) {
  let d = "";
  for (let i = 0; i * gap <= w; i++) {
    d += `M${f(x + i * gap)} ${f(y + h)}L${f(x + i * gap + h * 0.45)} ${f(y)}`;
  }
  return d;
}

/** Needs the #pencil filter to be defined once on the page (see Sketches.tsx). */
export function SketchArt({ seed }: { seed: number }) {
  const r = mulberry32(seed * 7919);
  const j = (n: number) => (r() - 0.5) * n;
  const kind = seed % 5;

  let shape: ReactNode;
  let shading: string;

  if (kind === 0) {
    const R = 24 + r() * 8;
    const cx = 50 + j(8);
    const cy = 54 + j(8);
    shape = (
      <>
        <circle cx={f(cx)} cy={f(cy)} r={f(R)} />
        <circle cx={f(cx - R * 0.35)} cy={f(cy - R * 0.15)} r="2.2" />
        <circle cx={f(cx + R * 0.35)} cy={f(cy - R * 0.15)} r="2.2" />
        <path d={`M${f(cx - R * 0.4)} ${f(cy + R * 0.35)}Q${f(cx)} ${f(cy + R * 0.75)} ${f(cx + R * 0.4)} ${f(cy + R * 0.35)}`} />
      </>
    );
    shading = hatch(cx - R * 0.8, cy - R - 4, R * 1.6, 10, 2.6);
  } else if (kind === 1) {
    const lean = j(14);
    shape = (
      <>
        <path d={`M50 94C${f(46 + lean)} 72 ${f(56 + lean)} 50 ${f(50 + lean)} 16`} />
        {[30, 44, 58, 72].map((y, i) => {
          const side = i % 2 ? 1 : -1;
          const x = 50 + side * 11 + lean * (1 - y / 100);
          return <ellipse key={y} cx={f(x)} cy={y} rx="11" ry="4.5" transform={`rotate(${side * -28} ${f(x)} ${y})`} />;
        })}
      </>
    );
    shading = hatch(36, 84, 28, 8, 2.4);
  } else if (kind === 2) {
    const s = 0.9 + r() * 0.25;
    shape = (
      <g transform={`translate(50 50) scale(${f(s)}) translate(-50 -50)`}>
        <path d="M50 18 80 34v32L50 82 20 66V34Z" />
        <path d="M50 50v32M50 50 20 34M50 50 80 34" />
      </g>
    );
    shading = hatch(22, 40, 26, 26, 2.8);
  } else if (kind === 3) {
    const cx = 50 + j(6);
    const cy = 50 + j(6);
    shape = (
      <>
        <circle cx={f(cx)} cy={f(cy)} r="6" />
        {Array.from({ length: 14 }, (_, i) => {
          const a = (i / 14) * Math.PI * 2 + j(0.2);
          const r1 = 10 + r() * 4;
          const r2 = 24 + r() * 20;
          return (
            <path
              key={i}
              d={`M${f(cx + Math.cos(a) * r1)} ${f(cy + Math.sin(a) * r1)}L${f(cx + Math.cos(a) * r2)} ${f(cy + Math.sin(a) * r2)}`}
            />
          );
        })}
      </>
    );
    shading = "";
  } else {
    shape = (
      <>
        {[8, 15, 22, 29].map((rr, i) => (
          <circle key={rr} cx={f(48 + i * 2 + j(2))} cy={f(52 - i * 1.5 + j(2))} r={rr} />
        ))}
        <circle cx="78" cy="24" r="3" />
      </>
    );
    shading = hatch(60, 66, 26, 14, 2.6);
  }

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      {/* blue-pencil guides */}
      <g
        fill="none"
        stroke="#3047ff"
        strokeOpacity="0.3"
        strokeWidth="0.35"
        transform={`rotate(${f(j(24))} 50 50)`}
      >
        <path d="M-20 50H120M50 -20V120" />
        <circle cx="50" cy="50" r="38" />
      </g>

      {/* pencil linework, drawn twice and slightly off */}
      <g
        fill="none"
        stroke="#2b2f48"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "url(#pencil)" }}
      >
        {[0, 1].map((o) => (
          <g
            key={o}
            strokeOpacity={o ? 0.5 : 1}
            transform={`translate(${f(o * 0.9)} ${f(-o * 0.7)}) rotate(${f(o * 1.4)} 50 50)`}
          >
            {shape}
          </g>
        ))}
        {shading && <path d={shading} strokeWidth="0.6" strokeOpacity="0.6" />}
      </g>
    </svg>
  );
}
