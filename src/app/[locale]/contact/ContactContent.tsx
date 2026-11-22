"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin, Phone, Mail, Clock,
  Send, CheckCircle, AlertCircle, Loader2, ArrowRight,
} from "lucide-react";
import { staggerContainer, staggerItem, viewport } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import PageHero from "@/components/kit/PageHero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function ContactContent() {
  const t      = useTranslations("contact");
  const navT   = useTranslations("nav");
  const params = useParams();
  const locale = params.locale as string;
  const isAr   = locale === "ar";

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError]               = useState("");
  const [formKey, setFormKey]           = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const contactInfo = [
    { icon: MapPin, label: t("info.address"), value: t("info.addressValue"), href: undefined },
    { icon: Phone,  label: t("info.phone"),   value: t("info.phoneValue"),   href: `tel:${t("info.phoneValue")}` },
    { icon: Mail,   label: t("info.email"),   value: t("info.emailValue"),   href: `mailto:${t("info.emailValue")}` },
    { icon: Clock,  label: t("info.hours"),   value: t("info.hoursValue"),   href: undefined },
  ];

  const serviceOptions = [
    "webApp", "mobileApp", "erp", "website",
    "infrastructure", "uiux", "marketing", "consulting", "other",
  ] as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name:     formData.get("name") as string,
      email:    formData.get("email") as string,
      phone:    formData.get("phone") as string,
      service:  formData.get("service") as string,
      message:  formData.get("message") as string,
      // Honeypot — left empty by humans, filled in by bots. Server rejects if non-empty.
      website: formData.get("website") as string,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 429) {
        setError(isAr ? "تم إرسال رسالة للتو، انتظر قليلاً ثم حاول مرة أخرى" : "You just sent a message. Please wait a moment and try again.");
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Failed");
      }
      setIsSubmitted(true);
      formRef.current?.reset();
      setFormKey((k) => k + 1);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      setError(isAr ? "حدث خطأ، يرجى المحاولة مرة أخرى" : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <PageHero
        locale={locale}
        homeLabel={navT("home")}
        crumb={t("title")}
        eyebrow={isAr ? "نرد خلال 24 ساعة" : "We reply within 24 hours"}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* ── Contact Section ─────────────────────────────────────── */}
      <section className="relative bg-[var(--ink)] pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 xl:gap-16">

            {/* ── Left: Info ────────────────────────────────────── */}
            <motion.div
              variants={staggerContainer(.1)}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2 space-y-4"
              aria-label={isAr ? "معلومات الاتصال" : "Contact information"}
            >
              {contactInfo.map(({ icon: Icon, label, value, href }) => {
                const Tag = href ? "a" : "div";
                return (
                  <motion.div key={label} variants={staggerItem}>
                    <Tag {...(href ? { href } : {})} className={href ? "block group" : "block"}>
                      <Card
                        className={`card-glow flex-row items-start gap-4 p-5 rounded-2xl ring-0 transition-all duration-300 ${href ? "group-hover:ring-accent/40 group-hover:shadow-lg cursor-pointer" : ""}`}
                      >
                        <div className="p-3 rounded-xl bg-[#3B62FC]/15 shrink-0">
                          <Icon className="w-5 h-5 text-[#9DB0FE]" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</div>
                          <div
                            className={`text-sm font-semibold text-gray-900 dark:text-white truncate ${href ? "group-hover:text-accent transition-colors" : ""}`}
                            dir={Icon === Phone ? "ltr" : undefined}
                          >
                            {value}
                          </div>
                        </div>
                      </Card>
                    </Tag>
                  </motion.div>
                );
              })}

              {/* Quick CTA */}
              <motion.div variants={staggerItem}>
                <Card className="relative overflow-hidden block p-6 rounded-2xl bg-[#0A1022] ring-0 ring-gradient">
                  <p className="text-white font-semibold text-sm mb-4">
                    {isAr ? "هل تريد استشارة سريعة؟" : "Want a quick consultation?"}
                  </p>
                  <a
                    href="https://wa.me/971507257157"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow w-full text-sm"
                    aria-label={isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
                  >
                    {isAr ? "واتساب مباشر" : "WhatsApp us now"}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                  </a>
                  <p className="text-slate-500 text-xs text-center mt-3">
                    {isAr ? "رد فوري · بدون رسوم" : "Instant reply · No fees"}
                  </p>
                </Card>
              </motion.div>
            </motion.div>

            {/* ── Right: Form ───────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: .6, delay: .3 }}
              className="lg:col-span-3"
            >
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                aria-label={isAr ? "نموذج الاتصال" : "Contact form"}
                noValidate
              >
              <Card className="relative block bg-[#070B16] rounded-3xl p-8 md:p-10 ring-0 ring-gradient shadow-[0_40px_100px_-30px_rgba(59,98,252,.45)]">
                <h2 className="font-heading text-2xl font-bold text-white mb-8">
                  {isAr ? "أرسل لنا رسالة" : "Send us a message"}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <Label htmlFor="contact-name" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t("form.name")} <span className="text-red-500" aria-hidden="true">*</span>
                    </Label>
                    <Input
                      id="contact-name"
                      type="text" name="name" required
                      className="h-auto px-4 py-3.5 rounded-xl text-sm bg-white/[.03] border-white/10 focus-visible:border-[#6384FF]/60 focus-visible:ring-[#3B62FC]/25"
                      placeholder={t("form.name")}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t("form.email")} <span className="text-red-500" aria-hidden="true">*</span>
                    </Label>
                    <Input
                      id="contact-email"
                      type="email" name="email" required
                      className="h-auto px-4 py-3.5 rounded-xl text-sm bg-white/[.03] border-white/10 focus-visible:border-[#6384FF]/60 focus-visible:ring-[#3B62FC]/25"
                      placeholder={t("form.email")}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <Label htmlFor="contact-phone" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t("form.phone")}
                    </Label>
                    <Input
                      id="contact-phone"
                      type="tel" name="phone"
                      className="h-auto px-4 py-3.5 rounded-xl text-sm bg-white/[.03] border-white/10 focus-visible:border-[#6384FF]/60 focus-visible:ring-[#3B62FC]/25"
                      placeholder={t("form.phone")}
                      dir="ltr"
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-service" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t("form.service")} <span className="text-red-500" aria-hidden="true">*</span>
                    </Label>
                    <Select key={formKey} name="service" required items={serviceOptions.map((opt) => ({ value: opt, label: t(`form.serviceOptions.${opt}`) }))}>
                      <SelectTrigger id="contact-service" className="w-full h-auto px-4 py-3.5 rounded-xl text-sm bg-white/[.03] border-white/10">
                        <SelectValue placeholder={t("form.servicePlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{t(`form.serviceOptions.${opt}`)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="contact-message" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {t("form.message")} <span className="text-red-500" aria-hidden="true">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    name="message" required rows={5}
                    className="px-4 py-3.5 rounded-xl text-sm resize-none bg-white/[.03] border-white/10 focus-visible:border-[#6384FF]/60 focus-visible:ring-[#3B62FC]/25"
                    placeholder={t("form.message")}
                  />
                </div>

                {/* Honeypot — hidden from real users, tabIndex -1 keeps it out of keyboard/AT flow.
                    Uses the standard clip-based sr-only pattern rather than a large negative
                    `left` offset — `left` is a physical property that doesn't flip under RTL,
                    and a -9999px offset was blowing out the page's scrollable width on the
                    Arabic version (RTL's overflow direction made it land inside the document
                    bounds instead of safely outside them). */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                {error && (
                  <div role="alert" className="mb-5 flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitted || isSubmitting}
                  className="btn-glow w-full sm:w-auto h-auto px-10 py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  aria-live="polite"
                >
                  {isSubmitted ? (
                    <><CheckCircle className="w-5 h-5" aria-hidden="true" /> {t("form.sent")}</>
                  ) : isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> {t("form.sending")}</>
                  ) : (
                    <><Send className="w-5 h-5" aria-hidden="true" /> {t("form.send")}</>
                  )}
                </Button>

                <p className="text-xs text-slate-500 mt-4">
                  {isAr
                    ? "بإرسال هذه الرسالة، أنت توافق على سياسة الخصوصية الخاصة بنا."
                    : "By submitting, you agree to our Privacy Policy."}
                  {" "}
                  <Link href={`/${locale}/privacy`} className="text-[#9DB0FE] hover:underline">
                    {isAr ? "اقرأ المزيد" : "Read more"}
                  </Link>
                </p>
              </Card>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Google Maps ─────────────────────────────────────────── */}
      <section className="pb-24 bg-[var(--ink)]" aria-label={isAr ? "الموقع الجغرافي" : "Location map"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: .6 }}
            className="rounded-3xl overflow-hidden border border-white/[.08] shadow-xl"
            style={{ height: 420 }}
          >
            <iframe
              src="https://www.google.com/maps?q=Abu+Dhabi,+United+Arab+Emirates&output=embed"
              width="100%" height="100%"
              style={{ border: 0, filter: "invert(92%) hue-rotate(185deg) saturate(.6) brightness(.9)" }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={isAr ? "موقعنا على الخريطة" : "Our location on the map"}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
