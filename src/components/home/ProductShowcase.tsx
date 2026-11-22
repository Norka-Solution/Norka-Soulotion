"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { BarChart3, Smartphone, Sparkles, Check } from "lucide-react";
import SectionHeader from "@/components/kit/SectionHeader";
import Reveal from "@/components/kit/Reveal";
import DashboardMockup from "@/components/visuals/DashboardMockup";
import { PhoneMock, AIChatMock } from "@/components/visuals/AppMocks";
import { cn } from "@/lib/utils";
import { scrollToY } from "@/components/fx/SmoothScroll";

type Item = { title: string; description: string; points: string[] };
const ICONS = [BarChart3, Smartphone, Sparkles];
const ease = [0.22, 1, 0.36, 1] as const;

function Visual({ i, isAr }: { i: number; isAr: boolean }) {
  if (i === 0) return <div className="w-full max-w-[640px]"><DashboardMockup isAr={isAr} /></div>;
  if (i === 1) return <PhoneMock isAr={isAr} />;
  return <AIChatMock isAr={isAr} />;
}

/**
 * Desktop: the section pins to the screen while you scroll, and the three
 * products (ERP, mobile, AI) take turns. Mobile: a simple stacked list.
 */
export default function ProductShowcase({ locale }: { locale: string }) {
  const t = useTranslations("showcase");
  const items = t.raw("items") as Item[];
  const isAr = locale === "ar";

  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = items.length;
    const idx = Math.min(n - 1, Math.floor(v * n));
    setActive(idx);
    setProgress(Math.min(1, Math.max(0, v * n - idx)));
  });

  const header = (
    <SectionHeader eyebrow={t("badge")} title={t("title")} highlight={t("highlight")} subtitle={t("subtitle")} className="mb-10 md:mb-12" />
  );

  return (
    <section className="relative bg-page" aria-label={t("badge")}>
      {/* desktop: pinned */}
      <div ref={track} className="hidden lg:block relative" style={{ height: `${items.length * 100 + 40}vh` }}>
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 bg-dots opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_70%_50%,#000,transparent)]" aria-hidden="true" />
          <div className="relative max-w-7xl w-full mx-auto px-8 pt-16">
            <div className="grid grid-cols-12 gap-10 items-center">
              <div className="col-span-5">
              <div className="mb-8">
                <span className="eyebrow mb-5">{t("badge")}</span>
                <h2 className="t-h2 text-[clamp(1.9rem,3vw,2.75rem)]">
                  <span className="text-hero">{t("title")}</span> <span className="text-blue-glow">{t("highlight")}</span>
                </h2>
              </div>
              <ol className="space-y-2">
                {items.map((it, i) => {
                  const Icon = ICONS[i];
                  const on = i === active;
                  return (
                    <li key={it.title}>
                      <button
                        type="button"
                        onClick={() => {
                          const el = track.current;
                          if (!el) return;
                          const top = el.getBoundingClientRect().top + window.scrollY;
                          const span = el.offsetHeight - window.innerHeight;
                          scrollToY(top + span * ((i + 0.1) / items.length));
                        }}
                        className={cn(
                          "relative w-full text-start rounded-2xl p-5 transition-colors duration-300 cursor-pointer",
                          on ? "bg-tint-2 border border-hair-2" : "border border-transparent hover:bg-tint"
                        )}
                        aria-current={on ? "step" : undefined}
                      >
                        <div className="flex items-center gap-3">
                          <span className={cn("grid place-items-center w-10 h-10 rounded-xl transition-colors", on ? "bg-[#3B62FC] text-white" : "bg-tint-2 text-ink-4")}>
                            <Icon className="w-5 h-5" aria-hidden="true" />
                          </span>
                          <span className={cn("t-h3 transition-colors", on ? "text-ink-1" : "text-ink-4")}>{it.title}</span>
                        </div>
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease }}
                              className="overflow-hidden"
                            >
                              <p className="t-small mt-3">{it.description}</p>
                              <ul className="mt-3 space-y-1.5">
                                {it.points.map((p) => (
                                  <li key={p} className="flex items-center gap-2 text-sm text-ink-2">
                                    <Check className="w-4 h-4 text-[#3B62FC]" aria-hidden="true" /> {p}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {on && (
                          <span className="absolute bottom-0 inset-x-5 h-0.5 rounded-full bg-hair overflow-hidden" aria-hidden="true">
                            <span className="block h-full bg-gradient-to-r from-[#3B62FC] to-[#38BDF8]" style={{ width: `${progress * 100}%` }} />
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ol>
              </div>

              <div className="col-span-7 relative h-[min(80vh,700px)] grid place-items-center">
                <div className="absolute inset-10 rounded-full bg-[#3B62FC]/20 blur-[90px]" aria-hidden="true" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 30, scale: 0.96, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, scale: 0.98, filter: "blur(6px)" }}
                    transition={{ duration: 0.55, ease }}
                    className="relative w-full grid place-items-center scale-[.92] xl:scale-100"
                  >
                    <Visual i={active} isAr={isAr} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile / tablet: stacked */}
      <div className="lg:hidden max-w-2xl mx-auto px-4 sm:px-6 py-20">
        {header}
        <div className="space-y-16">
          {items.map((it, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={it.title}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-[#3B62FC] text-white"><Icon className="w-5 h-5" aria-hidden="true" /></span>
                  <h3 className="t-h3 text-ink-1">{it.title}</h3>
                </div>
                <p className="t-body">{it.description}</p>
                <div className="mt-6 grid place-items-center"><Visual i={i} isAr={isAr} /></div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
