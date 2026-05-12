"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const factoryData = {
  printing: [
    { id: 1, src: "/images/factory/印刷车间/10001.png", alt: { en: "Printing workshop overview", es: "Vista general del taller de impresion", ar: "نظرة عامة على ورشة الطباعة" } },
    { id: 2, src: "/images/factory/印刷车间/10002.png", alt: { en: "Rotogravure press", es: "Prensa de huecograbado", ar: "مطبعة روتوغرافور" } },
    { id: 3, src: "/images/factory/印刷车间/10003.png", alt: { en: "Color checking", es: "Revision de color", ar: "فحص الالوان" } },
    { id: 4, src: "/images/factory/印刷车间/10004.png", alt: { en: "Printing control", es: "Control de impresion", ar: "التحكم في الطباعة" } },
    { id: 5, src: "/images/factory/印刷车间/10005.png", alt: { en: "Printing details", es: "Detalles de impresion", ar: "تفاصيل الطباعة" } },
    { id: 6, src: "/images/factory/印刷车间/10101 (1).png", alt: { en: "Printing facility 1", es: "Instalacion de impresion 1", ar: "منشاة الطباعة 1" } },
    { id: 7, src: "/images/factory/印刷车间/10101 (2).png", alt: { en: "Printing facility 2", es: "Instalacion de impresion 2", ar: "منشاة الطباعة 2" } },
  ],
  bagMaking: [
    { id: 8, src: "/images/factory/制袋车间/10001.png", alt: { en: "Pouch making machine", es: "Maquina de fabricacion de bolsas", ar: "ماكينة تصنيع الاكياس" } },
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
  ],
};

const pageText = {
  en: {
    badge: "13,000 SQM FACILITY",
    title: "Factory Gallery",
    description:
      "Explore our state-of-the-art manufacturing facility, equipped with world-class printing and pouch-making technology.",
    tabs: {
      all: "All Facilities",
      printing: "Printing Workshop",
      bagMaking: "Pouch Making Workshop",
    },
    enlarged: "Enlarged factory view",
  },
  es: {
    badge: "PLANTA DE 13,000 M2",
    title: "Galeria de Fabrica",
    description:
      "Explore nuestra moderna planta de manufactura, equipada con tecnologia de impresion y fabricacion de bolsas de clase mundial.",
    tabs: {
      all: "Todas las instalaciones",
      printing: "Taller de impresion",
      bagMaking: "Taller de fabricacion de bolsas",
    },
    enlarged: "Vista ampliada de la fabrica",
  },
  ar: {
    badge: "منشاة بمساحة 13,000 متر مربع",
    title: "معرض المصنع",
    description:
      "استكشف منشاتنا التصنيعية الحديثة والمجهزة بتقنيات طباعة وتصنيع اكياس على مستوى عالمي.",
    tabs: {
      all: "كل المرافق",
      printing: "ورشة الطباعة",
      bagMaking: "ورشة تصنيع الاكياس",
    },
    enlarged: "عرض مكبر للمصنع",
  },
} as const;

export default function FactoryGallery({ setting }: { setting?: any }) {
  const { locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const text = pageText[locale as keyof typeof pageText] || pageText.en;
  const tabs = [
    { id: "all", label: text.tabs.all },
    { id: "printing", label: text.tabs.printing },
    { id: "bagMaking", label: text.tabs.bagMaking },
  ];
  const heroImage = setting?.factoryHeroImage?.trim() || "/images/factory/印刷车间/10101 (2).png";

  // Filter images based on tab
  const displayImages = activeTab === "all" 
    ? [...factoryData.printing, ...factoryData.bagMaking]
    : factoryData[activeTab as keyof typeof factoryData];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Page Hero Banner */}
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#111111] flex flex-col items-center justify-center overflow-hidden min-h-[350px] md:min-h-[450px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity grayscale"
          style={{ backgroundImage: `url('${heroImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center flex-grow">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
            <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              {text.badge}
            </span>
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white mb-6 tracking-tight uppercase leading-tight"
          >
            {text.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {text.description}
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-3 text-sm font-bold tracking-wide transition-all border ${
                activeTab === tab.id 
                  ? "bg-[#1E293B] text-white border-[#1E293B]" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid Gallery */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayImages.map((image, index) => (
              <motion.div
                layout
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-[4/3] bg-gray-200 overflow-hidden cursor-pointer border border-gray-200"
                onClick={() => setSelectedImage(image.src)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt[locale as keyof typeof image.alt] || image.alt.en}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-transform duration-300 transform scale-50 group-hover:scale-100 w-12 h-12" strokeWidth={1.5} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
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
              alt={text.enlarged}
              className="max-w-full max-h-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
