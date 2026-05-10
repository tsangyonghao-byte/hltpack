"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

import { useLanguage } from "@/i18n/LanguageContext";

export default function Showcase({ products: dbProducts = [] }: { products?: any[] }) {
  const { dict, locale } = useLanguage();
  const defaultsByLocale = {
    en: [
      { id: 1, name: "Nestle Premium Coffee Pouch", client: "Nestle", image: "/products/塑料包装袋系列/茶叶袋/自立自封袋/10001.jpg" },
      { id: 2, name: "Heinz Ketchup Spout Pouch", image: "https://www.logospack.com.hk/cache/img/03b562fb9ec251c3164c6e1171c0273ae7fb098bccd4.png", client: "Heinz" },
      { id: 3, name: "L'Oreal Cosmetic Sachet", image: "https://www.logospack.com.hk/cache/img/eeed8b33e36f4d104ab1dca068141170f510340e80ee.png", client: "L'Oreal" },
      { id: 4, name: "FamilyMart Snack Packaging", image: "https://www.logospack.com.hk/cache/img/88c2f8ae74bd774aacc80bdb24f848fe4ea1c7a533ae.png", client: "FamilyMart" },
      { id: 5, name: "Danone Dairy Stand-up Pouch", image: "https://www.logospack.com.hk/cache/img/3627074e7ea60b3b8ba8c434283822d39ad600ab7b3b.png", client: "Danone" },
      { id: 6, name: "Mondelez Cookie Roll Film", image: "https://www.logospack.com.hk/cache/img/596de946fdb47fa3480f1a1bc5d5dfab839845a8fbb1.png", client: "Mondelez" },
      { id: 7, name: "Unilever Detergent Refill", image: "https://www.logospack.com.hk/cache/img/d1e1f6a53f3251fbbb5782fa9bae5dee8a87a9c6d70e.png", client: "Unilever" },
    ],
    es: [
      { id: 1, name: "Bolsa premium de cafe Nestle", client: "Nestle", image: "/products/塑料包装袋系列/茶叶袋/自立自封袋/10001.jpg" },
      { id: 2, name: "Bolsa con boquilla para ketchup Heinz", image: "https://www.logospack.com.hk/cache/img/03b562fb9ec251c3164c6e1171c0273ae7fb098bccd4.png", client: "Heinz" },
      { id: 3, name: "Sachet cosmetico L'Oreal", image: "https://www.logospack.com.hk/cache/img/eeed8b33e36f4d104ab1dca068141170f510340e80ee.png", client: "L'Oreal" },
      { id: 4, name: "Empaque para snacks FamilyMart", image: "https://www.logospack.com.hk/cache/img/88c2f8ae74bd774aacc80bdb24f848fe4ea1c7a533ae.png", client: "FamilyMart" },
      { id: 5, name: "Bolsa doypack lactea Danone", image: "https://www.logospack.com.hk/cache/img/3627074e7ea60b3b8ba8c434283822d39ad600ab7b3b.png", client: "Danone" },
      { id: 6, name: "Film en rollo para galletas Mondelez", image: "https://www.logospack.com.hk/cache/img/596de946fdb47fa3480f1a1bc5d5dfab839845a8fbb1.png", client: "Mondelez" },
      { id: 7, name: "Recarga de detergente Unilever", image: "https://www.logospack.com.hk/cache/img/d1e1f6a53f3251fbbb5782fa9bae5dee8a87a9c6d70e.png", client: "Unilever" },
    ],
    ar: [
      { id: 1, name: "كيس قهوة فاخر من نستله", client: "Nestle", image: "/products/塑料包装袋系列/茶叶袋/自立自封袋/10001.jpg" },
      { id: 2, name: "كيس صلصة هاينز بفوهة", image: "https://www.logospack.com.hk/cache/img/03b562fb9ec251c3164c6e1171c0273ae7fb098bccd4.png", client: "Heinz" },
      { id: 3, name: "ساشيه تجميلي من لوريال", image: "https://www.logospack.com.hk/cache/img/eeed8b33e36f4d104ab1dca068141170f510340e80ee.png", client: "L'Oreal" },
      { id: 4, name: "تغليف وجبات خفيفة من فاميلي مارت", image: "https://www.logospack.com.hk/cache/img/88c2f8ae74bd774aacc80bdb24f848fe4ea1c7a533ae.png", client: "FamilyMart" },
      { id: 5, name: "كيس قائم لمنتجات دانون", image: "https://www.logospack.com.hk/cache/img/3627074e7ea60b3b8ba8c434283822d39ad600ab7b3b.png", client: "Danone" },
      { id: 6, name: "رول فيلم لبسكويت مونديليز", image: "https://www.logospack.com.hk/cache/img/596de946fdb47fa3480f1a1bc5d5dfab839845a8fbb1.png", client: "Mondelez" },
      { id: 7, name: "عبوة اعادة تعبئة منظف يونيليفر", image: "https://www.logospack.com.hk/cache/img/d1e1f6a53f3251fbbb5782fa9bae5dee8a87a9c6d70e.png", client: "Unilever" },
    ],
  } as const;
  const defaultProducts = defaultsByLocale[locale as keyof typeof defaultsByLocale] || defaultsByLocale.en;
  const featuredLabel = locale === "es" ? "Destacado" : locale === "ar" ? "مميز" : "Featured";

  const products = dbProducts.length > 0 ? dbProducts.map(p => ({
    id: p.id,
    name: p.name,
    client: p.category?.name || featuredLabel,
    image: p.image
  })) : defaultProducts;

  // Create a massive array to simulate an infinite loop perfectly
  const MULTIPLIER = 20; // 20 * 7 = 140 items total
  const extendedProducts = Array.from({ length: MULTIPLIER }).flatMap((_, i) =>
    products.map((p) => ({ ...p, uniqueId: `${i}-${p.id}` }))
  );

  // Start in the middle of the massive array
  const [activeIndex, setActiveIndex] = useState(Math.floor(MULTIPLIER / 2) * products.length);
  const [dimensions, setDimensions] = useState({ inactive: 200, active: 400, gap: 40 });

  useEffect(() => {
    const updateDims = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 768) {
          setDimensions({ inactive: 140, active: 280, gap: 16 });
        } else if (window.innerWidth < 1024) {
          setDimensions({ inactive: 180, active: 340, gap: 24 });
        } else {
          setDimensions({ inactive: 200, active: 400, gap: 40 });
        }
      }
    };
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  const handleNext = () => setActiveIndex((prev) => prev + 1);
  const handlePrev = () => setActiveIndex((prev) => prev - 1);

  // The secret to smooth Framer Motion dragging: we translate the whole container
  const xOffset = -(dimensions.inactive + dimensions.gap) * activeIndex;

  return (
    <section className="py-20 md:py-32 bg-[#F8F9FA] relative overflow-hidden">
      {/* Background with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-40 mix-blend-luminosity grayscale"
        style={{ backgroundImage: "url('/images/factory/印刷车间/10001.png')" }}
      ></div>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#1A1A1A] uppercase">
              {dict.nav.products}
            </span>
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-[48px] font-extrabold text-[#1A1A1A] uppercase tracking-[-0.02em] text-center"
          >
            {dict.home.showcase.title}
          </motion.h2>
        </div>

        {/* Carousel Track Wrapper */}
        <div className="relative w-full h-[500px] md:h-[600px]">
          <motion.div
            className="absolute left-0 top-0 flex items-center h-full"
            style={{ gap: dimensions.gap }}
            animate={{ x: xOffset }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            drag="x"
            dragConstraints={{
              left: -(dimensions.inactive + dimensions.gap) * (extendedProducts.length - 1),
              right: 0,
            }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000 || offset.x < -50) {
                handleNext();
              } else if (swipe > 10000 || offset.x > 50) {
                handlePrev();
              }
            }}
          >
            {extendedProducts.map((product, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={product.uniqueId}
                  className={clsx(
                    "shrink-0 flex flex-col items-center justify-center cursor-pointer group",
                    index < activeIndex && "pointer-events-none"
                  )}
                  animate={{
                    width: isActive ? dimensions.active : dimensions.inactive,
                    height: isActive ? dimensions.active : dimensions.inactive * 1.2,
                    opacity: index < activeIndex ? 0 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    {/* Active Blob Background / Tray */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="w-[110%] h-[110%] rounded-[32px] bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-md"></div>
                      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-transparent to-[#FAFAFA] opacity-50"></div>
                      
                      {/* Brand highlight stripe */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-[#F05A22] to-transparent opacity-50"></div>
                    </motion.div>

                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="relative z-10 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]"
                      animate={{
                        width: isActive ? "85%" : "75%",
                        height: isActive ? "85%" : "75%",
                        y: isActive ? -20 : 0,
                        scale: isActive ? 1.05 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    />
                  </div>

                  <motion.div
                    className={clsx(
                      "mt-6 transition-all duration-300 flex flex-col items-center",
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                  >
                    <span className="px-3 py-1 mb-3 bg-[#F05A22]/10 text-[#F05A22] rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#F05A22]/20">
                      {product.client}
                    </span>
                    <h3 className="font-bold text-center text-xl md:text-2xl text-[#1A1A1A] max-w-[80%] leading-tight">
                      {product.name}
                    </h3>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-0 right-4 sm:right-6 lg:right-8 flex items-center gap-4 z-20">
          <button
            onClick={handlePrev}
            className="bg-white text-[#1A1A1A] hover:text-[#F05A22] shadow-md border border-gray-100 hover:scale-110 hover:shadow-lg w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button
            onClick={handleNext}
            className="bg-white text-[#1A1A1A] hover:text-[#F05A22] shadow-md border border-gray-100 hover:scale-110 hover:shadow-lg w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </div>
    </section>
  );
}
