import Image from "next/image";
import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

/** A project's real cover photo, with a soft bottom shade and hover zoom (inside a .group). */
export default function ProjectPhoto({
  project,
  lang,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  priority = false,
}: {
  project: Pick<Project, "image" | "title" | "category">;
  lang: "en" | "ar";
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-page-2", className)}>
      {project.image && (
        <Image
          src={project.image}
          alt={project.title[lang]}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" aria-hidden="true" />
    </div>
  );
}
