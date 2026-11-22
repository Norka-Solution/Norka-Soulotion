import { cn } from "@/lib/utils";

/**
 * Nora's face: a living orb of Norka-blue light (pure CSS).
 * It breathes slowly when idle and swirls faster while she is thinking.
 */
export default function NoraOrb({ size = 40, active = false, className }: { size?: number; active?: boolean; className?: string }) {
  return (
    <span
      className={cn("nora-orb", active && "is-active", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="nora-orb-swirl" />
      <span className="nora-orb-core" />
      <span className="nora-orb-shine" />
    </span>
  );
}
