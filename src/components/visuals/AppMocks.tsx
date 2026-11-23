"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, FileText, Sparkles, Send } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Staff mobile app drawn in code: attendance, approvals, requests. */
export function PhoneMock({ isAr }: { isAr: boolean }) {
  const L = isAr
    ? { hi: "مرحباً، سارة", in: "تسجيل الحضور", time: "08:57 ص", tasks: "طلبات بانتظارك", items: ["إجازة سنوية · 3 أيام", "سلفة راتب", "طلب أصل · لابتوب"], ok: "موافقة" }
    : { hi: "Hi, Sara", in: "Checked in", time: "08:57 AM", tasks: "Waiting for you", items: ["Annual leave · 3 days", "Salary advance", "Asset request · Laptop"], ok: "Approve" };
  return (
    <div className="dark relative mx-auto w-[270px] aspect-[9/19] rounded-[3rem] p-3 bg-[#0B1122] border border-white/15 shadow-[0_40px_100px_-20px_rgba(59,98,252,.6)]" dir={isAr ? "rtl" : "ltr"} aria-hidden="true">
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black z-10" />
      <div className="h-full rounded-[2.4rem] overflow-hidden bg-gradient-to-b from-[#111A33] to-[#070B16] px-5 pt-14 pb-5 flex flex-col gap-4 text-start">
        <p className="text-white text-lg font-bold">{L.hi}</p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6, ease }}
          className="rounded-2xl p-4 bg-gradient-to-br from-[#3B62FC] to-[#2848D8] text-white">
          <p className="flex items-center gap-1.5 text-[11px] opacity-80"><Clock className="w-3.5 h-3.5" /> {L.in}</p>
          <p className="mt-1 text-2xl font-bold tabular-nums">{L.time}</p>
          <div className="mt-3 h-1.5 rounded-full bg-white/20 overflow-hidden">
            <motion.div className="h-full bg-white" initial={{ width: 0 }} animate={{ width: "64%" }} transition={{ delay: 0.5, duration: 1.2, ease }} />
          </div>
        </motion.div>
        <p className="text-[12px] font-semibold text-slate-400">{L.tasks}</p>
        <div className="space-y-2.5">
          {L.items.map((it, i) => (
            <motion.div key={it} initial={{ opacity: 0, x: isAr ? -12 : 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.12, duration: 0.5, ease }}
              className="flex items-center justify-between gap-2 rounded-xl p-3 bg-white/[.04] border border-white/[.07]">
              <span className="flex items-center gap-2 text-[12px] text-slate-200 min-w-0">
                <FileText className="w-4 h-4 text-[#9DB0FE] shrink-0" /> <span className="truncate">{it}</span>
              </span>
              <span className={`shrink-0 text-[10px] font-semibold px-2 py-1 rounded-md ${i === 0 ? "bg-emerald-400/15 text-emerald-300" : "bg-[#3B62FC]/20 text-[#C7D2FE]"}`}>
                {i === 0 ? <CheckCircle2 className="w-3.5 h-3.5" /> : L.ok}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="mt-auto flex justify-around pt-3 border-t border-white/[.06]">
          {[0, 1, 2, 3].map((i) => <span key={i} className={`w-5 h-5 rounded-md ${i === 0 ? "bg-[#3B62FC]" : "bg-white/10"}`} />)}
        </div>
      </div>
    </div>
  );
}

/** Norka AI chat drawn in code: a question, a data answer, an action. */
export function AIChatMock({ isAr }: { isAr: boolean }) {
  const L = isAr
    ? { q: "كم كانت مبيعات فرع دبي هذا الشهر مقارنة بالشهر الماضي؟", a: "مبيعات فرع دبي هذا الشهر 184,200 درهم، بزيادة 12.4% عن الشهر الماضي. أعلى صنف مبيعاً: القهوة المختصة.", q2: "أرسل التقرير للإدارة على واتساب", done: "تم إرسال التقرير إلى 3 أشخاص ✓", ph: "اسأل نوركا AI…" }
    : { q: "How did the Dubai branch do this month vs last month?", a: "Dubai sold AED 184,200 this month, up 12.4% on last month. Top seller: specialty coffee.", q2: "Send the report to management on WhatsApp", done: "Report sent to 3 people ✓", ph: "Ask Norka AI…" };
  const bars = [52, 61, 58, 70, 66, 78];
  const bubble = (delay: number) => ({ initial: { opacity: 0, y: 12, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { delay, duration: 0.5, ease } });
  return (
    <div className="dark w-full max-w-[520px] mx-auto rounded-3xl bg-[#070B16] ring-gradient shadow-[0_40px_100px_-20px_rgba(59,98,252,.55)] overflow-hidden" dir={isAr ? "rtl" : "ltr"} aria-hidden="true">
      <div className="flex items-center gap-2 px-5 h-14 border-b border-white/[.06]">
        <span className="grid place-items-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#6384FF] to-[#2848D8]"><Sparkles className="w-4 h-4 text-white" /></span>
        <span className="text-sm font-semibold text-white">Norka AI</span>
        <span className="ms-auto flex items-center gap-1.5 text-[11px] text-emerald-300"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Online</span>
      </div>
      <div className="p-5 space-y-3 text-start">
        <motion.div {...bubble(0.1)} className="ms-auto max-w-[80%] rounded-2xl rounded-se-sm px-4 py-2.5 bg-[#3B62FC] text-white text-[13px]">{L.q}</motion.div>
        <motion.div {...bubble(0.6)} className="max-w-[88%] rounded-2xl rounded-ss-sm p-4 bg-white/[.04] border border-white/[.07] text-[13px] text-slate-200 leading-relaxed">
          {L.a}
          <div className="mt-3 flex items-end gap-1.5 h-16" dir="ltr">
            {bars.map((b, i) => (
              <motion.div key={i} className={`flex-1 rounded-sm ${i === bars.length - 1 ? "bg-gradient-to-t from-[#2848D8] to-[#9DB0FE]" : "bg-[#3B62FC]/30"}`}
                initial={{ height: 0 }} animate={{ height: `${b}%` }} transition={{ delay: 0.9 + i * 0.06, duration: 0.6, ease }} />
            ))}
          </div>
        </motion.div>
        <motion.div {...bubble(1.4)} className="ms-auto max-w-[80%] rounded-2xl rounded-se-sm px-4 py-2.5 bg-[#3B62FC] text-white text-[13px]">{L.q2}</motion.div>
        <motion.div {...bubble(1.9)} className="max-w-[88%] rounded-2xl rounded-ss-sm px-4 py-2.5 bg-emerald-400/10 border border-emerald-400/20 text-[13px] text-emerald-200">{L.done}</motion.div>
      </div>
      <div className="px-5 pb-5">
        <div className="flex items-center gap-2 h-11 px-4 rounded-xl bg-white/[.04] border border-white/[.07] text-[12px] text-slate-500">
          {L.ph}<Send className="ms-auto w-4 h-4 text-[#6384FF] rtl:-scale-x-100" />
        </div>
      </div>
    </div>
  );
}


/** Norka AI at work: a WhatsApp enquiry handled end to end, with the actions it took. */
export function AIFlowMock({ isAr }: { isAr: boolean }) {
  const L = isAr
    ? {
        head: "واتساب · عميل جديد",
        q: "مرحباً، نحتاج نظام محاسبة ومخزون لـ 3 فروع. كم التكلفة؟",
        a: "أهلاً بك! نوركا ERP يغطي المحاسبة والمخزون لكل فروعك. أرسلت لك ملخصاً، وحجزت لك عرضاً مجانياً يوم الأحد 10:00 ص. هل يناسبك؟",
        ok: "ممتاز، شكراً 🙏",
        acts: ["أُضيف العميل إلى قائمة العملاء", "حُجز الموعد في التقويم", "أُبلغ فريق المبيعات"],
        by: "نوركا AI · رد خلال 3 ثوانٍ",
      }
    : {
        head: "WhatsApp · New customer",
        q: "Hi, we need accounting and inventory for 3 branches. How much is it?",
        a: "Welcome! Norka ERP covers accounting and inventory across all your branches. I've sent you a summary and booked a free demo for Sunday 10:00 AM. Does that work?",
        ok: "Perfect, thank you 🙏",
        acts: ["Customer added to CRM", "Meeting booked in calendar", "Sales team notified"],
        by: "Norka AI · replied in 3s",
      };
  const pop = (delay: number) => ({ initial: { opacity: 0, y: 14, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { delay, duration: 0.5, ease } });
  return (
    <div className="dark relative w-full max-w-[560px] mx-auto grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-4 items-center" dir={isAr ? "rtl" : "ltr"} aria-hidden="true">
      <div className="rounded-3xl overflow-hidden bg-[#0B141A] border border-white/10 shadow-[0_30px_80px_-20px_rgba(37,211,102,.35)]">
        <div className="flex items-center gap-2.5 px-4 h-12 bg-[#1F2C34]">
          <span className="grid place-items-center w-7 h-7 rounded-full bg-[#25D366]"><Send className="w-3.5 h-3.5 text-white rtl:-scale-x-100" /></span>
          <span className="text-[12px] font-semibold text-white">{L.head}</span>
        </div>
        <div className="p-4 space-y-2.5 text-start text-[12.5px] leading-relaxed bg-[radial-gradient(circle_at_20%_0%,rgba(37,211,102,.06),transparent_60%)]">
          <motion.p {...pop(0.2)} className="max-w-[85%] w-fit rounded-xl rounded-ss-sm px-3 py-2 bg-[#202C33] text-slate-100">{L.q}</motion.p>
          <motion.div {...pop(0.9)} className="ms-auto max-w-[88%] w-fit rounded-xl rounded-se-sm px-3 py-2 bg-[#005C4B] text-white">
            {L.a}
            <span className="mt-1 flex items-center gap-1 text-[10px] text-emerald-200/80"><Sparkles className="w-3 h-3" /> {L.by}</span>
          </motion.div>
          <motion.p {...pop(1.6)} className="max-w-[85%] w-fit rounded-xl rounded-ss-sm px-3 py-2 bg-[#202C33] text-slate-100">{L.ok}</motion.p>
        </div>
      </div>
      <div className="space-y-2.5">
        {L.acts.map((a, i) => (
          <motion.div key={a} {...pop(2 + i * 0.25)} className="flex items-center gap-2 rounded-xl px-3 py-2.5 bg-white/[.05] border border-white/10 text-[12px] text-slate-200 text-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {a}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
