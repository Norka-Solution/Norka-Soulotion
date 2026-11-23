import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { Cairo } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { routing } from "@/i18n/routing";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/ChatWidget";
import { NoraProvider } from "@/components/ai/NoraContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ui/ScrollToTop";
import SmoothScroll from "@/components/fx/SmoothScroll";
import Cursor from "@/components/fx/Cursor";
import IntroLoader, { introSkipScript } from "@/components/fx/IntroLoader";

// Organization structured data for Google Knowledge Panel
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Norka Solution",
  alternateName: "NORKA SOLUTION",
  url: "https://norkasolution.com",
  logo: "https://norkasolution.com/logo.svg",
  image: "https://norkasolution.com/og-image.png",
  description:
    "Leading software development company in UAE specializing in AI-powered applications, custom web & mobile apps, ERP systems, and digital transformation solutions.",
  foundingDate: "2020",
  founder: {
    "@type": "Person",
    name: "Eng. Ahmed Kamel",
    jobTitle: "CEO & Founder",
  },
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Abu Dhabi",
      addressCountry: "AE",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Al Ain",
      addressCountry: "AE",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+971-50-725-7157",
    contactType: "customer service",
    email: "info@norkasolution.com",
    availableLanguage: ["English", "Arabic"],
    areaServed: "AE",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61592851251188",
    "https://www.instagram.com/norka_soulotion/",
    "https://www.linkedin.com/in/norka-solution-6a2140413/",
    "https://www.youtube.com/@NorkaSolution",
    "https://www.tiktok.com/@norkapinkw3",
  ],
  knowsAbout: [
    "AI Application Development",
    "Artificial Intelligence Integration",
    "Custom Software Development",
    "Web Application Development",
    "Mobile App Development",
    "ERP Systems",
    "Machine Learning Solutions",
    "Digital Transformation",
    "UI/UX Design",
    "IT Consulting",
  ],
  areaServed: {
    "@type": "Country",
    name: "United Arab Emirates",
  },
  priceRange: "$$",
};

// Typography: Cairo for both Arabic and English.
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        {/* skip the logo intro if it already played in this session */}
        <script dangerouslySetInnerHTML={{ __html: introSkipScript }} />
        <noscript><style>{`.nk-loader{display:none}`}</style></noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${cairo.variable} ${GeistMono.variable} antialiased bg-page text-ink-3`}
      >
        {/* Dark by default (the signature look); visitors can switch to light. */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <NoraProvider locale={locale}>
            <TooltipProvider delay={200}>
              <IntroLoader />
              <SmoothScroll />
              <Cursor />
              <Header locale={locale} />
              <main id="main-content" className="min-h-screen relative">{children}</main>
              <Footer locale={locale} />
              <ChatWidget />
              <WhatsAppButton />
              <ScrollToTop />
              <Toaster />
            </TooltipProvider>
            </NoraProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
