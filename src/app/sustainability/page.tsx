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
    image: "https://www.logospack.com.hk/cache/img/88c2f8ae74bd774aacc80bdb24f848fe4ea1c7a533ae.png", // Stand-up pouch placeholder
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    tag: "Circular Economy"
  },
  {
    title: "Post-Consumer Recycled (PCR)",
    description: "We incorporate up to 30% PCR plastics into non-food contact layers, significantly reducing the reliance on virgin fossil-based resins.",
    icon: Droplet,
    image: "https://www.logospack.com.hk/cache/img/596de946fdb47fa3480f1a1bc5d5dfab839845a8fbb1.png", // Roll stock placeholder
    color: "text-blue-500",
    bg: "bg-blue-50",
    tag: "Resource Reduction"
  },
  {
    title: "Compostable Packaging",
    description: "Certified biodegradable films that break down into organic matter, perfect for dry foods, snacks, and eco-conscious brands.",
    icon: Leaf,
    image: "https://www.logospack.com.hk/cache/img/9e55548254d2eb11f093cf288503222666a8561fbcb7.png", // Coffee pouch placeholder
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

export default function SustainabilityPage() {
  const { locale } = useLanguage();
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero Banner */}
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden min-h-[350px] md:min-h-[450px]">
        {/* Background Image / Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2574&auto=format&fit=crop')" }} // Nature/Leaf background
        ></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-emerald-900/30"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center flex-grow">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mb-6 backdrop-blur-sm border border-emerald-500/30">
            <Leaf className="w-8 h-8" />
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight uppercase leading-tight"
          >
            {content.sustainability.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light"
          >
            {content.sustainability.heroDescription}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider"
          >
            <Link href="/" className="hover:text-white transition-colors">{content.footer.home}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-emerald-400">{content.sustainability.breadcrumb}</span>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-6 leading-tight">
            {content.sustainability.introTitle}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            {content.sustainability.introDescription}
          </p>
        </div>
      </section>

      {/* Eco Solutions Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-sm font-bold uppercase tracking-widest mb-6 text-emerald-600 border border-emerald-100">
              <Recycle className="w-4 h-4" />
              {content.sustainability.portfolioTag}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E293B]">
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
                className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)] transition-all duration-500 border border-gray-100 group flex flex-col"
              >
                {/* Image Header */}
                <div className="relative h-64 bg-gray-50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                  <img 
                    src={solution.image} 
                    alt={solution.title} 
                    className="w-full h-full object-cover mix-blend-multiply transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="px-4 py-1.5 bg-white text-gray-900 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                      {translated.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shrink-0", solution.bg, solution.color)}>
                    <solution.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1E293B] mb-4">{translated.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">
                    {translated.description}
                  </p>
                </div>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      {/* Manufacturing Practices */}
      <section className="py-16 md:py-24 bg-[#0F172A] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600 rounded-full blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] opacity-10 translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                {content.sustainability.manufacturingTitle}
              </h2>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                {content.sustainability.manufacturingDescription}
              </p>

              <div className="space-y-8">
                {GREEN_PRACTICES.map((practice: (typeof GREEN_PRACTICES)[number], index: number) => {
                  const translated = content.sustainability.practices[index] || practice;
                  return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                      <practice.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{translated.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{translated.description}</p>
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
              <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
                <img 
                  src="https://www.logospack.com.hk/cache/img/cf1f784f1e2d0010ea43d775a6884a3a190f292bbf73.jpg" 
                  alt="Sustainable Factory" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-emerald-900/20 mix-blend-multiply"></div>
                
                {/* Overlay Badge */}
                <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl max-w-xs">
                  <div className="text-3xl font-extrabold text-white mb-1">25%</div>
                  <div className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2">{content.sustainability.carbonReduction}</div>
                  <p className="text-gray-300 text-sm">{content.sustainability.carbonDescription}</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-6">
            {content.sustainability.ctaTitle}
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            {content.sustainability.ctaDescription}
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-10 py-5 bg-emerald-600 text-white rounded-full font-extrabold text-[16px] uppercase tracking-wider hover:bg-emerald-700 shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:-translate-y-1 transition-all duration-300"
          >
            {content.sustainability.ctaButton}
          </Link>
        </div>
      </section>

    </div>
  );
}
