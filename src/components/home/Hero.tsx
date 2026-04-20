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
    product: "https://www.logospack.com.hk/cache/img/48dcdd66091626e0c53bc4c0223b928211711611569c.png",
    link: null,
  },
  {
    id: 2,
    title: "SUSTAINABLE & RECYCLABLE",
    subtitle: "Packaging that cares for the future",
    description: "Our eco-friendly pouches reduce carbon footprint without compromising on durability or barrier properties.",
    product: "https://www.logospack.com.hk/cache/img/fa22688a018d1a2c851f372c9f2bcb9dc6a2780694ec.png",
    link: null,
  },
  {
    id: 3,
    title: "LEAK-PROOF SPOUT POUCHES",
    subtitle: "Perfect for liquids and purees",
    description: "Advanced sealing technology guarantees zero leakage, making it the ideal choice for baby food and beverages.",
    product: "https://www.logospack.com.hk/cache/img/7649f3ec4a4a17861eef2d5748e511cd77ba3eb338bd.png",
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
    }, 6000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative w-full h-auto lg:min-h-[700px] lg:h-[100vh] lg:max-h-[900px] bg-transparent pt-[100px] pb-[140px] lg:pt-[210px] xl:pt-[177px] lg:pb-0 flex items-start lg:items-start xl:items-center">
      
      <div className="relative lg:absolute inset-0 z-10 w-full h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full w-full">
          {displaySlides.map((slide, index) => (
            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 lg:h-full flex flex-col lg:flex-row items-center pt-0">
              
              {/* DESKTOP VIEW */}
              <div className="hidden lg:flex w-full max-w-[1600px] mx-auto px-10 xl:px-20 flex-row items-center justify-between h-full">
                {/* Left Content: Typography */}
                <div className="w-1/2 flex flex-col justify-center relative z-20 text-left">
                  <AnimatePresence mode="wait">
                    {index === selectedIndex && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <h3 className="text-[#F05A22] font-bold tracking-[3px] uppercase text-[15px] mb-4">
                          {slide.subtitle}
                        </h3>
                        <h2 className="text-[#1A1A1A] font-extrabold text-[44px] xl:text-[72px] leading-[1.1] tracking-tight mb-6 font-sans uppercase">
                          {slide.title}
                        </h2>
                        <p className="text-[#595959] text-[16px] xl:text-[18px] max-w-[500px] xl:max-w-[540px] leading-[1.6] mb-8 xl:mb-10">
                          {slide.description}
                        </p>
                        
                        <div className="flex flex-row items-center justify-start gap-4 xl:gap-5">
                          <a href={slide.link || "/products"} className="group relative px-7 xl:px-8 py-3.5 xl:py-4 bg-[#F05A22] text-white font-bold text-[14px] xl:text-[15px] rounded-[30px] overflow-hidden transition-all duration-300 hover:shadow-[0_10px_20px_rgba(240,90,34,0.3)] flex items-center justify-center gap-3">
                            <span className="relative z-10">{dict.home.hero.explore}</span>
                            <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                            <div className="absolute inset-0 bg-[#D64816] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></div>
                          </a>
                          
                          <a href="/contact" className="px-7 xl:px-8 py-3.5 xl:py-4 bg-transparent text-[#1A1A1A] font-bold text-[14px] xl:text-[15px] rounded-[30px] border-2 border-[#EAEAEA] transition-all duration-300 hover:border-[#F05A22] hover:text-[#F05A22] shadow-none flex items-center justify-center">
                            {dict.home.hero.contact}
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right Content: Product Image */}
                <div className="w-1/2 h-full flex items-center justify-center relative z-10">
                  <AnimatePresence mode="wait">
                    {index === selectedIndex && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full h-full flex items-center justify-center"
                      >
                        {/* Soft glow behind product */}
                        <div className="absolute w-[80%] h-[80%] bg-[#F05A22] rounded-full blur-[100px] opacity-15 mix-blend-multiply"></div>
                        
                        <img
                          src={slide.image}
                          alt="Packaging Product"
                          className="relative z-10 w-auto h-full max-h-[500px] xl:max-h-[600px] object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.15)]"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* MOBILE VIEW */}
              <div className="flex lg:hidden w-full flex-col h-auto relative z-10">
                <AnimatePresence mode="wait">
                  {index === selectedIndex && (
                    <motion.div
                      key="mobile-content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex flex-col w-full h-auto justify-start items-center"
                    >
                      {/* Mobile Image (Top) */}
                      <div className="h-[280px] sm:h-[350px] w-full flex items-center justify-center relative z-10 mb-6 px-4">
                        <div className="absolute w-[50%] h-[50%] bg-[#F05A22] rounded-full blur-[60px] opacity-20 mix-blend-multiply"></div>
                        <img
                          src={slide.image}
                          alt="Packaging Product"
                          className="relative z-10 w-auto h-full object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)]"
                        />
                      </div>

                      {/* Mobile Text (Bottom) */}
                      <div className="flex flex-col items-center text-center px-4 w-full max-w-[360px] z-20">
                        <h3 className="text-[#F05A22] font-bold tracking-[1.5px] uppercase text-[10px] mb-1">
                          {slide.subtitle}
                        </h3>
                        <h2 className="text-[#1A1A1A] font-extrabold text-[24px] sm:text-[28px] leading-[1.1] tracking-tight mb-2 font-sans uppercase">
                          {slide.title}
                        </h2>
                        <p className="text-[#595959] text-[12px] sm:text-[13px] leading-[1.4] mb-4">
                          {slide.description}
                        </p>
                        
                        <div className="flex flex-row w-full justify-center gap-3">
                          <a href={slide.link || "/products"} className="flex-1 py-3 bg-[#F05A22] text-white font-bold text-[13px] rounded-full shadow-[0_4px_10px_rgba(240,90,34,0.3)] flex items-center justify-center gap-1.5 transition-transform active:scale-95">
                            {dict.home.hero.explore}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                          
                          <a href="/contact" className="flex-1 py-3 bg-white text-[#1A1A1A] font-bold text-[13px] rounded-full border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.05)] flex items-center justify-center transition-transform active:scale-95">
                            {dict.home.hero.contact}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Modern Carousel Controls */}
      <div className="absolute bottom-8 sm:bottom-10 lg:bottom-16 left-0 w-full z-20 pointer-events-none">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex justify-center lg:justify-start items-center">
          
          {/* MOBILE CONTROLS (Competitor Style: < 1 / 5 >) */}
          <div className="pointer-events-auto flex lg:hidden items-center justify-center gap-6 w-full">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] bg-white flex items-center justify-center text-[#1A1A1A] transition-all active:scale-95 border border-gray-100"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-[16px] font-bold text-[#1A1A1A] tracking-widest font-sans">
              {selectedIndex + 1} <span className="text-gray-400 font-normal">/ {displaySlides.length}</span>
            </div>

            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] bg-white flex items-center justify-center text-[#1A1A1A] transition-all active:scale-95 border border-gray-100"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* DESKTOP CONTROLS */}
          <div className="pointer-events-auto hidden lg:flex items-center gap-6 bg-transparent p-0 rounded-none shadow-none border-none">
            <div className="flex items-center gap-3">
              {displaySlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => emblaApi?.scrollTo(idx)}
                  className={`transition-all duration-500 ease-out rounded-full ${
                    idx === selectedIndex 
                      ? "w-10 h-2.5 bg-[#F05A22]" 
                      : "w-2.5 h-2.5 bg-[#EAEAEA] hover:bg-[#D64816]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="w-[1px] h-8 bg-[#EAEAEA] mx-2"></div>

            <div className="flex items-center gap-3">
              <button
                onClick={scrollPrev}
                className="w-12 h-12 rounded-full border border-[#EAEAEA] flex items-center justify-center text-[#1A1A1A] transition-all duration-300 hover:border-[#F05A22] hover:bg-[#F05A22] hover:text-white"
                aria-label="Previous slide"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <button
                onClick={scrollNext}
                className="w-12 h-12 rounded-full border border-[#EAEAEA] flex items-center justify-center text-[#1A1A1A] transition-all duration-300 hover:border-[#F05A22] hover:bg-[#F05A22] hover:text-white"
                aria-label="Next slide"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
