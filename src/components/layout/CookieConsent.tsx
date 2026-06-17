"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function CookieConsent() {
  const { locale } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookie consent
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after 2 seconds delay for a premium feel
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  const text = {
    en: {
      message: "We use cookies to optimize our website and provide the best experience. By continuing to browse, you agree to our use of cookies and our ",
      privacyLink: "Privacy Policy",
      accept: "Accept",
      decline: "Decline",
    },
    es: {
      message: "Utilizamos cookies para optimizar nuestro sitio web y ofrecer la mejor experiencia. Al continuar navegando, acepta nuestro uso de cookies y nuestra ",
      privacyLink: "Política de Privacidad",
      accept: "Aceptar",
      decline: "Declinar",
    },
    ar: {
      message: "نحن نستخدم ملفات تعريف الارتباط لتحسين موقعنا وتقديم أفضل تجربة. بالاستمرار في التصفح، فإنك توافق على استخدامنا لملفات تعريف الارتباط و ",
      privacyLink: "سياسة الخصوصية",
      accept: "موافق",
      decline: "رفض",
    },
  }[locale as "en" | "es" | "ar"] || {
    message: "We use cookies to optimize our website and provide the best experience. By continuing to browse, you agree to our use of cookies and our ",
    privacyLink: "Privacy Policy",
    accept: "Accept",
    decline: "Decline",
  };

  const isRtl = locale === "ar";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[110]"
          dir={isRtl ? "rtl" : "ltr"}
        >
          <div className="bg-[#121A2F]/90 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.3)] text-gray-200">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#F05A22]/20 rounded-xl text-[#F05A22] shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-[14px] leading-relaxed text-gray-300">
                  {text.message}
                  <Link
                    href="/privacy-policy"
                    className="text-[#F05A22] hover:text-[#d64816] transition-colors underline font-medium"
                  >
                    {text.privacyLink}
                  </Link>
                  .
                </p>
                <div className="flex items-center gap-3 justify-end pt-1">
                  <button
                    onClick={handleDecline}
                    className="px-4 py-2 rounded-xl text-[13px] font-semibold hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    {text.decline}
                  </button>
                  <button
                    onClick={handleAccept}
                    className="px-5 py-2 rounded-xl text-[13px] font-bold bg-[#F05A22] hover:bg-[#D64816] text-white transition-all shadow-[0_4px_12px_rgba(240,90,34,0.2)] hover:shadow-[0_4px_16px_rgba(240,90,34,0.35)]"
                  >
                    {text.accept}
                  </button>
                </div>
              </div>
              <button
                onClick={handleDecline}
                className="text-gray-500 hover:text-gray-300 transition-colors p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
