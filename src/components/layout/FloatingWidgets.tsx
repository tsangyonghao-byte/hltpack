"use client";

import { useEffect, useState } from "react";
import { ArrowUp, CheckCircle2, Mail, MessageCircle, Phone, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteContent } from "@/i18n/siteContent";
import { useSystemSetting } from "@/components/layout/SystemSettingContext";
import { sendContactEmail } from "@/actions/contactActions";

export default function FloatingWidgets() {
  const { locale } = useLanguage();
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const setting = useSystemSetting();
  const [isVisible, setIsVisible] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const contactPhone = setting?.contactPhone || content.footer.phone || "";
  const contactEmail = setting?.contactEmail || content.footer.email || "";
  const whatsappPhoneDigits = contactPhone.replace(/[^\d]/g, "");
  const whatsappUrl = setting?.whatsapp || (whatsappPhoneDigits ? `https://wa.me/${whatsappPhoneDigits}` : "");
  const telHref = contactPhone ? `tel:${contactPhone.replace(/\s+/g, "")}` : "";
  const emailHref = contactEmail ? `mailto:${contactEmail}` : "";
  const whatsappLabel = content.floating.whatsapp;
  const phoneLabel = content.floating.phoneContact;
  const emailLabel = content.floating.emailContact;
  const messageLabel = content.floating.leaveMessage;

  useEffect(() => {
    const syncVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    syncVisibility();
    const frameId = window.requestAnimationFrame(syncVisibility);

    window.addEventListener("scroll", syncVisibility, { passive: true });
    window.addEventListener("load", syncVisibility);
    window.addEventListener("pageshow", syncVisibility);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", syncVisibility);
      window.removeEventListener("load", syncVisibility);
      window.removeEventListener("pageshow", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isMessageOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMessageOpen]);

  const scrollToTop = () => {
    // Custom smooth scroll implementation for a slower, more deliberate ascent
    const startY = window.scrollY;
    const targetY = 0;
    const duration = 1500; // 1.5 seconds for a slower scroll
    const startTime = performance.now();

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutQuart(progress);
      
      window.scrollTo(0, startY - startY * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const openMessageDrawer = () => {
    setErrorMessage("");
    setIsSubmitted(false);
    setIsMessageOpen(true);
  };

  const closeMessageDrawer = () => {
    setIsMessageOpen(false);
    setErrorMessage("");
    setIsSubmitting(false);
  };

  const handleWhatsAppClick = () => {
    if (!whatsappUrl) return;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const currentPath =
      typeof window !== "undefined"
        ? `${window.location.pathname}${window.location.search}`
        : "/";

    formData.set("sourcePage", `Floating Leave a Message: ${currentPath}`);
    formData.set("subject", "Floating Leave a Message");
    formData.set("inquiryType", "floating-message");

    const result = await sendContactEmail(formData);

    if (result.success) {
      formElement.reset();
      setIsSubmitted(true);
      setIsSubmitting(false);
      return;
    }

    setErrorMessage(result.error || content.floating.failed);
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[110] flex h-14 shadow-[0_-8px_20px_rgba(15,23,42,0.18)]">
        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="flex flex-1 items-center justify-center gap-2 bg-[#25D366] px-4 text-white font-bold text-[16px]"
        >
          <img src="/WhatsApp2.png" alt="WhatsApp" className="w-7 h-7 object-contain drop-shadow-sm" />
          {whatsappLabel}
        </button>
        <button
          type="button"
          onClick={openMessageDrawer}
          className="flex flex-1 items-center justify-center bg-[#F05A22] px-4 text-white font-bold text-[16px]"
        >
          {messageLabel}
        </button>
      </div>

      <div className="hidden sm:flex fixed right-6 bottom-28 z-[100] flex-col items-center gap-3">
        <a
          href={whatsappUrl || "#"}
          target={whatsappUrl ? "_blank" : undefined}
          rel={whatsappUrl ? "noopener noreferrer" : undefined}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#9CA3AF] shadow-[0_12px_24px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#25D366] hover:shadow-[0_16px_28px_rgba(15,23,42,0.16)]"
          aria-label={whatsappLabel}
        >
          <MessageCircle className="h-6 w-6" />
        </a>

        {telHref && (
          <a
            href={telHref}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#9CA3AF] shadow-[0_12px_24px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#0D7C66] hover:shadow-[0_16px_28px_rgba(15,23,42,0.16)]"
            aria-label={`${phoneLabel}: ${contactPhone}`}
            title={contactPhone}
          >
            <Phone className="h-5 w-5" />
          </a>
        )}

        {emailHref && (
          <a
            href={emailHref}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#9CA3AF] shadow-[0_12px_24px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#0D7C66] hover:shadow-[0_16px_28px_rgba(15,23,42,0.16)]"
            aria-label={`${emailLabel}: ${contactEmail}`}
            title={contactEmail}
          >
            <Mail className="h-5 w-5" />
          </a>
        )}

        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#9CA3AF] shadow-[0_12px_24px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#0D7C66] hover:shadow-[0_16px_28px_rgba(15,23,42,0.16)]"
              aria-label={content.floating.backToTop}
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={openMessageDrawer}
        className="hidden sm:flex fixed bottom-0 right-0 z-[100] h-14 min-w-[320px] items-center justify-center bg-[#F05A22] px-10 text-[16px] font-semibold tracking-wide text-white shadow-[0_-8px_20px_rgba(240,90,34,0.24)] transition-colors duration-300 hover:bg-[#D64816]"
      >
        {messageLabel}
      </button>

      <div className="sm:hidden fixed bottom-20 right-4 z-[100]">
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="w-12 h-12 bg-white border border-gray-200 text-gray-600 rounded-none shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:bg-[#F05A22] hover:text-white hover:border-[#F05A22] transition-all duration-300 flex items-center justify-center active:scale-95"
              aria-label={content.floating.backToTop}
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isMessageOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] bg-black/45"
              onClick={closeMessageDrawer}
            />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed inset-x-0 bottom-0 z-[121] rounded-t-2xl bg-white shadow-[0_-18px_50px_rgba(15,23,42,0.24)] sm:inset-x-auto sm:bottom-20 sm:right-6 sm:w-[420px] sm:rounded-2xl"
            >
              <div className="flex items-center justify-between bg-[#F05A22] px-5 py-4 text-white">
                <h3 className="text-[17px] font-semibold tracking-wide">{messageLabel}</h3>
                <button type="button" onClick={closeMessageDrawer} aria-label={content.floating.closeMessage}>
                  <X className="h-7 w-7" />
                </button>
              </div>

              <div className="max-h-[calc(100vh-120px)] overflow-y-auto px-5 py-5 pb-24 sm:max-h-[calc(100vh-180px)] sm:pb-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {isSubmitted && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
                        <span>{content.floating.success}</span>
                      </div>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {errorMessage}
                    </div>
                  )}

                  <div className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={content.floating.name}
                      className="h-14 w-full rounded-xl border border-gray-300 px-5 text-[16px] text-gray-800 outline-none transition focus:border-[#F05A22]"
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder={content.floating.phone}
                      className="h-14 w-full rounded-xl border border-gray-300 px-5 text-[16px] text-gray-800 outline-none transition focus:border-[#F05A22]"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={content.floating.email}
                      className="h-14 w-full rounded-xl border border-gray-300 px-5 text-[16px] text-gray-800 outline-none transition focus:border-[#F05A22]"
                    />
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder={content.floating.message}
                      className="w-full rounded-xl border border-gray-300 px-5 py-4 text-[16px] text-gray-800 outline-none transition focus:border-[#F05A22]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-14 w-full items-center justify-center rounded-xl bg-[#F05A22] px-5 text-[16px] font-bold uppercase tracking-wide text-white transition hover:bg-[#D64816] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        {content.floating.sending}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        {content.floating.submit}
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
