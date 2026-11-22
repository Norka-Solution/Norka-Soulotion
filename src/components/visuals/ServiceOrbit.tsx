"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Code-drawn service illustration: the service icon glowing in the middle,
 * concentric rings, and its features orbiting as chips. Decorative.
 */
export default function ServiceOrbit({ Icon, features }: { Icon: LucideIcon; features: string[] }) {
  const spots = [
    { left: "8%", top: "16%" },
    { left: "62%", top: "8%" },
    { left: "4%", top: "70%" },
    { left: "60%", top: "78%" },
  ];
  return (
    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#070B16] border border-white/[.06]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(59,98,252,.28),transparent_70%)]" />
      <div className="absolute inset-0 bg-dots opacity-50" />

      {/* rings */}
      {[0.38, 0.6, 0.82].map((s, i) => (
        <motion.div
          key={s}
          className="absolute left-1/2 top-1/2 rounded-full border border-[#6384FF]/15"
          style={{ width: `${s * 100}%`, aspectRatio: "1", x: "-50%", y: "-50%" }}
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.12, duration: 1, ease }}
        />
      ))}
      {/* spinning arc */}
      <div className="absolute left-1/2 top-1/2 w-[60%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow"
        style={{ background: "conic-gradient(from 0deg, transparent 0 75%, rgba(99,132,255,.55) 92%, transparent)", WebkitMask: "radial-gradient(circle, transparent 69%, #000 70%, #000 71%, transparent 72%)", mask: "radial-gradient(circle, transparent 69%, #000 70%, #000 71%, transparent 72%)" }}
      />

      {/* core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rounded-3xl bg-[#3B62FC] blur-2xl opacity-60" />
        <div className="relative grid place-items-center w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-[#6384FF] to-[#2848D8] ring-1 ring-white/25 shadow-2xl">
          <Icon className="w-9 h-9 md:w-11 md:h-11 text-white" />
        </div>
      </div>

      {/* features */}
      {features.slice(0, 4).map((f, i) => (
        <motion.div
          key={f}
          className="absolute"
          style={spots[i]}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            className="px-3 py-1.5 rounded-lg bg-[#0B1122]/90 backdrop-blur border border-white/10 text-[12px] font-medium text-slate-200 whitespace-nowrap shadow-lg shadow-black/40"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#6384FF] me-2 align-middle" />
            {f}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
