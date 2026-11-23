"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, Languages, Building2, X, MessageCircle, CheckCircle2 } from "lucide-react";
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

/** Live product moments floating around the chat: the software, not a skyline. */
function HeroFloaters({ isAr }: { isAr: boolean }) {
  const cards = [
    {
      pos: "-top-10 -start-16 xl:-start-24",
      delay: 0.9,
      body: (
        <>
          <p className="text-[10px] text-slate-400">{isAr ? "إيرادات الشهر" : "Monthly revenue"}</p>
          <p className="text-lg font-extrabold text-white tabular-nums" dir="ltr">AED 284K</p>
          <div className="mt-1 flex items-end gap-1 h-7" dir="ltr">
            {[40, 55, 48, 70, 62, 85, 100].map((h, i) => (
              <span key={i} className="w-2 rounded-sm bg-gradient-to-t from-[#2848D8] to-[#9DB0FE]" style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="mt-1 text-[10px] font-semibold text-emerald-300" dir="ltr">▲ 18.2%</p>
        </>
      ),
    },
    {
      pos: "top-[64%] -end-12 xl:-end-16",
      delay: 1.2,
      body: (
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center w-8 h-8 rounded-full bg-[#25D366] text-white"><MessageCircle className="w-4 h-4" /></span>
          <div>
            <p className="text-[11px] font-bold text-white">{isAr ? "طلب جديد · واتساب" : "New order · WhatsApp"}</p>
            <p className="text-[10px] text-slate-400">{isAr ? "ردّت نوركا AI خلال 3 ثوانٍ" : "Norka AI replied in 3s"}</p>
          </div>
        </div>
      ),
    },
    {
      pos: "-bottom-8 -start-10 xl:-start-16",
      delay: 1.5,
      body: (
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300"><CheckCircle2 className="w-4 h-4" /></span>
          <div>
            <p className="text-[11px] font-bold text-white" dir="ltr">INV-2026-0418</p>
            <p className="text-[10px] text-emerald-300">{isAr ? "تم الدفع · 26,722 د.إ" : "Paid · AED 26,722"}</p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      {cards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.85, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: c.delay, duration: 0.7, ease }}
          className={`hidden lg:block absolute z-10 ${c.pos}`}
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl px-4 py-3 bg-[#0B1122]/85 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,.8)] text-start"
          >
            {c.body}
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}

/**
 * A software backdrop (moving light, grid floor, data lines) behind the headline, and Norka AI — the
 * company's AI employee — live on the right: visitors can talk to her straight away.
 * The hero is always dark in both themes.
 */
export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations("hero");
  const tStats = useTranslations("stats");
  const isAr = locale === "ar";
  const reduce = useReducedMotion();

  // while the hero chat is on screen, the floating "Ask Norka AI" button stays hidden
  const chatRef = useRef<HTMLDivElement>(null);
  const chatInView = useInView(chatRef, { margin: "0px 0px -20% 0px" });
  const { setHeroChatVisible, loading, messages } = useNora();
  const [chatOpen, setChatOpen] = useState(true);
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
      {/* software backdrop: moving light, a perspective grid and flowing data lines */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute -top-40 start-[-10%] w-[55rem] h-[55rem] rounded-full bg-[#3B62FC]/35 blur-[140px]"
          animate={reduce ? undefined : { x: [0, 80, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 end-[-15%] w-[45rem] h-[45rem] rounded-full bg-[#7C3AED]/20 blur-[140px]"
          animate={reduce ? undefined : { x: [0, -60, 0], y: [0, -50, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[55%] [perspective:900px] overflow-hidden">
          <div className="hero-floor absolute inset-x-[-50%] top-0 h-[200%] origin-top" />
        </div>
        <svg className="absolute inset-0 w-full h-full opacity-90" preserveAspectRatio="none" viewBox="0 0 1440 900">
          {[180, 330, 520, 690].map((y, i) => (
            <path key={y} className="hero-data-line" style={{ animationDelay: `${i * 1.3}s` }}
              d={`M-50 ${y} C 360 ${y - 90}, 720 ${y + 90}, 1490 ${y - 30}`} />
          ))}
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_30%,transparent,#04060D_95%)]" />
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

        {/* Norka AI, live */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 1, ease }}
          className="lg:col-span-5"
        >
          <div ref={chatRef} className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-[#3B62FC]/25 blur-3xl" aria-hidden="true" />
            <HeroFloaters isAr={isAr} />
            <AnimatePresence mode="wait" initial={false}>
              {chatOpen ? (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.96 }}
                  transition={{ duration: 0.4, ease }}
                  className="relative rounded-[1.75rem] overflow-hidden ring-gradient bg-[#070B16]/90 backdrop-blur-xl shadow-[0_40px_120px_-30px_rgba(59,98,252,.6)] flex flex-col h-[520px] max-h-[74vh]"
                >
                  <div className="relative flex items-center gap-3.5 px-5 py-4 border-b border-white/[.08] bg-gradient-to-r from-[#0B1430] to-[#101a3d]">
                    <span className="relative shrink-0">
                      <NoraOrb size={48} active={loading} />
                      <span className="absolute -bottom-0.5 -end-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-[#0B1430]" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-white">{isAr ? "نوركا AI — موظفة نوركا الذكية" : "Norka AI — your AI employee"}</p>
                      <p className="text-xs text-slate-300">{isAr ? "متاحة الآن · تحدّث معها مباشرة" : "Online now · talk to her right here"}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setChatOpen(false)}
                      aria-label={isAr ? "إغلاق المحادثة" : "Close chat"}
                      className="ms-auto grid place-items-center w-9 h-9 rounded-full text-slate-300 bg-white/[.06] hover:bg-white/[.12] hover:text-white transition-colors cursor-pointer shrink-0"
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                  <NoraThread isAr={isAr} />
                </motion.div>
              ) : (
                <motion.button
                  key="launcher"
                  type="button"
                  onClick={() => setChatOpen(true)}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.96 }}
                  transition={{ duration: 0.4, ease }}
                  className="relative w-full rounded-[1.75rem] ring-gradient bg-[#070B16]/85 backdrop-blur-xl shadow-[0_40px_120px_-30px_rgba(59,98,252,.6)] p-8 flex flex-col items-center text-center gap-4 cursor-pointer group"
                >
                  <NoraOrb size={96} active={loading} />
                  <div>
                    <p className="text-lg font-bold text-white">{isAr ? "نوركا AI هنا عند الحاجة" : "Norka AI is here whenever you need her"}</p>
                    <p className="mt-1 text-sm text-slate-300">
                      {messages.length
                        ? isAr ? "محادثتك محفوظة، تابع من حيث توقفت." : "Your conversation is saved, pick up where you left off."
                        : isAr ? "اسألها عن أنظمتنا أو احجز عرضاً مجانياً." : "Ask about our systems or book a free demo."}
                    </p>
                  </div>
                  <span className="btn-glow group-hover:scale-[1.03] transition-transform">
                    <MessageCircle className="w-4 h-4" aria-hidden="true" /> {isAr ? "تحدّث مع نوركا AI" : "Talk to Norka AI"}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
