"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight, Sparkles, LayoutDashboard, Bot, Smartphone,
  Boxes, Building2, Languages, Printer, MessageCircle, ListChecks, Lock, Eye, KeyRound, CheckCircle2, Bell,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/kit/SectionHeader";
import DashboardMockup from "@/components/visuals/DashboardMockup";
import { AIFlowMock, PhoneMock } from "@/components/visuals/AppMocks";
import { useNora } from "@/components/ai/NoraContext";
import { cn } from "@/lib/utils";

type Key = "erp" | "ai" | "mobile";
type Item = { name: string; tag: string; desc: string; points: string[] };

const ease = [0.22, 1, 0.36, 1] as const;
const ROTATE_MS = 8000;

const PRODUCTS: { key: Key; Icon: LucideIcon; color: string; pointIcons: LucideIcon[] }[] = [
  { key: "erp", Icon: LayoutDashboard, color: "from-[#6384FF] to-[#2848D8]", pointIcons: [Boxes, Building2, Languages, Printer] },
  { key: "ai", Icon: Bot, color: "from-[#A78BFA] to-[#6D28D9]", pointIcons: [MessageCircle, ListChecks, Lock, Eye] },
  { key: "mobile", Icon: Smartphone, color: "from-[#22D3EE] to-[#0E7490]", pointIcons: [KeyRound, CheckCircle2, Bell] },
];

