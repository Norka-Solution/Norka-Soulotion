"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import SectionHeader from "@/components/kit/SectionHeader";
import Reveal from "@/components/kit/Reveal";

const ICONS = [Search, PenTool, Code2, Rocket];

export default function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as { title: string; description: string }[];

  // the connecting line fills in as the section scrolls through the viewport
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-20 md:py-28 bg-page overflow-hidden" aria-labelledby="process-heading">
      <div className="absolute inset-0 bg-dots opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent)]" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="process-heading"
          eyebrow={t("badge")}
          title={t("title")}
          highlight={t("highlight")}
          subtitle={t("subtitle")}
        />

        <div ref={ref} className="relative">
          {/* track + animated fill (desktop: horizontal) */}
          <div className="hidden lg:block absolute top-7 inset-x-[12.5%] h-px bg-white/[.08]" aria-hidden="true">
            <motion.div style={{ width: fill }} className="h-full bg-gradient-to-r from-[#3B62FC] via-[#6384FF] to-[#38BDF8] shadow-[0_0_12px_rgba(99,132,255,.9)]" />
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = ICONS[i] ?? Rocket;
              return (
                <Reveal as="li" key={step.title} delay={i * 0.12} className="relative text-center px-2">
                  <div className="relative mx-auto mb-6 w-14 h-14">
                    <div className="absolute inset-0 rounded-2xl bg-[#3B62FC]/30 blur-xl" aria-hidden="true" />
                    <div className="relative w-14 h-14 rounded-2xl grid place-items-center bg-panel ring-1 ring-[#6384FF]/40 text-accent-soft">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <span className="absolute -top-2 -end-2 grid place-items-center w-6 h-6 rounded-full bg-[#3B62FC] text-[11px] font-bold text-white ring-4 ring-page tabular-nums">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-ink-1 tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm text-ink-3 leading-relaxed max-w-xs mx-auto">{step.description}</p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
