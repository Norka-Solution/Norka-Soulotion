import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { getProjectBySlug } from "@/sanity/lib/fetch-content";
import ProjectShowcase from "@/components/portfolio/ProjectShowcase";

// Deliberately no generateStaticParams here (pre-existing issue, not
// something this migration introduced): src/app/[locale]/layout.tsx calls
// next-intl's getMessages(), which reads a dynamic API for locale
// detection. Every other route under [locale] is consequently rendered
// on-demand (marked "ƒ" in the build output) — statically prerendering
// just this one leaf conflicts with that and throws
// DYNAMIC_SERVER_USAGE on any slug not in the (empty, for the same
// reason) static param set. Rendering on-demand like its siblings avoids
// the conflict entirely; per-request cost here is a single project
// lookup, not worth fighting the static/dynamic mismatch for.
type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const lang = locale === "ar" ? "ar" : "en";
  const title = `${project.title[lang]} | ${lang === "ar" ? "نوركا سوليوشن" : "Norka Solution"}`;
  return pageMetadata({
    locale,
    path: `/portfolio/${slug}`,
    title,
    description: project.description[lang],
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const lang = locale === "ar" ? "ar" : "en";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title[lang],
    description: project.description[lang],
    url: `${SITE_URL}/${locale}/portfolio/${slug}`,
    keywords: project.techStack.join(", "),
    inLanguage: lang,
    creator: { "@type": "Organization", name: "Norka Solution", url: SITE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ProjectShowcase project={project} locale={locale} />
    </>
  );
}
