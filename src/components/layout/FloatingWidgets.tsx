"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteContent } from "@/i18n/siteContent";
import { useSystemSetting } from "@/components/layout/SystemSettingContext";

export default function FloatingWidgets() {
  const { locale } = useLanguage();
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const setting = useSystemSetting();
  const [isVisible, setIsVisible] = useState(false);
  const whatsappUrl = setting?.whatsapp || "";
  const whatsappHref = whatsappUrl || "#";
  const whatsappLabel = content.floating.whatsapp;

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

  return (
    <>
      <a 
          href={whatsappHref}
          target={whatsappUrl ? "_blank" : undefined}
          rel={whatsappUrl ? "noopener noreferrer" : undefined}
          className="mobile-floating-whatsapp sm:hidden fixed bottom-0 left-0 right-0 z-[100] h-14 bg-[#25D366] text-white flex items-center justify-center gap-2 font-bold text-[16px] shadow-[0_-8px_20px_rgba(37,211,102,0.25)]"
      >
          <img src="/WhatsApp2.png" alt="WhatsApp" className="w-7 h-7 object-contain drop-shadow-sm" />
          {whatsappLabel}
      </a>

      <a
        href={whatsappHref}
        target={whatsappUrl ? "_blank" : undefined}
        rel={whatsappUrl ? "noopener noreferrer" : undefined}
        className="group hidden sm:flex fixed bottom-[128px] right-4 z-[100] items-center justify-center w-[112px] h-[112px] transition-transform duration-300 hover:scale-[1.06]"
        aria-label={whatsappLabel}
      >
        <img
          src="/WhatsApp.png"
          alt="WhatsApp"
          className="w-[152px] h-[152px] object-contain drop-shadow-[0_18px_34px_rgba(37,211,102,0.32)]"
        />
      </a>

      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="hidden sm:flex fixed bottom-8 right-[45px] z-[100] w-[54px] h-[54px] bg-white text-[#475569] rounded-full shadow-[0_10px_20px_rgba(15,23,42,0.12)] border border-[#E5E7EB] transition-all duration-300 items-center justify-center hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(15,23,42,0.16)]"
            aria-label={content.floating.backToTop}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

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
    </>
  );
}
