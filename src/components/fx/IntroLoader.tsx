"use client";

import { useEffect, useState } from "react";

const KEY = "nk-intro-seen";

/**
 * Short Norka logo intro on the first visit of a session.
 * It is pure CSS (it fades itself out after ~1.6s even without JS); an
 * inline script in <head> adds .nk-intro-seen on repeat visits so it never
 * shows twice. JS only removes it from the DOM once it has finished.
 */
export default function IntroLoader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const seen = document.documentElement.classList.contains("nk-intro-seen");
    try { sessionStorage.setItem(KEY, "1"); } catch {}
    const t = setTimeout(() => setGone(true), seen ? 0 : 2000);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className="nk-loader" aria-hidden="true">
      <div className="nk-loader-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark.png" alt="" width={88} height={88} className="nk-loader-mark" />
        <div className="nk-loader-word">NORKA</div>
        <div className="nk-loader-bar"><span /></div>
      </div>
    </div>
  );
}

/** Runs before paint: skip the intro if it already played this session. */
export const introSkipScript = `try{if(sessionStorage.getItem("${KEY}"))document.documentElement.classList.add("nk-intro-seen")}catch(e){}`;
