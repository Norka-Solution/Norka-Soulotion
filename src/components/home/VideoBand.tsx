"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import LazyVideo from "@/components/kit/LazyVideo";

/**
 * Cinematic band: real footage of a team at work that opens from a rounded
 * card to full width as it scrolls into view, with Norka's promise on top.
 */
export default function VideoBand({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  // opens from a rounded, inset card to full width as it scrolls in
  const clipPath = useTransform(scrollYProgress, (p) => {
    const k = reduce ? 0 : 1 - Math.min(1, Math.max(0, p));
    return `inset(0 ${(k * 7).toFixed(2)}% round ${(k * 40).toFixed(1)}px)`;
  });
  const textY = useTransform(scrollYProgress, [0, 1], [60, 0]);

  const points = isAr
    ? ["فريق حقيقي داخل الإمارات", "نفهم شغلك قبل ما نكتب سطر كود", "دعم مستمر بعد الإطلاق"]
    : ["A real team, here in the UAE", "We learn your business before writing code", "Support that continues after launch"];

  return (
    <section ref={ref} className="dark relative bg-page py-6" aria-label={isAr ? "فريق نوركا" : "The Norka team"}>
      <motion.div style={{ clipPath }} className="relative h-[78vh] min-h-[520px] overflow-hidden">
        <LazyVideo src="/videos/team.mp4" poster="/videos/team-poster.jpg" className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060D] via-[#04060D]/55 to-[#04060D]/20" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_80%,rgba(59,98,252,.35),transparent_70%)]" aria-hidden="true" />

        <motion.div style={{ y: textY }} className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 md:pb-20 text-start">
          <span className="eyebrow">{isAr ? "مين بيبني نوركا" : "Who builds Norka"}</span>
          <h2 className="mt-5 font-heading font-extrabold text-white leading-[1.2] text-[clamp(2rem,4.6vw,3.75rem)] max-w-3xl">
            {isAr ? "ناس حقيقية، تبني أنظمة " : "Real people, building systems "}
            <span className="text-blue-glow">{isAr ? "تشتغل لشركتك." : "that work for you."}</span>
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {points.map((p) => (
              <li key={p} className="inline-flex items-center gap-2 text-slate-200">
                <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" /> {p}
              </li>
            ))}
          </ul>
          <Link href={`/${locale}/contact`} className="btn-glow mt-8">
            {isAr ? "كلّم الفريق" : "Talk to the team"}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
