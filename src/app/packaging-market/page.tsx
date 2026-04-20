"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteContent } from "@/i18n/siteContent";

const MARKETS = [
  {
    id: "food",
    title: "Food Packaging",
    subtitle: "Keeping food fresh, safe, and appealing.",
    description: "From snacks and confectionery to frozen foods and ready-to-eat meals, our advanced barrier films and pouch designs extend shelf life while maximizing shelf appeal. We offer retortable, microwavable, and resealable options.",
    image: "https://www.logospack.com.hk/cache/img/03b562fb9ec251c3164c6e1171c0273ae7fb098bccd4.png", // Using ketchup pouch as food mock
    tags: ["Snacks", "Frozen Food", "Ready Meals", "Confectionery"],
    color: "from-orange-500/20 to-red-500/20",
    textColor: "text-orange-600"
  },
  {
    id: "beverage",
    title: "Beverage & Liquid",
    subtitle: "Leak-proof solutions for liquids on the go.",
    description: "Our high-performance spout pouches and bag-in-box solutions are perfect for juices, water, dairy, and alcoholic beverages. Engineered for superior drop resistance and puncture strength to ensure zero leakage.",
    image: "https://www.logospack.com.hk/cache/img/eeed8b33e36f4d104ab1dca068141170f510340e80ee.png", // Using cosmetic sachet as liquid mock
    tags: ["Juice", "Dairy", "Water", "Alcohol"],
    color: "from-blue-500/20 to-cyan-500/20",
    textColor: "text-blue-600"
  },
  {
    id: "pet-food",
    title: "Pet Food Packaging",
    subtitle: "Durable protection for our furry friends' meals.",
    description: "Heavy-duty flat bottom pouches and quad seal bags designed to hold heavy weights. Features include robust zippers, odor barriers, and grease-resistant layers specifically formulated for dry kibble and wet pet food.",
    image: "https://www.logospack.com.hk/cache/img/3627074e7ea60b3b8ba8c434283822d39ad600ab7b3b.png", // Using box pouch as pet food mock
    tags: ["Dry Kibble", "Wet Food", "Pet Treats", "Supplements"],
    color: "from-emerald-500/20 to-teal-500/20",
    textColor: "text-emerald-600"
  },
  {
    id: "coffee-tea",
    title: "Coffee & Tea",
    subtitle: "Preserving aroma and flavor from roaster to cup.",
    description: "Premium packaging solutions featuring high-barrier foils and one-way degassing valves to lock in the rich aroma of roasted coffee beans and delicate tea leaves. Available in luxurious matte and metallic finishes.",
    image: "https://www.logospack.com.hk/cache/img/9e55548254d2eb11f093cf288503222666a8561fbcb7.png", // Using coffee pouch mock
    tags: ["Roasted Beans", "Ground Coffee", "Loose Leaf Tea", "Matcha"],
    color: "from-amber-700/20 to-yellow-600/20",
    textColor: "text-amber-700"
  },
  {
    id: "personal-care",
    title: "Personal Care & Home",
    subtitle: "Functional and stylish packaging for daily essentials.",
    description: "Attractive and chemical-resistant packaging for cosmetics, detergents, and cleaning products. Our shaped pouches and refill solutions help brands reduce plastic usage compared to rigid bottles.",
    image: "https://www.logospack.com.hk/cache/img/d1e1f6a53f3251fbbb5782fa9bae5dee8a87a9c6d70e.png", // Using shaped pouch as personal care mock
    tags: ["Cosmetics", "Detergent", "Shampoo", "Refill Packs"],
    color: "from-purple-500/20 to-pink-500/20",
    textColor: "text-purple-600"
  }
];

export default function PackagingMarketPage() {
  const { locale } = useLanguage();
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero Banner */}
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#1E293B] flex flex-col items-center justify-center overflow-hidden min-h-[400px] md:min-h-[500px]">
        {/* Background Image / Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://www.logospack.com.hk/cache/img/fc7a122f548a04ed746698ceed226dcf1bd84a956f33.png')" }}
        ></div>
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-[#1E293B]/75"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center flex-grow">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white mb-6 tracking-tight uppercase leading-tight"
          >
            {content.packagingMarket.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light"
          >
            {content.packagingMarket.heroDescription}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider"
          >
            <Link href="/" className="hover:text-white transition-colors">{content.footer.home}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#F05A22]">{content.packagingMarket.breadcrumb}</span>
          </motion.div>
        </div>
      </section>

      {/* Markets List Section */}
      <section className="py-16 md:py-24">
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
                      <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 group-hover:shadow-2xl transition-shadow duration-500">
                        {/* Decorative Background Gradient */}
                        <div className={clsx("absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-100 transition-opacity duration-500", market.color)}></div>
                        
                        <img 
                          src={market.image} 
                          alt={market.title} 
                          className="absolute inset-0 w-full h-full object-contain p-12 mix-blend-multiply transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        
                        {/* Overlay tags */}
                        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 z-10">
                          {market.tags.map((tag: string, i: number) => (
                            <span key={i} className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
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
                        <div className={clsx("inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-sm font-bold uppercase tracking-widest mb-6", market.textColor)}>
                          <span className="w-2 h-2 rounded-full bg-current"></span>
                          {content.packagingMarket.industrySolution}
                        </div>
                        
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E293B] mb-4 leading-tight">
                          {translated.title}
                        </h2>
                        
                        <h3 className="text-xl md:text-2xl font-bold text-gray-400 mb-6 leading-snug">
                          {translated.subtitle}
                        </h3>
                        
                        <p className="text-lg text-gray-600 leading-relaxed mb-10">
                          {translated.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                          <Link 
                            href="/products" 
                            className="inline-flex items-center justify-center px-8 py-4 bg-[#F05A22] text-white rounded-full font-bold text-[15px] uppercase tracking-wider hover:bg-[#D44A18] hover:shadow-[0_10px_20px_rgba(240,90,34,0.3)] hover:-translate-y-1 transition-all duration-300"
                          >
                            {content.packagingMarket.exploreSolutions}
                          </Link>
                          <Link 
                            href="/contact" 
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1E293B] border-2 border-gray-200 rounded-full font-bold text-[15px] uppercase tracking-wider hover:border-[#1E293B] hover:bg-gray-50 transition-all duration-300 group/btn"
                          >
                            {content.packagingMarket.requestSamples}
                            <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
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
      <section className="py-20 bg-gradient-to-br from-[#1E293B] to-[#0F172A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F05A22] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 uppercase tracking-tight">
            {content.packagingMarket.ctaTitle}
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {content.packagingMarket.ctaDescription}
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-10 py-5 bg-white text-[#1E293B] rounded-full font-extrabold text-[16px] uppercase tracking-wider hover:bg-[#F05A22] hover:text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(240,90,34,0.4)] hover:-translate-y-1 transition-all duration-300"
          >
            {content.packagingMarket.ctaButton}
          </Link>
        </div>
      </section>

    </div>
  );
}
