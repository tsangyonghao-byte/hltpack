"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useLanguage } from "@/i18n/LanguageContext";
import Link from "next/link";

export default function Certificates() {
  const { dict } = useLanguage();
  
  // Only the 3 core certificates for the homepage layout
  const certs = [
    { id: 1, name: "BRC A+ Grade Certificate 1", img: "/zs01.png" },
    { id: 2, name: "BRC A+ Grade Certificate 2", img: "/zs02.png" },
    { id: 3, name: "Recyclable Certification", img: "/zs03.png" },
  ];

  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: selectedCertIndex ?? 0,
  });

  useEffect(() => {
    if (emblaApi && selectedCertIndex !== null) {
      emblaApi.scrollTo(selectedCertIndex, true);
    }
  }, [emblaApi, selectedCertIndex]);

  const handlePrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const handleNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCertIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <section className="py-12 md:py-32 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center">
            
            {/* Text Content */}
            <div className="w-full lg:w-[45%] space-y-8 pr-0 lg:pr-8">
              <div>
                <h2 className="text-3xl md:text-[45px] font-extrabold text-[#F05A22] mb-8 leading-[1.1] uppercase tracking-[0.05em] relative whitespace-pre-line">
                  {dict.home.certificates.title}
                  <div className="absolute -bottom-6 left-0 w-24 h-[3px] bg-[#F05A22]"></div>
                </h2>
              </div>
              
              <div className="text-gray-500 text-[15px] md:text-[17px] leading-[1.8] space-y-6 pt-4 font-light">
                <p>
                  {dict.home.certificates.desc1}
                </p>
                <p>
                  {dict.home.certificates.desc2}
                </p>
                <p>
                  {dict.home.certificates.desc3}
                </p>
              </div>

              <div className="pt-6">
                <Link 
                  href="/certificates" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-gray-300 text-gray-800 font-bold text-sm tracking-wide hover:bg-[#F05A22] hover:text-white hover:border-[#F05A22] transition-all duration-300 rounded-full group"
                >
                  View All Certificates
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Certificate Images Grid (Restored 3-card layout) */}
            <div className="w-full lg:w-[55%] relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center">
              {/* Image 1 (Top Left) */}
              <motion.div 
                initial={{ opacity: 0, x: -30, y: -30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-0 left-0 md:left-[5%] w-[45%] md:w-[40%] cursor-pointer group z-10"
                onClick={() => setSelectedCertIndex(0)}
              >
                <div className="relative bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:shadow-[0_30px_60px_rgba(240,90,34,0.15)] group-hover:-translate-y-3 transition-all duration-500 p-2 md:p-4 rounded-lg">
                  <img src={certs[0].img} alt={certs[0].name} className="w-full h-auto object-contain" />
                </div>
              </motion.div>

              {/* Image 2 (Top Right) */}
              <motion.div 
                initial={{ opacity: 0, x: 30, y: -20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="absolute top-[10%] right-0 md:right-[5%] w-[45%] md:w-[40%] cursor-pointer group z-20"
                onClick={() => setSelectedCertIndex(1)}
              >
                <div className="relative bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] group-hover:shadow-[0_30px_60px_rgba(240,90,34,0.15)] group-hover:-translate-y-3 transition-all duration-500 p-2 md:p-4 rounded-lg">
                  <img src={certs[1].img} alt={certs[1].name} className="w-full h-auto object-contain" />
                </div>
              </motion.div>

              {/* Image 3 (Bottom Center/Right) */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="absolute bottom-0 right-[15%] md:right-[25%] w-[45%] md:w-[40%] cursor-pointer group z-30"
                onClick={() => setSelectedCertIndex(2)}
              >
                <div className="relative bg-white shadow-[0_20px_40px_rgba(0,0,0,0.12)] group-hover:shadow-[0_30px_60px_rgba(240,90,34,0.15)] group-hover:-translate-y-3 transition-all duration-500 p-2 md:p-4 rounded-lg">
                  <img src={certs[2].img} alt={certs[2].name} className="w-full h-auto object-contain" />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCertIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
          >
            {/* 1. Absolute Fullscreen Backdrop (Handles all background clicks) */}
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
              onClick={() => setSelectedCertIndex(null)}
            />

            {/* 2. Content Container (No background, just holds the carousel) */}
            <div className="w-full max-w-5xl h-full flex items-center justify-center relative px-4 md:px-16 pointer-events-none">
              
              {/* Embla Carousel */}
              <div 
                className="overflow-hidden w-full h-[80vh] pointer-events-auto" 
                ref={emblaRef}
              >
                <div className="flex h-full touch-pan-y">
                  {certs.map((cert) => (
                    <div 
                      key={cert.id} 
                      className="flex-[0_0_100%] min-w-0 h-full flex items-center justify-center p-4 cursor-pointer"
                      onClick={(e) => {
                        if (e.target === e.currentTarget) {
                          setSelectedCertIndex(null);
                        }
                      }}
                    >
                      <img
                        src={cert.img}
                        alt={cert.name}
                        className="max-w-full max-h-full object-contain drop-shadow-2xl cursor-default"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Prev/Next Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[210] p-3 text-white/70 hover:text-white bg-black/50 hover:bg-[#F05A22] rounded-full transition-colors pointer-events-auto"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[210] p-3 text-white/70 hover:text-white bg-black/50 hover:bg-[#F05A22] rounded-full transition-colors pointer-events-auto"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            {/* 3. Close Button (Absolute at top right relative to modal) */}
            <button
              onClick={() => setSelectedCertIndex(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-[10000] p-2 md:p-3 text-white bg-black/60 border border-white/20 hover:bg-[#F05A22] rounded-full transition-colors shadow-lg pointer-events-auto"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
