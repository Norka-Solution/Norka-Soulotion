"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Dark page header shared by every inner page: light, grid, breadcrumb, title. */
export default function PageHero({
  locale,
  homeLabel,
  crumb,
  eyebrow,
  title,
  highlight,
  subtitle,
  children,
  image,
}: {
  locale: string;
  homeLabel: string;
  crumb: string;
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  children?: ReactNode;
  /** optional real photo behind the header (always shown with a dark overlay) */
  image?: string;
}) {
  const isAr = locale === "ar";
  return (
    <section className={`relative overflow-hidden bg-page pt-36 md:pt-44 pb-16 md:pb-24 ${image ? "dark md:pb-28" : ""}`}>
      {image ? (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover scale-105 animate-[kenburns_22s_ease-out_both]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04060D]/85 via-[#04060D]/70 to-[#04060D]/90" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(59,98,252,.35),transparent_70%)]" aria-hidden="true" />
        </>
      ) : (
        <>
          <div className="aurora opacity-70" aria-hidden="true" />
          <div className="absolute inset-0 bg-grid" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-page to-transparent" aria-hidden="true" />
        </>
      )}

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.nav
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 flex items-center justify-center gap-2 text-sm text-ink-4"
          aria-label={isAr ? "مسار التنقل" : "Breadcrumb"}
        >
          <Link href={`/${locale}`} className="hover:text-ink-2 transition-colors">{homeLabel}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-accent-soft" aria-current="page">{crumb}</span>
        </motion.nav>

        {eyebrow && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="mb-6">
            <span className="eyebrow">{eyebrow}</span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.1, duration: 0.9, ease }}
          className="t-h1"
        >
          <span className="text-hero">{title}</span>
          {highlight && <span className="text-blue-glow"> {highlight}</span>}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease }}
            className="mt-6 t-lead max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease }}
            className="mt-9"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
