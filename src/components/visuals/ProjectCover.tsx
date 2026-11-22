import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

/**
 * Code-drawn cover art for a project, replacing stock photos.
 * The mockup follows the project's category (ERP dashboard, website,
 * mobile app) and its accent colour is picked from the slug, so every
 * project looks different but stays on-brand. Decorative only.
 */

const ACCENTS = [
  { a: "#3B62FC", b: "#38BDF8" },
  { a: "#6384FF", b: "#8B5CF6" },
  { a: "#2848D8", b: "#22D3EE" },
  { a: "#7C3AED", b: "#3B62FC" },
  { a: "#0EA5E9", b: "#6384FF" },
];

function accentFor(slug: string) {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return ACCENTS[h % ACCENTS.length];
}

function Bars({ a, b, count = 7, seed = 1 }: { a: string; b: string; count?: number; seed?: number }) {
  return (
    <div className="flex items-end gap-1 h-full">
      {Array.from({ length: count }, (_, i) => {
        const v = 30 + ((i * 37 * seed + 17) % 65);
        return (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{ height: `${v}%`, background: i === count - 2 ? `linear-gradient(to top, ${a}, ${b})` : `${a}40` }}
          />
        );
      })}
    </div>
  );
}

function ErpMock({ title, a, b, seed }: { title: string; a: string; b: string; seed: number }) {
  return (
    <div className="absolute inset-x-[8%] top-[14%] bottom-[-6%] rounded-t-xl bg-[#080D1A] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden flex">
      <div className="w-[22%] border-e border-white/[.06] p-2 space-y-1.5">
        <div className="h-2.5 w-3/4 rounded-sm" style={{ background: a }} />
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={cn("h-1.5 rounded-sm", i === 0 ? "bg-white/25" : "bg-white/[.08]")} style={{ width: `${60 + (i * 13) % 35}%` }} />
        ))}
      </div>
      <div className="flex-1 p-2.5 space-y-2">
        <p className="text-[9px] font-semibold text-white/80 truncate">{title}</p>
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md bg-white/[.04] border border-white/[.06] p-1.5">
              <div className="h-1 w-1/2 rounded-sm bg-white/15 mb-1" />
              <div className="h-2 w-3/4 rounded-sm" style={{ background: i === 0 ? b : "rgba(255,255,255,.35)" }} />
            </div>
          ))}
        </div>
        <div className="h-[42%] rounded-md bg-white/[.03] border border-white/[.06] p-1.5">
          <Bars a={a} b={b} count={10} seed={seed} />
        </div>
      </div>
    </div>
  );
}

function WebMock({ title, a, b }: { title: string; a: string; b: string }) {
  return (
    <div className="absolute inset-x-[8%] top-[14%] bottom-[-6%] rounded-t-xl bg-[#080D1A] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden">
      <div className="flex items-center gap-1 px-2.5 h-5 border-b border-white/[.06]">
        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
      </div>
      <div className="p-3 grid grid-cols-5 gap-3 items-center">
        <div className="col-span-3 space-y-1.5">
          <p className="text-[11px] font-bold text-white leading-tight line-clamp-2">{title}</p>
          <div className="h-1.5 w-full rounded-sm bg-white/10" />
          <div className="h-1.5 w-4/5 rounded-sm bg-white/10" />
          <div className="mt-2 h-3.5 w-16 rounded" style={{ background: a }} />
        </div>
        <div className="col-span-2 aspect-square rounded-lg" style={{ background: `radial-gradient(circle at 30% 30%, ${b}, ${a} 55%, transparent 75%)` }} />
      </div>
      <div className="px-3 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md bg-white/[.04] border border-white/[.06] h-10 p-1.5">
            <div className="h-2 w-2 rounded-sm mb-1" style={{ background: i === 1 ? b : a }} />
            <div className="h-1 w-3/4 rounded-sm bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Phone({ title, a, b, className, seed }: { title?: string; a: string; b: string; className?: string; seed: number }) {
  return (
    <div className={cn("absolute w-[32%] aspect-[9/19] rounded-[14%/7%] bg-[#0B1122] border border-white/15 p-[3%] shadow-2xl shadow-black/70", className)}>
      <div className="w-full h-full rounded-[11%/5.5%] overflow-hidden bg-gradient-to-b from-[#111A33] to-[#080D1A] p-[8%] space-y-[8%]">
        <div className="mx-auto h-[2%] w-1/3 rounded-full bg-white/10" />
        {title && <p className="text-[8px] font-bold text-white leading-tight line-clamp-2">{title}</p>}
        <div className="rounded-lg p-[8%]" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
          <div className="h-1 w-1/2 rounded-sm bg-white/60 mb-1" />
          <div className="h-2 w-3/4 rounded-sm bg-white" />
        </div>
        <div className="h-[22%]"><Bars a={a} b={b} count={6} seed={seed} /></div>
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15 shrink-0" />
            <span className="h-1 flex-1 rounded-sm bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectCover({
  project,
  lang,
  className,
}: {
  project: Pick<Project, "slug" | "category" | "title">;
  lang: "en" | "ar";
  className?: string;
}) {
  const { a, b } = accentFor(project.slug);
  const seed = project.slug.length;
  const title = project.title[lang];

  return (
    <div
      className={cn("relative overflow-hidden bg-[#070B16]", className)}
      aria-hidden="true"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* coloured light */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(80% 70% at 50% 100%, ${a}55, transparent 70%), radial-gradient(50% 50% at 85% 10%, ${b}30, transparent 70%)` }} />
      <div className="absolute inset-0 bg-grid opacity-60" />

      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04] group-hover:-translate-y-1">
        {project.category === "mobile" ? (
          <>
            <Phone a={a} b={b} seed={seed} className="left-[18%] top-[16%] -rotate-[8deg] opacity-70" />
            <Phone title={title} a={a} b={b} seed={seed + 3} className="left-[46%] top-[10%] rotate-[6deg]" />
          </>
        ) : project.category === "erp" ? (
          <ErpMock title={title} a={a} b={b} seed={seed} />
        ) : (
          <WebMock title={title} a={a} b={b} />
        )}
      </div>
    </div>
  );
}
