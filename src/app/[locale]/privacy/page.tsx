import { type Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PrivacyContent from "./PrivacyContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  const title = isAr ? "سياسة الخصوصية | نوركا سوليوشن" : "Privacy Policy | Norka Solution";
  const description = isAr
    ? "سياسة الخصوصية الخاصة بنوركا سوليوشن — كيف نجمع معلوماتك ونحميها ونستخدمها."
    : "Norka Solution's Privacy Policy — how we collect, protect, and use your information.";

  return pageMetadata({ locale, path: "/privacy", title, description, noindex: true });
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
