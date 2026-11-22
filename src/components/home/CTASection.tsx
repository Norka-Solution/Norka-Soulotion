"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import Reveal from "@/components/kit/Reveal";
import { images } from "@/lib/images.config";

interface CTASectionProps {
  locale: string;
}

export default function CTASection({ locale }: CTASectionProps) {
  const t = useTranslations("cta");
  const isAr = locale === "ar";

  const contactItems = [
    { icon: Phone, label: t("callUs"), value: "+971 50 725 7157", href: "tel:+971507257157" },
    { icon: Mail, label: t("emailUs"), value: "info@norkasolution.com", href: "mailto:info@norkasolution.com" },
    { icon: MessageCircle, label: isAr ? "واتساب" : "WhatsApp", value: isAr ? "تواصل فوري" : "Instant chat", href: "https://wa.me/971507257157" },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-page" aria-labelledby="cta-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="dark relative overflow-hidden rounded-[2rem] ring-gradient bg-panel px-6 py-16 md:px-16 md:py-24 text-center">
            {/* light */}
            <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(59,98,252,.45),transparent_70%)]" aria-hidden="true" />
            <div className="absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#38BDF8]/10 blur-[100px]" aria-hidden="true" />

            <div className="relative">
              <Image
                src={images.brand.mark.src}
                alt=""
                width={64}
                height={64}
                className="mx-auto mb-8 w-16 h-16 drop-shadow-[0_0_24px_rgba(59,98,252,.8)]"
              />
              <h2 id="cta-heading" className="t-h2 max-w-3xl mx-auto text-hero">
                {t("title")}
              </h2>
              <p className="mt-5 t-lead max-w-2xl mx-auto">
                {t("description")}
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link href={`/${locale}/contact`} className="btn-glow">
                  {t("button")}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                </Link>
              </div>

              <ul className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3 rounded-2xl px-4 py-3.5 bg-tint border border-hair hover:border-[#6384FF]/40 hover:bg-tint-2 transition-colors text-start"
                    >
                      <span className="grid place-items-center w-10 h-10 rounded-xl bg-[#3B62FC]/15 text-accent-soft shrink-0">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] uppercase tracking-wider text-ink-4">{label}</span>
                        <span className="block text-sm font-medium text-ink-1 truncate" dir={href.startsWith("tel") ? "ltr" : undefined}>{value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
