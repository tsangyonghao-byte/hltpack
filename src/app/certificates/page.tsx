"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Award, ShieldCheck } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const allCerts = [
  { id: 1, name: "Quality Management System Certificate", img: "/hltzs/质量管理体系认证证书01.png", category: "System Certification" },
  { id: 2, name: "Occupational Health & Safety Certificate", img: "/hltzs/职业健康安全管理体系认证证书02.png", category: "System Certification" },
  { id: 3, name: "Environmental Management System Certificate", img: "/hltzs/环境管理体系认证证书03.png", category: "System Certification" },
  { id: 4, name: "Food Safety Management System Certificate", img: "/hltzs/食品安全管理体系认证证书_01.png", category: "System Certification" },
  { id: 5, name: "High-Tech Enterprise Certificate", img: "/hltzs/高新技术企业证书.jpg", category: "Enterprise Qualification" },
  { id: 6, name: "National Industrial Product Production License", img: "/hltzs/全国工业产品生产许可证.jpg", category: "Enterprise Qualification" },
  { id: 7, name: "BRC A+ Grade Certificate 1", img: "/zs01.png", category: "International Standard" },
  { id: 8, name: "BRC A+ Grade Certificate 2", img: "/zs02.png", category: "International Standard" },
  { id: 9, name: "Recyclable Certification", img: "/zs03.png", category: "International Standard" },
  { id: 10, name: "Additional Certification", img: "/zs04.png", category: "International Standard" },
  { id: 11, name: "Patent: PE Pouch Heat Sealing", img: "/hltzs/专利证书/一种PE包装袋用裁切机-专利证书-2023222508970-深圳市海利通包装用品有限公司_01.png", category: "Patent" },
  { id: 12, name: "Patent: PVC Pouch Printing", img: "/hltzs/专利证书/一种PVC包装袋用印刷喷码装置-专利证书-2023222355335-深圳市海利通包装用品有限公司_01.png", category: "Patent" },
  { id: 13, name: "Patent: PE Pouch Cutting Machine", img: "/hltzs/专利证书/一种制备PE包装袋的热封合结构-专利证书-202322405904X-深圳市海利通包装用品有限公司_01.png", category: "Patent" },
  { id: 14, name: "Utility Model Patent Certificate", img: "/hltzs/专利证书/深圳市海利通包装用品有限公司-2025206156125-实用新型专利证书(签章)(1)(1)_01.png", category: "Patent" },
];

export default function CertificatesPage() {
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(allCerts.map(cert => cert.category)))];

  const filteredCerts = activeCategory === "All" 
    ? allCerts 
    : allCerts.filter(cert => cert.category === activeCategory);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCertIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-20">
      {/* Header Section */}
      <div className="bg-[#111111] text-white py-20 relative overflow-hidden mb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] to-transparent z-10" />
          <img
            src="https://cdn.myxypt.com/f4a05196/24/07/b3adb55ea799b1b2c5518c8c7f78f19936c96c9a.jpg"
            alt="Certifications Background"
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
        </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-6 h-6 text-[#F05A22]" />
              <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                Quality & Compliance
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
              Global <span className="text-[#F05A22]">Certifications</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed font-light">
              Our commitment to excellence is validated by international standards. We maintain rigorous quality control systems and hold multiple patents in flexible packaging technology.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-[#F05A22] text-white border-[#F05A22] shadow-[0_4px_14px_rgba(240,90,34,0.25)]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#F05A22] hover:text-[#F05A22]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="break-inside-avoid"
              >
                <div 
                  className="bg-white border border-gray-100 p-4 rounded-sm shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    const originalIndex = allCerts.findIndex(c => c.id === cert.id);
                    setSelectedCertIndex(originalIndex);
                  }}
                >
                  <div className="relative overflow-hidden bg-gray-50 flex items-center justify-center p-4 mb-4 min-h-[300px]">
                    <img 
                      src={cert.img} 
                      alt={cert.name} 
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#F05A22] flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                        <Award className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-[#F05A22] uppercase tracking-wider mb-2 block">
                      {cert.category}
                    </span>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
                      {cert.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal (Same as before but with all certs) */}
      <AnimatePresence>
        {selectedCertIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
          >
            <div 
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedCertIndex(null)}
            />

            <div className="w-full max-w-7xl h-full flex items-center justify-center relative px-4 md:px-16 pointer-events-none">
              <div 
                className="overflow-hidden w-full h-[85vh] pointer-events-auto" 
                ref={emblaRef}
              >
                <div className="flex h-full touch-pan-y">
                  {allCerts.map((cert) => (
                    <div 
                      key={cert.id} 
                      className="flex-[0_0_100%] min-w-0 h-full flex flex-col items-center justify-center p-4 md:p-8 cursor-pointer"
                      onClick={(e) => {
                        if (e.target === e.currentTarget) {
                          setSelectedCertIndex(null);
                        }
                      }}
                    >
                      <div className="relative h-full w-full flex flex-col items-center justify-center bg-transparent">
                        <img
                          src={cert.img}
                          alt={cert.name}
                          className="max-w-full max-h-full object-contain drop-shadow-2xl cursor-default"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="mt-8 text-center" onClick={(e) => e.stopPropagation()}>
                          <span className="text-[#F05A22] text-xs font-bold uppercase tracking-widest mb-2 block">
                            {cert.category}
                          </span>
                          <p className="text-white/90 text-lg md:text-xl font-light tracking-wide">{cert.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[210] p-4 text-white/50 hover:text-white bg-white/5 hover:bg-[#F05A22] rounded-full backdrop-blur-sm transition-all pointer-events-auto"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[210] p-4 text-white/50 hover:text-white bg-white/5 hover:bg-[#F05A22] rounded-full backdrop-blur-sm transition-all pointer-events-auto"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>

            <button
              onClick={() => setSelectedCertIndex(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-[10000] p-3 text-white/70 bg-white/10 hover:text-white border border-white/10 hover:bg-[#F05A22] hover:border-transparent rounded-full backdrop-blur-sm transition-all shadow-lg pointer-events-auto"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}