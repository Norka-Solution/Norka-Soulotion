import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getProjects } from "@/sanity/lib/fetch-content";
import { SITE_URL } from "@/lib/seo";

// Rebuilt at most once an hour, so new CMS projects show up without a deploy.
export const revalidate = 3600;

const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
];

function entry(path: string, priority: number, changeFrequency: "weekly" | "monthly"): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]));
  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  return [
    ...pages.flatMap((p) => entry(p.path, p.priority, p.changeFrequency)),
    ...projects.flatMap((p) => entry(`/portfolio/${p.slug}`, 0.6, "monthly")),
  ];
}
