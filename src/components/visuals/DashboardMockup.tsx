"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard, Package, Users, Wallet, BarChart3, Settings, Search, Bell,
  TrendingUp, ArrowUpRight, Sparkles,
} from "lucide-react";
import CountUp from "@/components/ui/CountUp";

/**
 * A Norka ERP dashboard drawn entirely in code (no screenshot): sidebar,
 * KPI tiles, an animated revenue chart, a bar chart and recent orders.
 * Purely decorative — hidden from assistive tech by the caller.
 */

const ease = [0.22, 1, 0.36, 1] as const;

// revenue curve (12 months), plotted in a 600x180 box
const points = [42, 55, 48, 70, 66, 84, 78, 96, 92, 118, 112, 138];
const W = 600, H = 180, max = 150;
const xy = points.map((v, i) => [ (i / (points.length - 1)) * W, H - (v / max) * H ] as const);
const line = xy.map(([x, y], i) => {
  if (i === 0) return `M ${x} ${y}`;
  const [px, py] = xy[i - 1];
  const cx = (px + x) / 2;
  return `C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`;
}).join(" ");
const area = `${line} L ${W} ${H} L 0 ${H} Z`;

const bars = [38, 62, 45, 80, 58, 92, 70];

export default function DashboardMockup({ isAr = false }: { isAr?: boolean }) {
  const L = isAr
    ? {
        nav: ["لوحة التحكم", "المخزون", "الموظفون", "المالية", "التقارير", "الإعدادات"],
        search: "ابحث في كل شيء…",
        hello: "صباح الخير، أحمد",
        sub: "هذا ملخص أعمالك اليوم",
        kpis: ["الإيرادات", "الطلبات", "العملاء"],
        revenue: "الإيرادات الشهرية",
        week: "المبيعات الأسبوعية",
        orders: "أحدث الطلبات",
        status: ["مدفوع", "قيد التنفيذ", "مدفوع"],
        ai: "نوركا AI: المخزون منخفض في 3 أصناف — هل أنشئ أمر شراء؟",
        days: ["س", "ح", "ن", "ث", "ر", "خ", "ج"],
      }
    : {
        nav: ["Dashboard", "Inventory", "People", "Finance", "Reports", "Settings"],
        search: "Search anything…",
        hello: "Good morning, Ahmed",
        sub: "Here's what's happening in your business today",
        kpis: ["Revenue", "Orders", "Customers"],
        revenue: "Monthly revenue",
        week: "Weekly sales",
        orders: "Recent orders",
        status: ["Paid", "Processing", "Paid"],
        ai: "Norka AI: 3 items are running low — create a purchase order?",
        days: ["S", "M", "T", "W", "T", "F", "S"],
      };

  const navIcons = [LayoutDashboard, Package, Users, Wallet, BarChart3, Settings];
  const kpis = [
    { label: L.kpis[0], end: 284, prefix: "AED ", suffix: "K", delta: "+18.2%" },
    { label: L.kpis[1], end: 1429, prefix: "", suffix: "", delta: "+9.4%" },
    { label: L.kpis[2], end: 862, prefix: "", suffix: "", delta: "+12.1%" },
  ];
  const orders = [
    { id: "#4821", who: isAr ? "مؤسسة الريم" : "Al Reem Trading", amt: "12,400" },
    { id: "#4820", who: isAr ? "مطاعم الواحة" : "Oasis Restaurants", amt: "8,950" },
    { id: "#4819", who: isAr ? "مدارس النخبة" : "Elite Schools", amt: "21,300" },
  ];

  return (
    <div className="dark relative w-full rounded-2xl bg-[#070B16] ring-gradient shadow-[0_40px_120px_-30px_rgba(59,98,252,.55)] overflow-hidden text-start" dir={isAr ? "rtl" : "ltr"}>
      {/* window chrome */}
      <div className="flex items-center gap-2 px-4 h-10 border-b border-white/[.06] bg-white/[.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]/80" />
        <div className="mx-auto flex items-center gap-2 px-3 h-6 rounded-md bg-white/[.04] text-[10px] text-slate-500" dir="ltr">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> app.norkasolution.com
        </div>
      </div>

      <div className="flex">
        {/* sidebar */}
        <aside className="hidden sm:flex flex-col gap-1 w-44 shrink-0 p-3 border-e border-white/[.06] bg-white/[.015]">
          <div className="flex items-center gap-2 px-2 py-2 mb-2">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-[#6384FF] to-[#2848D8] grid place-items-center text-[10px] font-black text-white">N</span>
            <span className="text-[12px] font-bold text-white">Norka ERP</span>
          </div>
          {L.nav.map((n, i) => {
            const Icon = navIcons[i];
            return (
              <div
                key={n}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] ${i === 0 ? "bg-[#3B62FC]/15 text-[#C7D2FE]" : "text-slate-500"}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {n}
              </div>
            );
          })}
        </aside>

        {/* main */}
        <div className="flex-1 min-w-0 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <p className="text-[13px] font-semibold text-white">{L.hello}</p>
              <p className="text-[10px] text-slate-500">{L.sub}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1.5 h-7 px-2.5 rounded-md bg-white/[.04] border border-white/[.06] text-[10px] text-slate-500 w-40">
                <Search className="w-3 h-3" /> {L.search}
              </div>
              <span className="relative grid place-items-center w-7 h-7 rounded-md bg-white/[.04] border border-white/[.06]">
                <Bell className="w-3.5 h-3.5 text-slate-400" />
                <span className="absolute top-1 end-1 w-1.5 h-1.5 rounded-full bg-[#6384FF]" />
              </span>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-2.5 mb-3">
            {kpis.map((k, i) => (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.12, duration: 0.6, ease }}
                className="rounded-xl p-2.5 sm:p-3 bg-white/[.025] border border-white/[.06]"
              >
                <p className="text-[9px] sm:text-[10px] text-slate-500 mb-1">{k.label}</p>
                <p className="text-[13px] sm:text-[17px] font-bold text-white tabular-nums" dir="ltr">
                  {k.prefix}<CountUp end={k.end} duration={1.6} />{k.suffix}
                </p>
                <p className="mt-1 inline-flex items-center gap-0.5 text-[9px] font-semibold text-emerald-400" dir="ltr">
                  <TrendingUp className="w-2.5 h-2.5" /> {k.delta}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
            {/* revenue chart */}
            <div className="md:col-span-3 rounded-xl p-3 bg-white/[.025] border border-white/[.06]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold text-slate-300">{L.revenue}</p>
                <span className="text-[9px] text-slate-500" dir="ltr">2026</span>
              </div>
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-28 sm:h-32 overflow-visible" preserveAspectRatio="none" style={isAr ? { transform: "scaleX(-1)" } : undefined}>
                <defs>
                  <linearGradient id="nk-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B62FC" stopOpacity=".45" />
                    <stop offset="100%" stopColor="#3B62FC" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="nk-line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6384FF" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((g) => (
                  <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="rgba(148,163,255,.08)" strokeDasharray="4 6" />
                ))}
                <motion.path
                  d={area}
                  fill="url(#nk-area)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 1 }}
                />
                <motion.path
                  d={line}
                  fill="none"
                  stroke="url(#nk-line)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.1, duration: 1.8, ease }}
                />
                <motion.circle
                  cx={xy[xy.length - 1][0]}
                  cy={xy[xy.length - 1][1]}
                  r="6"
                  fill="#9DB0FE"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.4, 1] }}
                  transition={{ delay: 2.8, duration: 0.6 }}
                />
              </svg>
            </div>

            {/* weekly bars */}
            <div className="md:col-span-2 rounded-xl p-3 bg-white/[.025] border border-white/[.06]">
              <p className="text-[11px] font-semibold text-slate-300 mb-2">{L.week}</p>
              <div className="flex items-end gap-1.5 h-28 sm:h-32">
                {bars.map((b, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <motion.div
                      className={`w-full rounded-md ${i === 5 ? "bg-gradient-to-t from-[#2848D8] to-[#9DB0FE]" : "bg-[#3B62FC]/30"}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${b}%` }}
                      transition={{ delay: 1.2 + i * 0.07, duration: 0.8, ease }}
                    />
                    <span className="text-[8px] text-slate-600">{L.days[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* orders + AI */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 mt-2.5">
            <div className="md:col-span-3 rounded-xl p-3 bg-white/[.025] border border-white/[.06]">
              <p className="text-[11px] font-semibold text-slate-300 mb-2">{L.orders}</p>
              <div className="space-y-1.5">
                {orders.map((o, i) => (
                  <div key={o.id} className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-2 min-w-0">
                      <span className="text-slate-600 tabular-nums" dir="ltr">{o.id}</span>
                      <span className="text-slate-300 truncate">{o.who}</span>
                    </span>
                    <span className="flex items-center gap-2 shrink-0">
                      <span className="text-slate-400 tabular-nums" dir="ltr">AED {o.amt}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-semibold ${i === 1 ? "bg-amber-400/10 text-amber-300" : "bg-emerald-400/10 text-emerald-300"}`}>
                        {L.status[i]}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, duration: 0.6, ease }}
              className="md:col-span-2 rounded-xl p-3 bg-gradient-to-br from-[#3B62FC]/20 to-[#38BDF8]/5 border border-[#6384FF]/25"
            >
              <p className="flex items-center gap-1.5 text-[10px] font-semibold text-[#C7D2FE] mb-1.5">
                <Sparkles className="w-3 h-3" /> Norka AI
              </p>
              <p className="text-[10px] leading-relaxed text-slate-300">{L.ai}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-[9px] font-semibold text-white bg-[#3B62FC] rounded-md px-2 py-1">
                {isAr ? "إنشاء الأمر" : "Create order"} <ArrowUpRight className="w-2.5 h-2.5 rtl:-scale-x-100" />
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
