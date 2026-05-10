"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Link from "next/link";

import { useLanguage } from "@/i18n/LanguageContext";
import { getLocalizedValue } from "@/lib/localizedContent";

export default function NewsClient({ newsItems }: { categories: string[], newsItems: any[] }) {
  const { dict, locale } = useLanguage();
  const hasNews = newsItems.length > 0;
  const textMap = {
    en: {
      eyebrow: "Latest Insights",
      updating: "News content is being updated.",
      empty: "No news found in this category.",
    },
    es: {
      eyebrow: "Ultimas noticias",
      updating: "El contenido de noticias se esta actualizando.",
      empty: "No se encontraron noticias en esta categoria.",
    },
    ar: {
      eyebrow: "احدث الرؤى",
      updating: "يتم تحديث محتوى الاخبار حاليا.",
      empty: "لا توجد اخبار في هذه الفئة.",
    },
  } as const;
  const text = textMap[locale as keyof typeof textMap] || textMap.en;
  
  // Use all news directly
  const filteredNews = newsItems;

  // Pagination for desktop (3 items per page)
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const nextDesktopSlide = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const prevDesktopSlide = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  // Get current desktop items
  const currentDesktopItems = filteredNews.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // Mobile Swipe logic
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === filteredNews.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredNews.length - 1 : prev - 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: true,
  });

  return (
    <section id="news" className="py-12 md:py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header & Categories - Editorial Style */}
        <div className="flex flex-col mb-12 md:mb-16">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-[1px] bg-[#F05A22]"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                {text.eyebrow}
              </span>
              <div className="w-8 h-[1px] bg-[#F05A22]"></div>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#1A1A1A] leading-tight tracking-tight"
            >
              {dict.home.news.title}
            </motion.h2>
          </div>
        </div>

        {!hasNews ? (
          <div className="rounded-3xl border border-gray-100 bg-white px-8 py-16 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-[#1E293B]">{dict.home.news.title}</h3>
            <p className="mt-3 text-sm text-gray-500">{text.updating}</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="rounded-3xl border border-gray-100 bg-white px-8 py-16 text-center shadow-sm">
            <p className="text-gray-500">{text.empty}</p>
          </div>
        ) : (
          <div className="relative">
            
            {/* Desktop Navigation Arrows (Outside grid) */}
            {totalPages > 1 && (
              <>
                <button 
                  onClick={prevDesktopSlide}
                  className="hidden md:flex absolute -left-5 lg:-left-16 top-[40%] -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-gray-100 items-center justify-center text-gray-600 hover:text-[#F05A22] hover:shadow-md transition-all z-20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextDesktopSlide}
                  className="hidden md:flex absolute -right-5 lg:-right-16 top-[40%] -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-gray-100 items-center justify-center text-gray-600 hover:text-[#F05A22] hover:shadow-md transition-all z-20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Desktop News Grid (Hidden on Mobile) */}
            <div className="hidden md:block overflow-hidden pb-4">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`news-page-${currentPage}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="grid grid-cols-3 gap-6 lg:gap-8"
                >
                  {currentDesktopItems.map((news) => {
                    const title = getLocalizedValue(news, "title", locale);
                    const summary = getLocalizedValue(news, "summary", locale);
                    const category = getLocalizedValue(news, "category", locale);

                    return (
                    <Link href={`/news/${news.slug || news.id}`} key={news.id} className="group flex flex-col h-full bg-white rounded-none border border-gray-200 hover:border-[#F05A22]/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden">
                      {/* Image Container */}
                      <div className="relative aspect-[1.5] overflow-hidden bg-gray-50">
                        <img 
                          src={news.image} 
                          alt={title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-grow p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[#F05A22] text-[11px] font-bold tracking-[0.1em] uppercase">{category}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span className="text-gray-400 font-medium text-[12px]">{news.date.replace(/,/g, '')}</span>
                        </div>
                        
                        <h3 className="text-[18px] lg:text-[20px] font-bold text-[#1A1A1A] mb-4 leading-[1.4] group-hover:text-[#F05A22] transition-colors line-clamp-2">
                          {title}
                        </h3>
                        
                        <p className="text-gray-500 text-[14px] lg:text-[15px] leading-relaxed line-clamp-3 font-light">
                          {summary}
                        </p>
                      </div>
                    </Link>
                  )})}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile News List (Hidden on Desktop) */}
            <div className="md:hidden flex flex-col w-full pb-2 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`news-mobile-${currentIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/news/${filteredNews[currentIndex]?.slug || filteredNews[currentIndex]?.id || ''}`}>
                    <div {...handlers} className="group cursor-pointer flex flex-col w-full bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
                      {(() => {
                        const currentNews = filteredNews[currentIndex];
                        const title = currentNews ? getLocalizedValue(currentNews, "title", locale) : "";
                        const summary = currentNews ? getLocalizedValue(currentNews, "summary", locale) : "";
                        const category = currentNews ? getLocalizedValue(currentNews, "category", locale) : "";

                        return (
                          <>
                      {/* Main Featured Image */}
                      <div className="relative aspect-[1.5] w-full overflow-hidden bg-gray-50">
                        <img 
                          src={filteredNews[currentIndex]?.image} 
                          alt={title} 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col p-5">
                        <h3 className="text-[17px] font-bold text-[#1E293B] mb-2 leading-[1.35] tracking-tight line-clamp-2 min-h-[46px]">
                          {title}
                        </h3>
                        
                        <p className="text-gray-500 text-[14px] leading-[1.5] mb-4 line-clamp-3 font-light min-h-[63px]">
                          {summary}
                        </p>
                        
                        {/* Bottom Row */}
                        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="text-[#1E293B] font-extrabold text-[13px]">{filteredNews[currentIndex]?.date?.replace(/,/g, '')}</span>
                          <span className="text-[#F05A22] text-[13px] font-bold tracking-wide">#{category}</span>
                        </div>
                      </div>
                          </>
                        );
                      })()}
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Mobile Navigation Arrows */}
              {filteredNews.length > 1 && (
                <div className="flex justify-center items-center gap-6 mt-6">
                  <button 
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#1E293B] hover:bg-gray-50 shadow-sm active:scale-95 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#1E293B] hover:bg-gray-50 shadow-sm active:scale-95 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
