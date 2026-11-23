"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenis: Lenis | null = null;

/** Scroll to a page offset through Lenis when it is active, natively otherwise. */
export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/**
 * Smooth, inertial scrolling (Lenis). Off for reduced-motion visitors and
 * for touch devices, which already scroll natively and smoothly.
 * Scroll containers inside dialogs / the chat opt out with data-lenis-prevent.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    lenis = new Lenis({
      autoRaf: true,
      duration: 1.15,
      anchors: { offset: -96 },
      prevent: (node) => !!node.closest?.("[data-lenis-prevent], [role='dialog'], [data-slot='select-content']"),
    });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // new page: start at the top instantly
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
