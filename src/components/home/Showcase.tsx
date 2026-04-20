"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

import { useLanguage } from "@/i18n/LanguageContext";

export default function Showcase({ products: dbProducts = [] }: { products?: any[] }) {
  const { dict } = useLanguage();
  const defaultProducts = [
    {
      id: 1,
      name: "Nestlé Premium Coffee Pouch",
      client: "Nestlé",
      image: "/nestle-pouch.png",
    },
    {
      id: 2,
      name: "Heinz Ketchup Spout Pouch",
      image: "https://www.logospack.com.hk/cache/img/03b562fb9ec251c3164c6e1171c0273ae7fb098bccd4.png",
      client: "Heinz",
    },
    {
      id: 3,
      name: "L'Oréal Cosmetic Sachet",
      image: "https://www.logospack.com.hk/cache/img/eeed8b33e36f4d104ab1dca068141170f510340e80ee.png",
      client: "L'Oréal",
    },
    {
      id: 4,
      name: "FamilyMart Snack Packaging",
      image: "https://www.logospack.com.hk/cache/img/88c2f8ae74bd774aacc80bdb24f848fe4ea1c7a533ae.png",
      client: "FamilyMart",
    },
    {
      id: 5,
      name: "Danone Dairy Stand-up Pouch",
      image: "https://www.logospack.com.hk/cache/img/3627074e7ea60b3b8ba8c434283822d39ad600ab7b3b.png",
      client: "Danone",
    },
    {
      id: 6,
      name: "Mondelez Cookie Roll Film",
      image: "https://www.logospack.com.hk/cache/img/596de946fdb47fa3480f1a1bc5d5dfab839845a8fbb1.png",
      client: "Mondelez",
    },
    {
      id: 7,
      name: "Unilever Detergent Refill",
      image: "https://www.logospack.com.hk/cache/img/d1e1f6a53f3251fbbb5782fa9bae5dee8a87a9c6d70e.png",
      client: "Unilever",
    },
  ];

  const products = dbProducts.length > 0 ? dbProducts.map(p => ({
    id: p.id,
    name: p.name,
    client: p.category?.name || "Featured",
    image: p.image
  })) : defaultProducts;

  // Create a massive array to simulate an infinite loop perfectly
  const MULTIPLIER = 20; // 20 * 7 = 140 items total
  const extendedProducts = Array.from({ length: MULTIPLIER }).flatMap((_, i) =>
    products.map((p) => ({ ...p, uniqueId: `${i}-${p.id}` }))
  );

  // Start in the middle of the massive array
  const [activeIndex, setActiveIndex] = useState(Math.floor(MULTIPLIER / 2) * products.length);
  const [dimensions, setDimensions] = useState({ inactive: 220, active: 450, gap: 32 });

  useEffect(() => {
    const updateDims = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 768) {
          setDimensions({ inactive: 140, active: 280, gap: 16 });
        } else if (window.innerWidth < 1024) {
          setDimensions({ inactive: 180, active: 360, gap: 24 });
        } else {
          setDimensions({ inactive: 220, active: 480, gap: 32 });
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
    <section className="py-12 md:py-32 bg-[#F05A22] text-white overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-[42px] font-extrabold text-white mb-4 uppercase tracking-[0.05em] relative inline-block text-center">
            {dict.home.showcase.title}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-[3px] bg-white/50 rounded-full"></div>
          </h2>
        </div>

        {/* Carousel Track Wrapper */}
        <div className="relative w-full h-[400px] md:h-[500px]">
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
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Active Blob Background */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      initial={false}
                      animate={{
                        opacity: isActive ? 0.2 : 0,
                        scale: isActive ? 1 : 0.5,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <svg
                        className="w-[120%] h-[120%] text-white"
                        viewBox="10.729 17.304 414 381"
                        fill="currentColor"
                      >
                        <path d="M101.467,357.531c16.794,19.325,62.145,72.815,153.388,13.893 c91.242-58.921,152.568-174.373,164.799-227.948c12.23-53.576,5.297-92.769-53.717-113.843 C306.922,8.558,171.356,12.814,82.454,55.581C-6.448,98.348,3.414,180.62,27.079,238.117 C50.745,295.614,84.679,338.21,101.467,357.531z" />
                      </svg>
                    </motion.div>

                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="relative z-10 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]"
                      animate={{
                        width: isActive ? "105%" : "85%",
                        height: isActive ? "105%" : "85%",
                        y: isActive ? -15 : 0,
                        scale: isActive ? 1.1 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    />
                  </div>

                  <motion.h3
                    className={clsx(
                      "font-bold text-center mt-4 transition-all duration-300",
                      isActive ? "text-xl md:text-2xl text-white opacity-100 drop-shadow-sm" : "text-sm md:text-base text-white/70 group-hover:text-white opacity-80"
                    )}
                  >
                    {product.name}
                  </motion.h3>
                  
                  {/* Client Name Label */}
                  <motion.div
                    className="mt-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : -10
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/30">
                      {product.client}
                    </span>
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
            className="bg-white/10 text-white hover:bg-white hover:text-[#F05A22] shadow-md border border-white/20 hover:scale-110 hover:shadow-lg w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button
            onClick={handleNext}
            className="bg-white/10 text-white hover:bg-white hover:text-[#F05A22] shadow-md border border-white/20 hover:scale-110 hover:shadow-lg w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </div>
    </section>
  );
}