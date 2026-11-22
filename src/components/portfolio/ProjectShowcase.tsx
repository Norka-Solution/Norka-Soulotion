"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, CheckCircle, Target, Lightbulb, TrendingUp, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import ProjectPhoto from "@/components/visuals/ProjectPhoto";
import Reveal from "@/components/kit/Reveal";
import SpotlightCard from "@/components/kit/SpotlightCard";

interface ProjectShowcaseProps {
  project: Project;
  locale: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectShowcase({ project, locale }: ProjectShowcaseProps) {
  const t = useTranslations("portfolio");
  const lang = locale === "ar" ? "ar" : "en";

  const story = [
    { key: "challenge", Icon: Target, text: project.challenge[lang], tint: "text-rose-300 bg-rose-400/10" },
    { key: "solution", Icon: Lightbulb, text: project.solution[lang], tint: "text-accent-soft bg-[#3B62FC]/15" },
    { key: "results", Icon: TrendingUp, text: project.results[lang], tint: "text-emerald-300 bg-emerald-400/10" },
  ] as const;

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-page pt-32 md:pt-40 pb-10">
        <div className="aurora opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href={`/${locale}/portfolio`}
              className="inline-flex items-center gap-2 text-sm text-ink-3 hover:text-ink-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
              {t("title")}
            </Link>
          </motion.div>

          <div className="mt-8 max-w-4xl">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="inline-block px-2.5 py-1 rounded-md text-[12px] font-semibold uppercase tracking-wider text-accent-soft bg-[#3B62FC]/10"
            >
              {project.category}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.1, duration: 0.9, ease }}
              className="mt-4 t-h1 text-hero"
            >
              {project.title[lang]}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease }}
              className="mt-5 text-lg md:text-xl text-ink-3 leading-relaxed max-w-2xl"
            >
              {project.description[lang]}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1, ease }}
            className="mt-12 rounded-3xl overflow-hidden ring-gradient shadow-[0_40px_120px_-30px_rgba(59,98,252,.5)]"
          >
            <ProjectPhoto project={project} lang={lang} priority sizes="(max-width: 1280px) 100vw, 1280px" className="aspect-[16/9] md:aspect-[21/9]" />
          </motion.div>
        </div>
      </section>

      {/* body */}
      <section className="relative bg-page py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          <div className="lg:col-span-2 space-y-6">
            <Reveal>
              <p className="text-xl md:text-2xl text-ink-2 leading-relaxed font-light">{project.fullDescription[lang]}</p>
            </Reveal>

            {story.map(({ key, Icon, text, tint }, i) => (
              <Reveal key={key} delay={i * 0.08}>
                <SpotlightCard className="p-7 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`grid place-items-center w-10 h-10 rounded-xl ${tint}`}>
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <h2 className="text-xl font-semibold text-ink-1">{t(key)}</h2>
                  </div>
                  <p className="text-ink-3 leading-relaxed">{text}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 h-fit">
            <Reveal>
              <div className="card-glow p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-4 mb-4">{t("techStack")}</h2>
                <ul className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <li key={tech} className="px-3 py-1.5 rounded-lg text-sm text-ink-2 bg-tint-2 border border-hair">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="card-glow p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-4 mb-4">{t("keyFeatures")}</h2>
                <ul className="space-y-3">
                  {project.features[lang].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-[#6384FF] shrink-0" aria-hidden="true" />
                      <span className="text-sm text-ink-2">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {project.demoUrl && (
              <Reveal delay={0.12}>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full">
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  {t("viewDemo")}
                </a>
              </Reveal>
            )}

            <Reveal delay={0.16}>
              <div className="relative overflow-hidden rounded-[1.25rem] ring-gradient bg-panel p-6">
                <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_100%_0%,rgba(59,98,252,.35),transparent_60%)]" aria-hidden="true" />
                <div className="relative">
                  <h2 className="text-lg font-semibold text-ink-1">{t("similarProject")}</h2>
                  <p className="mt-2 text-sm text-ink-3">{t("similarProjectDesc")}</p>
                  <Link href={`/${locale}/contact`} className="btn-glow w-full mt-5">
                    {t("contactUs")}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
