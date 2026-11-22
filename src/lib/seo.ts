import type { Metadata } from "next";

export const SITE_URL = "https://norkasolution.com";
export const SITE_NAME = "Norka Solution";
const DEFAULT_OG_IMAGE = { url: "/og-image.png", width: 1200, height: 630, alt: "Norka Solution" };

/**
 * Per-page metadata with the pieces every page needs kept in one place:
 * a canonical URL for this exact page, en/ar alternates (+ x-default),
 * and full Open Graph / Twitter blocks. Next.js replaces nested objects
 * like `openGraph` wholesale, so they must be complete on every page.
 *
 * `path` is the route after the locale: "" for home, "/services", ...
 * `title` is used as-is (the root "%s | Norka Solution" template is skipped
 * because these titles already carry the brand).
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  noindex = false,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
  noindex?: boolean;
}): Metadata {
  const url = `/${locale}${path}`;
  const og = image ?? { ...DEFAULT_OG_IMAGE, alt: title };

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { en: `/en${path}`, ar: `/ar${path}`, "x-default": `/en${path}` },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: locale === "ar" ? "ar_AE" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_AE",
      url,
      title,
      description,
      images: [og],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
