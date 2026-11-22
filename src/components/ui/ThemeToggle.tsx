"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const subscribe = () => () => {};

/** Light/dark switch with a small icon swap animation. */
export default function ThemeToggle({ isAr = false }: { isAr?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  // true only after hydration, so the icon matches the real theme
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const dark = mounted ? resolvedTheme !== "light" : true;
  const label = dark
    ? isAr ? "الوضع الفاتح" : "Switch to light mode"
    : isAr ? "الوضع الداكن" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="relative grid place-items-center w-9 h-9 rounded-lg text-ink-3 hover:text-ink-1 hover:bg-tint-2 transition-colors cursor-pointer overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.25 }}
        >
          {dark ? <Moon className="w-[18px] h-[18px]" aria-hidden="true" /> : <Sun className="w-[18px] h-[18px]" aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
