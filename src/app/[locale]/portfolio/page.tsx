import { type Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PortfolioContent from "./PortfolioContent";
import { getProjects } from "@/sanity/lib/fetch-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const isAr = locale === "ar";
  const title = isAr
    ? "أعمالنا | نوركا سوليوشن"
    : "Our Portfolio | Norka Solution";
  const description = isAr
    ? "استعرض مشاريعنا المنجزة في تطوير تطبيقات الويب، الموبايل، وأنظمة ERP لعملاء من الإمارات وخارجها."
    : "Explore our completed projects in web app development, mobile apps, and ERP systems for clients across the UAE and beyond.";

  return pageMetadata({ locale, path: "/portfolio", title, description });
}

export default async function PortfolioPage() {
  const projects = await getProjects();
  return <PortfolioContent projects={projects} />;
}