/** Norka's own products as one interactive showcase: pick a product (or let it rotate) and see it working. */
export default function Products({ locale }: { locale: string }) {
  const t = useTranslations("products");
  const isAr = locale === "ar";
  const reduce = useReducedMotion();
  const { setOpen } = useNora();
  const item = (k: Key) => t.raw(`items.${k}`) as Item;

  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true); // stops for good once the visitor picks a tab
  useEffect(() => {
    if (!auto || reduce) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % PRODUCTS.length), ROTATE_MS);
    return () => clearTimeout(id);
  }, [active, auto, reduce]);

  const p = PRODUCTS[active];
  const it = item(p.key);

  return (
    <section id="products" className="relative py-20 md:py-28 bg-page scroll-mt-24 overflow-hidden" aria-labelledby="products-heading">
      <div className="absolute inset-x-0 top-1/3 h-[480px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(59,98,252,.14),transparent_70%)] pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader id="products-heading" eyebrow={t("badge")} title={t("title")} highlight={t("highlight")} subtitle={t("subtitle")} />

        {/* product tabs */}
        <div role="tablist" aria-label={t("badge")} className="mx-auto mb-10 grid grid-cols-3 gap-2 sm:gap-3 max-w-3xl p-1.5 rounded-2xl bg-tint border border-hair">
          {PRODUCTS.map((x, i) => {
            const on = i === active;
            return (
              <button
                key={x.key}
                role="tab"
                id={`tab-${x.key}`}
                aria-selected={on}
                aria-controls="product-panel"
                onClick={() => { setActive(i); setAuto(false); }}
                className={cn(
                  "relative overflow-hidden flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-2 sm:px-4 py-3 rounded-xl text-center sm:text-start transition-colors cursor-pointer",
                  on ? "bg-panel shadow-lg shadow-black/10 ring-1 ring-hair-2" : "hover:bg-tint-2"
                )}
              >
                <span className={cn("grid place-items-center w-9 h-9 rounded-xl text-white bg-gradient-to-br shrink-0 transition-transform", x.color, on ? "scale-105" : "opacity-70")}>
                  <x.Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className={cn("block text-sm font-bold", on ? "text-ink-1" : "text-ink-3")}>{item(x.key).name}</span>
                  <span className="hidden sm:block text-[11px] text-ink-4">{item(x.key).tag}</span>
                </span>
                {on && auto && !reduce && (
                  <motion.span
                    key={`bar-${active}`}
                    className="absolute bottom-0 start-0 h-0.5 bg-gradient-to-r from-[#6384FF] to-[#38BDF8]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* panel */}
        <div id="product-panel" role="tabpanel" aria-labelledby={`tab-${p.key}`} className="card-glow overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease }}
              className="grid grid-cols-1 lg:grid-cols-12"
            >
              {/* copy */}
              <div className="lg:col-span-5 p-7 md:p-10 flex flex-col text-start">
                <span className="inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider text-accent-soft bg-[#3B62FC]/10">
                  {p.key !== "erp" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                  {it.tag}
                </span>
                <h3 className="mt-4 t-h3-lg text-ink-1">{it.name}</h3>
                <p className="mt-3 t-body">{it.desc}</p>
                <ul className="mt-6 space-y-3">
                  {it.points.map((pt, i) => {
                    const Ico = p.pointIcons[i] ?? CheckCircle2;
                    return (
                      <motion.li
                        key={pt}
                        initial={{ opacity: 0, x: isAr ? 12 : -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease }}
                        className="flex items-center gap-3 text-sm font-medium text-ink-2"
                      >
                        <span className={cn("grid place-items-center w-8 h-8 rounded-lg text-white bg-gradient-to-br shrink-0", p.color)}>
                          <Ico className="w-4 h-4" aria-hidden="true" />
                        </span>
                        {pt}
                      </motion.li>
                    );
                  })}
                </ul>
                <div className="mt-auto pt-8 flex flex-wrap gap-3">
                  {p.key === "ai" ? (
                    <>
                      <button type="button" onClick={() => setOpen(true)} className="btn-glow cursor-pointer">
                        <Sparkles className="w-4 h-4" aria-hidden="true" /> {t("tryNora")}
                      </button>
                      <Link href={`/${locale}/contact`} className="btn-ghost">{t("talk")}<ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" /></Link>
                    </>
                  ) : p.key === "mobile" ? (
                    <a href="https://app.norkasolution.com/apps" className="btn-glow">{t("open")}<ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" /></a>
                  ) : (
                    <Link href={`/${locale}/contact`} className="btn-glow">{t("talk")}<ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" /></Link>
                  )}
                </div>
              </div>

              {/* visual */}
              <div className="dark lg:col-span-7 relative min-h-[380px] md:min-h-[460px] overflow-hidden bg-gradient-to-br from-[#0B1430] via-[#070B16] to-[#04060D] p-6 md:p-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
                <div className={cn("absolute -top-24 -end-24 w-96 h-96 rounded-full blur-[110px] opacity-40 bg-gradient-to-br", p.color)} aria-hidden="true" />
                <div className="relative w-full">
                  {p.key === "erp" && <DashboardMockup isAr={isAr} />}
                  {p.key === "ai" && <AIFlowMock isAr={isAr} />}
                  {p.key === "mobile" && (
                    <div className="relative flex justify-center" aria-hidden="true">
                      <div className="scale-[.85] md:scale-90 origin-center -my-10"><PhoneMock isAr={isAr} /></div>
                      <motion.div initial={{ opacity: 0, x: isAr ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.6, ease }}
                        className="hidden sm:flex absolute top-[18%] start-0 md:start-[6%] items-center gap-2 rounded-xl px-3 py-2.5 bg-[#0B1122]/90 backdrop-blur border border-white/10 text-[12px] text-slate-200 shadow-xl">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {isAr ? "تمت الموافقة على الإجازة" : "Leave request approved"}
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: isAr ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1, duration: 0.6, ease }}
                        className="hidden sm:flex absolute bottom-[20%] end-0 md:end-[6%] items-center gap-2 rounded-xl px-3 py-2.5 bg-[#0B1122]/90 backdrop-blur border border-white/10 text-[12px] text-slate-200 shadow-xl">
                        <Bell className="w-4 h-4 text-[#9DB0FE]" /> {isAr ? "أمر شراء PO-311 بانتظار موافقتك" : "PO-311 awaits your approval"}
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
