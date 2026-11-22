"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Muted looping background video that only downloads and plays while it is
 * on screen (and pauses when it scrolls away). Reduced-motion visitors get
 * the poster image only.
 */
export default function LazyVideo({ src, poster, className, eager = false }: { src: string; poster: string; className?: string; eager?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!v.src) v.src = src;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src, reduce]);

  if (reduce) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt="" className={cn("object-cover", className)} aria-hidden="true" />;
  }
  return (
    <video
      ref={ref}
      className={cn("object-cover", className)}
      poster={poster}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "none"}
      {...(eager ? { src, autoPlay: true } : {})}
      aria-hidden="true"
    />
  );
}
