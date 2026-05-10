"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

// Using real factory images mapped to specific workshops
const factoryData = {
  printing: [
    { id: 1, src: "/images/factory/印刷车间/10001.png", alt: { en: "Printing workshop overview", es: "Vista general del taller de impresion", ar: "نظرة عامة على ورشة الطباعة" } },
    { id: 2, src: "/images/factory/印刷车间/10002.png", alt: { en: "Rotogravure press", es: "Prensa de huecograbado", ar: "مطبعة روتوغرافور" } },
    { id: 3, src: "/images/factory/印刷车间/10003.png", alt: { en: "Color checking", es: "Revision de color", ar: "فحص الالوان" } },
    { id: 4, src: "/images/factory/印刷车间/10004.png", alt: { en: "Printing control", es: "Control de impresion", ar: "التحكم في الطباعة" } },
    { id: 5, src: "/images/factory/印刷车间/10005.png", alt: { en: "Printing details", es: "Detalles de impresion", ar: "تفاصيل الطباعة" } },
    { id: 6, src: "/images/factory/印刷车间/10101 (1).png", alt: { en: "Printing facility 1", es: "Instalacion de impresion 1", ar: "منشأة الطباعة 1" } },
    { id: 7, src: "/images/factory/印刷车间/10101 (2).png", alt: { en: "Printing facility 2", es: "Instalacion de impresion 2", ar: "منشأة الطباعة 2" } },
  ],
  bagMaking: [
    { id: 8, src: "/images/factory/制袋车间/10001.png", alt: { en: "Pouch making machine", es: "Maquina de fabricacion de bolsas", ar: "آلة تصنيع الاكياس" } },
    { id: 9, src: "/images/factory/制袋车间/10002.png", alt: { en: "Quality inspection", es: "Inspeccion de calidad", ar: "فحص الجودة" } },
    { id: 10, src: "/images/factory/制袋车间/10003.png", alt: { en: "Sorting", es: "Clasificacion", ar: "الفرز" } },
    { id: 11, src: "/images/factory/制袋车间/10004.png", alt: { en: "Workshop overview", es: "Vista general del taller", ar: "نظرة عامة على الورشة" } },
    { id: 12, src: "/images/factory/制袋车间/10005.png", alt: { en: "Workshop overview 2", es: "Vista general del taller 2", ar: "نظرة عامة على الورشة 2" } },
    { id: 13, src: "/images/factory/制袋车间/10006.png", alt: { en: "Workshop overview 3", es: "Vista general del taller 3", ar: "نظرة عامة على الورشة 3" } },
    { id: 14, src: "/images/factory/制袋车间/10007.png", alt: { en: "Workshop overview 4", es: "Vista general del taller 4", ar: "نظرة عامة على الورشة 4" } },
    { id: 15, src: "/images/factory/制袋车间/10008.png", alt: { en: "Workshop overview 5", es: "Vista general del taller 5", ar: "نظرة عامة على الورشة 5" } },
    { id: 16, src: "/images/factory/制袋车间/10009.png", alt: { en: "Workshop overview 6", es: "Vista general del taller 6", ar: "نظرة عامة على الورشة 6" } },
    { id: 17, src: "/images/factory/制袋车间/10010.png", alt: { en: "Workshop overview 7", es: "Vista general del taller 7", ar: "نظرة عامة على الورشة 7" } },
    { id: 18, src: "/images/factory/制袋车间/10011.png", alt: { en: "Workshop overview 8", es: "Vista general del taller 8", ar: "نظرة عامة على الورشة 8" } },
    { id: 19, src: "/images/factory/制袋车间/10012.png", alt: { en: "Workshop overview 9", es: "Vista general del taller 9", ar: "نظرة عامة على الورشة 9" } },
    { id: 20, src: "/images/factory/制袋车间/100011 (1).png", alt: { en: "Workshop detail 1", es: "Detalle del taller 1", ar: "تفاصيل الورشة 1" } },
    { id: 21, src: "/images/factory/制袋车间/100011 (2).png", alt: { en: "Workshop detail 2", es: "Detalle del taller 2", ar: "تفاصيل الورشة 2" } },
    { id: 22, src: "/images/factory/制袋车间/100011 (3).png", alt: { en: "Workshop detail 3", es: "Detalle del taller 3", ar: "تفاصيل الورشة 3" } },
    { id: 23, src: "/images/factory/制袋车间/100011 (4).png", alt: { en: "Workshop detail 4", es: "Detalle del taller 4", ar: "تفاصيل الورشة 4" } },
  ]
};

