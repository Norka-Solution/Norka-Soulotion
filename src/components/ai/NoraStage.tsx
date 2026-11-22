"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail, BellRing, CalendarCheck } from "lucide-react";
import NoraOrb from "./NoraOrb";

const ease = [0.22, 1, 0.36, 1] as const;

/** Large animated scene for Norka AI: Nora's orb with pulse rings and her skills floating around her. */
export default function NoraStage({ isAr }: { isAr: boolean }) {
  const skills = isAr
    ? [
        { Icon: MessageCircle, t: "ترد على واتساب", pos: "top-[14%] start-[6%]" },
        { Icon: Phone, t: "تستقبل المكالمات", pos: "top-[16%] end-[6%]" },
        { Icon: Mail, t: "ترتّب البريد", pos: "bottom-[30%] start-[4%]" },
        { Icon: CalendarCheck, t: "تحجز المواعيد", pos: "bottom-[30%] end-[4%]" },
        { Icon: BellRing, t: "تذكّرك بالمتابعات", pos: "bottom-[8%] start-1/2 -translate-x-1/2" },
      ]
    : [
        { Icon: MessageCircle, t: "Answers WhatsApp", pos: "top-[14%] start-[6%]" },
        { Icon: Phone, t: "Takes calls", pos: "top-[16%] end-[6%]" },
        { Icon: Mail, t: "Sorts e-mail", pos: "bottom-[30%] start-[4%]" },
        { Icon: CalendarCheck, t: "Books meetings", pos: "bottom-[30%] end-[4%]" },
        { Icon: BellRing, t: "Chases follow-ups", pos: "bottom-[8%] start-1/2 -translate-x-1/2" },
      ];

  return (
    <div className="dark relative h-full min-h-[340px] overflow-hidden bg-[radial-gradient(70%_70%_at_50%_45%,#16245e_0%,#0A1024_55%,#05070F_100%)]" aria-hidden="true">
      <div className="absolute inset-0 bg-dots opacity-50" />

      {/* pulse rings */}
      <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6384FF]/40"
            style={{ width: 150, height: 150 }}
            animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }}
          />
        ))}
        <div className="relative -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[150px] h-[150px]">
          <NoraOrb size={150} />
        </div>
        <p className="absolute left-1/2 -translate-x-1/2 top-[88px] whitespace-nowrap text-white font-bold text-lg">
          {isAr ? "نورا" : "Nora"}
          <span className="ms-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {isAr ? "تعمل الآن" : "working now"}
          </span>
        </p>
      </div>

      {skills.map(({ Icon, t, pos }, i) => (
        <motion.span
          key={t}
          className={`absolute ${pos}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease }}
        >
          <motion.span
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-semibold text-white bg-white/10 backdrop-blur border border-white/15 shadow-lg shadow-black/30 whitespace-nowrap"
          >
            <span className="grid place-items-center w-6 h-6 rounded-lg bg-[#3B62FC]"><Icon className="w-3.5 h-3.5" /></span>
            {t}
          </motion.span>
        </motion.span>
      ))}
    </div>
  );
}
