"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteContent } from "@/i18n/siteContent";
import Clients from "@/components/home/Clients";

const MARKETS = [
  {
    id: "food",
    title: "Food Packaging",
    subtitle: "Keeping food fresh, safe, and appealing.",
    description: "From snacks and confectionery to frozen foods and ready-to-eat meals, our advanced barrier films and pouch designs extend shelf life while maximizing shelf appeal. We offer retortable, microwavable, and resealable options.",
    image: "/products/塑料包装袋系列/定制食品袋/食品包装袋/10001.jpg", // Using ketchup pouch as food mock
    tags: ["Snacks", "Frozen Food", "Ready Meals", "Confectionery"],
    color: "from-orange-500/20 to-red-500/20",
    textColor: "text-orange-600"
  },
  {
    id: "beverage",
    title: "Beverage & Liquid",
    subtitle: "Leak-proof solutions for liquids on the go.",
    description: "Our high-performance spout pouches and bag-in-box solutions are perfect for juices, water, dairy, and alcoholic beverages. Engineered for superior drop resistance and puncture strength to ensure zero leakage.",
    image: "/products/塑料包装袋系列/吸嘴袋/奶茶吸嘴袋/10001.jpg", // Using cosmetic sachet as liquid mock
    tags: ["Juice", "Dairy", "Water", "Alcohol"],
    color: "from-blue-500/20 to-cyan-500/20",
    textColor: "text-blue-600"
  },
  {
    id: "pet-food",
    title: "Pet Food Packaging",
    subtitle: "Durable protection for our furry friends' meals.",
    description: "Heavy-duty flat bottom pouches and quad seal bags designed to hold heavy weights. Features include robust zippers, odor barriers, and grease-resistant layers specifically formulated for dry kibble and wet pet food.",
    image: "/products/塑料包装袋系列/定制宠物用品袋/八边自封宠物粮食袋/10001.jpg", // Using box pouch as pet food mock
    tags: ["Dry Kibble", "Wet Food", "Pet Treats", "Supplements"],
    color: "from-emerald-500/20 to-teal-500/20",
    textColor: "text-emerald-600"
  },
  {
    id: "coffee-tea",
    title: "Coffee & Tea",
    subtitle: "Preserving aroma and flavor from roaster to cup.",
    description: "Premium packaging solutions featuring high-barrier foils and one-way degassing valves to lock in the rich aroma of roasted coffee beans and delicate tea leaves. Available in luxurious matte and metallic finishes.",
    image: "/products/塑料包装袋系列/自封袋/咖啡豆子自封袋/10001.jpg", // Using coffee pouch mock
    tags: ["Roasted Beans", "Ground Coffee", "Loose Leaf Tea", "Matcha"],
    color: "from-amber-700/20 to-yellow-600/20",
    textColor: "text-amber-700"
  },
  {
    id: "personal-care",
    title: "Personal Care & Home",
    subtitle: "Functional and stylish packaging for daily essentials.",
    description: "Attractive and chemical-resistant packaging for cosmetics, detergents, and cleaning products. Our shaped pouches and refill solutions help brands reduce plastic usage compared to rigid bottles.",
    image: "/products/塑料包装袋系列/面膜袋/常规面膜袋/10001.jpg", // Using shaped pouch as personal care mock
    tags: ["Cosmetics", "Detergent", "Shampoo", "Refill Packs"],
    color: "from-purple-500/20 to-pink-500/20",
    textColor: "text-purple-600"
  }
];

export default function PackagingMarketPage({ setting }: { setting?: any }) {
  const { locale } = useLanguage();
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const heroImage = setting?.marketHeroImage || '/images/factory/制袋车间/10010.png';

  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero Banner */}
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#111111] flex flex-col items-center justify-center overflow-hidden min-h-[400px] md:min-h-[500px]">
        {/* Background Image / Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity grayscale"
          style={{ backgroundImage: `url('${heroImage}')` }}
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
              {content.packagingMarket.breadcrumb}
            </span>
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white mb-6 tracking-tight uppercase leading-tight"
          >
            {content.packagingMarket.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {content.packagingMarket.heroDescription}
          </motion.p>
        </div>
      </section>

      {/* Markets List Section */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-16 md:space-y-32">
            {MARKETS.map((market: (typeof MARKETS)[number], index: number) => {
              const translated = content.packagingMarket.markets.find((item: { id: string }) => item.id === market.id) || market;
              const isEven = index % 2 === 1;
              
              return (
                <div key={market.id} className="relative group">
                  {/* Anchor for linking */}
                  <div id={market.id} className="absolute -top-32"></div>
                  
                  <div className={clsx(
                    "flex flex-col gap-8 md:gap-16 items-center",
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  )}>
                    
                    {/* Image Area */}
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="w-full md:w-1/2"
                    >
                      <div className="relative aspect-square md:aspect-[4/3] rounded-none overflow-hidden bg-gray-50 border border-gray-200">
                        {/* Decorative Background Gradient */}
                        <div className={clsx("absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity duration-500", market.color)}></div>
                        
                        <img 
                          src={market.image} 
                          alt={translated.title} 
                          className="absolute inset-0 w-full h-full object-contain p-12 mix-blend-multiply transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        
                        {/* Overlay tags */}
                        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 z-10">
                          {(translated.tags || market.tags).map((tag: string, i: number) => (
                            <span key={i} className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 text-[11px] font-bold uppercase tracking-wider rounded-none shadow-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Content Area */}
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                      className="w-full md:w-1/2 flex flex-col justify-center"
                    >
                      <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-[2px] bg-[#F05A22]"></div>
                          <span className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase">
                            {content.packagingMarket.industrySolution}
                          </span>
                        </div>
                        
                        <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-4 leading-tight tracking-tight">
                          {translated.title}
                        </h2>
                        
                        <h3 className="text-xl md:text-2xl font-bold text-gray-400 mb-6 leading-snug">
                          {translated.subtitle}
                        </h3>
                        
                        <p className="text-lg text-gray-500 font-light leading-relaxed mb-10">
                          {translated.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                          <Link 
                            href="/products" 
                            className="inline-flex items-center justify-center px-8 py-4 bg-[#1A1A1A] text-white rounded-none font-bold text-[14px] uppercase tracking-wider hover:bg-[#F05A22] transition-colors duration-300"
                          >
                            {content.packagingMarket.exploreSolutions}
                          </Link>
                          <Link 
                            href="/contact" 
                            className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-[#1A1A1A] border border-gray-300 rounded-none font-bold text-[14px] uppercase tracking-wider hover:border-[#1A1A1A] hover:bg-gray-50 transition-colors duration-300 group/btn"
                          >
                            {content.packagingMarket.requestSamples}
                            <ArrowRight className="w-4 h-4 ml-3 transform group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#111111] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F05A22] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white mb-6 tracking-tight">
            {content.packagingMarket.ctaTitle}
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {content.packagingMarket.ctaDescription}
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-10 py-5 bg-[#F05A22] text-white rounded-none font-bold text-[14px] uppercase tracking-wider hover:bg-[#D44A18] transition-colors duration-300"
          >
            {content.packagingMarket.ctaButton}
          </Link>
        </div>
      </section>

      {/* Global Clients/Partners Section at the bottom */}
      <div className="bg-gray-50 border-t border-gray-200">
        <Clients />
      </div>

    </div>
  );
}
