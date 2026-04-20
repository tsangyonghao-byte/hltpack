"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <div className="w-full aspect-[4/3] sm:aspect-square bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 relative group overflow-hidden p-8">
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent opacity-50"></div>
        <img 
          src={images[0]} 
          alt={alt} 
          className="relative z-10 w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full aspect-[4/3] sm:aspect-square bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 relative group overflow-hidden p-8">
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent opacity-50 pointer-events-none"></div>
        <img 
          src={images[currentIndex]} 
          alt={`${alt} - Image ${currentIndex + 1}`} 
          className="relative z-10 w-full h-full object-contain mix-blend-multiply transition-all duration-500 ease-out"
        />
        
        {/* Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-[#F05A22] hover:text-white hover:border-[#F05A22] z-20"
        >
          <ChevronLeft className="w-5 h-5 -ml-0.5" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-[#F05A22] hover:text-white hover:border-[#F05A22] z-20"
        >
          <ChevronRight className="w-5 h-5 -mr-0.5" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative w-20 h-20 rounded-xl border-2 overflow-hidden shrink-0 transition-all ${
              currentIndex === idx ? "border-[#F05A22] shadow-sm" : "border-gray-100 opacity-70 hover:opacity-100"
            }`}
          >
            <div className="absolute inset-0 bg-gray-50 pointer-events-none"></div>
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="relative z-10 w-full h-full object-contain mix-blend-multiply p-2" />
          </button>
        ))}
      </div>
    </div>
  );
}
