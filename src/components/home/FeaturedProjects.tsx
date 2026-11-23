"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import SectionHeader from "@/components/kit/SectionHeader";
import Reveal from "@/components/kit/Reveal";
import ProjectPhoto from "@/components/visuals/ProjectPhoto";
import { cn } from "@/lib/utils";

interface FeaturedProjectsProps {
  locale: string;
  projects: Project[];
}

export default function FeaturedProjects({ locale, projects }: FeaturedProjectsProps) {
  const t = useTranslations("portfolio");
  const lang = locale === "ar" ? "ar" : "en";

  // featured first, topped up with the rest so there are always three
  const picks = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)].slice(0, 3);

  return (
    <section className="relative py-20 md:py-28 bg-page" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="projects-heading"
          align="start"
          eyebrow={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
          action={
            <Link href={`/${locale}/portfolio`} className="btn-ghost">
              {t("viewAll")}
              <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {picks.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className={cn("h-full", i === 0 && "lg:row-span-2")}>
              <Link
                href={`/${locale}/portfolio/${p.slug}`}
                className="group card-glow flex flex-col h-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6384FF]"
              >
                <ProjectPhoto
                  project={p}
                  lang={lang}
                  className={cn("w-full", i === 0 ? "aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-[420px]" : "aspect-[16/8]")}
                />
                <div className="p-6 md:p-7 border-t border-hair">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider text-accent-soft bg-[#3B62FC]/10">
                      {p.category}
                    </span>
                    <span className="text-[12px] text-ink-4 truncate">{p.techStack.slice(0, 3).join(" · ")}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-ink-1 tracking-tight">{p.title[lang]}</h3>
                      <p className="mt-2 text-sm text-ink-3 leading-relaxed line-clamp-2">{p.description[lang]}</p>
                    </div>
                    <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full border border-hair text-ink-3 transition-all duration-300 group-hover:bg-white group-hover:text-[#04060D] group-hover:border-white">
                      <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
