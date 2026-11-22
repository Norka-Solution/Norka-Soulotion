import { type Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import TermsContent from "./TermsContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  const title = isAr ? "الشروط والأحكام | نوركا سوليوشن" : "Terms of Service | Norka Solution";
  const description = isAr
    ? "الشروط والأحكام الخاصة باستخدام خدمات نوركا سوليوشن."
    : "Terms of Service governing the use of Norka Solution's services and website.";

  return pageMetadata({ locale, path: "/terms", title, description, noindex: true });
}

export default function TermsPage() {
  return <TermsContent />;
}
