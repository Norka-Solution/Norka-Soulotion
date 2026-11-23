"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Real photo for a service, with its icon and features floating over it. */
export default function ServicePhoto({ src, alt, Icon, features }: { src: string; alt: string; Icon: LucideIcon; features: string[] }) {
  const spots = ["top-5 start-5", "bottom-5 end-5", "bottom-5 start-5"];
  return (
    <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-hair shadow-[0_30px_80px_-30px_rgba(15,23,42,.45)]">
      <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04060D]/70 via-[#04060D]/10 to-transparent" aria-hidden="true" />

      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6, ease }}
        className="absolute top-5 end-5 grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6384FF] to-[#2848D8] text-white shadow-[0_10px_30px_-6px_rgba(59,98,252,.9)] ring-1 ring-white/30"
        aria-hidden="true"
      >
        <Icon className="w-7 h-7" />
      </motion.span>

      {features.slice(0, 3).map((f, i) => (
        <motion.span
          key={f}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 + i * 0.12, duration: 0.6, ease }}
          className={`absolute ${spots[i]} ${i === 0 ? "hidden sm:inline-flex" : "inline-flex"} items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold text-[#0A0F1F] bg-white/90 backdrop-blur shadow-lg`}
          aria-hidden="true"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B62FC]" /> {f}
        </motion.span>
      ))}
    </div>
  );
}
