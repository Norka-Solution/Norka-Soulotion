"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Lightbulb, ShieldCheck, Clock, Headphones, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/kit/SectionHeader";
import SpotlightCard from "@/components/kit/SpotlightCard";
import Reveal from "@/components/kit/Reveal";
import CountUp from "@/components/ui/CountUp";
import { COMPANY_STATS } from "@/lib/constants";

const VALUES = [
  { key: "innovation", Icon: Lightbulb },
  { key: "quality", Icon: ShieldCheck },
  { key: "reliability", Icon: Clock },
  { key: "support", Icon: Headphones },
] as const;

function splitStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return { end: match ? Number(match[1]) : 0, suffix: match ? match[2] : "" };
}

export default function WhyNorka({ locale }: { locale: string }) {
  const t = useTranslations("why");
  const tAbout = useTranslations("about");
  const tStats = useTranslations("stats");

  const stats = [
    { ...splitStat(COMPANY_STATS.projects), label: tStats("projects") },
    { ...splitStat(COMPANY_STATS.clients), label: tStats("clients") },
    { ...splitStat(COMPANY_STATS.team), label: tStats("team") },
    { ...splitStat(COMPANY_STATS.years), label: tStats("years") },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[var(--ink)] overflow-hidden" aria-labelledby="why-heading">
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#3B62FC]/10 blur-[140px]" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="why-heading"
          eyebrow={t("badge")}
          title={t("title")}
          highlight={t("highlight")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUES.map(({ key, Icon }, i) => (
            <Reveal key={key} delay={i * 0.08} className="h-full">
              <SpotlightCard className="h-full p-7">
                <Icon className="w-6 h-6 text-[#9DB0FE]" aria-hidden="true" />
                <h3 className="mt-6 text-lg font-semibold text-white">{tAbout(`values.${key}.title`)}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{tAbout(`values.${key}.description`)}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* big numbers */}
        <Reveal className="mt-16">
          <div className="rounded-3xl border border-white/[.06] bg-white/[.015] grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[.06] rtl:divide-x-reverse overflow-hidden">
            {stats.map((s) => (
              <div key={s.label} className="p-8 md:p-10 text-center">
                <p className="font-heading font-bold tracking-tight text-[clamp(2.5rem,5vw,4rem)] leading-none text-blue-glow tabular-nums">
                  <CountUp end={s.end} suffix={s.suffix} duration={2} />
                </p>
                <p className="mt-3 text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <Link href={`/${locale}/about`} className="btn-ghost">
            {tAbout("learnMore")}
            <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
