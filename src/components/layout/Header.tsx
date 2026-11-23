"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, Globe, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { images } from "@/lib/images.config";

// where a customer signs in and finds every Norka product their company has

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t           = useTranslations("nav");
  const pathname    = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [visible,   setVisible]   = useState(true);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const prevY   = useRef(0);
  const ticking = useRef(false);

  const otherLocale    = locale === "en" ? "ar" : "en";
  const switchPath     = pathname.replace(`/${locale}`, `/${otherLocale}`);
  const isAr           = locale === "ar";
  // pages whose header area sits on a dark photo/video: keep the bar light-on-dark until scrolled
  const darkTop        = /^\/(en|ar)(\/(services|portfolio|about|contact))?\/?$/.test(pathname);

  /* Close menu on route change (adjusted during render, not in an effect) */
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  /* ── Scroll behavior: hide on scroll-down, show on scroll-up ──
     rAF-gated so state updates happen at most once per frame, not
     once per raw scroll event. `scrolled` now only toggles opacity/shadow
     strength — the header is always light, on every page, so there's no
     more transparent-over-dark-hero branch to track. */
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setVisible(y > prevY.current && y > 80 ? false : true);
        prevY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: `/${locale}`,           label: t("home") },
    { href: `/${locale}/services`,  label: t("services") },
    { href: `/${locale}/portfolio`, label: t("portfolio") },
    { href: `/${locale}/about`,     label: t("about") },
    { href: `/${locale}/contact`,   label: t("contact") },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== `/${locale}` && pathname.startsWith(href));

  return (
    <>
      {/* ── Skip link ─────────────────────────────────────────── */}
      <a href="#main-content" className="skip-link">
        {isAr ? "انتقل للمحتوى الرئيسي" : "Skip to main content"}
      </a>

      <header
        role="banner"
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500",
          visible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3">
          <div
            className={cn(
              "flex items-center justify-between h-[60px] ps-3 pe-2 rounded-2xl border transition-all duration-500",
              darkTop && !scrolled && "dark",
              scrolled
                ? "bg-panel/75 border-hair backdrop-blur-xl shadow-[0_10px_40px_-14px_rgba(15,23,42,.25)] dark:shadow-[0_10px_40px_-12px_rgba(0,0,0,.8)]"
                : "bg-transparent border-transparent"
            )}
          >
            {/* ── Logo ────────────────────────────────────────── */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6384FF] rounded-lg"
              aria-label="Norka Solution — Home"
            >
              <Image
                src={images.brand.mark.src}
                alt=""
                width={34}
                height={34}
                className="w-[34px] h-[34px] drop-shadow-[0_0_12px_rgba(59,98,252,.55)] transition-transform duration-500 group-hover:rotate-[20deg]"
                priority
              />
              <span className="text-[1.05rem] font-bold tracking-tight text-ink-1 whitespace-nowrap">
                Norka<span className="hidden sm:inline text-ink-3 font-medium"> Solution</span>
              </span>
            </Link>

            {/* ── Desktop nav ──────────────────────────────────── */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label={isAr ? "القائمة الرئيسية" : "Main navigation"}
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                    isActive(item.href)
                      ? "text-ink-1 bg-tint-2"
                      : "text-ink-3 hover:text-ink-1"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* ── Right actions ────────────────────────────────── */}
            <div className="flex items-center gap-1.5">
              {/* Language switch: one click goes straight to the other language */}
              <Link
                href={switchPath}
                hrefLang={otherLocale}
                lang={otherLocale}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-semibold transition-colors text-ink-3 hover:text-ink-1 hover:bg-tint-2"
                aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span>{isAr ? "EN" : "عربي"}</span>
              </Link>

              <ThemeToggle isAr={isAr} />

              {/* Desktop CTA */}
              <Link
                href={`/${locale}/contact`}
                className="btn-glow hidden lg:inline-flex px-4 py-2 text-sm rounded-xl"
              >
                {t("getStarted")}
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" />
              </Link>

              {/* Mobile hamburger */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen(true)}
                aria-label={isAr ? "فتح القائمة" : "Open menu"}
                className="lg:hidden text-ink-2 hover:bg-tint-2"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ─────────────────────────────────────────── */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" data-lenis-prevent className="w-3/4 sm:max-w-sm bg-panel border-hair">
          <SheetHeader>
            <SheetTitle>{isAr ? "القائمة" : "Menu"}</SheetTitle>
          </SheetHeader>
          <nav className="px-4 flex-1" aria-label={isAr ? "قائمة الموبايل" : "Mobile navigation"}>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200",
                      isActive(item.href)
                        ? "text-accent bg-accent/10 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-surface dark:hover:bg-gray-800"
                    )}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <SheetFooter className="border-t border-gray-100 dark:border-gray-800 pt-4">
            <Link
              href={`/${locale}/contact`}
              className={buttonVariants({ className: "w-full justify-center py-3.5" })}
              aria-label={t("getStarted")}
            >
              {t("getStarted")}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
            <Link
              href={switchPath}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-surface dark:hover:bg-gray-800 transition-colors"
            >
              <Globe className="w-4 h-4" aria-hidden="true" />
              {locale === "en" ? "العربية" : "English"}
            </Link>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
