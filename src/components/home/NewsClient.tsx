"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Link from "next/link";

import { useLanguage } from "@/i18n/LanguageContext";

export default function NewsClient({ categories, newsItems }: { categories: string[], newsItems: any[] }) {
  const { dict } = useLanguage();
  const hasNews = newsItems.length > 0;
  
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  // Filter news based on active category
  const filteredNews = activeCategory === "All" 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  // Pagination for desktop (3 items per page)
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(0); // Reset page on category change
    setCurrentIndex(0); // Reset mobile index
  };

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
        
        {/* Header & Categories (Similar to Logospack) */}
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <div className="w-full flex justify-center mb-10">
            {/* Category Pill Container */}
            <div className="bg-[#EEF2FA] rounded-full p-1.5 flex flex-wrap justify-center items-center gap-1 max-w-full overflow-x-auto no-scrollbar shadow-sm border border-blue-50/50">
              <button
                onClick={() => handleCategoryChange("All")}
                className={`px-8 py-2.5 rounded-full text-[14px] font-bold tracking-wide transition-all duration-300 whitespace-nowrap ${
                  activeCategory === "All" 
                    ? "bg-white text-[#F05A22] shadow-[0_2px_8px_rgba(0,0,0,0.08)]" 
                    : "text-[#4B5563] hover:text-[#F05A22] hover:bg-white/50"
                }`}
              >
                All
              </button>
              {categories.map((category) => {
                // Ignore weird combined categories if any
                if (category.includes('#')) return null;
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-8 py-2.5 rounded-full text-[14px] font-bold tracking-wide transition-all duration-300 whitespace-nowrap ${
                      activeCategory === category 
                        ? "bg-white text-[#F05A22] shadow-[0_2px_8px_rgba(0,0,0,0.08)]" 
                        : "text-[#4B5563] hover:text-[#F05A22] hover:bg-white/50"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {!hasNews ? (
          <div className="rounded-3xl border border-gray-100 bg-white px-8 py-16 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-[#1E293B]">{dict.home.news.title}</h3>
            <p className="mt-3 text-sm text-gray-500">News content is being updated.</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="rounded-3xl border border-gray-100 bg-white px-8 py-16 text-center shadow-sm">
            <p className="text-gray-500">No news found in this category.</p>
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
                  key={`${activeCategory}-${currentPage}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="grid grid-cols-3 gap-6 lg:gap-8"
                >
                  {currentDesktopItems.map((news) => (
                    <Link href={`/news/${news.slug || news.id}`} key={news.id} className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden">
                      {/* Image Container */}
                      <div className="relative aspect-[1.5] overflow-hidden bg-gray-50">
                        <img 
                          src={news.image} 
                          alt={news.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-grow p-6 md:p-8">
                        <h3 className="text-[18px] lg:text-[20px] font-bold text-[#1E293B] mb-3 leading-[1.4] group-hover:text-[#F05A22] transition-colors line-clamp-2">
                          {news.title}
                        </h3>
                        
                        <p className="text-gray-500 text-[14px] lg:text-[15px] leading-relaxed mb-6 line-clamp-3 font-light">
                          {news.summary}
                        </p>
                        
                        {/* Bottom Row */}
                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                          <span className="text-[#1E293B] font-extrabold text-[13px]">{news.date.replace(/,/g, '')}</span>
                          <span className="text-[#F05A22] text-[13px] font-bold tracking-wide">#{news.category}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile News List (Hidden on Desktop) */}
            <div className="md:hidden flex flex-col w-full pb-2 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${currentIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/news/${filteredNews[currentIndex]?.slug || filteredNews[currentIndex]?.id || ''}`}>
                    <div {...handlers} className="group cursor-pointer flex flex-col w-full bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
                      {/* Main Featured Image */}
                      <div className="relative aspect-[1.5] w-full overflow-hidden bg-gray-50">
                        <img 
                          src={filteredNews[currentIndex]?.image} 
                          alt={filteredNews[currentIndex]?.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col p-5">
                        <h3 className="text-[17px] font-bold text-[#1E293B] mb-2 leading-[1.35] tracking-tight line-clamp-2 min-h-[46px]">
                          {filteredNews[currentIndex]?.title}
                        </h3>
                        
                        <p className="text-gray-500 text-[14px] leading-[1.5] mb-4 line-clamp-3 font-light min-h-[63px]">
                          {filteredNews[currentIndex]?.summary}
                        </p>
                        
                        {/* Bottom Row */}
                        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="text-[#1E293B] font-extrabold text-[13px]">{filteredNews[currentIndex]?.date?.replace(/,/g, '')}</span>
                          <span className="text-[#F05A22] text-[13px] font-bold tracking-wide">#{filteredNews[currentIndex]?.category}</span>
                        </div>
                      </div>
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
