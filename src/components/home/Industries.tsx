"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/kit/SectionHeader";
import Reveal from "@/components/kit/Reveal";
import { cn } from "@/lib/utils";

type Industry = { key: string; name: string; modules: string[]; image: string };

/** Real photos of the sectors Norka ERP is set up for, with the modules each one uses. */
export default function Industries({ locale }: { locale: string }) {
  const t = useTranslations("industries");
  const items = t.raw("items") as Industry[];

  return (
    <section className="relative py-20 md:py-28 bg-page" aria-labelledby="industries-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader id="industries-heading" eyebrow={t("badge")} title={t("title")} highlight={t("highlight")} subtitle={t("subtitle")} />

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <Reveal as="li" key={it.key} delay={(i % 3) * 0.07} className={cn("h-[300px]", i === 0 && "sm:col-span-2 lg:col-span-2", i === items.length - 1 && "sm:col-span-2 lg:col-span-3")}>
              <Link
                href={`/${locale}/contact`}
                className="group relative block h-full overflow-hidden rounded-[1.25rem] border border-hair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6384FF]"
              >
                <Image
                  src={`/images/photos/${it.image}.jpg`}
                  alt={it.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04060D] via-[#04060D]/40 to-transparent" aria-hidden="true" />
                <div className="absolute inset-0 bg-[#3B62FC]/0 group-hover:bg-[#3B62FC]/15 transition-colors duration-500" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-end justify-between gap-3">
                    <h3 className={cn("font-heading font-bold text-white tracking-tight", i === 0 || i === items.length - 1 ? "text-2xl md:text-3xl" : "text-xl")}>{it.name}</h3>
                    <span className="shrink-0 grid place-items-center w-9 h-9 rounded-full bg-white/15 backdrop-blur text-white transition-all duration-300 group-hover:bg-white group-hover:text-[#04060D]">
                      <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" />
                    </span>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {it.modules.map((m) => (
                      <li key={m} className="px-2 py-0.5 rounded-md text-[11px] font-medium text-white/90 bg-white/10 backdrop-blur border border-white/15">{m}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
