"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Quote, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/kit/Reveal";
import TeamPhoto from "@/components/art/TeamPhoto";
import { founder } from "@/lib/data/team";

interface CEOQuoteProps {
  locale?: string;
}

/** A message from the founder, with his photo (or monogram until one is set). */
export default function CEOQuote({ locale = "en" }: CEOQuoteProps) {
  const t = useTranslations("leadership");
  const isAr = locale === "ar";
  const lang = isAr ? "ar" : "en";

  return (
    <section className="relative py-20 md:py-28 bg-page overflow-hidden" aria-labelledby="founder-heading">
      <div className="horizon absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#3B62FC]/40 to-[#38BDF8]/10 blur-2xl" aria-hidden="true" />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden ring-gradient bg-panel">
              <TeamPhoto member={founder} lang={lang} sizes="(max-width: 1024px) 90vw, 400px" className="absolute inset-0 w-full h-full text-7xl" />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/75 to-transparent">
                <p className="text-white text-xl font-bold">{founder.name[lang]}</p>
                <p className="text-sm text-slate-200">{founder.role[lang]}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7 text-start">
          <span className="eyebrow">{isAr ? "كلمة المؤسس" : "From the founder"}</span>
          <h2 id="founder-heading" className="sr-only">{t("title")}</h2>
          <Quote className="w-10 h-10 text-[#3B62FC]/50 mt-8 mb-5 rtl:-scale-x-100" aria-hidden="true" />
          <blockquote className="font-heading text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold leading-[1.5] text-ink-2">
            {isAr ? (
              <>
                بدأنا نوركا لأن الشركات في الإمارات تستحق أنظمة تفهم طريقة عملها، بالعربي والإنجليزي.
                <span className="text-blue-glow"> نحن لا نبني برمجيات فقط، بل نبني الطريقة التي تُدار بها شركتك.</span>
              </>
            ) : (
              <>
                We started Norka because companies in the UAE deserve systems built around how they actually work, in Arabic and English.
                <span className="text-blue-glow"> We don&apos;t just build software; we build the way your business runs.</span>
              </>
            )}
          </blockquote>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div>
              <p className="text-ink-1 font-bold text-lg">{founder.name[lang]}</p>
              <p className="text-ink-4 text-sm">{founder.role[lang]}{isAr ? "، نوركا سوليوشن" : ", Norka Solution"}</p>
            </div>
            <Link href={`/${locale}/about`} className="btn-ghost ms-auto">
              {isAr ? "تعرّف على فريقنا" : "Meet the team"}
              <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
