"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const row1 = [
  {
    name: "React",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="4" fill="#61DAFB" />
        <ellipse cx="20" cy="20" rx="18" ry="7" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
        <ellipse cx="20" cy="20" rx="18" ry="7" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 20 20)" />
        <ellipse cx="20" cy="20" rx="18" ry="7" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 20 20)" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="18" fill="currentColor" />
        <path d="M16 12V28L28 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 24V28" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="2" y="2" width="36" height="36" rx="4" fill="#3178C6" />
        <text x="20" y="28" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="20" fill="white">TS</text>
      </svg>
    ),
  },
  {
    name: "Django",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="2" y="2" width="36" height="36" rx="4" fill="#092E20" />
        <text x="20" y="28" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="16" fill="white">Dj</text>
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="18" fill="#336791" />
        <text x="20" y="26" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="12" fill="white">PG</text>
      </svg>
    ),
  },
  {
    name: "React Native",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="10" y="4" width="20" height="32" rx="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="20" r="3" fill="#61DAFB" />
        <ellipse cx="20" cy="20" rx="12" ry="5" stroke="#61DAFB" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
];

const row2 = [
  {
    name: "Node.js",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="2" y="2" width="36" height="36" rx="4" fill="#339933" />
        <text x="20" y="27" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="14" fill="white">N</text>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M10 18C12 12 16 10 22 12C25 13 27 12 29 9C30 14 27 17 22 17C19 17 17 18 15 21C14 16 12 14 10 18Z" fill="#06B6D4" />
        <path d="M16 26C18 20 22 18 28 20C31 21 33 20 35 17C36 22 33 25 28 25C25 25 23 26 21 29C20 24 18 22 16 26Z" fill="#06B6D4" />
      </svg>
    ),
  },
  {
    name: "Python",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="2" y="2" width="36" height="36" rx="4" fill="#3776AB" />
        <text x="20" y="27" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="14" fill="#FFD43B">Py</text>
      </svg>
    ),
  },
  {
    name: "Docker",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="2" y="2" width="36" height="36" rx="4" fill="#2496ED" />
        <rect x="10" y="14" width="5" height="4" rx="0.5" fill="white" />
        <rect x="17" y="14" width="5" height="4" rx="0.5" fill="white" />
        <rect x="24" y="14" width="5" height="4" rx="0.5" fill="white" />
        <rect x="10" y="20" width="5" height="4" rx="0.5" fill="white" />
        <rect x="17" y="20" width="5" height="4" rx="0.5" fill="white" />
        <path d="M8 26C12 28 32 28 34 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "AWS",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="2" y="2" width="36" height="36" rx="4" fill="#232F3E" />
        <text x="20" y="24" textAnchor="middle" fontFamily="Arial" fontWeight="800" fontSize="11" fill="#FF9900">aws</text>
        <path d="M10 28 Q20 32 30 28" stroke="#FF9900" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    name: "Figma",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="12" y="4" width="8" height="10" rx="4" fill="#F24E1E" />
        <rect x="20" y="4" width="8" height="10" rx="4" fill="#FF7262" />
        <rect x="12" y="14" width="8" height="10" rx="4" fill="#A259FF" />
        <circle cx="24" cy="19" r="5" fill="#1ABCFE" />
        <rect x="12" y="24" width="8" height="12" rx="4" fill="#0ACF83" />
      </svg>
    ),
  },
];

function MarqueeRow({ items, reverse = false }: { items: typeof row1; reverse?: boolean }) {
  // Duplicate items for seamless infinite scroll
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden mask-x" aria-hidden="true" dir="ltr">
      <div className={`flex gap-3 w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {doubled.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-tint border border-hair hover:border-[#6384FF]/30 hover:bg-tint-2 transition-colors duration-300 shrink-0 [&_svg]:w-7 [&_svg]:h-7 text-ink-2"
          >
            <div className="opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
              {tech.logo}
            </div>
            <span className="text-sm font-medium text-ink-3 group-hover:text-ink-1 transition-colors whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const t = useTranslations("techStack");

  return (
    <section className="relative py-16 md:py-20 bg-page overflow-hidden" aria-labelledby="tech-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <motion.p
          id="tech-heading"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-sm font-medium text-ink-4"
        >
          {t("subtitle")}
        </motion.p>
      </div>

      <div className="space-y-3">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>

      <ul className="sr-only" aria-label={t("badge")}>
        {[...row1, ...row2].map((tech) => (
          <li key={tech.name}>{tech.name}</li>
        ))}
      </ul>
    </section>
  );
}
