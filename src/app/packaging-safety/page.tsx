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
    image: "https://www.logospack.com.hk/cache/img/cf1f784f1e2d0010ea43d775a6884a3a190f292bbf73.jpg", // Using factory as placeholder
    tags: ["BRCGS Grade A", "GMP", "ISO 9001:2015"]
  },
  {
    title: "Global Compliance",
    description: "All our food-contact materials comply strictly with global regulatory requirements, ensuring uninterrupted access to international markets.",
    image: "https://www.logospack.com.hk/cache/img/596de946fdb47fa3480f1a1bc5d5dfab839845a8fbb1.png", // Roll stock film placeholder
    tags: ["FDA (21 CFR)", "EU 10/2011", "Sedex"]
  },
  {
    title: "Sustainability Certifications",
    description: "We hold ISO 14064 for carbon management, along with GRS and ISCC to verify the traceable use of recycled and sustainable materials.",
    image: "https://www.logospack.com.hk/cache/img/03b562fb9ec251c3164c6e1171c0273ae7fb098bccd4.png", // Food pouch placeholder
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

export default function PackagingSafetyPage() {
  const { locale } = useLanguage();
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero Banner */}
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#1E293B] flex flex-col items-center justify-center overflow-hidden min-h-[350px] md:min-h-[450px]">
        {/* Background Image / Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://www.logospack.com.hk/cache/img/cf1f784f1e2d0010ea43d775a6884a3a190f292bbf73.jpg')" }}
        ></div>
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-[#1E293B]/80"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center flex-grow">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight uppercase leading-tight"
          >
            {content.packagingSafety.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light"
          >
            {content.packagingSafety.heroDescription}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider"
          >
            <Link href="/" className="hover:text-white transition-colors">{content.footer.home}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#F05A22]">{content.packagingSafety.breadcrumb}</span>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-sm font-bold uppercase tracking-widest mb-6 text-blue-600">
                <ShieldCheck className="w-4 h-4" />
                {content.packagingSafety.commitmentTag}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E293B] mb-6 leading-tight">
                {content.packagingSafety.introTitle}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {content.packagingSafety.introDescription}
              </p>
              <ul className="space-y-4 mb-8">
                {content.packagingSafety.bullets.map((item: string, i: number) => (
                  <li key={i} className="flex items-center text-gray-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 shrink-0" />
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
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl bg-gray-100">
                     <img src="https://www.logospack.com.hk/cache/img/596de946fdb47fa3480f1a1bc5d5dfab839845a8fbb1.png" alt="Cleanroom" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl bg-gray-100">
                     <img src="https://www.logospack.com.hk/cache/img/cf1f784f1e2d0010ea43d775a6884a3a190f292bbf73.jpg" alt="Quality Inspection" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications & Compliance */}
      <section className="py-16 md:py-24 bg-[#1E293B] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              {content.packagingSafety.complianceTitle}
            </h2>
            <p className="text-lg text-gray-400">
              {content.packagingSafety.complianceDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CERTIFICATIONS.map((cert: (typeof CERTIFICATIONS)[number], index: number) => {
              const translated = content.packagingSafety.certifications[index] || cert;
              return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#0F172A] rounded-3xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-colors group"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {translated.tags.map((tag: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    {translated.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {translated.description}
                  </p>
                </div>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      {/* In-House Laboratory */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6 text-[#F05A22]">
              <Microscope className="w-10 h-10" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E293B] mb-6">
              {content.packagingSafety.labTitle}
            </h2>
            <p className="text-lg text-gray-600">
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
                className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-2 transition-transform duration-300 border border-gray-100 flex flex-col h-full"
              >
                <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shrink-0", test.bg, test.color)}>
                  <test.icon className="w-7 h-7" />
                </div>
                <h3 className="text-[19px] font-bold text-[#1E293B] mb-3">{translated.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                  {translated.description}
                </p>
              </motion.div>
            )})}
          </div>

          <div className="mt-16 text-center">
             <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#F05A22] text-white rounded-full font-bold text-[15px] uppercase tracking-wider hover:bg-[#D44A18] hover:shadow-[0_10px_20px_rgba(240,90,34,0.3)] hover:-translate-y-1 transition-all duration-300"
              >
                {content.packagingSafety.requestReports}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
