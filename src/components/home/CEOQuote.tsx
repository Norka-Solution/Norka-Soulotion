"use client";

import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import MonogramAvatar from "@/components/art/MonogramAvatar";
import Reveal from "@/components/kit/Reveal";

interface CEOQuoteProps {
  locale?: string;
}

export default function CEOQuote({ locale }: CEOQuoteProps) {
  const t = useTranslations("leadership");
  const isAr = locale === "ar";
  const name = isAr ? "م. نورهان" : "Eng. Nourhan";

  return (
    <section
      className="relative py-20 md:py-28 bg-page overflow-hidden"
      aria-label={isAr ? "رسالة المدير التنفيذي" : "Managing Director message"}
    >
      <div className="horizon absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <span className="eyebrow mb-10">{t("badge")}</span>
          <Quote className="w-10 h-10 text-[#3B62FC]/50 mx-auto mt-8 mb-8" aria-hidden="true" />
          <blockquote className="font-heading text-[clamp(1.5rem,3.2vw,2.5rem)] font-medium leading-[1.35] tracking-tight text-ink-2">
            {isAr ? (
              <>
                &ldquo;في نوركا سوليوشن، نحن لا نبني التكنولوجيا فقط &mdash;
                <span className="text-ink-1 font-semibold"> نحن نهندس مستقبل </span>
                أعمالك. كل حل نقدمه مصنوع بدقة وشغف وهدف.&rdquo;
              </>
            ) : (
              <>
                &ldquo;At Norka Solution, we don&apos;t just build technology &mdash;
                <span className="text-ink-1 font-semibold"> we engineer the future </span>
                of your business. Every solution we deliver is crafted with precision, passion, and purpose.&rdquo;
              </>
            )}
          </blockquote>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex items-center justify-center gap-3">
          <MonogramAvatar name={name} className="w-12 h-12 rounded-full text-sm shrink-0 ring-2 ring-[#3B62FC]/40" />
          <div className="text-start">
            <div className="text-ink-1 font-semibold">{name}</div>
            <div className="text-ink-4 text-sm">
              {isAr ? "المدير التنفيذي، نوركا سوليوشن" : "Managing Director, Norka Solution"}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
