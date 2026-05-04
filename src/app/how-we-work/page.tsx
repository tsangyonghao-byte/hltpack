"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Search, FileSignature, Palette, Cog, TestTube, Truck, CheckCircle2, ArrowRight, Printer, Layers, Scissors, PackageCheck, Zap } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteContent } from "@/i18n/siteContent";

export default function HowWeWorkPage() {
  const { locale } = useLanguage();
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const processSteps = content.howWeWork.steps.map((step: { id: string; title: string; description: string }, index: number) => ({
    ...step,
    icon: [Palette, Cog, Printer, Layers, Zap, Scissors, PackageCheck][index],
    color: ["bg-blue-50 text-blue-600", "bg-indigo-50 text-indigo-600", "bg-purple-50 text-purple-600", "bg-pink-50 text-pink-600", "bg-[#F05A22]/10 text-[#F05A22]", "bg-emerald-50 text-emerald-600", "bg-cyan-50 text-cyan-600"][index],
    borderColor: ["border-blue-200", "border-indigo-200", "border-purple-200", "border-pink-200", "border-[#F05A22]/30", "border-emerald-200", "border-cyan-200"][index],
    shadow: ["shadow-blue-100", "shadow-indigo-100", "shadow-purple-100", "shadow-pink-100", "shadow-[#F05A22]/20", "shadow-emerald-100", "shadow-cyan-100"][index],
  }));
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Page Hero Banner */}
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#111111] flex flex-col items-center justify-center overflow-hidden min-h-[350px] md:min-h-[450px]">
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
              {content.howWeWork.breadcrumb}
            </span>
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white mb-6 tracking-tight leading-tight"
          >
            {content.howWeWork.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {content.howWeWork.heroDescription}
          </motion.p>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-6 leading-tight tracking-tight">
            {content.howWeWork.introTitle}
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed font-light">
            {content.howWeWork.introDescription}
          </p>
        </div>
      </section>

      {/* Process Steps (Vertical Timeline) */}
      <section className="py-16 md:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 md:-translate-x-1/2"></div>

          <div className="space-y-16 md:space-y-32">
            {processSteps.map((step: { id: string; title: string; description: string; icon: any; image?: string }, index: number) => {
              const isEven = index % 2 === 1;
              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={clsx(
                    "relative flex flex-col md:flex-row items-start md:items-center group",
                    isEven ? "md:flex-row-reverse" : ""
                  )}
                >
                  {/* Icon Node */}
                  <div className="absolute left-[16px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-none bg-[#111111] text-white z-10 transition-colors duration-500 group-hover:bg-[#F05A22] mt-4 md:mt-0">
                    <step.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>

                  {/* Content Box */}
                  <div className={clsx(
                    "w-full md:w-1/2 pl-24 md:pl-0 pt-2 md:pt-0 flex flex-col",
                    isEven ? "md:pr-20 lg:pr-28 text-left md:text-right items-start md:items-end" : "md:pl-20 lg:pl-28 text-left items-start"
                  )}>
                    <div className={clsx(
                      "bg-white p-8 md:p-10 rounded-none border border-gray-200 shadow-sm hover:border-[#F05A22] transition-colors duration-500 relative overflow-hidden w-full"
                    )}>
                      {/* Decorative Background Number */}
                      <div className={clsx(
                        "absolute text-[120px] font-extrabold text-gray-50 opacity-50 select-none -translate-y-1/2 top-1/2",
                        isEven ? "left-0 -translate-x-4" : "right-0 translate-x-4"
                      )}>
                        0{index + 1}
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-4 relative z-10 tracking-wide">{step.title}</h3>
                      <p className="text-gray-500 font-light leading-relaxed relative z-10 text-[15px]">{step.description}</p>
                    </div>
                  </div>

                  {/* Image Box */}
                  {step.image && (
                    <div className={clsx(
                      "w-full md:w-1/2 pl-24 md:pl-0 pt-6 md:pt-0 flex",
                      isEven ? "md:pl-20 lg:pl-28 justify-start" : "md:pr-20 lg:pr-28 justify-end"
                    )}>
                      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-500 border border-gray-100">
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {/* Overlay Accent */}
                        <div className="absolute inset-0 border-[4px] border-transparent group-hover:border-[#F05A22]/20 transition-colors duration-500 pointer-events-none"></div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why This Process Works (Features) */}
      <section className="py-16 md:py-24 bg-[#111111] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold mb-6 tracking-tight">
              {content.howWeWork.commitmentTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {content.howWeWork.commitments.map((feature: { title: string; desc: string }, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-transparent p-8 rounded-none border border-white/10 hover:border-[#F05A22]/50 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-transparent border border-white/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-5 h-5 text-[#F05A22]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-wide">{feature.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed text-[15px]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-6 tracking-tight">
            {content.howWeWork.ctaTitle}
          </h2>
          <p className="text-lg text-gray-500 font-light leading-relaxed mb-10">
            {content.howWeWork.ctaDescription}
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-10 py-5 bg-[#1A1A1A] text-white rounded-none font-bold text-[15px] uppercase tracking-wider hover:bg-[#F05A22] transition-colors duration-300 group"
          >
            {content.howWeWork.ctaButton}
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
}
