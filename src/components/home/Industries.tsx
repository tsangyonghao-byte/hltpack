"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const industriesMap = {
  en: {
    eyebrow: "Industries We Serve",
    title: "Packaging Solutions for",
    title2: "Every Market.",
    cta: "Explore All Solutions",
    items: [
      {
        id: "fresh-food",
        title: "Fresh Food",
        desc: "Advanced barrier solutions to preserve the freshness and flavor of seafood and meat.",
        img: "https://cdn.myxypt.com/f4a05196/24/07/6b210c18853122be0ddf2bda9143f2ea45132cb9.png"
      },
      {
        id: "fruits-veggies",
        title: "Fruits & Vegetables",
        desc: "Breathable and anti-fog packaging engineered specifically for fresh produce.",
        img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "cosmetics",
        title: "Cosmetics",
        desc: "Premium, leak-proof, and aesthetically pleasing packaging for personal care products.",
        img: "https://cdn.myxypt.com/f4a05196/24/07/cb963b68dbc2a4edd2b071eafc8a0c995cf1c837.png"
      },
      {
        id: "hardware",
        title: "Hardware",
        desc: "Heavy-duty, puncture-resistant bags designed for sharp tools and metal parts.",
        img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "electronics",
        title: "Electronics",
        desc: "Anti-static and moisture-barrier shielding bags for sensitive electronic components.",
        img: "https://cdn.myxypt.com/f4a05196/24/07/5d12a7b528119b505ed1dde4240b035482e18dfd.png"
      },
      {
        id: "medicine",
        title: "Medicine",
        desc: "Strictly controlled, high-barrier packaging ensuring medical-grade safety and hygiene.",
        img: "https://cdn.myxypt.com/f4a05196/24/07/44cab68946517370d455e027d846775a1b71c154.png"
      }
    ],
  },
  es: {
    eyebrow: "Industrias a las que servimos",
    title: "Soluciones de empaque para",
    title2: "cada mercado.",
    cta: "Explorar todas las soluciones",
    items: [
      { id: "fresh-food", title: "Alimentos frescos", desc: "Soluciones avanzadas de barrera para preservar la frescura y el sabor de mariscos y carnes.", img: "https://cdn.myxypt.com/f4a05196/24/07/6b210c18853122be0ddf2bda9143f2ea45132cb9.png" },
      { id: "fruits-veggies", title: "Frutas y verduras", desc: "Empaques transpirables y antiempañantes diseñados especificamente para productos frescos.", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop" },
      { id: "cosmetics", title: "Cosmeticos", desc: "Empaques premium, hermeticos y visualmente atractivos para productos de cuidado personal.", img: "https://cdn.myxypt.com/f4a05196/24/07/cb963b68dbc2a4edd2b071eafc8a0c995cf1c837.png" },
      { id: "hardware", title: "Ferreteria", desc: "Bolsas resistentes a perforaciones para herramientas afiladas y piezas metalicas.", img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=800&auto=format&fit=crop" },
      { id: "electronics", title: "Electronica", desc: "Bolsas antiestaticas y con barrera contra humedad para componentes electronicos sensibles.", img: "https://cdn.myxypt.com/f4a05196/24/07/5d12a7b528119b505ed1dde4240b035482e18dfd.png" },
      { id: "medicine", title: "Medicina", desc: "Empaques de alta barrera con control estricto para seguridad e higiene de grado medico.", img: "https://cdn.myxypt.com/f4a05196/24/07/44cab68946517370d455e027d846775a1b71c154.png" },
    ],
  },
  ar: {
    eyebrow: "القطاعات التي نخدمها",
    title: "حلول تغليف لكل",
    title2: "سوق.",
    cta: "استكشف جميع الحلول",
    items: [
      { id: "fresh-food", title: "الاغذية الطازجة", desc: "حلول حاجزة متقدمة للحفاظ على نضارة ونكهة المأكولات البحرية واللحوم.", img: "https://cdn.myxypt.com/f4a05196/24/07/6b210c18853122be0ddf2bda9143f2ea45132cb9.png" },
      { id: "fruits-veggies", title: "الفواكه والخضروات", desc: "عبوات قابلة للتنفس ومضادة للضباب مصممة خصيصا للمنتجات الطازجة.", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop" },
      { id: "cosmetics", title: "مستحضرات التجميل", desc: "عبوات فاخرة ومحكمة وجذابة بصريا لمنتجات العناية الشخصية.", img: "https://cdn.myxypt.com/f4a05196/24/07/cb963b68dbc2a4edd2b071eafc8a0c995cf1c837.png" },
      { id: "hardware", title: "الادوات المعدنية", desc: "اكياس متينة مقاومة للثقب مصممة للاجزاء المعدنية والادوات الحادة.", img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=800&auto=format&fit=crop" },
      { id: "electronics", title: "الالكترونيات", desc: "اكياس مضادة للكهرباء الساكنة ومانعة للرطوبة للمكونات الالكترونية الحساسة.", img: "https://cdn.myxypt.com/f4a05196/24/07/5d12a7b528119b505ed1dde4240b035482e18dfd.png" },
      { id: "medicine", title: "القطاع الطبي", desc: "عبوات عالية الحاجز مع رقابة صارمة لضمان السلامة والنظافة الطبية.", img: "https://cdn.myxypt.com/f4a05196/24/07/44cab68946517370d455e027d846775a1b71c154.png" },
    ],
  },
} as const;

export default function Industries() {
  const { locale } = useLanguage();
  const text = industriesMap[locale as keyof typeof industriesMap] || industriesMap.en;
  const industries = text.items;
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // 挂载后标记为 true，用于客户端水合
  useEffect(() => {
    setIsMounted(true);
    // 延迟以确保 DOM 和 CSS 完全就绪
    setTimeout(() => {
      if (mobileScrollRef.current) {
        const container = mobileScrollRef.current;
        const card = container.querySelector('[data-card="mobile"]') as HTMLElement;
        if (card) {
          const itemWidth = card.offsetWidth + 16; // 16px is gap-4
          // 移动端静默跳到中间那一组的开头（索引 6）
          container.scrollTo({ left: itemWidth * industries.length, behavior: "auto" });
        }
      }
    }, 100);
  }, []);

  const scrollMobile = (direction: "left" | "right") => {
    const container = mobileScrollRef.current;
    if (!container) return;
    
    const card = container.querySelector('[data-card="mobile"]') as HTMLElement;
    if (!card) return;

    // 精准计算每次需要滑动的绝对像素（卡片宽 + gap）
    const itemWidth = card.offsetWidth + 16;
    
    container.scrollBy({ 
      left: direction === "left" ? -itemWidth : itemWidth, 
      behavior: "smooth" 
    });

    // 完美无缝循环逻辑
    setTimeout(() => {
      if (!container) return;
      const currentScroll = container.scrollLeft;
      const setWidth = itemWidth * industries.length;
      
      if (currentScroll < itemWidth) {
        // 如果用户疯狂向左划，滑到了第一组，就静默跳回第二组对应的位置
        container.scrollTo({ left: currentScroll + setWidth, behavior: "auto" });
      } else if (currentScroll >= setWidth * 2 - itemWidth) {
        // 如果用户疯狂向右划，滑到了第三组，就静默跳回第二组对应的位置
        container.scrollTo({ left: currentScroll - setWidth, behavior: "auto" });
      }
    }, 400); // 400ms 等待平滑滚动完成
  };

  // 生成 3 组（18个卡片），保证左右滑动永远有内容“探头”出来
  const mobileIndustries = [...industries, ...industries, ...industries];

  return (
    <section className="py-24 bg-white relative z-10 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#F05A22]"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                {text.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#1A1A1A] leading-tight tracking-tight">
              {text.title} <br /> {text.title2}
            </h2>
          </div>
          <Link 
            href="/products" 
            className="group inline-flex items-center gap-2 text-[14px] font-bold text-[#1A1A1A] hover:text-[#F05A22] transition-colors pb-2 border-b-2 border-[#1A1A1A] hover:border-[#F05A22]"
          >
            {text.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex justify-end gap-3 mb-6 md:hidden">
          <button 
            onClick={() => scrollMobile('left')}
            className="w-10 h-10 flex items-center justify-center border border-gray-200 bg-white transition-all hover:bg-gray-50 hover:text-[#F05A22] active:scale-95 cursor-pointer"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => scrollMobile('right')}
            className="w-10 h-10 flex items-center justify-center border border-gray-200 bg-white transition-all hover:bg-gray-50 hover:text-[#F05A22] active:scale-95 cursor-pointer"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile Slider Section (3 Sets of 6 = 18 items) */}
        <div 
          ref={mobileScrollRef}
          className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {isMounted && mobileIndustries.map((ind, idx) => (
            <div
              key={`mobile-${ind.id}-${idx}`}
              data-card="mobile"
              className="group relative aspect-[4/5] w-[75vw] sm:w-[45vw] shrink-0 snap-start overflow-hidden bg-gray-100 cursor-pointer rounded-none border border-gray-200"
            >
              {/* Background Image */}
              <img 
                src={ind.img} 
                alt={ind.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 md:opacity-80 md:group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Text Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                <div className="w-8 h-[2px] bg-[#F05A22] mb-3 md:mb-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
                <h3 className="text-white text-lg md:text-xl font-bold mb-1 md:mb-2 tracking-wide">{ind.title}</h3>
                <p className="text-gray-300 text-[13px] md:text-[14px] leading-relaxed line-clamp-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-150">
                  {ind.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Grid Section (Original 6 items) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {industries.map((ind, idx) => (
            <motion.div
              key={`desktop-${ind.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group relative aspect-[4/5] overflow-hidden bg-gray-100 cursor-pointer rounded-none border border-gray-200"
            >
              {/* Background Image */}
              <img 
                src={ind.img} 
                alt={ind.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 md:opacity-80 md:group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Text Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                <div className="w-8 h-[2px] bg-[#F05A22] mb-3 md:mb-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
                <h3 className="text-white text-lg md:text-xl font-bold mb-1 md:mb-2 tracking-wide">{ind.title}</h3>
                <p className="text-gray-300 text-[13px] md:text-[14px] leading-relaxed line-clamp-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-150">
                  {ind.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
