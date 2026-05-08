"use client";

import { useEffect, useState } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteContent } from "@/i18n/siteContent";
import { useSystemSetting } from "@/components/layout/SystemSettingContext";

export default function FloatingWidgets() {
  const { locale } = useLanguage();
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const setting = useSystemSetting();
  const [isVisible, setIsVisible] = useState(false);
  const whatsappUrl =
    setting?.whatsapp ||
    "https://wa.me/8613682412949?text=Hi,%20I'm%20interested%20in%20your%20packaging%20solutions.";

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
        href={whatsappUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="mobile-floating-whatsapp sm:hidden fixed bottom-0 left-0 right-0 z-[100] h-14 bg-[#25D366] text-white flex items-center justify-center gap-3 font-bold text-[16px] shadow-[0_-8px_20px_rgba(37,211,102,0.25)]"
      >
        <MessageCircle className="w-6 h-6" />
        {content.floating.whatsapp}
      </a>

      <div className="hidden sm:flex fixed bottom-8 right-8 z-[100] flex-col items-end space-y-4">
        <a 
          href={whatsappUrl}
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_10px_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-all duration-300"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute right-full mr-4 bg-white text-gray-800 px-4 py-2 rounded-none text-[13px] uppercase tracking-wider font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-gray-100">
            {content.floating.whatsapp}
          </span>
        </a>

        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="w-14 h-14 bg-white border border-gray-200 text-gray-600 rounded-none shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:bg-[#F05A22] hover:text-white hover:border-[#F05A22] transition-all duration-300 flex items-center justify-center hover:scale-110"
            >
              <ArrowUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

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