const tabs = [
  { id: "printing", label: "Printing Workshop" },
  { id: "bagMaking", label: "Pouch Making Workshop" }
];

export default function FactoryTour() {
  const { locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<keyof typeof factoryData>("printing");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const textMap = {
    en: {
      facility: "13,000 SQM FACILITY",
      title: "Inside HAILITONG Factory",
      tabs: ["Printing Workshop", "Pouch Making Workshop"],
      cta: "VIEW FULL PROCESS",
      scrollLeft: "Scroll left",
      scrollRight: "Scroll right",
      enlargedImage: "Enlarged factory view",
    },
    es: {
      facility: "PLANTA DE 13.000 M2",
      title: "Dentro de la fabrica HAILITONG",
      tabs: ["Taller de impresion", "Taller de fabricacion de bolsas"],
      cta: "VER PROCESO COMPLETO",
      scrollLeft: "Desplazar a la izquierda",
      scrollRight: "Desplazar a la derecha",
      enlargedImage: "Vista ampliada de la fabrica",
    },
    ar: {
      facility: "منشأة بمساحة 13,000 متر مربع",
      title: "داخل مصنع HAILITONG",
      tabs: ["ورشة الطباعة", "ورشة تصنيع الاكياس"],
      cta: "عرض العملية الكاملة",
      scrollLeft: "التمرير الى اليسار",
      scrollRight: "التمرير الى اليمين",
      enlargedImage: "عرض مكبر للمصنع",
    },
  } as const;
  const text = textMap[locale as keyof typeof textMap] || textMap.en;
  const localizedTabs = [
    { ...tabs[0], label: text.tabs[0] },
    { ...tabs[1], label: text.tabs[1] },
  ];

  // Auto-scroll logic (Marquee)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPos = container.scrollLeft;

    const play = () => {
      if (!isHovered) {
        // Slow constant speed
        scrollPos += 0.8;
        
        // Reset when reaching halfway point (since array is duplicated)
        if (scrollPos >= container.scrollWidth / 2) {
          scrollPos = 0;
        }
        
        container.scrollLeft = scrollPos;
      } else {
        // Keep scrollPos synced if user manually scrolled while hovered
        scrollPos = container.scrollLeft;
      }
      animationId = requestAnimationFrame(play);
    };

    animationId = requestAnimationFrame(play);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered, activeTab]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth / 2;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const displayImages = [...factoryData[activeTab], ...factoryData[activeTab]];

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Area */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 mb-6"
          >
            <span className="w-2 h-2 bg-[#F05A22]"></span>
            <span className="text-xs font-bold tracking-widest text-gray-600 uppercase">{text.facility}</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight"
          >
            {text.title}
          </motion.h2>
        </div>

        {/* Custom Hardcore Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex w-full md:w-auto overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {localizedTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as keyof typeof factoryData)}
                className={`relative px-8 py-4 text-[15px] font-bold tracking-wide transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#F05A22]" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Image Slider with Animation */}
        <div className="relative min-h-[300px] md:min-h-[400px]">
          
          {/* Navigation Arrows for Desktop */}
          <div className="hidden md:flex justify-end gap-3 mb-6">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 flex items-center justify-center border border-gray-200 bg-white transition-all hover:bg-gray-50 hover:text-[#F05A22] active:scale-95 cursor-pointer"
              aria-label={text.scrollLeft}
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 flex items-center justify-center border border-gray-200 bg-white transition-all hover:bg-gray-50 hover:text-[#F05A22] active:scale-95 cursor-pointer"
              aria-label={text.scrollRight}
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          <div 
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <AnimatePresence mode="popLayout">
              {displayImages.map((image, index) => (
                <motion.div
                  key={`${activeTab}-${image.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: (index % factoryData[activeTab].length) * 0.05 }}
                  className="group relative shrink-0 w-[85vw] md:w-[calc(50%-12px)] aspect-[16/10] bg-gray-200 overflow-hidden rounded-none border border-gray-200 cursor-pointer"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <img 
                    src={image.src} 
                      alt={image.alt[locale as keyof typeof image.alt] || image.alt.en}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12" strokeWidth={1.5} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Link 
            href="/factory" 
            className="inline-flex items-center justify-center bg-[#F05A22] text-white px-8 py-4 text-sm font-bold tracking-wider hover:bg-[#d94f1c] transition-colors rounded-none"
          >
            {text.cta}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </motion.div>

      </div>

      {/* Lightbox / Modal for Image Zoom */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-[101]"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt={text.enlargedImage}
              className="max-w-full max-h-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
