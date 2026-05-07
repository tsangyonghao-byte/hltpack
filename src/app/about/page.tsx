"use client";

import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Target, ShieldCheck, Users, ArrowRight, Globe, Building2, X } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteContent } from "@/i18n/siteContent";
import VideoModal from "./VideoModal";

function AnimatedCounter({ value, suffix = "" }: { value: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 80,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(latest));
      }
    });
  }, [springValue]);

  return (
    <span className="inline-flex items-baseline">
      <span ref={ref}>0</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

export default function AboutPage() {
  const { locale } = useLanguage();
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const introHighlights = [
    {
      title: "Shenzhen-Based Export Hub",
      description: "Located next to Hong Kong, we support fast global shipping and responsive project coordination.",
    },
    {
      title: "BRC / ISO Certified",
      description: "Factory systems are built around stable quality control, food-grade production discipline, and reliable delivery.",
    },
  ];
  const stats = content.about.stats.map((item: { value: number; suffix: string; label: string }, index: number) => ({
    ...item,
    icon: [Building2, Globe, ShieldCheck, Users][index],
  }));
  const values = content.about.values.map((value: { id: string; title: string; description: string }, index: number) => ({
    ...value,
    icon: [Users, Target, Globe, ShieldCheck][index],
    color: ["text-blue-500", "text-[#F05A22]", "text-emerald-500", "text-purple-500"][index],
    bg: ["bg-blue-50", "bg-[#F05A22]/10", "bg-emerald-50", "bg-purple-50"][index],
  }));
  const factoryGallery = [
    {
      name: "Printing Workshop",
      img: "/images/factory/印刷车间/10001.png",
      className: "absolute left-0 top-0 w-[58%] z-10",
    },
    {
      name: "Bag Making Workshop",
      img: "/images/factory/制袋车间/10006.png",
      className: "absolute right-0 top-12 w-[48%] z-20",
    },
    {
      name: "Production Line",
      img: "/images/factory/制袋车间/10001.png",
      className: "absolute bottom-0 left-1/2 w-[52%] -translate-x-1/2 z-30",
    },
  ];
  const [selectedFactoryIndex, setSelectedFactoryIndex] = useState<number | null>(null);

  const handlePrevFactory = useCallback(() => {
    setSelectedFactoryIndex((current) => {
      if (current === null) return 0;
      return current === 0 ? factoryGallery.length - 1 : current - 1;
    });
  }, [factoryGallery.length]);

  const handleNextFactory = useCallback(() => {
    setSelectedFactoryIndex((current) => {
      if (current === null) return 0;
      return current === factoryGallery.length - 1 ? 0 : current + 1;
    });
  }, [factoryGallery.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedFactoryIndex(null);
      }

      if (selectedFactoryIndex !== null && event.key === "ArrowLeft") {
        handlePrevFactory();
      }

      if (selectedFactoryIndex !== null && event.key === "ArrowRight") {
        handleNextFactory();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextFactory, handlePrevFactory, selectedFactoryIndex]);

  return (
    <>
    <div className="min-h-screen bg-white">
      {/* Page Hero Banner */}
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#111111] flex flex-col items-center justify-center overflow-hidden min-h-[350px] md:minh-[450px]">
        {/* Background Image / Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity grayscale"
          style={{ backgroundImage: "url('/images/factory/印刷车间/10001.png')" }}
        ></div>
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center flex-grow">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
            <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              {content.about.breadcrumb}
            </span>
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white mb-6 tracking-tight leading-tight"
          >
            {content.about.heroTitle.replace(content.about.heroAccent, "")}
            <span className="text-[#F05A22]">{content.about.heroAccent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {content.about.heroDescription}
          </motion.p>
        </div>
      </section>

      {/* About Company Intro */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[560px_1fr] lg:gap-16 xl:gap-24">
              {/* Left Video Content & Images */}
              <div className="w-full flex flex-col gap-6">
                <VideoModal 
                  videoId="t4a25BQtjmY" 
                  coverImage="/images/factory/制袋车间/10002.png" 
                />
                
                {/* Additional Factory Images Below Video - Staggered Layout */}
                <div className="relative h-[420px] lg:h-[460px]">
                  {factoryGallery.map((item, index) => (
                    <motion.button
                      key={item.name}
                      type="button"
                      initial={{ opacity: 0, y: index === 2 ? 30 : -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                      className={clsx(
                        item.className,
                        "overflow-hidden border border-gray-200 bg-white p-3 text-left shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(240,90,34,0.14)]"
                      )}
                      onClick={() => setSelectedFactoryIndex(index)}
                    >
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Right Text Content */}
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-[2px] bg-[#F05A22]"></div>
                  <span className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase">
                    {content.about.storyTag}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-8 leading-tight tracking-tight">
                  {content.about.storyTitle.split("Our Future")[0]}
                  <span className="text-[#F05A22]">Our Future</span>
                </h2>

                <div className="space-y-6 text-gray-500 text-[16px] leading-8 font-light mb-10">
                  <p>{content.about.storyBody1}</p>
                  <p>{content.about.storyBody2}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                  <Link 
                    href="/products" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#1A1A1A] text-white rounded-none font-bold text-[14px] uppercase tracking-wider hover:bg-[#F05A22] transition-colors duration-300"
                  >
                    {content.about.exploreProducts}
                  </Link>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-[#1A1A1A] border border-gray-300 rounded-none font-bold text-[14px] uppercase tracking-wider hover:border-[#1A1A1A] hover:bg-gray-50 transition-colors duration-300 group"
                  >
                    {content.about.getInTouch}
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat: { value: number; suffix: string; label: string; icon: any }, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group border border-white/10 p-8 hover:border-white/20 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-transparent mb-6 text-[#F05A22]">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white mb-2 tracking-tight">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm md:text-base text-gray-500 font-medium uppercase tracking-wider group-hover:text-gray-400 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#F05A22]"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                Guiding Principles
              </span>
              <div className="w-8 h-[1px] bg-[#F05A22]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-6 tracking-tight">
              {content.about.valuesTitle}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              {content.about.valuesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value: { id: string; title: string; description: string; icon: any }, index: number) => (
              <motion.div 
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-none border border-gray-200 hover:border-[#F05A22] transition-colors duration-300 group"
              >
                <div className="w-12 h-12 flex items-center justify-start mb-6 text-[#1A1A1A] group-hover:text-[#F05A22] transition-colors">
                  <value.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4 tracking-wide">{value.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light text-[15px]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Manufacturing Capabilities */}
      <section className="py-16 md:py-24 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#F05A22]"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                Our Capabilities
              </span>
              <div className="w-8 h-[1px] bg-[#F05A22]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-6 tracking-tight">
              Advanced Manufacturing Facilities
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Equipped with 113 sets of state-of-the-art machinery across 5 major workshops: Printing, Lamination, Slitting, Bag Making, and Spout Sealing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Item 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative aspect-[4/3] overflow-hidden bg-gray-100 border border-gray-200 shadow-sm"
            >
              <img src="/images/factory/印刷车间/10002.png" alt="High-Speed Printing Workshop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide uppercase">High-Speed Printing</h3>
                <div className="h-[2px] w-12 bg-[#F05A22] mb-3 transition-all duration-300 group-hover:w-20"></div>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Precision rotogravure printing for vibrant, consistent colors and sharp graphics.</p>
              </div>
            </motion.div>

            {/* Item 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative aspect-[4/3] overflow-hidden bg-gray-100 border border-gray-200 shadow-sm"
            >
              <img src="/images/factory/制袋车间/10006.png" alt="Pouch Converting Workshop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide uppercase">Pouch Converting</h3>
                <div className="h-[2px] w-12 bg-[#F05A22] mb-3 transition-all duration-300 group-hover:w-20"></div>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Automated lines for stand-up, flat-bottom, spout pouches, and custom shaped formats.</p>
              </div>
            </motion.div>

            {/* Item 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative aspect-[4/3] overflow-hidden bg-gray-100 border border-gray-200 shadow-sm"
            >
              <img src="/images/factory/印刷车间/10101 (2).png" alt="Strict Quality Control" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide uppercase">Quality Control</h3>
                <div className="h-[2px] w-12 bg-[#F05A22] mb-3 transition-all duration-300 group-hover:w-20"></div>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Rigorous inspection and testing to ensure 100% compliance with international standards.</p>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/factory" 
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-gray-300 text-gray-800 font-bold text-sm tracking-wide hover:bg-[#F05A22] hover:text-white hover:border-[#F05A22] transition-all duration-300 rounded-none group"
            >
              View Full Factory Tour
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>

    <AnimatePresence>
      {selectedFactoryIndex !== null ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedFactoryIndex(null)}
          />

          <div className="relative z-[10000] flex h-full w-full items-center justify-center px-4 md:px-16 pointer-events-none">
            <div className="pointer-events-auto relative flex h-[82vh] w-full max-w-5xl items-center justify-center">
              <img
                src={factoryGallery[selectedFactoryIndex].img}
                alt={factoryGallery[selectedFactoryIndex].name}
                className="max-h-full max-w-full object-contain drop-shadow-2xl"
              />

              <button
                type="button"
                onClick={handlePrevFactory}
                className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/70 transition-colors hover:bg-[#F05A22] hover:text-white md:-left-10"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={handleNextFactory}
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/70 transition-colors hover:bg-[#F05A22] hover:text-white md:-right-10"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedFactoryIndex(null)}
            className="absolute right-4 top-4 z-[10001] rounded-full border border-white/20 bg-black/60 p-3 text-white transition-colors hover:bg-[#F05A22] md:right-8 md:top-8"
          >
            <X className="h-6 w-6" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
    </>
  );
}
