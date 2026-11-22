import { type Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import HeroSection from "@/components/home/HeroSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import Process from "@/components/home/Process";
import ProductShowcase from "@/components/home/ProductShowcase";
import WhyNorka from "@/components/home/WhyNorka";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TechStack from "@/components/home/TechStack";
import CEOQuote from "@/components/home/CEOQuote";
import CTASection from "@/components/home/CTASection";
import { getProjects, getServiceCopy } from "@/sanity/lib/fetch-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return pageMetadata({
    locale,
    path: "",
    title: isAr
      ? "نوركا سوليوشن | تطوير البرمجيات والذكاء الاصطناعي في الإمارات"
      : "Norka Solution | AI-Powered Software & App Development in UAE",
    description: isAr
      ? "نوركا سوليوشن — شركة تقنية رائدة في الإمارات متخصصة في تطوير تطبيقات الذكاء الاصطناعي، البرمجيات المخصصة، تطبيقات الجوال، أنظمة ERP، والتحول الرقمي في أبوظبي والعين ودبي."
      : "NORKA SOLUTION — Leading software development company in UAE specializing in AI-integrated applications, custom web & mobile apps, ERP systems, and digital transformation across Abu Dhabi, Al Ain & Dubai.",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fallback-safe: returns Sanity content when NEXT_PUBLIC_SANITY_PROJECT_ID
  // is set, otherwise the local src/lib/data/*.ts files — see
  // src/sanity/lib/fetch-content.ts.
  const [projects, serviceCopy] = await Promise.all([getProjects(), getServiceCopy()]);

  return (
    <>
      <HeroSection locale={locale} />
      <TechStack />
      <ServicesPreview locale={locale} serviceCopy={serviceCopy} />
      <ProductShowcase locale={locale} />
      <Process />
      <FeaturedProjects locale={locale} projects={projects} />
      <WhyNorka locale={locale} />
      <CEOQuote locale={locale} />
      <CTASection locale={locale} />
    </>
  );
}
