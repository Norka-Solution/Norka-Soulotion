import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = { title: "404" };

export default async function NotFound() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 pt-32 pb-20">
      <div className="max-w-lg text-center">
        <p className="text-7xl font-black gradient-text">404</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
          {isAr ? "الصفحة غير موجودة" : "Page not found"}
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          {isAr
            ? "الرابط الذي فتحته غير موجود أو تم نقله."
            : "The page you're looking for doesn't exist or has moved."}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href={`/${locale}`} className={buttonVariants({ className: "px-5" })}>
            {isAr ? "الصفحة الرئيسية" : "Back to home"}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
          <Link
            href={`/${locale}/contact`}
            className={buttonVariants({ variant: "outline", className: "px-5" })}
          >
            {isAr ? "تواصل معنا" : "Contact us"}
          </Link>
        </div>
      </div>
    </section>
  );
}
