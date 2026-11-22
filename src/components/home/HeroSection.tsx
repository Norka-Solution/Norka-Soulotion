"use client";

import { useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  motion, useScroll, useTransform, useSpring, useReducedMotion, useMotionValue,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2, Sparkles, Smartphone } from "lucide-react";
import DashboardMockup from "@/components/visuals/DashboardMockup";
import CountUp from "@/components/ui/CountUp";
import { COMPANY_STATS } from "@/lib/constants";

interface HeroSectionProps {
  locale: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

// "150+" -> { end: 150, suffix: "+" }
function splitStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return { end: match ? Number(match[1]) : 0, suffix: match ? match[2] : "" };
}

/**
 * Words fade up out of a soft blur, one after another.
 * `wordClass` goes on every word: background-clip text gradients don't
 * reach into transformed inline-block children, so each word carries its own.
 */
function RevealWords({ text, wordClass, delay = 0 }: { text: string; wordClass?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className="block">
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className={`inline-block ${wordClass ?? ""}`}
          initial={{ opacity: 0, y: "0.45em", filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: delay + i * 0.09, duration: 0.8, ease }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations("hero");
  const tStats = useTranslations("stats");
  const isAr = locale === "ar";
  const reduce = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // The dashboard starts tilted back and settles flat as you scroll.
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.35], [reduce ? 0 : 22, 0]), { stiffness: 120, damping: 24 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.35], [reduce ? 1 : 0.92, 1]), { stiffness: 120, damping: 24 });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4], [0.9, 0.4]);

  // Gentle mouse parallax for the floating cards.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });
  const pxInv = useTransform(px, (v) => -v);
  const pyInv = useTransform(py, (v) => -v);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 24);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 16);
  };

  const stats = [
    { ...splitStat(COMPANY_STATS.projects), label: tStats("projects") },
    { ...splitStat(COMPANY_STATS.clients), label: tStats("clients") },
    { ...splitStat(COMPANY_STATS.years), label: tStats("years") },
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative overflow-hidden bg-[var(--ink)] pt-32 md:pt-40"
      aria-label={isAr ? "القسم الرئيسي" : "Hero section"}
    >
      {/* atmosphere */}
      <div className="aurora" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6384FF]/60 to-transparent"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex justify-center mb-7"
        >
          <Link href={`/${locale}/services`} className="eyebrow group">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[#6384FF] opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-[#9DB0FE]" />
            </span>
            {t("badge")}
            <ArrowRight className="w-3.5 h-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
          </Link>
        </motion.div>

        {/* headline */}
        <h1 className="font-heading font-black tracking-[-0.035em] leading-[1.02] text-[clamp(2.75rem,8vw,6.25rem)] max-w-5xl mx-auto">
          <RevealWords text={t("title")} wordClass="text-hero pb-[0.12em]" delay={0.1} />
          <RevealWords text={t("titleHighlight")} wordClass="text-blue-glow pb-[0.14em]" delay={0.3} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7, ease }}
          className="mt-6 text-base md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href={`/${locale}/contact`} className="btn-glow">
            {t("cta1")}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
          <Link href={`/${locale}/portfolio`} className="btn-ghost">
            {t("cta2")}
            <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" />
          </Link>
        </motion.div>

        {/* stats */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-xl font-bold text-white tabular-nums">
                <CountUp end={s.end} suffix={s.suffix} />
              </dd>
              <span className="text-slate-500" aria-hidden="true">{s.label}</span>
            </div>
          ))}
        </motion.dl>

        {/* product visual */}
        <div className="relative mt-16 md:mt-20 [perspective:2000px]" aria-hidden="true">
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute -inset-x-10 top-10 bottom-0 bg-[radial-gradient(ellipse_at_center,rgba(59,98,252,.45),transparent_60%)] blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.1, ease }}
            style={{ rotateX, scale, transformOrigin: "50% 0%" }}
            className="relative max-w-6xl mx-auto"
          >
            <DashboardMockup isAr={isAr} />

            {/* floating: payment notification */}
            <motion.div
              style={{ x: px, y: py }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.7, ease }}
              className="hidden md:flex absolute -start-8 lg:-start-16 top-[38%] items-center gap-3 rounded-2xl px-4 py-3 bg-[#0B1122]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 text-start"
            >
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-emerald-400/10">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </span>
              <span>
                <span className="block text-[12px] font-semibold text-white">{isAr ? "تم استلام الدفعة" : "Payment received"}</span>
                <span className="block text-[11px] text-slate-400" dir="ltr">AED 12,400 · Al Reem</span>
              </span>
            </motion.div>

            {/* floating: mobile app */}
            <motion.div
              style={{ x: pxInv, y: pyInv }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7, duration: 0.7, ease }}
              className="hidden md:block absolute -end-6 lg:-end-12 -top-8 w-44 rounded-[1.6rem] p-1.5 bg-[#0B1122] border border-white/10 shadow-2xl shadow-black/60"
            >
              <div className="rounded-[1.25rem] overflow-hidden bg-gradient-to-b from-[#121A33] to-[#0A0F1E] p-3 text-start">
                <div className="mx-auto mb-3 w-12 h-1 rounded-full bg-white/10" />
                <p className="flex items-center gap-1.5 text-[10px] font-semibold text-[#C7D2FE]">
                  <Smartphone className="w-3 h-3" /> {isAr ? "تطبيق الموظفين" : "Staff app"}
                </p>
                <p className="mt-2 text-[18px] font-bold text-white tabular-nums" dir="ltr">96%</p>
                <p className="text-[9px] text-slate-500">{isAr ? "نسبة الحضور اليوم" : "Attendance today"}</p>
                <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#3B62FC] to-[#38BDF8]"
                    initial={{ width: 0 }}
                    animate={{ width: "96%" }}
                    transition={{ delay: 3, duration: 1.2, ease }}
                  />
                </div>
                <div className="mt-3 space-y-1.5">
                  {[0.9, 0.7, 0.8].map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-white/10" />
                      <span className="h-1.5 rounded-full bg-white/10" style={{ width: `${w * 100}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* floating: AI */}
            <motion.div
              style={{ x: pxInv, y: py }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.7, ease }}
              className="hidden lg:flex absolute -end-10 bottom-16 items-center gap-2 rounded-full px-4 py-2.5 bg-gradient-to-r from-[#3B62FC] to-[#2848D8] shadow-[0_10px_40px_-6px_rgba(59,98,252,.8)] text-[12px] font-semibold text-white"
            >
              <Sparkles className="w-4 h-4" />
              {isAr ? "مدعوم بالذكاء الاصطناعي" : "AI built in"}
            </motion.div>
          </motion.div>

          {/* fade the bottom of the dashboard into the page */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--ink)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
