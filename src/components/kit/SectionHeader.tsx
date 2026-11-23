import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

/** Eyebrow pill + big gradient title + muted subtitle, used by every section. */
export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  id,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  /** optional trailing words rendered in Norka blue */
  highlight?: string;
  subtitle?: string;
  align?: "center" | "start";
  id?: string;
  action?: ReactNode;
  className?: string;
}) {
  const center = align === "center";
  return (
    <div
      className={cn(
        "mb-12 md:mb-16 flex flex-col gap-6",
        center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <Reveal className={cn(center && "max-w-3xl")}>
        {eyebrow && <span className="eyebrow mb-5">{eyebrow}</span>}
        <h2
          id={id}
          className="t-h2"
        >
          <span className="text-hero">{title}</span>
          {highlight && <span className="text-blue-glow"> {highlight}</span>}
        </h2>
        {subtitle && (
          <p className={cn("mt-5 t-lead", center ? "mx-auto max-w-2xl" : "max-w-xl")}>
            {subtitle}
          </p>
        )}
      </Reveal>
      {action && <Reveal delay={0.1}>{action}</Reveal>}
    </div>
  );
}
