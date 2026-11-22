"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Check, ExternalLink, Sparkles } from "lucide-react";
import SectionHeader from "@/components/kit/SectionHeader";
import Reveal from "@/components/kit/Reveal";
import DashboardMockup from "@/components/visuals/DashboardMockup";
import { PhoneMock } from "@/components/visuals/AppMocks";
import { cn } from "@/lib/utils";
import { useNora } from "@/components/ai/NoraContext";

type Key = "erp" | "ai" | "mobile" | "invoice";
type Item = { name: string; tag: string; desc: string; points: string[] };

const INVOICE_URL = "https://norka-invoice.vercel.app";

function Points({ points }: { points: string[] }) {
  return (
    <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
      {points.map((p) => (
        <li key={p} className="flex items-start gap-2 text-sm text-ink-2">
          <Check className="w-4 h-4 mt-0.5 text-[#3B62FC] shrink-0" aria-hidden="true" /> {p}
        </li>
      ))}
    </ul>
  );
}

function Head({ tag, live }: { tag: string; live?: string }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider text-accent-soft bg-[#3B62FC]/10">{tag}</span>
      {live && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold text-emerald-600 dark:text-emerald-300 bg-emerald-500/10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {live}
        </span>
      )}
    </div>
  );
}

/** Norka's own products — the real things the company ships. */
export default function Products({ locale }: { locale: string }) {
  const t = useTranslations("products");
  const isAr = locale === "ar";
  const { setOpen } = useNora();
  const item = (k: Key) => t.raw(`items.${k}`) as Item;


  return (
    <section id="products" className="relative py-20 md:py-28 bg-page scroll-mt-24" aria-labelledby="products-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader id="products-heading" eyebrow={t("badge")} title={t("title")} highlight={t("highlight")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* ERP — the flagship, full width */}
          <Reveal className="lg:col-span-12">
            <div className="card-glow overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 p-7 md:p-10 flex flex-col">
                <Head tag={item("erp").tag} />
                <h3 className="mt-4 t-h3-lg text-ink-1">{item("erp").name}</h3>
                <p className="mt-3 t-body">{item("erp").desc}</p>
                <Points points={item("erp").points} />
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={`/${locale}/contact`} className="btn-glow">{t("talk")}<ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" /></Link>
                </div>
              </div>
              <div className="lg:col-span-7 relative min-h-[320px] bg-gradient-to-br from-[#0B1430] via-[#070B16] to-[#04060D] dark p-6 md:p-10 flex items-center">
                <div className="absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
                <div className="absolute -top-20 -end-20 w-80 h-80 rounded-full bg-[#3B62FC]/30 blur-[100px]" aria-hidden="true" />
                <div className="relative w-full">
                  <DashboardMockup isAr={isAr} />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Norka AI — real product image */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="card-glow overflow-hidden h-full flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/products/nora.jpg"
                  alt={isAr ? "نورا، موظفة نوركا الذكية" : "Nora, Norka's AI employee"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
                />
                <span className="absolute top-4 start-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-black/50 backdrop-blur">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" /> Norka AI
                </span>
              </div>
              <div className="p-7 md:p-8 flex-1 flex flex-col">
                <Head tag={item("ai").tag} live={t("live")} />
                <h3 className="mt-4 t-h3-lg text-ink-1">{item("ai").name}</h3>
                <p className="mt-3 t-body">{item("ai").desc}</p>
                <Points points={item("ai").points} />
                <div className="mt-auto pt-7 flex flex-wrap gap-3">
                  <button type="button" onClick={() => setOpen(true)} className="btn-glow cursor-pointer">
                    <Sparkles className="w-4 h-4" aria-hidden="true" /> {t("tryNora")}
                  </button>
                  <Link href={`/${locale}/contact`} className="btn-ghost">{t("talk")}<ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" /></Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mobile app */}
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="card-glow overflow-hidden h-full flex flex-col">
              <div className="relative h-[340px] overflow-hidden bg-gradient-to-b from-[#0B1430] to-[#04060D] dark">
                <div className="absolute inset-0 bg-dots opacity-60" aria-hidden="true" />
                <div className="absolute left-1/2 top-8 -translate-x-1/2 scale-[.82] origin-top">
                  <PhoneMock isAr={isAr} />
                </div>
              </div>
              <div className="p-7 md:p-8 flex-1 flex flex-col">
                <Head tag={item("mobile").tag} />
                <h3 className="mt-4 t-h3-lg text-ink-1">{item("mobile").name}</h3>
                <p className="mt-3 t-body">{item("mobile").desc}</p>
                <Points points={item("mobile").points} />
                <div className="mt-auto pt-7">
                  <a href="https://app.norkasolution.com/apps" className="btn-ghost">{t("open")}<ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" /></a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Invoice — live */}
          <Reveal className="lg:col-span-12" delay={0.05}>
            <div className="card-glow overflow-hidden grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-5 relative min-h-[240px]">
                <Image
                  src="/images/photos/accounting.jpg"
                  alt={isAr ? "محاسب يراجع الفواتير" : "Accountant reviewing invoices"}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-7 p-7 md:p-10">
                <Head tag={item("invoice").tag} live={t("live")} />
                <h3 className="mt-4 t-h3-lg text-ink-1">{item("invoice").name}</h3>
                <p className="mt-3 t-body max-w-xl">{item("invoice").desc}</p>
                <Points points={item("invoice").points} />
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={INVOICE_URL} target="_blank" rel="noopener noreferrer" className={cn("btn-ghost")}>
                    norka-invoice.vercel.app <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
