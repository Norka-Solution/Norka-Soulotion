"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ArrowRight, CheckCircle, Code2, Smartphone, BarChart3, Globe, Server, Palette, Megaphone, Building2 } from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/home/CTASection";
import ProductShowcase from "@/components/home/ProductShowcase";
import PageHero from "@/components/kit/PageHero";
import Reveal from "@/components/kit/Reveal";
import ServicePhoto from "@/components/visuals/ServicePhoto";

const servicePhotos: Record<string, string> = {
  software: "developer",
  mobile: "payment",
  erp: "warehouse-2",
  web: "online-shopping",
  infrastructure: "server-room",
  uiux: "ux-design",
  marketing: "phone-business",
  consulting: "handshake",
};
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
        image="/images/photos/dev-team.jpg"
      />

      {/* quick index */}
      <nav className="relative bg-page pt-10 pb-6" aria-label={isAr ? "الخدمات" : "Services"}>
        <ul className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-2">
          {services.map((service) => {
            const Icon = serviceIcons[service.key] ?? Code2;
            return (
              <li key={service.key}>
                <a
                  href={`#${service.key}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm text-ink-2 bg-tint border border-hair hover:border-[#6384FF]/40 hover:text-ink-1 transition-colors"
                >
                  <Icon className="w-4 h-4 text-accent-soft" aria-hidden="true" />
                  {copyFor(service.key).title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <ProductShowcase locale={locale} />

      <section className="relative bg-page py-20 md:py-28" aria-labelledby="services-list-heading">
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
                    <ServicePhoto src={`/images/photos/${servicePhotos[service.key] ?? "dev-team"}.jpg`} alt={copy.title} Icon={Icon} features={copy.features} />
                  </Reveal>

                  <Reveal delay={0.1}>
                    <span className="font-mono text-sm text-[#6384FF] tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 t-h3-lg text-ink-1">
                      {copy.title}
                    </h3>
                    <p className="mt-4 t-lead">{copy.description}</p>

                    <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label={isAr ? "المميزات" : "Features"}>
                      {copy.features.map((feature: string) => (
                        <li key={feature} className="flex items-center gap-3 rounded-xl px-4 py-3 bg-tint border border-hair">
                          <CheckCircle className="w-4 h-4 text-[#6384FF] shrink-0" aria-hidden="true" />
                          <span className="text-sm text-ink-2">{feature}</span>
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
