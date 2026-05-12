"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Microscope, FileText, CheckCircle2, ArrowRight, Activity, Thermometer, Droplets, Ruler, Palette, PackageX, Target } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteContent } from "@/i18n/siteContent";

const CERTIFICATIONS = [
  {
    title: "Food Safety & Quality",
    description: "Our certifications include BRC Packaging and GMP for food-safe manufacturing, maintaining a Grade A standard to ensure the highest product safety.",
    image: "/images/factory/制袋车间/100011 (3).png", // Authentic workshop image
    tags: ["BRCGS Grade A", "GMP", "ISO 9001:2015"]
  },
  {
    title: "Global Compliance",
    description: "All our food-contact materials comply strictly with global regulatory requirements, ensuring uninterrupted access to international markets.",
    image: "/images/factory/印刷车间/10004.png", // Authentic workshop image
    tags: ["FDA (21 CFR)", "EU 10/2011", "Sedex"]
  },
  {
    title: "Sustainability Certifications",
    description: "We hold ISO 14064 for carbon management, along with GRS and ISCC to verify the traceable use of recycled and sustainable materials.",
    image: "/images/factory/制袋车间/10008.png", // Authentic workshop image
    tags: ["ISO 14064", "GRS", "ISCC"]
  }
];

const LAB_TESTS = [
  {
    id: "dimension",
    title: "Dimension Control",
    description: "Accurate dimensions ensure stable pouch performance on filling lines. We control width, height, and gusset tolerances with in-line monitoring.",
    icon: Ruler,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    id: "printing",
    title: "Printing Safety",
    description: "We use food-contact-safe inks and strict color control, with adhesion and visual checks to maintain regulatory compliance.",
    icon: Palette,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    id: "bonding",
    title: "Bonding Strength",
    description: "Strong interlayer bonding prevents delamination. Each laminate structure undergoes standardized adhesion testing for durability.",
    icon: Target,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    id: "sealing",
    title: "Sealing Strength",
    description: "We perform tensile and heat-seal tests on all seal areas (including zippers/spouts) to validate airtight performance.",
    icon: ShieldCheck,
    color: "text-[#F05A22]",
    bg: "bg-[#F05A22]/10",
  },
  {
    id: "leakage",
    title: "Leakage & Drop Tests",
    description: "Through vacuum, burst, and drop tests, we ensure that pouches maintain full integrity during transport and handling under pressure.",
    icon: PackageX,
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },
  {
    id: "barrier",
    title: "Barrier Testing (OTR/WVTR)",
    description: "Oxygen and Water Vapor Transmission Rate testing to guarantee shelf-life preservation for sensitive products.",
    icon: Activity,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
];

const imageAltText = {
  en: {
    cleanroom: "Cleanroom Manufacturing",
    inspection: "Quality Inspection",
  },
  es: {
    cleanroom: "Fabricacion en sala limpia",
    inspection: "Inspeccion de calidad",
  },
  ar: {
    cleanroom: "التصنيع في الغرفة النظيفة",
    inspection: "فحص الجودة",
  },
} as const;

export default function PackagingSafetyPage({ setting }: { setting?: any }) {
  const { locale } = useLanguage();
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const localizedImageAlt = imageAltText[locale as keyof typeof imageAltText] || imageAltText.en;
  const heroImage = setting?.safetyHeroImage?.trim() || '/images/factory/制袋车间/10002.png';

  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero Banner */}
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#111111] flex flex-col items-center justify-center overflow-hidden min-h-[350px] md:min-h-[450px]">
        {/* Background Image / Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity grayscale"
          style={{ backgroundImage: `url('${encodeURI(heroImage)}')` }}
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
              {content.packagingSafety.breadcrumb}
            </span>
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white mb-6 tracking-tight uppercase leading-tight"
          >
            {content.packagingSafety.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {content.packagingSafety.heroDescription}
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gray-50 -skew-x-12 -translate-x-1/2 hidden lg:block"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[2px] bg-[#F05A22]"></div>
                <span className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase">
                  {content.packagingSafety.commitmentTag}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-6 leading-tight tracking-tight">
                {content.packagingSafety.introTitle}
              </h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed font-light">
                {content.packagingSafety.introDescription}
              </p>
              <ul className="space-y-4 mb-8">
                {content.packagingSafety.bullets.map((item: string, i: number) => (
                  <li key={i} className="flex items-center text-gray-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#F05A22] mr-3 shrink-0" strokeWidth={1.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4 md:space-y-6 translate-y-8">
                  <div className="aspect-[4/5] rounded-none overflow-hidden border border-gray-200 bg-gray-100">
                     <img src="/images/factory/制袋车间/10001.png" alt={localizedImageAlt.cleanroom} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <div className="aspect-[4/5] rounded-none overflow-hidden border border-gray-200 bg-gray-100">
                     <img src="/images/factory/印刷车间/10002.png" alt={localizedImageAlt.inspection} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications & Compliance */}
      <section className="py-16 md:py-24 bg-[#111111] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white mb-6 tracking-tight">
              {content.packagingSafety.complianceTitle}
            </h2>
            <p className="text-lg text-gray-400 font-light leading-relaxed">
              {content.packagingSafety.complianceDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert: (typeof CERTIFICATIONS)[number], index: number) => {
              const translated = content.packagingSafety.certifications[index] || cert;
              return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-transparent rounded-none overflow-hidden border border-white/10 hover:border-[#F05A22]/50 transition-colors group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={cert.image} alt={translated.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {translated.tags.map((tag: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-white/5 text-gray-300 text-xs font-bold uppercase tracking-wider rounded-none border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-[19px] font-bold text-white mb-4 flex items-center gap-3 tracking-wide">
                    <FileText className="w-5 h-5 text-[#F05A22]" strokeWidth={1.5} />
                    {translated.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed font-light text-[15px]">
                    {translated.description}
                  </p>
                </div>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      {/* In-House Laboratory */}
      <section className="py-16 md:py-24 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1A1A1A] rounded-none mb-6 text-[#F05A22]">
              <Microscope className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-6 tracking-tight">
              {content.packagingSafety.labTitle}
            </h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              {content.packagingSafety.labDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LAB_TESTS.map((test: (typeof LAB_TESTS)[number], index: number) => {
              const translated = content.packagingSafety.tests[index] || test;
              return (
              <motion.div 
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-none border border-gray-200 hover:border-[#F05A22] transition-colors duration-300 group flex flex-col h-full"
              >
                <div className={clsx("w-12 h-12 rounded-none flex items-center justify-center mb-6 shrink-0 bg-[#111111] text-white group-hover:bg-[#F05A22] transition-colors duration-300")}>
                  <test.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-[19px] font-bold text-[#1A1A1A] mb-3 tracking-wide">{translated.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed text-[15px] flex-grow">
                  {translated.description}
                </p>
              </motion.div>
            )})}
          </div>

          <div className="mt-20 text-center">
             <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#1A1A1A] text-white rounded-none font-bold text-[14px] uppercase tracking-wider hover:bg-[#F05A22] transition-colors duration-300 group"
              >
                {content.packagingSafety.requestReports}
                <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
