"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import PageHero from "@/components/kit/PageHero";
import ProjectCover from "@/components/visuals/ProjectCover";
import CTASection from "@/components/home/CTASection";

const filterCategories = [
  { key: "all", translationKey: "filterAll" },
  { key: "erp", translationKey: "filterERP" },
  { key: "web", translationKey: "filterWeb" },
  { key: "mobile", translationKey: "filterMobile" },
];

function PortfolioCard({ project, locale, lang, t }: { project: Project; locale: string; lang: "en" | "ar"; t: (key: string) => string }) {
  return (
    <motion.article
      role="listitem"
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group card-glow overflow-hidden flex flex-col"
    >
      <Link
        href={`/${locale}/portfolio/${project.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6384FF] rounded-t-[1.25rem]"
        aria-label={`${t("viewDetails")} — ${project.title[lang]}`}
      >
        <ProjectCover project={project} lang={lang} className="aspect-[16/10]" />
      </Link>

      <div className="p-6 flex flex-col flex-1 border-t border-hair">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider text-accent-soft bg-[#3B62FC]/10">
            {project.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-ink-1 tracking-tight leading-snug">
          <Link href={`/${locale}/portfolio/${project.slug}`} className="hover:text-accent-soft transition-colors">
            {project.title[lang]}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-ink-3 line-clamp-2 leading-relaxed">{project.description[lang]}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <li key={tech} className="px-2 py-0.5 rounded-md text-[11px] text-ink-3 bg-tint border border-hair">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6 flex items-center justify-between">
          <Link
            href={`/${locale}/portfolio/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-soft hover:text-ink-1 transition-colors"
          >
            {t("viewDetails")}
            <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" />
          </Link>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-ink-1 transition-colors"
              aria-label={`${t("viewDemo")} — ${project.title[lang]}`}
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              {t("viewDemo")}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

interface PortfolioContentProps {
  projects: Project[];
}

export default function PortfolioContent({ projects }: PortfolioContentProps) {
  const t = useTranslations("portfolio");
  const navT = useTranslations("nav");
  const params = useParams();
  const locale = params.locale as string;
  const lang = locale === "ar" ? "ar" : "en";
  const isAr = locale === "ar";

  const [activeFilter, setActiveFilter] = useState("all");
  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);
  const countFor = (key: string) => (key === "all" ? projects.length : projects.filter((p) => p.category === key).length);

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

      <section className="relative bg-page pb-24 md:pb-32" aria-labelledby="portfolio-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="portfolio-heading" className="sr-only">{t("title")}</h2>

          {/* filter */}
          <LayoutGroup>
            <div
              className="mx-auto mb-12 flex w-fit flex-wrap justify-center gap-1 p-1 rounded-2xl bg-tint border border-hair"
              role="tablist"
              aria-label={isAr ? "تصفية المشاريع" : "Filter projects"}
            >
              {filterCategories.map(({ key, translationKey }) => {
                const active = activeFilter === key;
                return (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFilter(key)}
                    className={cn(
                      "relative px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                      active ? "text-ink-1" : "text-ink-3 hover:text-ink-1"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="portfolio-filter"
                        className="absolute inset-0 rounded-xl bg-[#3B62FC] shadow-[0_6px_24px_-6px_rgba(59,98,252,.9)]"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">
                      {t(translationKey)}
                      <span className={cn("ms-1.5 text-xs tabular-nums", active ? "text-white/70" : "text-ink-5")}>{countFor(key)}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {isAr ? `عرض ${filteredProjects.length} مشروع` : `Showing ${filteredProjects.length} projects`}
          </p>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            role="list"
            aria-label={isAr ? "قائمة المشاريع" : "Projects list"}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <PortfolioCard key={project.slug} project={project} locale={locale} lang={lang} t={t} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <p className="text-center py-20 text-ink-4 text-lg">
              {isAr ? "لا توجد مشاريع في هذه الفئة" : "No projects in this category yet."}
            </p>
          )}
        </div>
      </section>

      <CTASection locale={locale} />
    </>
  );
}
