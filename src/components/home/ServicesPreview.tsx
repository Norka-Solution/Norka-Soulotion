"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowUpRight, Code2, Smartphone, BarChart3, Globe, Server, Palette, Megaphone, Building2,
  Package, Users, Wallet, ShoppingCart, Truck, FileText,
} from "lucide-react";
import type { ServiceCopy } from "@/sanity/lib/fetch-content";
import SectionHeader from "@/components/kit/SectionHeader";
import SpotlightCard from "@/components/kit/SpotlightCard";
import Reveal from "@/components/kit/Reveal";
import { cn } from "@/lib/utils";

type Key = "software" | "mobile" | "erp" | "web" | "infrastructure" | "uiux" | "marketing" | "consulting";

const ICONS: Record<Key, typeof Code2> = {
  software: Code2, mobile: Smartphone, erp: BarChart3, web: Globe,
  infrastructure: Server, uiux: Palette, marketing: Megaphone, consulting: Building2,
};

// bento placement on large screens (4 columns)
const LAYOUT: { key: Key; className: string }[] = [
  { key: "erp", className: "lg:col-span-2 lg:row-span-2" },
  { key: "software", className: "lg:col-span-2" },
  { key: "mobile", className: "" },
  { key: "web", className: "" },
  { key: "infrastructure", className: "" },
  { key: "uiux", className: "" },
  { key: "marketing", className: "" },
  { key: "consulting", className: "" },
];

const ease = [0.22, 1, 0.36, 1] as const;

/* ── code-built mini visuals ─────────────────────────────────── */

function ErpVisual({ isAr }: { isAr: boolean }) {
  const mods = [
    { Icon: Package, label: isAr ? "المخزون" : "Inventory" },
    { Icon: Users, label: isAr ? "الموارد البشرية" : "HR & Payroll" },
    { Icon: Wallet, label: isAr ? "المالية" : "Finance" },
    { Icon: ShoppingCart, label: isAr ? "المبيعات" : "Sales" },
    { Icon: Truck, label: isAr ? "التوريد" : "Supply chain" },
    { Icon: FileText, label: isAr ? "التقارير" : "Reports" },
  ];
  return (
    <div className="relative h-56 md:h-64 mt-8" aria-hidden="true">
      {/* hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="absolute inset-0 rounded-2xl bg-[#3B62FC] blur-2xl opacity-50 animate-pulse" />
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6384FF] to-[#2848D8] grid place-items-center text-white font-black text-xl ring-1 ring-white/20">
          N
        </div>
      </div>
      {/* spokes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 240" preserveAspectRatio="none">
        {mods.map((_, i) => {
          const a = (i / mods.length) * Math.PI * 2 - Math.PI / 2;
          const x = 200 + Math.cos(a) * 160, y = 120 + Math.sin(a) * 95;
          return (
            <motion.line
              key={i} x1="200" y1="120" x2={x} y2={y}
              stroke="url(#spoke)" strokeWidth="1.2" strokeDasharray="3 5"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.9, ease }}
            />
          );
        })}
        <defs>
          <linearGradient id="spoke"><stop offset="0" stopColor="#6384FF" /><stop offset="1" stopColor="#6384FF" stopOpacity=".1" /></linearGradient>
        </defs>
      </svg>
      {/* modules */}
      {mods.map(({ Icon, label }, i) => {
        const a = (i / mods.length) * Math.PI * 2 - Math.PI / 2;
        const left = 50 + Math.cos(a) * 40, top = 50 + Math.sin(a) * 40;
        return (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0B1122] border border-white/10 text-[11px] font-medium text-slate-300 whitespace-nowrap shadow-lg shadow-black/40"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <Icon className="w-3.5 h-3.5 text-[#9DB0FE]" /> {label}
          </motion.div>
        );
      })}
    </div>
  );
}

function CodeVisual() {
  const lines = [
    [["const ", "#C084FC"], ["app", "#E2E8F0"], [" = ", "#94A3B8"], ["norka", "#9DB0FE"], [".create({", "#E2E8F0"]],
    [["  ai: ", "#94A3B8"], ["true", "#F59E0B"], [",", "#94A3B8"]],
    [["  users: ", "#94A3B8"], ["\"unlimited\"", "#34D399"], [",", "#94A3B8"]],
    [["  deploy: ", "#94A3B8"], ["\"uae-cloud\"", "#34D399"]],
    [["})", "#E2E8F0"]],
  ] as const;
  return (
    <div className="mt-6 rounded-xl bg-[#060A14] border border-white/[.07] p-4 font-mono text-[12px] leading-6 overflow-hidden" dir="ltr" aria-hidden="true">
      {lines.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
          className="whitespace-pre"
        >
          <span className="text-slate-600 select-none me-4">{i + 1}</span>
          {l.map(([txt, color], j) => <span key={j} style={{ color }}>{txt}</span>)}
          {i === lines.length - 1 && <span className="inline-block w-2 h-4 align-middle ms-0.5 bg-[#6384FF] animate-pulse" />}
        </motion.div>
      ))}
    </div>
  );
}

/* ── section ─────────────────────────────────────────────────── */

interface ServicesPreviewProps {
  locale: string;
  /** CMS copy from Sanity, when configured — falls back to i18n messages when null. */
  serviceCopy?: ServiceCopy[] | null;
}

export default function ServicesPreview({ locale, serviceCopy }: ServicesPreviewProps) {
  const t = useTranslations("services");
  const lang = locale as "en" | "ar";
  const isAr = locale === "ar";

  const copyFor = (key: Key) => {
    const cms = serviceCopy?.find((s) => s.key === key);
    return {
      title: cms ? cms.title[lang] : t(`${key}.title`),
      description: cms ? cms.description[lang] : t(`${key}.description`),
      features: cms ? cms.features[lang] : (t.raw(`${key}.features`) as string[]),
    };
  };

  return (
    <section id="services" className="relative py-20 md:py-28 bg-[var(--ink)]" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="services-heading"
          eyebrow={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:auto-rows-[minmax(220px,auto)]">
          {LAYOUT.map(({ key, className }, i) => {
            const Icon = ICONS[key];
            const copy = copyFor(key);
            const big = key === "erp";
            const wide = key === "software";
            return (
              <Reveal key={key} delay={(i % 4) * 0.06} className={cn("h-full", className, (big || wide) && "sm:col-span-2")}>
                <Link href={`/${locale}/services`} className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6384FF] rounded-[1.25rem]">
                  <SpotlightCard className={cn("h-full p-6 md:p-7 flex flex-col overflow-hidden", big && "md:p-9")}>
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid place-items-center w-11 h-11 rounded-xl bg-[#3B62FC]/10 ring-1 ring-[#6384FF]/25 text-[#9DB0FE]">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <ArrowUpRight
                        className="w-5 h-5 text-slate-600 transition-all duration-300 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className={cn("mt-5 font-semibold text-white tracking-tight", big ? "text-2xl md:text-3xl" : "text-lg")}>
                      {copy.title}
                    </h3>
                    <p className={cn("mt-2 text-slate-400 leading-relaxed", big ? "text-base max-w-md" : "text-sm line-clamp-3")}>
                      {copy.description}
                    </p>
                    {(big || wide) && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {copy.features.map((f) => (
                          <li key={f} className="px-2.5 py-1 rounded-md text-[12px] text-slate-300 bg-white/[.04] border border-white/[.06]">
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                    {big && <div className="mt-auto"><ErpVisual isAr={isAr} /></div>}
                    {wide && <CodeVisual />}
                  </SpotlightCard>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Link href={`/${locale}/services`} className="btn-ghost">
            {t("viewAll")}
            <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
