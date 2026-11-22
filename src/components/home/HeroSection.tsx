"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, Languages, Building2 } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import NoraThread from "@/components/ai/NoraThread";
import { useNora } from "@/components/ai/NoraContext";
import NoraOrb from "@/components/ai/NoraOrb";
import { COMPANY_STATS } from "@/lib/constants";

interface HeroSectionProps {
  locale: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

function splitStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return { end: match ? Number(match[1]) : 0, suffix: match ? match[2] : "" };
}

/**
 * Real Dubai-at-night footage behind the headline, and Nora — Norka's AI
 * employee — live on the right: visitors can talk to her straight away.
 * The hero is always dark (it sits on video) in both themes.
 */
export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations("hero");
  const tStats = useTranslations("stats");
  const isAr = locale === "ar";
  const reduce = useReducedMotion();

  // while the hero chat is on screen, the floating "Ask Nora" button stays hidden
  const chatRef = useRef<HTMLDivElement>(null);
  const chatInView = useInView(chatRef, { margin: "0px 0px -20% 0px" });
  const { setHeroChatVisible, loading } = useNora();
  useEffect(() => {
    setHeroChatVisible(chatInView);
    return () => setHeroChatVisible(false);
  }, [chatInView, setHeroChatVisible]);

  const stats = [
    { ...splitStat(COMPANY_STATS.projects), label: tStats("projects") },
    { ...splitStat(COMPANY_STATS.clients), label: tStats("clients") },
    { ...splitStat(COMPANY_STATS.years), label: tStats("years") },
  ];
  const trust = isAr
    ? [{ Icon: Building2, t: "أبوظبي · العين · دبي" }, { Icon: Languages, t: "عربي وإنجليزي" }, { Icon: ShieldCheck, t: "بيانات خاصة لكل شركة" }]
    : [{ Icon: Building2, t: "Abu Dhabi · Al Ain · Dubai" }, { Icon: Languages, t: "Arabic & English" }, { Icon: ShieldCheck, t: "Private data per company" }];

  return (
    <section className="dark relative overflow-hidden bg-[#04060D] min-h-[100svh] flex items-center pt-28 pb-16 lg:pt-32" aria-label={isAr ? "القسم الرئيسي" : "Hero section"}>
      {/* real footage */}
      <div className="absolute inset-0" aria-hidden="true">
        {reduce ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/videos/dubai-poster.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="auto" poster="/videos/dubai-poster.jpg">
            <source src="/videos/dubai.mp4" type="video/mp4" />
            <source src="/videos/dubai.webm" type="video/webm" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-[#04060D]/90 via-[#04060D]/55 to-[#04060D]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060D] via-transparent to-[#04060D]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_20%_40%,rgba(59,98,252,.22),transparent_70%)] rtl:bg-[radial-gradient(50%_60%_at_80%_40%,rgba(59,98,252,.22),transparent_70%)]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* copy */}
        <div className="lg:col-span-7 text-start">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className="eyebrow">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              {t("badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.1, duration: 0.9, ease }}
            className="mt-6 font-heading font-extrabold text-white leading-[1.15] text-[clamp(2.3rem,4.6vw,4.1rem)] tracking-[-0.02em]"
          >
            {t("title")}
            <span className="block text-blue-glow pb-1">{t("titleHighlight")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease }}
            className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link href={`/${locale}/contact`} className="btn-glow">
              {t("cta1")}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
            <Link href="#products" className="btn-ghost">
              {t("cta2")}
              <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.8 }} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
            {trust.map(({ Icon, t: label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon className="w-4 h-4 text-[#9DB0FE]" aria-hidden="true" /> {label}
              </li>
            ))}
          </motion.ul>

          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-extrabold text-white tabular-nums"><CountUp end={s.end} suffix={s.suffix} /></dd>
                <p className="text-sm text-slate-400" aria-hidden="true">{s.label}</p>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Nora, live */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 1, ease }}
          className="lg:col-span-5"
        >
          <div ref={chatRef} className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-[#3B62FC]/25 blur-3xl" aria-hidden="true" />
            <div className="relative rounded-[1.75rem] overflow-hidden ring-gradient bg-[#070B16]/90 backdrop-blur-xl shadow-[0_40px_120px_-30px_rgba(59,98,252,.6)] flex flex-col h-[560px] max-h-[78vh]">
              <div className="relative flex items-center gap-3.5 px-5 py-4 border-b border-white/[.08] bg-gradient-to-r from-[#0B1430] to-[#101a3d]">
                <span className="relative shrink-0">
                  <NoraOrb size={52} active={loading} />
                  <span className="absolute -bottom-0.5 -end-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-[#0B1430]" />
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-white">{isAr ? "نورا — موظفة نوركا الذكية" : "Nora — Norka's AI employee"}</p>
                  <p className="text-xs text-slate-300">{isAr ? "متاحة الآن · تحدّث معها مباشرة" : "Online now · talk to her right here"}</p>
                </div>
                <span className="ms-auto hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-[#C7D2FE] bg-[#3B62FC]/20">Live AI</span>
              </div>
              <NoraThread isAr={isAr} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
