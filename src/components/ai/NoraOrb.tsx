import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Norka AI's face: her portrait inside a glowing Norka-blue ring.
 * The ring turns while she is thinking.
 */
export default function NoraOrb({ size = 40, active = false, className }: { size?: number; active?: boolean; className?: string }) {
  const ring = Math.max(2, Math.round(size / 22));
  return (
    <span className={cn("nora-avatar", active && "is-active", className)} style={{ width: size, height: size, padding: ring }} aria-hidden="true">
      <span className="nora-avatar-ring" />
      <Image
        src={size > 96 ? "/images/norka-ai/agent.jpg" : "/images/norka-ai/avatar.jpg"}
        alt=""
        width={size * 2}
        height={size * 2}
        className="relative w-full h-full rounded-full object-cover bg-[#0A1024]"
        style={size > 96 ? { objectPosition: "62% 30%" } : undefined}
      />
    </span>
  );
}
