import Image from "next/image";
import MonogramAvatar from "@/components/art/MonogramAvatar";
import type { TeamMember } from "@/lib/data/team";
import { cn } from "@/lib/utils";

/** The member's photo when one is set, otherwise their branded monogram. */
export default function TeamPhoto({ member, lang, className, sizes = "160px" }: { member: TeamMember; lang: "en" | "ar"; className?: string; sizes?: string }) {
  if (member.photo) {
    return (
      <span className={cn("relative block overflow-hidden", className)}>
        <Image src={member.photo} alt={member.name[lang]} fill sizes={sizes} className="object-cover" />
      </span>
    );
  }
  return <MonogramAvatar name={member.name[lang]} className={className} />;
}
