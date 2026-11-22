"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

/** Two counter-scrolling rows of the real Norka ERP modules. */
export default function ModulesMarquee() {
  const t = useTranslations("modules");
  const items = t.raw("items") as string[];
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <section className="relative py-14 md:py-16 bg-page overflow-hidden" aria-labelledby="modules-heading">
      <p id="modules-heading" className="t-over text-center mb-8 px-4">{t("label")}</p>
      <div className="space-y-3" aria-hidden="true">
        {rows.map((row, r) => (
          <div key={r} className="relative overflow-hidden mask-x" dir="ltr">
            <div className={`flex gap-3 w-max ${r ? "animate-marquee-reverse" : "animate-marquee"}`}>
              {[...row, ...row, ...row].map((m, i) => (
                <span key={`${m}-${i}`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-ink-2 bg-tint border border-hair whitespace-nowrap">
                  <Check className="w-4 h-4 text-[#3B62FC]" /> {m}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ul className="sr-only">{items.map((m) => <li key={m}>{m}</li>)}</ul>
    </section>
  );
}
