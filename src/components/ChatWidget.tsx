"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { NORA_AVATAR, useNora } from "@/components/ai/NoraContext";
import NoraThread from "@/components/ai/NoraThread";

/** Floating "Ask Nora" button + chat window, sharing the conversation with the hero chat. */
export default function ChatWidget() {
  const params = useParams();
  const isAr = ((params.locale as string) || "en") === "ar";
  const { open, setOpen, heroChatVisible } = useNora();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <>
      <AnimatePresence>
        {!open && !heroChatVisible && (
          <motion.button
            type="button"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-3 ps-1.5 pe-4 py-1.5 rounded-full bg-[#0B1122] text-white shadow-2xl shadow-black/40 ring-1 ring-white/10 hover:ring-[#6384FF]/60 transition-all cursor-pointer"
            aria-label={isAr ? "تحدث مع نورا" : "Chat with Nora"}
          >
            <span className="relative">
              <Image src={NORA_AVATAR} alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
              <span className="absolute bottom-0 end-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#0B1122]" />
            </span>
            <span className="text-start leading-tight hidden sm:block">
              <span className="block text-sm font-bold">{isAr ? "اسأل نورا" : "Ask Nora"}</span>
              <span className="block text-[11px] text-slate-400">{isAr ? "الموظفة الذكية · متاحة الآن" : "AI employee · online now"}</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={isAr ? "محادثة مع نورا" : "Chat with Nora"}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="fixed bottom-6 left-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[560px] max-h-[calc(100vh-6rem)] flex flex-col rounded-3xl overflow-hidden bg-panel border border-hair shadow-2xl shadow-black/40"
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#0B1430] to-[#141E46] text-white">
              <span className="relative">
                <Image src={NORA_AVATAR} alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20" />
                <span className="absolute bottom-0 end-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#0B1430]" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{isAr ? "نورا · نوركا AI" : "Nora · Norka AI"}</p>
                <p className="text-[11px] text-slate-300">{isAr ? "الموظفة الذكية · ترد فوراً" : "AI employee · replies instantly"}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid place-items-center w-8 h-8 rounded-lg hover:bg-white/10 cursor-pointer"
                aria-label={isAr ? "إغلاق المحادثة" : "Close chat"}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <NoraThread isAr={isAr} compact autoFocus />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
