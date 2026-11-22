import Image from "next/image";
import type { TeamMember } from "@/lib/data/team";
import { cn } from "@/lib/utils";

/** The member's photo when one is set, otherwise the Norka mark on a blue stage (no initials). */
export default function TeamPhoto({ member, lang, className, sizes = "160px" }: { member: TeamMember; lang: "en" | "ar"; className?: string; sizes?: string }) {
  if (member.photo) {
    return (
      <span className={cn("relative block overflow-hidden", className)}>
        <Image src={member.photo} alt={member.name[lang]} fill sizes={sizes} className="object-cover" />
      </span>
    );
  }
  return (
    <span
      className={cn("relative grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#1A2B6E,#0A1024_70%)]", className)}
      role="img"
      aria-label={member.name[lang]}
    >
      <Image src="/logo-mark.png" alt="" width={96} height={96} className="w-[58%] h-[58%] object-contain drop-shadow-[0_0_18px_rgba(59,98,252,.8)]" />
    </span>
  );
}
