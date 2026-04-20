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
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#1E293B] flex flex-col items-center justify-center overflow-hidden min-h-[350px] md:min-h-[450px]">
        {/* Background Image / Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://www.logospack.com.hk/cache/img/cf1f784f1e2d0010ea43d775a6884a3a190f292bbf73.jpg')" }} // Factory/Process placeholder
        ></div>
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-[#1E293B]/80"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center flex-grow">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight uppercase leading-tight"
          >
            {content.howWeWork.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light"
          >
            {content.howWeWork.heroDescription}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider"
          >
            <Link href="/" className="hover:text-white transition-colors">{content.footer.home}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#F05A22]">{content.howWeWork.breadcrumb}</span>
          </motion.div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-6 leading-tight">
            {content.howWeWork.introTitle}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            {content.howWeWork.introDescription}
          </p>
        </div>
      </section>

      {/* Process Steps (Vertical Timeline) */}
      <section className="py-16 md:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:-translate-x-1/2"></div>

          <div className="space-y-12 md:space-y-24">
            {processSteps.map((step: { id: string; title: string; description: string; icon: any; color: string; borderColor: string; shadow: string }, index: number) => {
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
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-20 h-20 rounded-full bg-white border-[6px] border-gray-50 shadow-md z-10 transition-transform duration-500 group-hover:scale-110 group-hover:border-white">
                    <div className={clsx("w-full h-full rounded-full flex items-center justify-center", step.color)}>
                      <step.icon className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className={clsx(
                    "w-full md:w-1/2 pl-28 md:pl-0 pt-2 md:pt-0",
                    isEven ? "md:pr-20 lg:pr-28 text-left md:text-right" : "md:pl-20 lg:pl-28 text-left"
                  )}>
                    <div className={clsx(
                      "bg-white p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border relative overflow-hidden",
                      step.borderColor,
                      `hover:${step.shadow}`
                    )}>
                      {/* Decorative Background Number */}
                      <div className={clsx(
                        "absolute text-9xl font-black opacity-[0.03] select-none -translate-y-1/2 top-1/2",
                        isEven ? "-left-4" : "-right-4"
                      )}>
                        {index + 1}
                      </div>

                      <h3 className="text-2xl font-bold text-[#1E293B] mb-4 relative z-10">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed relative z-10">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why This Process Works (Features) */}
      <section className="py-16 md:py-24 bg-[#1E293B] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              {content.howWeWork.commitmentTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {content.howWeWork.commitments.map((feature: { title: string; desc: string }, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#0F172A] p-8 rounded-3xl border border-gray-800"
              >
                <div className="w-12 h-12 bg-[#F05A22]/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 text-[#F05A22]" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-6">
            {content.howWeWork.ctaTitle}
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            {content.howWeWork.ctaDescription}
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-10 py-5 bg-[#F05A22] text-white rounded-full font-extrabold text-[16px] uppercase tracking-wider hover:bg-[#D44A18] shadow-[0_10px_30px_rgba(240,90,34,0.2)] hover:-translate-y-1 transition-all duration-300"
          >
            {content.howWeWork.ctaButton}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

    </div>
  );
}
