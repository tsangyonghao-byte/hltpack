"use client";

import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Process() {
  const { dict } = useLanguage();
  const steps = dict.home.process.steps.map((title, i) => ({ num: i + 1, title }));

  // Drag-to-scroll logic for desktop/mouse users testing the mobile view
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (scrollRef.current) {
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 2; // scroll speed multiplier
      
      // Use requestAnimationFrame for smoother rendering during scroll
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = scrollLeft - walk;
        }
      });
    }
  };

  const scrollLeftClick = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -260, behavior: 'smooth' }); // Scroll by 2 items (130px each)
    }
  };

  const scrollRightClick = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 260, behavior: 'smooth' }); // Scroll by 2 items (130px each)
    }
  };

  // Pre-calculate full class names so Tailwind can detect them
  const getOrderClasses = (index: number) => {
    const orderMap = [
      "order-1 sm:order-1 md:order-1 lg:order-1",     // 1
      "order-2 sm:order-2 md:order-2 lg:order-2",     // 2
      "order-4 sm:order-3 md:order-3 lg:order-3",     // 3
      "order-3 sm:order-6 md:order-4 lg:order-4",     // 4
      "order-5 sm:order-5 md:order-8 lg:order-5",     // 5
      "order-6 sm:order-4 md:order-7 lg:order-6",     // 6
      "order-8 sm:order-7 md:order-6 lg:order-12",    // 7
      "order-7 sm:order-8 md:order-5 lg:order-11",    // 8
      "order-9 sm:order-9 md:order-9 lg:order-10",    // 9
      "order-10 sm:order-12 md:order-10 lg:order-9",  // 10
      "order-12 sm:order-11 md:order-11 lg:order-8",  // 11
      "order-11 sm:order-10 md:order-12 lg:order-7",  // 12
    ];
    return orderMap[index] || "";
  };

  type Direction = 'right' | 'left' | 'down' | 'none';

  const getDirection = (index: number, cols: number): Direction => {
    if (index === 11) return 'none';
    const row = Math.floor(index / cols);
    const nextRow = Math.floor((index + 1) / cols);
    if (row === nextRow) {
      return row % 2 === 0 ? 'right' : 'left';
    } else {
      return 'down';
    }
  };

  const getVisibilityClasses = (index: number, targetDir: Direction) => {
    // Desktop layout remains the same S-curve logic
    const dirSm = getDirection(index, 3);
    const dirMd = getDirection(index, 4);
    const dirLg = getDirection(index, 6);

    let classes = "hidden "; // Hidden on mobile by default
    classes += dirSm === targetDir ? "sm:block " : "sm:hidden ";
    classes += dirMd === targetDir ? "md:block " : "md:hidden ";
    classes += dirLg === targetDir ? "lg:block " : "lg:hidden ";
    
    return classes.trim();
  };

  const LineRight = ({ className }: { className: string }) => (
    <div className={clsx("absolute top-[45px] md:top-[55px] left-[50%] w-full h-[2px] flex items-center justify-center -z-10", className)}>
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#e2e8f0_50%,transparent_50%)] bg-[length:12px_2px] opacity-70 group-hover:bg-[linear-gradient(to_right,#F05A22_50%,transparent_50%)] group-hover:opacity-50 transition-all duration-500"></div>
      <div className="bg-white px-1 z-10 text-slate-300 group-hover:text-[#F05A22] transition-colors duration-500">
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </div>
    </div>
  );

  const LineLeft = ({ className }: { className: string }) => (
    <div className={clsx("absolute top-[45px] md:top-[55px] right-[50%] w-full h-[2px] flex items-center justify-center -z-10", className)}>
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_left,#e2e8f0_50%,transparent_50%)] bg-[length:12px_2px] opacity-70 group-hover:bg-[linear-gradient(to_left,#F05A22_50%,transparent_50%)] group-hover:opacity-50 transition-all duration-500"></div>
      <div className="bg-white px-1 z-10 text-slate-300 group-hover:text-[#F05A22] transition-colors duration-500">
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </div>
    </div>
  );

  const LineDown = ({ className }: { className: string }) => (
    <div className={clsx("absolute top-[45px] md:top-[55px] left-[50%] w-[2px] h-[220px] md:h-[250px] flex items-center justify-center -z-10 -translate-x-1/2", className)}>
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_bottom,#e2e8f0_50%,transparent_50%)] bg-[length:2px_12px] opacity-70 group-hover:bg-[linear-gradient(to_bottom,#F05A22_50%,transparent_50%)] group-hover:opacity-50 transition-all duration-500"></div>
      <div className="bg-white py-1 z-10 text-slate-300 group-hover:text-[#F05A22] transition-colors duration-500">
        <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
      </div>
    </div>
  );

  // Mobile specific vertical line
  const MobileVerticalLine = ({ isLast }: { isLast: boolean }) => {
    if (isLast) return null;
    return (
      <div className="absolute top-[80px] left-[40px] w-[2px] h-[60px] sm:hidden flex items-center justify-center -z-10">
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_bottom,#e2e8f0_50%,transparent_50%)] bg-[length:2px_8px] opacity-70"></div>
        <div className="bg-white py-1 z-10 text-slate-300">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    );
  };

  return (
    <section className="py-12 md:py-32 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-no-repeat bg-cover bg-left-top opacity-[0.03] pointer-events-none" style={{backgroundImage: 'url(https://www.logospack.com.hk/img/bg_process_l.png)'}}></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-no-repeat bg-cover bg-right-bottom opacity-[0.03] pointer-events-none" style={{backgroundImage: 'url(https://www.logospack.com.hk/img/bg_process_r.png)'}}></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-[42px] font-extrabold text-[#F05A22] mb-6 uppercase tracking-wider">
            {dict.home.process.title}
          </h2>
          <div className="w-16 h-[2px] bg-[#F05A22] mx-auto mb-8"></div>
          <p className="text-gray-500 max-w-2xl mx-auto text-[15px] md:text-[17px] font-light leading-relaxed">
            {dict.home.process.subtitle}
          </p>
        </div>

        {/* Desktop Layout: S-Shape Grid (Hidden on Mobile) */}
        <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-16 max-w-[1250px] mx-auto relative">
          {steps.map((step, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
              key={step.num}
              className={clsx("relative flex flex-col items-center group w-full", getOrderClasses(index))}
            >
              {/* Dynamic Connecting Lines for S-Shape Layout (Desktop Only) */}
              <LineRight className={getVisibilityClasses(index, 'right')} />
              <LineLeft className={getVisibilityClasses(index, 'left')} />
              <LineDown className={getVisibilityClasses(index, 'down')} />

              {/* Glowing Circle */}
              <div className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-full bg-white border-[2px] border-[#F05A22]/20 text-[#F05A22] flex items-center justify-center text-2xl md:text-[32px] font-extrabold mb-6 shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:bg-[#F05A22] group-hover:border-[#F05A22] group-hover:text-white group-hover:shadow-[0_15px_30px_rgba(240,90,34,0.3)] group-hover:-translate-y-2 cursor-pointer flex-shrink-0 z-20 relative">
                {step.num}
              </div>
              
              {/* Bold Uppercase Text */}
              <h3 className="text-[12px] md:text-[13px] font-extrabold text-[#1E293B] text-center uppercase tracking-[0.1em] leading-snug group-hover:text-[#F05A22] transition-colors duration-300 px-2 max-w-[140px] w-full mt-0">
                {step.title}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Mobile Layout: Horizontal Scroll (Hidden on Desktop) */}
        <div className="sm:hidden relative w-full mt-10">
          {/* Scroll Indicator Prompt */}
          <div className="flex justify-end items-center gap-1 text-[#F05A22]/70 text-[11px] font-medium uppercase tracking-wider mb-3 pr-4">
            {dict.home.process.swipeToView}
            <ChevronRight className="w-3 h-3 animate-pulse" />
          </div>

          {/* Horizontal Scroll Container */}
          <div 
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={clsx(
              "flex overflow-x-auto hide-scrollbar gap-2 px-4 pb-4 relative select-none touch-pan-x",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
            style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
          >
            {steps.map((step, index) => (
              <div 
                key={step.num}
                className="flex-shrink-0 w-[130px] flex flex-col items-center group relative"
              >
                {/* Horizontal connection line inside item for better overflow handling */}
                {index !== steps.length - 1 && (
                  <div className="absolute top-[35px] left-[50%] w-full h-[2px] bg-[linear-gradient(to_right,#e2e8f0_50%,transparent_50%)] bg-[length:12px_2px] -z-10 group-hover:bg-[linear-gradient(to_right,#F05A22_50%,transparent_50%)] transition-colors duration-500"></div>
                )}
                
                {/* Arrow head inside item */}
                {index !== steps.length - 1 && (
                  <div className="absolute top-[26px] right-[-12px] bg-white z-10 text-slate-300 group-hover:text-[#F05A22] transition-colors duration-500 pointer-events-none">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
                {/* Glowing Circle - Resting on the dotted line */}
                <div className="w-[70px] h-[70px] rounded-full bg-white border-[2px] border-[#F05A22]/20 text-[#F05A22] flex items-center justify-center text-[20px] font-extrabold mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-colors duration-300 group-hover:bg-[#F05A22] group-hover:text-white z-10 pointer-events-none">
                  {step.num}
                </div>
                
                {/* Bold Uppercase Text */}
                <h3 className="text-[11px] font-bold text-[#1E293B] text-center uppercase tracking-wider leading-snug px-1 pointer-events-none">
                  {step.title}
                </h3>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button 
              onClick={scrollLeftClick}
              className="w-10 h-10 rounded-full border border-[#F05A22]/20 flex items-center justify-center text-[#F05A22] hover:bg-[#F05A22] hover:text-white transition-all duration-300 shadow-sm active:scale-95"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollRightClick}
              className="w-10 h-10 rounded-full border border-[#F05A22]/20 flex items-center justify-center text-[#F05A22] hover:bg-[#F05A22] hover:text-white transition-all duration-300 shadow-sm active:scale-95"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Gradient Fade on Right Edge to imply more content */}
          <div className="absolute top-0 right-0 bottom-16 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}