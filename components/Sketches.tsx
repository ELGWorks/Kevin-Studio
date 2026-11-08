"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useLenis } from "lenis/react";
import { sketches } from "@/data/portfolio";
import { SketchArt } from "./art";

// Mixed shapes make the wall feel like pages pinned up at different sizes.
// (Real images are cropped to these in the wall and shown whole when opened.)
const ratios = [
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[5/4]",
  "aspect-[4/5]",
  "aspect-[2/3]",
  "aspect-square",
];
const tapes = ["bg-sun/85", "bg-coral/80", "bg-mint/80"];

const tilt = (i: number) => (((i * 53) % 7) - 3) * 0.7; // -2.1 to 2.1 degrees
const drift = (i: number) => (((i * 3) % 5) - 2) * 20; // parallax distance in px

export default function Sketches() {
  const total = sketches.length;
  const section = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();
  const isOpen = open !== null;

  // Scroll progress through the section drives the parallax on each page.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const update = () => {
      const b = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - b.top) / (vh + b.height)));
      el.style.setProperty("--p", p.toFixed(4));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(null);
    trigger.current?.focus();
  }, []);
  const step = useCallback(
    (dir: number) => setOpen((o) => (o === null ? o : (o + dir + total) % total)),
    [total],
  );

  useEffect(() => {
    if (!isOpen) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, lenis, close, step]);

  const current = open !== null ? sketches[open] : null;

  return (
    <section id="sketches" ref={section} className="relative bg-ink text-paper">
      {/* shared pencil-wobble filter used by the placeholder drawings */}
      <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
        <filter id="pencil">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="1.6" />
        </filter>
      </svg>

      <div className="mx-auto max-w-6xl px-5 pb-28 pt-20 sm:px-8 lg:pt-28">
        <h2
          className="outline-text font-display text-[clamp(2.75rem,13vw,4rem)] font-extrabold leading-[0.85] tracking-tight md:text-[clamp(3.5rem,7vw,6rem)]"
          style={{ "--sc": "#edf1f7", "--fill": "#101426" } as CSSProperties}
        >
          Sketches
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
          Pages from the sketchbook: rough shapes, wrong turns, and the idea that stuck. Tap one to see it up close.
        </p>

        <ul className="mt-16 columns-2 gap-x-5 md:columns-3 md:gap-x-12">
          {sketches.map((s, i) => (
            <li
              key={s.title}
              className="mb-8 break-inside-avoid md:mb-14"
              style={{ transform: `translateY(calc((var(--p, 0.5) - 0.5) * ${drift(i)}px))` }}
            >
              <button
                type="button"
                aria-label={`Open ${s.title}`}
                onClick={(e) => {
                  trigger.current = e.currentTarget;
                  setOpen(i);
                }}
                className="group relative block w-full cursor-zoom-in outline-offset-4 focus-visible:outline-sun"
              >
                <div
                  className="relative rotate-[var(--tilt)] rounded-xl bg-paper p-2 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] transition-[rotate,scale] duration-300 ease-out group-hover:rotate-0 group-hover:scale-[1.04] group-focus-visible:rotate-0"
                  style={{ "--tilt": `${tilt(i)}deg` } as CSSProperties}
                >
                  <span
                    aria-hidden
                    className={`absolute -top-3 left-1/2 z-10 h-6 w-16 -translate-x-1/2 -rotate-3 ${tapes[i % 3]}`}
                  />
                  <div className={`relative overflow-hidden rounded-lg bg-paper ${ratios[i % ratios.length]}`}>
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        sizes="(min-width:768px) 33vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <SketchArt seed={i + 1} />
                    )}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {current && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title}, ${open + 1} of ${total}`}
          data-lenis-prevent
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ink/95 p-4"
          onClick={close}
        >
          <button
            ref={closeBtn}
            type="button"
            onClick={close}
            className="absolute right-4 top-4 rounded-full border-2 border-paper/50 px-4 py-2 text-sm font-medium text-paper outline-offset-4 transition-colors hover:bg-paper hover:text-ink focus-visible:outline-sun"
          >
            Close
          </button>

          <div
            className="relative flex h-[76svh] w-full max-w-4xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {current.image ? (
              // plain img so the rounded corners follow the picture, whatever its shape
              // eslint-disable-next-line @next/next/no-img-element
              <img src={current.image} alt={current.title} className="max-h-full max-w-full rounded-xl" />
            ) : (
              <div className="relative h-full max-w-full overflow-hidden rounded-xl bg-paper aspect-[4/5]">
                <SketchArt seed={open + 1} />
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center gap-4 text-paper" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => step(-1)}
              className="rounded-full border-2 border-paper/50 px-4 py-2 text-sm font-medium outline-offset-4 transition-colors hover:bg-paper hover:text-ink focus-visible:outline-sun"
            >
              Previous
            </button>
            <span className="min-w-28 text-center font-display text-sm font-semibold tabular-nums">
              {open + 1} / {total}
            </span>
            <button
              type="button"
              onClick={() => step(1)}
              className="rounded-full border-2 border-paper/50 px-4 py-2 text-sm font-medium outline-offset-4 transition-colors hover:bg-paper hover:text-ink focus-visible:outline-sun"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}