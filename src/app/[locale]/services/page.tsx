import { type Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ServicesContent from "./ServicesContent";
import { getServiceCopy } from "@/sanity/lib/fetch-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const isAr = locale === "ar";
  const title = isAr
    ? "خدماتنا | نوركا سوليوشن"
    : "Our Services | Norka Solution";
  const description = isAr
    ? "نقدم خدمات متكاملة: تطوير البرمجيات، تطبيقات الجوال، أنظمة ERP، البنية التحتية، تصميم UI/UX، التسويق الرقمي وإعداد الشركات في الإمارات."
    : "We offer end-to-end services: custom software, mobile apps, ERP systems, IT infrastructure, UI/UX design, digital marketing, and business consulting across the UAE.";

  return pageMetadata({ locale, path: "/services", title, description });
}

export default async function ServicesPage() {
  const serviceCopy = await getServiceCopy();
  return <ServicesContent serviceCopy={serviceCopy} />;
}
