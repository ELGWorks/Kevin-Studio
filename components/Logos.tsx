"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { logos } from "@/data/portfolio";
import { LogoArt } from "./art";

/**
 * Pinned horizontal gallery of logo cards. The section is tall; the stage sticks while
 * the row of cards slides sideways. --p (0 to 1) is the scroll progress, and each card
 * derives --l (0 when centered, +/-1 when one card away) from it.
 */
export default function Logos() {
  const outer = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const n = logos.length;

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const update = () => {
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total));
      el.style.setProperty("--p", p.toFixed(4));
      setActive(Math.round(p * (n - 1)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [n]);

  return (
    <section
      id="logos"
      ref={outer}
      style={{ height: `${n * 90}svh`, "--n1": n - 1 } as CSSProperties}
      className="relative [--card:min(84vw,60rem)] [--gap:1rem] md:[--card:min(64vw,56rem)] md:[--gap:1.5rem]"
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <h2 className="absolute left-5 top-[4.5rem] font-display text-3xl font-extrabold tracking-tight sm:left-8 sm:text-5xl">
          Logos
        </h2>

        {/* the row of cards: first card starts centered, then slides left */}
        <div
          className="flex will-change-transform"
          style={{
            marginLeft: "calc(50% - var(--card) / 2)",
            gap: "var(--gap)",
            transform: "translate3d(calc(var(--p, 0) * var(--n1) * -1 * (var(--card) + var(--gap))), 0, 0)",
          }}
        >
          {logos.map((l, i) => (
            <div
              key={l.title}
              className="relative h-[min(64svh,40rem)] w-[var(--card)] flex-none overflow-hidden rounded-xl"
              style={
                {
                  background: l.bg,
                  color: l.fg,
                  "--accent": l.accent,
                  "--sc": l.fg,
                  "--fill": l.bg,
                  "--i": i,
                  "--l": "calc(var(--p, 0) * var(--n1) - var(--i))",
                } as CSSProperties
              }
            >
              {/* giant outlined title, slides faster than the card */}
              <p
                aria-hidden
                className="outline-text absolute left-[6%] top-1/2 whitespace-nowrap font-display font-extrabold leading-none opacity-60"
                style={{
                  fontSize: "clamp(8rem, 30svh, 20rem)",
                  transform: "translate(calc(var(--l) * -30%), -50%)",
                }}
              >
                {l.title}
              </p>

              {/* the logo: slides slower, spins and shrinks as it leaves */}
              <div
                className="absolute inset-0 grid place-items-center"
                style={{ transform: "translateX(calc(var(--l) * 18%))" }}
              >
                <div
                  className="relative aspect-square w-[min(44svh,62%)] overflow-hidden rounded-xl"
                  style={{
                    transform:
                      "rotate(calc(var(--l) * -35deg)) scale(calc(1 - max(var(--l), var(--l) * -1) * 0.3))",
                  }}
                >
                  {l.image ? (
                    <Image
                      src={l.image}
                      alt={`${l.title} logo`}
                      fill
                      sizes="(min-width:768px) 30vw, 60vw"
                      className="object-contain"
                      priority={i === 0}
                    />
                  ) : (
                    <LogoArt kind={l.kind} />
                  )}
                </div>
              </div>

              <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-7">
                <h3 className="font-display text-2xl font-extrabold sm:text-4xl">{l.title}</h3>
                <p className="mt-0.5 opacity-85">{l.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-center gap-4 sm:inset-x-8">
          <div className="h-[3px] flex-1 bg-ink/15">
            <div className="h-full origin-left bg-ink" style={{ transform: "scaleX(var(--p, 0))" }} />
          </div>
          <span className="font-display text-sm font-semibold tabular-nums">
            {active + 1} / {n}
          </span>
        </div>
      </div>
    </section>
  );
}