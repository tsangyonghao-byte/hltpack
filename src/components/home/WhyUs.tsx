"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Factory, Settings, Globe, ShieldCheck, Package } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function WhyUs() {
  const { dict } = useLanguage();
  const features = [
    {
      title: dict.home.whyUs.points[0].title,
      desc: dict.home.whyUs.points[0].desc,
      icon: Factory,
    },
    {
      title: dict.home.whyUs.points[1].title,
      desc: dict.home.whyUs.points[1].desc,
      icon: Settings,
    },
    {
      title: dict.home.whyUs.points[2].title,
      desc: dict.home.whyUs.points[2].desc,
      icon: Globe,
    },
    {
      title: dict.home.whyUs.points[3].title,
      desc: dict.home.whyUs.points[3].desc,
      icon: ShieldCheck,
    },
    {
      title: dict.home.whyUs.points[4].title,
      desc: dict.home.whyUs.points[4].desc,
      icon: Package,
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-12 md:py-32 relative overflow-hidden bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Section - Centered with Blob */}
        <div className="text-center mb-8 md:mb-20 relative">
          {/* Subtle blue blob matching competitor style but using brand orange, shifted left and top */}
          <div className="absolute top-0 md:top-1/2 left-[10%] md:left-1/2 md:-translate-x-[60%] -translate-y-[40%] w-[100px] md:w-[180px] h-[80px] md:h-[120px] bg-[#F05A22]/15 md:bg-[#F05A22]/15 rounded-[40%_60%_70%_30%] blur-[12px] md:blur-[24px] opacity-80 z-0 pointer-events-none"></div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[26px] sm:text-[32px] md:text-[46px] font-extrabold text-[#1E293B] tracking-tight leading-tight relative z-10"
          >
            {dict.home.whyUs.title}
          </motion.h2>
        </div>

        {/* Carousel Section */}
        <div className="relative group mt-4 md:mt-0">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 md:-ml-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%] pl-4 md:pl-6 min-w-0"
                >
                  {/* Clean White Card with Large Icon -> Brand Orange Gradient on Hover */}
                  <div className="bg-white rounded-[16px] md:rounded-[24px] p-6 md:p-12 h-full min-h-[320px] md:min-h-[460px] flex flex-col border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] md:shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(240,90,34,0.25)] hover:bg-gradient-to-b hover:from-[#F05A22] hover:to-[#D44A18] transition-all duration-500 cursor-pointer group/card">
                    
                    {/* Massive Icon Container */}
                    <div className="flex-grow flex items-center justify-center mb-4 md:mb-10 mt-2 md:mt-4 relative">
                      <feature.icon 
                        className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] text-[#F05A22] opacity-80 group-hover/card:text-white group-hover/card:opacity-100 transition-all duration-500 group-hover/card:scale-110 group-hover/card:-translate-y-2" 
                        strokeWidth={1.5} 
                      />
                    </div>

                    {/* Text Content - Bottom Aligned */}
                    <div className="mt-auto relative z-10">
                      <h3 className="text-[16px] md:text-[22px] font-bold text-[#1E293B] group-hover/card:text-white mb-2 md:mb-3 leading-snug transition-colors duration-500">
                        {feature.title}
                      </h3>
                      {/* Description - Truncated on mobile for a clean look but still providing value */}
                      <p className="text-gray-500 group-hover/card:text-white/90 text-[13px] md:text-[15px] leading-relaxed line-clamp-2 transition-colors duration-500">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Controls (Below Carousel) */}
          <div className="flex sm:hidden items-center justify-center gap-6 mt-8">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#1A1A1A] transition-all active:scale-95 border border-gray-100"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#1A1A1A] transition-all active:scale-95 border border-gray-100"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Controls - Always visible on desktop, hidden on small mobile where swipe is better */}
          <button 
            onClick={scrollPrev}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] hidden sm:flex items-center justify-center text-gray-400 hover:text-[#F05A22] hover:scale-110 z-20 border border-gray-50 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          
          <button 
            onClick={scrollNext}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] hidden sm:flex items-center justify-center text-gray-400 hover:text-[#F05A22] hover:scale-110 z-20 border border-gray-50 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>

      </div>
    </section>
  );
}
