"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { useHero } from "@/components/home/HeroContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Banner } from "@prisma/client";

// 极简工业风的轮播数据
const fallbackSlides = [
  {
    id: 1,
    title: "INNOVATIVE PACKAGING SOLUTIONS",
    subtitle: "Elevate your brand with premium quality",
    description: "We provide state-of-the-art packaging materials for the food and pet industry, ensuring freshness, safety, and shelf appeal.",
    product: "https://cdn.myxypt.com/f4a05196/24/07/6b210c18853122be0ddf2bda9143f2ea45132cb9.png",
    link: null,
  },
  {
    id: 2,
    title: "SUSTAINABLE & RECYCLABLE",
    subtitle: "Packaging that cares for the future",
    description: "Our eco-friendly pouches reduce carbon footprint without compromising on durability or barrier properties.",
    product: "https://cdn.myxypt.com/f4a05196/24/07/cb963b68dbc2a4edd2b071eafc8a0c995cf1c837.png",
    link: null,
  },
  {
    id: 3,
    title: "LEAK-PROOF SPOUT POUCHES",
    subtitle: "Perfect for liquids and purees",
    description: "Advanced sealing technology guarantees zero leakage, making it the ideal choice for baby food and beverages.",
    product: "https://cdn.myxypt.com/f4a05196/24/07/44cab68946517370d455e027d846775a1b71c154.png",
    link: null,
  }
];

export default function Hero({ banners = [] }: { banners?: Banner[] }) {
  const displaySlides = banners.length > 0 ? banners : fallbackSlides.map(s => ({
    ...s,
    image: s.product, // map 'product' to 'image'
  }));

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });
  const { setCurrentSlideIndex: setCurrentSlide } = useHero();
  const { dict } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    setCurrentSlide(index);
  }, [emblaApi, setCurrentSlide]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // 自动播放
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 7000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative w-full h-auto lg:h-[100vh] lg:min-h-[800px] lg:max-h-[1000px] pt-[120px] pb-[100px] lg:pt-[160px] lg:pb-0 flex flex-col justify-center overflow-hidden bg-white">
      {/* Refined Background - Protects Logo Area but Keeps Orange Impact */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Mobile: Pure white background at the top for logo, orange at the bottom. Desktop: Diagonal cut */}
        <div 
          className="absolute inset-0 w-full h-full lg:w-[65%] bg-gradient-to-br from-[#F05A22] to-[#D64816] z-0"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", // Default for mobile (full cover, handled by CSS below)
          }}
        />
        {/* Desktop ONLY: The white section on the right cutting into the orange */}
        <div 
          className="hidden lg:block absolute top-0 right-0 w-[60%] h-full bg-white z-10"
          style={{
            clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)", 
          }}
        />
        {/* Top-Left Logo Protection Area - Stronger on mobile to protect logo and menu */}
        <div 
          className="absolute top-[-100px] left-[-50px] w-[150%] sm:w-[500px] h-[350px] sm:h-[300px] bg-white blur-[60px] lg:blur-[60px] z-[5] pointer-events-none opacity-100 lg:opacity-90"
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-center max-w-[1600px] mx-auto" ref={emblaRef}>
        <div className="flex h-full w-full">
          {displaySlides.map((slide, index) => (
            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-full flex flex-col lg:flex-row items-center justify-start lg:justify-between px-6 md:px-12 lg:px-20 xl:px-24">
              
              {/* Left Content: Elegant Typography */}
              <AnimatePresence mode="wait">
                {index === selectedIndex && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-start text-left w-full lg:w-[45%] z-20 shrink-0 pt-6 sm:pt-8 lg:pt-0 order-2 lg:order-1"
                  >
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="inline-flex items-center gap-2 mb-4 lg:mb-6 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-white animate-pulse"></span>
                      <h3 className="text-white font-medium tracking-[0.05em] text-[11px] lg:text-[13px]">
                        {slide.subtitle}
                      </h3>
                    </motion.div>
                    
                    {/* Text is white on both mobile and desktop now, because mobile text is placed on the orange background at the bottom */}
                    <h2 className="text-white font-serif font-bold text-[36px] sm:text-[44px] md:text-[52px] lg:text-[72px] xl:text-[80px] leading-[1.05] tracking-[-0.02em] mb-4 lg:mb-8 drop-shadow-sm lg:drop-shadow-md">
                      {slide.title.split(' ').map((word: string, i: number) => (
                        <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-1 lg:pb-2">
                          <motion.span 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="inline-block"
                          >
                            {word}
                          </motion.span>
                        </span>
                      ))}
                    </h2>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-white/90 text-[14px] lg:text-[18px] max-w-[500px] leading-[1.6] lg:leading-[1.7] mb-8 lg:mb-12 font-sans font-light drop-shadow-sm"
                    >
                      {slide.description}
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="flex flex-row items-center justify-start gap-3 lg:gap-5 w-full sm:w-auto"
                    >
                      <a href={slide.link || "/products"} className="flex-1 sm:flex-none px-6 lg:px-9 py-3 lg:py-3.5 bg-white text-[#F05A22] hover:bg-white/90 font-bold text-[13px] lg:text-[15px] tracking-wide transition-all duration-500 rounded-[4px] flex items-center justify-center gap-2 lg:gap-3 group shadow-lg">
                        {dict.home.hero.explore}
                        <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                      
                      <a href="/contact" className="flex-1 sm:flex-none px-6 lg:px-9 py-3 lg:py-3.5 bg-transparent text-white font-medium text-[13px] lg:text-[15px] tracking-wide border border-white/40 hover:border-white transition-all duration-500 rounded-[4px] flex items-center justify-center shadow-sm">
                        {dict.home.hero.contact}
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Right Content: Floating Product Image (Matches Xianglee style card) */}
              <AnimatePresence mode="wait">
                {index === selectedIndex && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full lg:w-[45%] h-[280px] sm:h-[350px] lg:h-[550px] flex items-center justify-center z-10 shrink order-1 lg:order-2"
                  >
                    {/* Product Image Container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="relative z-10 w-full h-full object-contain lg:drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ))}
        </div>
      </div>

      {/* Elegant Minimalist Carousel Controls (Dark Version for White Background) */}
      <div className="absolute bottom-6 lg:bottom-12 left-0 w-full z-30 pointer-events-none">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 xl:px-24 flex justify-center lg:justify-end items-center gap-8 pointer-events-auto">
          
          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 flex items-center justify-center text-[#1A1A1A]/40 transition-colors hover:text-[#F05A22]"
              aria-label="Previous slide"
            >
              <ArrowRight className="w-5 h-5 rotate-180" strokeWidth={1.5} />
            </button>

            <div className="text-[13px] font-medium tracking-[0.2em] text-[#1A1A1A]">
              {String(selectedIndex + 1).padStart(2, '0')} 
              <span className="text-[#1A1A1A]/20 mx-2">/</span> 
              <span className="text-[#1A1A1A]/60">{String(displaySlides.length).padStart(2, '0')}</span>
            </div>

            <button
              onClick={scrollNext}
              className="w-10 h-10 flex items-center justify-center text-[#1A1A1A]/40 transition-colors hover:text-[#F05A22]"
              aria-label="Next slide"
            >
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
