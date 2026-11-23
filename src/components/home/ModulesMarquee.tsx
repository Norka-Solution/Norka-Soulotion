"use client";

import { useTranslations } from "next-intl";
import {
  Landmark, Receipt, ShoppingCart, Package, Users, Clock, FolderKanban, HardHat,
  Wallet, Building2, CalendarClock, GraduationCap, CalendarCheck, ListTodo, BarChart3, ShieldCheck,
  type LucideIcon,
} from "lucide-react";

// one icon + colour pair per module, in the same order as modules.items in the messages
const ICONS: { Icon: LucideIcon; from: string; to: string }[] = [
  { Icon: Landmark, from: "#34D399", to: "#059669" },
  { Icon: Receipt, from: "#38BDF8", to: "#0284C7" },
  { Icon: ShoppingCart, from: "#FBBF24", to: "#D97706" },
  { Icon: Package, from: "#A78BFA", to: "#7C3AED" },
  { Icon: Users, from: "#F472B6", to: "#DB2777" },
  { Icon: Clock, from: "#22D3EE", to: "#0891B2" },
  { Icon: FolderKanban, from: "#818CF8", to: "#4F46E5" },
  { Icon: HardHat, from: "#FB923C", to: "#EA580C" },
  { Icon: Wallet, from: "#FB7185", to: "#E11D48" },
  { Icon: Building2, from: "#2DD4BF", to: "#0D9488" },
  { Icon: CalendarClock, from: "#A3E635", to: "#65A30D" },
  { Icon: GraduationCap, from: "#60A5FA", to: "#2563EB" },
  { Icon: CalendarCheck, from: "#E879F9", to: "#C026D3" },
  { Icon: ListTodo, from: "#FACC15", to: "#CA8A04" },
  { Icon: BarChart3, from: "#4ADE80", to: "#16A34A" },
  { Icon: ShieldCheck, from: "#94A3B8", to: "#475569" },
];

/** Two counter-scrolling rows of the real Norka ERP modules, as colourful icon pills. */
export default function ModulesMarquee() {
  const t = useTranslations("modules");
  const items = (t.raw("items") as string[]).map((label, i) => ({ label, ...ICONS[i % ICONS.length] }));
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <section className="relative py-14 md:py-16 bg-page overflow-hidden" aria-labelledby="modules-heading">
      <p id="modules-heading" className="t-over text-center mb-8 px-4">{t("label")}</p>
      <div className="space-y-4" aria-hidden="true">
        {rows.map((row, r) => (
          <div key={r} className="relative overflow-hidden mask-x py-1" dir="ltr">
            <div className={`flex gap-4 w-max ${r ? "animate-marquee-reverse" : "animate-marquee"}`}>
              {[...row, ...row, ...row].map(({ label, Icon, from, to }, i) => (
                <div
                  key={`${label}-${i}`}
                  className="group shrink-0 inline-flex items-center gap-3 ps-1.5 pe-5 py-1.5 rounded-full bg-tint border border-hair backdrop-blur hover:border-hair-2 transition-colors"
                >
                  <span
                    className="relative grid place-items-center w-10 h-10 rounded-full text-white group-hover:scale-110 group-hover:rotate-[-8deg] transition-transform duration-300"
                    style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})`, boxShadow: `0 8px 22px -8px ${to}` }}
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/35 to-transparent opacity-70" />
                    <Icon className="relative w-[18px] h-[18px]" strokeWidth={2} />
                  </span>
                  <span className="text-sm font-semibold text-ink-2 whitespace-nowrap" dir="auto">{label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ul className="sr-only">{items.map((m) => <li key={m.label}>{m.label}</li>)}</ul>
    </section>
  );
}
