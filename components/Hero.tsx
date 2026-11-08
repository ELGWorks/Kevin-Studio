"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { site } from "@/data/portfolio";

const d = (s: string) => ({ "--d": s }) as CSSProperties;
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

/** A logo mark being built: guides draw first, then the shapes pop in. */
function Construction() {
  return (
    <svg
      viewBox="0 0 600 600"
      className="hidden md:flex h-auto w-full max-w-xl md:max-h-[78svh] md:max-w-none"
      role="img"
      aria-label="A logo mark being drawn with guide lines and anchor points"
    >
      <g fill="none" stroke="#101426" strokeOpacity="0.35" strokeWidth="1.5">
        <circle
          cx="300"
          cy="300"
          r="250"
          pathLength={1}
          className="draw"
          style={d("0s")}
        />
        <path
          d="M30 300H570"
          pathLength={1}
          className="draw"
          style={d("0.2s")}
        />
        <path
          d="M300 30V570"
          pathLength={1}
          className="draw"
          style={d("0.35s")}
        />
        <path
          d="M110 110 490 490"
          pathLength={1}
          className="draw"
          style={d("0.5s")}
        />
        <path
          d="M490 110 110 490"
          pathLength={1}
          className="draw"
          style={d("0.65s")}
        />
      </g>

      <circle
        cx="300"
        cy="300"
        r="150"
        fill="#3047ff"
        className="pop"
        style={d("1.5s")}
      />
      <path
        d="M150 300a150 150 0 0 1 300 0Z"
        fill="#ffc83d"
        className="pop"
        style={d("1.7s")}
      />
      <circle
        cx="300"
        cy="300"
        r="46"
        fill="#ff5c4d"
        className="pop"
        style={d("1.9s")}
      />

      <g fill="none" stroke="#101426" strokeWidth="2.5">
        <circle
          cx="300"
          cy="300"
          r="150"
          pathLength={1}
          className="draw"
          style={d("1s")}
        />
        <path
          d="M300 150H380M300 450H220M150 300V220M450 300V380"
          pathLength={1}
          className="draw"
          style={d("1.2s")}
        />
      </g>
      <g fill="#edf1f7" stroke="#101426" strokeWidth="2.5">
        {[
          [300, 150],
          [450, 300],
          [300, 450],
          [150, 300],
        ].map(([x, y]) => (
          <rect
            key={`${x}${y}`}
            x={x - 8}
            y={y - 8}
            width="16"
            height="16"
            className="pop"
            style={d("1.3s")}
          />
        ))}
      </g>
      <g fill="#101426">
        {[
          [380, 150],
          [220, 450],
          [150, 220],
          [450, 380],
        ].map(([x, y]) => (
          <circle
            key={`${x}${y}`}
            cx={x}
            cy={y}
            r="6"
            className="pop"
            style={d("1.4s")}
          />
        ))}
      </g>
    </svg>
  );
}

export default function Hero() {
  const stage = useRef<HTMLDivElement>(null);
  const [first, ...rest] = site.name.split(" ");
  const second = rest.join(" ");

  // The lens: a circle that follows the pointer and reveals the colored name.
  // With no pointer (phones, idle) it drifts around on its own. Press to blow it up.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--r", "9999px");
      return;
    }

    let raf = 0;
    let pressed = false;
    let lastMove = -1e9;
    const cur = { x: el.clientWidth * 0.3, y: el.clientHeight * 0.5, r: 0 };
    const target = { x: cur.x, y: cur.y };
    const baseR = () => clamp(el.clientWidth * 0.2, 70, 150);

    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      target.x = clamp(e.clientX - b.left, 0, b.width);
      target.y = clamp(e.clientY - b.top, 0, b.height);
      lastMove = performance.now();
    };
    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);

    const tick = (now: number) => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const t = now / 1000;
      if (now - lastMove > 2500) {
        target.x = w * (0.5 + 0.4 * Math.sin(t * 0.6));
        target.y = h * (0.5 + 0.32 * Math.sin(t * 0.95 + 1));
      }
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      cur.r += (baseR() * (pressed ? 2.4 : 1) - cur.r) * 0.15;
      el.style.setProperty("--x", `${cur.x.toFixed(1)}px`);
      el.style.setProperty("--y", `${cur.y.toFixed(1)}px`);
      el.style.setProperty("--r", `${cur.r.toFixed(1)}px`);
      raf = requestAnimationFrame(tick);
    };

    // only animate while the hero is on screen
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!raf) raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(el);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section
      id="top"
      className="mx-auto grid min-h-svh max-w-[110rem] items-center gap-10 px-5 pb-12 pt-20 sm:px-8 md:grid-cols-2 md:gap-12 md:pb-16 md:pt-24 mt-20 md:mt-0"
    >
      {/* left half: the graphic (below the text on phones) */}
      <div className="order-2 flex justify-center md:order-1">
        <Construction />
      </div>

      {/* right half: name, title, buttons */}
      <div className="order-1 md:order-2">
        <div
          ref={stage}
          className="relative select-none font-display text-[20vw] md:text-[clamp(3.75rem,8.6vw,13rem)] font-extrabold leading-[0.84] tracking-tight"
        >
          {/* base layer: outlined name (the real heading) */}
          <h1 className="outline-text name-pad">
            <span className="block">{first}</span>
            {second && <span className="block">{second}</span>}
          </h1>

          {/* lens layer: same text, filled and colored, only visible inside the circle */}
          <div
            aria-hidden
            className="lens pointer-events-none absolute inset-0 bg-cobalt"
          >
            <div className="name-pad">
              <span className="block text-sun">{first}</span>
              {second && <span className="block text-paper">{second}</span>}
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="ring" />
          </div>
        </div>

        <p className="mt-8 font-display text-2xl font-semibold leading-snug sm:text-3xl">
          {site.role}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <a
            href="#logos"
            className="rounded-full bg-cobalt px-3 py-3 text-center text-sm font-medium sm:px-6 sm:text-base text-paper transition-colors hover:bg-ink"
          >
            See the logos
          </a>
          <a
            href="#sketches"
            className="rounded-full border-2 border-ink px-3 py-3 text-center text-sm font-medium sm:px-6 sm:text-base transition-colors hover:bg-ink hover:text-paper"
          >
            Browse sketches
          </a>
        </div>
      </div>
    </section>
  );
}
