"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

const errorText = {
  en: {
    title: "Something Went Wrong",
    desc: "We encountered an unexpected error while rendering this page. Please try reloading the page or return to the homepage.",
    retry: "Try Again",
    home: "Back to Home",
  },
  es: {
    title: "Algo salió mal",
    desc: "Encontramos un error inesperado al renderizar esta página. Intente recargar la página o regrese a la página de inicio.",
    retry: "Intentar de nuevo",
    home: "Volver al inicio",
  },
  ar: {
    title: "حدث خطأ ما",
    desc: "واجهنا خطأ غير متوقع أثناء تحميل هذه الصفحة. يرجى محاولة إعادة تحميل الصفحة أو العودة إلى الصفحة الرئيسية.",
    retry: "إعادة المحاولة",
    home: "العودة للرئيسية",
  },
} as const;

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging purposes
    console.error("Unhandled Error Caught by Boundary:", error);
  }, [error]);

  // Read locale directly from cookie on client side to avoid context dependency
  let locale = "en";
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
    if (match && (match[1] === "es" || match[1] === "ar")) {
      locale = match[1];
    }
  }

  const text = errorText[locale as keyof typeof errorText] || errorText.en;
  const isRtl = locale === "ar";

  return (
    <div 
      className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-gray-50 px-4 py-16"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-md w-full text-center bg-white p-8 md:p-12 border border-gray-200 shadow-sm rounded-none">
        {/* Visual Alert Indicator */}
        <div className="mx-auto w-16 h-16 bg-[#F05A22]/10 flex items-center justify-center rounded-full mb-8">
          <AlertCircle className="w-8 h-8 text-[#F05A22]" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] mb-4 tracking-tight">
          {text.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-10 leading-relaxed font-light">
          {text.desc}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-6 py-3.5 bg-[#F05A22] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#D44A18] transition-colors rounded-none gap-2 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            {text.retry}
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3.5 bg-transparent border border-gray-300 text-gray-800 font-bold text-xs uppercase tracking-wider hover:border-[#1A1A1A] hover:bg-gray-50 transition-colors rounded-none gap-2"
          >
            <Home className="w-4 h-4" />
            {text.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
