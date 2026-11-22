"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeader from "@/components/kit/SectionHeader";
import Reveal from "@/components/kit/Reveal";
import { cn } from "@/lib/utils";

type QA = { q: string; a: string };

export default function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as QA[];
  const [open, setOpen] = useState<number | null>(0);

  // FAQPage structured data, so the answers can show in Google results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
  };

  return (
    <section className="relative py-20 md:py-28 bg-page" aria-labelledby="faq-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader id="faq-heading" eyebrow={t("badge")} title={t("title")} highlight={t("highlight")} />
        <ul className="space-y-3">
          {items.map((it, i) => {
            const on = open === i;
            return (
              <Reveal as="li" key={it.q} delay={i * 0.04}>
                <div className={cn("card-glow overflow-hidden", on && "border-hair-2")}>
                  <button
                    type="button"
                    onClick={() => setOpen(on ? null : i)}
                    aria-expanded={on}
                    aria-controls={`faq-${i}`}
                    className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-start cursor-pointer"
                  >
                    <span className="t-h3 text-ink-1">{it.q}</span>
                    <span className={cn("shrink-0 grid place-items-center w-8 h-8 rounded-full border border-hair transition-all duration-300", on ? "rotate-45 bg-[#3B62FC] border-[#3B62FC] text-white" : "text-ink-3")}>
                      <Plus className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 md:px-6 pb-6 t-body">{it.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
