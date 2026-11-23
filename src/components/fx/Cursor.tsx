"use client";

import { useEffect, useRef } from "react";

const MAGNETIC = ".btn-glow, .btn-ghost, [data-magnetic]";
const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label";

/**
 * Desktop-only extras: a soft glowing cursor that follows the mouse and
 * swells over links/buttons, and "magnetic" buttons that lean towards it.
 * Disabled on touch screens and for reduced-motion visitors.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("nk-cursor-on");
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0;
    let magnet: HTMLElement | null = null;

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const release = () => {
      if (magnet) { magnet.style.transform = ""; magnet = null; }
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      const target = e.target as Element | null;
      ring.current?.classList.toggle("is-hover", !!target?.closest(INTERACTIVE));

      const m = target?.closest(MAGNETIC) as HTMLElement | null;
      if (m !== magnet) release();
      if (m) {
        magnet = m;
        const r = m.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
        m.style.transform = `translate(${Math.max(-8, Math.min(8, dx))}px, ${Math.max(-6, Math.min(6, dy))}px)`;
      }
    };
    const onLeave = () => { x = y = -100; release(); };
    const onDown = () => ring.current?.classList.add("is-down");
    const onUp = () => ring.current?.classList.remove("is-down");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      release();
      document.documentElement.classList.remove("nk-cursor-on");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="nk-cursor-ring" aria-hidden="true" />
      <div ref={dot} className="nk-cursor-dot" aria-hidden="true" />
    </>
  );
}
