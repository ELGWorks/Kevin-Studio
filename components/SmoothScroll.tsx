"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";
import { useEffect, useRef, useState, type ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const lenisRef = useRef<LenisRef>(null);
  const veil = useRef<HTMLDivElement>(null);

  // Skip smooth scrolling for people who ask their system for less motion.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Nav and button links (href="#...").
  // Short trips scroll smoothly. Long trips would sweep past the colored logo panels,
  // so those fade to dark, jump while covered, then fade back.
  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout>;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const target = document.getElementById(a.getAttribute("href")!.slice(1));
      if (!target) return;
      e.preventDefault();

      const lenis = lenisRef.current?.lenis;
      const distance = Math.abs(target.getBoundingClientRect().top);

      if (distance < window.innerHeight * 1.5) {
        if (lenis) lenis.scrollTo(target, { duration: 1.1 });
        else target.scrollIntoView();
        return;
      }

      const cover = veil.current;
      if (cover) cover.style.opacity = "1";
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (lenis) lenis.scrollTo(target, { immediate: true });
        else target.scrollIntoView();
        if (cover) cover.style.opacity = "0";
      }, 260);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(timer);
    };
  }, [enabled]);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis root ref={lenisRef} options={{ lerp: 0.1 }}>
      {children}
      <div
        ref={veil}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] bg-ink opacity-0 transition-opacity duration-300 ease-in-out"
      />
    </ReactLenis>
  );
}