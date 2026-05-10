"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface VideoModalProps {
  videoId: string;
  coverImage: string;
}

export default function VideoModal({ videoId, coverImage }: VideoModalProps) {
  const { locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const text =
    locale === "ar"
      ? {
          cover: "غلاف الفيديو التعريفي",
          eyebrow: "فيديو الشركة",
          play: "تشغيل فيديو الشركة",
          frameTitle: "الفيديو التعريفي لشركة HAILITONG",
        }
      : locale === "es"
        ? {
            cover: "Portada del video corporativo",
            eyebrow: "Video corporativo",
            play: "Reproducir video de la empresa",
            frameTitle: "Video corporativo de HAILITONG",
          }
      : {
          cover: "Corporate Video Cover",
          eyebrow: "Corporate Video",
          play: "Play Company Video",
          frameTitle: "HAILITONG corporate video",
        };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative block overflow-hidden border border-gray-200 shadow-[0_30px_80px_rgba(0,0,0,0.12)] group"
      >
        <div className="aspect-[16/10] w-full relative">
          <img
            src={coverImage}
            alt={text.cover}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/15"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F05A22] text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-3 text-white">
            <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-white/70">
              {text.eyebrow}
            </p>
            <p className="mt-1 text-sm font-semibold">{text.play}</p>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
              onClick={() => setIsOpen(false)}
            />

            <div className="relative z-[10000] flex h-full w-full items-center justify-center px-4 md:px-10 pointer-events-none">
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-auto relative w-full max-w-6xl overflow-hidden border border-white/10 bg-black shadow-2xl"
              >
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={text.frameTitle}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-[10001] rounded-full border border-white/20 bg-black/60 p-3 text-white transition-colors hover:bg-[#F05A22] md:right-8 md:top-8"
            >
              <X className="h-6 w-6" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
