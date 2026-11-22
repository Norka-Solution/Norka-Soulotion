"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ArrowRight, CheckCircle, Code2, Smartphone, BarChart3, Globe, Server, Palette, Megaphone, Building2 } from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/home/CTASection";
import PageHero from "@/components/kit/PageHero";
import Reveal from "@/components/kit/Reveal";
import ServiceOrbit from "@/components/visuals/ServiceOrbit";
import { services } from "@/lib/data/services";
import type { ServiceCopy } from "@/sanity/lib/fetch-content";

const serviceIcons: Record<string, typeof Code2> = {
  software:       Code2,
  mobile:         Smartphone,
  erp:            BarChart3,
  web:            Globe,
  infrastructure: Server,
  uiux:           Palette,
  marketing:      Megaphone,
  consulting:     Building2,
};

interface ServicesContentProps {
  serviceCopy?: ServiceCopy[] | null;
}

export default function ServicesContent({ serviceCopy }: ServicesContentProps) {
  const t      = useTranslations("services");
  const navT   = useTranslations("nav");
  const params = useParams();
  const locale = params.locale as string;
  const lang   = locale as "en" | "ar";
  const isAr   = locale === "ar";

  // CMS copy (when present) wins over the i18n message catalog — same
  // fallback-safe pattern used on the homepage services preview.
  const copyFor = (key: string) => {
    const cms = serviceCopy?.find((s) => s.key === key);
    return {
      title: cms ? cms.title[lang] : t(`${key}.title`),
      description: cms ? cms.description[lang] : t(`${key}.description`),
      features: cms ? cms.features[lang] : (t.raw(`${key}.features`) as string[]),
    };
  };

  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={navT("home")}
        crumb={t("title")}
        eyebrow={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* quick index */}
      <nav className="relative bg-[var(--ink)] pb-6" aria-label={isAr ? "الخدمات" : "Services"}>
        <ul className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-2">
          {services.map((service) => {
            const Icon = serviceIcons[service.key] ?? Code2;
            return (
              <li key={service.key}>
                <a
                  href={`#${service.key}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm text-slate-300 bg-white/[.03] border border-white/[.07] hover:border-[#6384FF]/40 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#9DB0FE]" aria-hidden="true" />
                  {copyFor(service.key).title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <section className="relative bg-[var(--ink)] py-20 md:py-28" aria-labelledby="services-list-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="services-list-heading" className="sr-only">{t("title")}</h2>

          <div className="space-y-24 md:space-y-36">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.key] ?? Code2;
              const copy = copyFor(service.key);
              const flip = index % 2 === 1;

              return (
                <article
                  key={service.key}
                  id={service.key}
                  className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-center"
                  aria-label={copy.title}
                >
                  <Reveal className={flip ? "lg:order-2" : undefined}>
                    <ServiceOrbit Icon={Icon} features={copy.features} />
                  </Reveal>

                  <Reveal delay={0.1}>
                    <span className="font-mono text-sm text-[#6384FF] tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight text-white leading-tight">
                      {copy.title}
                    </h3>
                    <p className="mt-4 text-lg text-slate-400 leading-relaxed">{copy.description}</p>

                    <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label={isAr ? "المميزات" : "Features"}>
                      {copy.features.map((feature: string) => (
                        <li key={feature} className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/[.025] border border-white/[.06]">
                          <CheckCircle className="w-4 h-4 text-[#6384FF] shrink-0" aria-hidden="true" />
                          <span className="text-sm text-slate-200">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/${locale}/contact`}
                      className="btn-ghost mt-8"
                      aria-label={`${isAr ? "استفسر عن" : "Inquire about"} ${copy.title}`}
                    >
                      {isAr ? "اطلب عرض سعر" : "Get a quote"}
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                    </Link>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </>
  );
}
