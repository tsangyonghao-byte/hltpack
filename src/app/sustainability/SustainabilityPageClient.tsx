"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Leaf, Recycle, TreePine, Droplet, ArrowRight, Zap, Factory } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteContent } from "@/i18n/siteContent";

const ECO_SOLUTIONS = [
  {
    title: "100% Recyclable Mono-Material",
    description: "Our innovative Mono-PE and Mono-PP pouches provide excellent barrier properties while being fully recyclable in existing plastic streams.",
    icon: Recycle,
    image: "/products/塑料包装袋系列/牛皮纸袋/开天窗牛皮纸袋/10001.jpg", // Using a paper bag image
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    tag: "Circular Economy"
  },
  {
    title: "Post-Consumer Recycled (PCR)",
    description: "We incorporate up to 30% PCR plastics into non-food contact layers, significantly reducing the reliance on virgin fossil-based resins.",
    icon: Droplet,
    image: "/products/塑料包装袋系列/定制宠物用品袋/八边自封宠物粮食袋/10001.jpg", // Using a heavy-duty bag as a proxy for PCR
    color: "text-blue-500",
    bg: "bg-blue-50",
    tag: "Resource Reduction"
  },
  {
    title: "Compostable Packaging",
    description: "Certified biodegradable films that break down into organic matter, perfect for dry foods, snacks, and eco-conscious brands.",
    icon: Leaf,
    image: "/products/塑料包装袋系列/定制食品袋/三边封手提袋/10001.jpg", // Using a food bag image
    color: "text-[#F05A22]",
    bg: "bg-[#F05A22]/10",
    tag: "Zero Waste"
  }
];

const GREEN_PRACTICES = [
  {
    title: "Solvent-Free Lamination",
    description: "Eliminating VOC emissions during the lamination process, ensuring a safer workplace and a cleaner environment.",
    icon: Factory,
  },
  {
    title: "Energy Efficiency",
    description: "Upgraded facility lighting and optimized machine operations to reduce our overall carbon footprint by 25%.",
    icon: Zap,
  },
  {
    title: "Waste Reduction",
    description: "Strict internal recycling protocols for edge trims and defective prints, minimizing landfill waste.",
    icon: TreePine,
  },
];

export default function SustainabilityPage({ setting }: { setting?: any }) {
  const { locale } = useLanguage();
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const heroImage = setting?.sustainabilityHeroImage || '/images/factory/制袋车间/10008.png';
  const localizedFactoryAlt =
    locale === "es"
      ? "Instalacion de produccion sostenible"
      : locale === "ar"
        ? "منشأة إنتاج مستدامة"
        : "Sustainable factory facility";
  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero Banner */}
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#111111] flex flex-col items-center justify-center overflow-hidden min-h-[350px] md:min-h-[450px]">
        {/* Background Image / Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity grayscale"
          style={{ backgroundImage: `url('${heroImage}')` }} 
        ></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center flex-grow">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
            <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              {content.sustainability.breadcrumb}
            </span>
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white mb-6 tracking-tight uppercase leading-tight"
          >
            {content.sustainability.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {content.sustainability.heroDescription}
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-[2px] bg-[#F05A22]"></div>
            <span className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase">
              {content.sustainability.breadcrumb}
            </span>
            <div className="w-8 h-[2px] bg-[#F05A22]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-8 leading-tight tracking-tight">
            {content.sustainability.introTitle}
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed font-light">
            {content.sustainability.introDescription}
          </p>
        </div>
      </section>

      {/* Eco Solutions Grid */}
      <section className="py-16 md:py-24 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#111111] rounded-none mb-6 text-[#F05A22]">
              <Recycle className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] tracking-tight">
              {content.sustainability.solutionsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {ECO_SOLUTIONS.map((solution: (typeof ECO_SOLUTIONS)[number], index: number) => {
              const translated = content.sustainability.solutions[index] || solution;
              return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-none overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(240,90,34,0.1)] transition-all duration-500 border border-gray-200 group flex flex-col"
              >
                {/* Image Header */}
                <div className="relative h-64 bg-gray-50 overflow-hidden border-b border-gray-100">
                  <img 
                    src={solution.image} 
                    alt={solution.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute bottom-0 left-0 z-20">
                    <span className="px-5 py-2 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-widest rounded-none">
                      {translated.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className={clsx("w-12 h-12 rounded-none flex items-center justify-center mb-6 shrink-0 bg-[#111111] text-white group-hover:bg-[#F05A22] transition-colors duration-300")}>
                    <solution.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4 tracking-wide">{translated.title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed flex-grow text-[15px]">
                    {translated.description}
                  </p>
                </div>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      {/* Manufacturing Practices */}
      <section className="py-16 md:py-24 bg-[#111111] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-[#F05A22]"></div>
                <span className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase">
                  {content.sustainability.manufacturingTitle}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white mb-6 leading-tight tracking-tight">
                {content.sustainability.manufacturingTitle}
              </h2>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed font-light">
                {content.sustainability.manufacturingDescription}
              </p>

              <div className="space-y-8">
                {GREEN_PRACTICES.map((practice: (typeof GREEN_PRACTICES)[number], index: number) => {
                  const translated = content.sustainability.practices[index] || practice;
                  return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                      <practice.icon className="w-5 h-5 text-[#F05A22]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[19px] font-bold text-white mb-2 tracking-wide">{translated.title}</h4>
                      <p className="text-gray-400 leading-relaxed font-light text-[15px]">{translated.description}</p>
                    </div>
                  </div>
                )})}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <div className="relative aspect-square md:aspect-[4/3] rounded-none overflow-hidden shadow-2xl border border-gray-800">
                <img 
                  src="/images/factory/制袋车间/10008.png" 
                  alt={localizedFactoryAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-6 tracking-tight">
            {content.sustainability.ctaTitle}
          </h2>
          <p className="text-lg text-gray-500 mb-10 font-light leading-relaxed">
            {content.sustainability.ctaDescription}
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-10 py-4 bg-[#1A1A1A] text-white rounded-none font-bold text-[14px] uppercase tracking-wider hover:bg-[#F05A22] transition-colors duration-300"
          >
            {content.sustainability.ctaButton}
          </Link>
        </div>
      </section>

    </div>
  );
}
