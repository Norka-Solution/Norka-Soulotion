"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lightbulb, Award, Shield, HeadphonesIcon, Target, Eye } from "lucide-react";
import CTASection from "@/components/home/CTASection";
import TechStack from "@/components/home/TechStack";
import PageHero from "@/components/kit/PageHero";
import SectionHeader from "@/components/kit/SectionHeader";
import SpotlightCard from "@/components/kit/SpotlightCard";
import Reveal from "@/components/kit/Reveal";
import CountUp from "@/components/ui/CountUp";
import TeamPhoto from "@/components/art/TeamPhoto";
import { team } from "@/lib/data/team";
import { COMPANY_STATS } from "@/lib/constants";

const valueIcons = {
  innovation: Lightbulb,
  quality: Award,
  reliability: Shield,
  support: HeadphonesIcon,
};

function splitStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return { end: match ? Number(match[1]) : 0, suffix: match ? match[2] : "" };
}

export default function AboutContent() {
  const t = useTranslations("about");
  const navT = useTranslations("nav");
  const statsT = useTranslations("stats");
  const params = useParams();
  const locale = params.locale as string;
  const isAr = locale === "ar";

  const values = ["innovation", "quality", "reliability", "support"] as const;

  const stats = [
    { ...splitStat(COMPANY_STATS.years), label: statsT("years") },
    { ...splitStat(COMPANY_STATS.projects), label: statsT("projects") },
    { ...splitStat(COMPANY_STATS.clients), label: statsT("clients") },
    { ...splitStat(COMPANY_STATS.team), label: statsT("team") },
  ];

  const timelineItems = isAr
    ? [
        { year: "2020", title: "التأسيس", desc: "تأسست نوركا سوليوشن برؤية واضحة لتقديم حلول تقنية متميزة في الإمارات." },
        { year: "2021", title: "النمو السريع", desc: "توسعنا لنضم فريقاً من 15+ متخصصاً وأنجزنا أول 30 مشروع." },
        { year: "2022", title: "التوسع الإقليمي", desc: "افتتحنا مكاتب في أبوظبي والعين ودبي، وخدمنا عملاء خليجيين." },
        { year: "2024", title: "ريادة الذكاء الاصطناعي", desc: "أطلقنا خدمات الذكاء الاصطناعي وتجاوزنا 150 مشروعاً منجزاً." },
      ]
    : [
        { year: "2020", title: "Founded", desc: "Norka Solution was established with a clear vision to deliver world-class tech solutions in the UAE." },
        { year: "2021", title: "Rapid Growth", desc: "We expanded to a team of 15+ specialists and completed our first 30 successful projects." },
        { year: "2022", title: "Regional Expansion", desc: "Opened offices in Abu Dhabi, Al Ain & Dubai, serving Gulf clients across multiple industries." },
        { year: "2024", title: "AI Leadership", desc: "Launched AI-integrated services and surpassed 150 delivered projects across the UAE." },
      ];

  const lang = isAr ? "ar" : "en";

  // timeline line draws itself while scrolling
  const tlRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: tlRef, offset: ["start 75%", "end 55%"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={navT("home")}
        crumb={t("title")}
        eyebrow={t("story")}
        title={t("title")}
        subtitle={t("subtitle")}
        image="/images/photos/abu-dhabi-mosque.jpg"
      />

      {/* story + numbers */}
      <section className="relative bg-page pt-16 md:pt-24 pb-20 md:pb-28" aria-labelledby="story-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <Reveal className="lg:col-span-3">
              <h2 id="story-heading" className="sr-only">{t("story")}</h2>
              <p className="font-heading text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.45] font-medium text-ink-2 tracking-tight">
                {t("storyText")}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {[
                { Icon: Target, title: t("mission"), body: t("missionText") },
                { Icon: Eye, title: t("vision"), body: t("visionText") },
              ].map(({ Icon, title, body }) => (
                <SpotlightCard key={title} className="p-6">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Icon className="w-5 h-5 text-accent-soft" aria-hidden="true" />
                    <h3 className="font-semibold text-ink-1">{title}</h3>
                  </div>
                  <p className="text-sm text-ink-3 leading-relaxed">{body}</p>
                </SpotlightCard>
              ))}
            </Reveal>
          </div>

          <Reveal className="mt-16">
            <dl className="rounded-3xl border border-hair bg-tint grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-hair rtl:divide-x-reverse overflow-hidden">
              {stats.map((s) => (
                <div key={s.label} className="p-8 text-center">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="t-num text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none text-blue-glow tabular-nums">
                    <CountUp end={s.end} suffix={s.suffix} duration={2} />
                  </dd>
                  <p className="mt-3 text-sm text-ink-3" aria-hidden="true">{s.label}</p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* timeline */}
      <section className="relative bg-page py-20 md:py-28" aria-labelledby="timeline-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            id="timeline-heading"
            eyebrow={isAr ? "رحلتنا" : "Our Journey"}
            title={isAr ? "كيف وصلنا" : "How we"}
            highlight={isAr ? "إلى هنا" : "got here"}
          />

          <div ref={tlRef} className="relative">
            <div className="absolute start-[19px] md:start-1/2 top-0 bottom-0 w-px bg-tint-2 md:-translate-x-1/2 rtl:md:translate-x-1/2" aria-hidden="true">
              <motion.div style={{ height: lineH }} className="w-full bg-gradient-to-b from-[#6384FF] to-[#38BDF8] shadow-[0_0_12px_rgba(99,132,255,.9)]" />
            </div>

            <ol className="space-y-10 md:space-y-14">
              {timelineItems.map((item, i) => {
                const right = i % 2 === 1;
                return (
                  <li key={item.year} className="relative grid grid-cols-[40px_1fr] md:grid-cols-2 md:gap-14 items-center">
                    <span
                      className="absolute start-[13px] md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#3B62FC] ring-4 ring-page shadow-[0_0_16px_rgba(59,98,252,1)]"
                      aria-hidden="true"
                    />
                    <Reveal
                      delay={0.05}
                      className={right ? "col-start-2 md:col-start-2" : "col-start-2 md:col-start-1 md:text-end"}
                    >
                      <div className="card-glow p-6">
                        <p className="font-mono text-2xl font-bold text-blue-glow">{item.year}</p>
                        <h3 className="mt-2 text-lg font-semibold text-ink-1">{item.title}</h3>
                        <p className="mt-2 text-sm text-ink-3 leading-relaxed">{item.desc}</p>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* leadership */}
      <section className="relative bg-page py-20 md:py-28" aria-labelledby="team-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader id="team-heading" eyebrow={isAr ? "فريقنا" : "Our Team"} title={t("team")} subtitle={t("teamSubtitle")} />
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <Reveal as="li" key={member.key} delay={i * 0.1}>
                <SpotlightCard className="h-full p-8 text-center">
                  <div className="relative mx-auto w-32 h-32">
                    <div className="absolute inset-0 rounded-full bg-[#3B62FC] blur-2xl opacity-40" aria-hidden="true" />
                    <TeamPhoto member={member} lang={lang} className="relative w-32 h-32 rounded-full text-3xl ring-2 ring-[#6384FF]/40" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-ink-1">{member.name[lang]}</h3>
                  <p className="mt-1 text-sm text-accent-soft">{member.role[lang]}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* values */}
      <section className="relative bg-page py-20 md:py-28" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader id="values-heading" eyebrow={isAr ? "قيمنا" : "Our Values"} title={t("whyUs")} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => {
              const Icon = valueIcons[value];
              return (
                <Reveal key={value} delay={index * 0.08} className="h-full">
                  <SpotlightCard className="h-full p-7">
                    <span className="grid place-items-center w-12 h-12 rounded-xl bg-[#3B62FC]/10 ring-1 ring-[#6384FF]/25 text-accent-soft">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-lg font-semibold text-ink-1">{t(`values.${value}.title`)}</h3>
                    <p className="mt-2 text-sm text-ink-3 leading-relaxed">{t(`values.${value}.description`)}</p>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <TechStack />

      <CTASection locale={locale} />
    </>
  );
}
