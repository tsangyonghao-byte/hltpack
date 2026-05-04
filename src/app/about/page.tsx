"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Target, ShieldCheck, Leaf, Users, ArrowRight, Award, Globe, Building2 } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteContent } from "@/i18n/siteContent";

function AnimatedCounter({ value, suffix = "" }: { value: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 80,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(latest));
      }
    });
  }, [springValue]);

  return (
    <span className="inline-flex items-baseline">
      <span ref={ref}>0</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

export default function AboutPage() {
  const { locale } = useLanguage();
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const stats = content.about.stats.map((item: { value: number; suffix: string; label: string }, index: number) => ({
    ...item,
    icon: [Building2, Globe, ShieldCheck, Users][index],
  }));
  const values = content.about.values.map((value: { id: string; title: string; description: string }, index: number) => ({
    ...value,
    icon: [Users, Target, Globe, ShieldCheck][index],
    color: ["text-blue-500", "text-[#F05A22]", "text-emerald-500", "text-purple-500"][index],
    bg: ["bg-blue-50", "bg-[#F05A22]/10", "bg-emerald-50", "bg-purple-50"][index],
  }));
  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero Banner */}
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#111111] flex flex-col items-center justify-center overflow-hidden min-h-[350px] md:minh-[450px]">
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
              {content.about.breadcrumb}
            </span>
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white mb-6 tracking-tight leading-tight"
          >
            {content.about.heroTitle.replace(content.about.heroAccent, "")}
            <span className="text-[#F05A22]">{content.about.heroAccent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {content.about.heroDescription}
          </motion.p>
        </div>
      </section>

      {/* About Company Intro */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Image Side - Premium Mosaic */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 relative h-[500px] md:h-[600px]"
            >
              {/* Main Image */}
              <div className="absolute top-0 left-0 w-[80%] h-[75%] rounded-none overflow-hidden border border-gray-200 shadow-lg z-10">
                <img 
                  src="/images/factory/制袋车间/10001.png" 
                  alt="HAILITONG Packaging Solutions" 
                  className="w-full h-full object-cover bg-gray-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-[#F05A22] rounded-none mb-3">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide">{content.about.imageTitle}</h3>
                </div>
              </div>

              {/* Secondary Image - Bottom Right Overlap */}
              <div className="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-none overflow-hidden border-4 border-white shadow-xl z-20">
                <img 
                  src="/images/factory/印刷车间/10101 (1).png" 
                  alt="Factory Workshop" 
                  className="w-full h-full object-cover bg-gray-50"
                />
              </div>

              {/* Floating Stat Card */}
              <div className="absolute top-8 -right-4 md:-right-8 bg-white p-5 md:p-6 rounded-none shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-gray-200 hidden sm:block z-30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#111111] rounded-none flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-[#F05A22]" />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-[#1A1A1A] tracking-tight">BRC & ISO</div>
                    <div className="text-gray-500 font-medium text-xs tracking-wide uppercase mt-1">{content.about.certLabel}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[2px] bg-[#F05A22]"></div>
                <span className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase">
                  {content.about.storyTag}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-8 leading-tight tracking-tight">
                {content.about.storyTitle.split("Our Future")[0]}
                <span className="text-[#F05A22]">Our Future</span>
              </h2>
              
              <div className="space-y-6 text-gray-500 text-lg leading-relaxed font-light mb-10">
                <p>
                  {content.about.storyBody1}
                </p>
                <p>
                  {content.about.storyBody2}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="/products" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#1A1A1A] text-white rounded-none font-bold text-[14px] uppercase tracking-wider hover:bg-[#F05A22] transition-colors duration-300"
                >
                  {content.about.exploreProducts}
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-[#1A1A1A] border border-gray-300 rounded-none font-bold text-[14px] uppercase tracking-wider hover:border-[#1A1A1A] hover:bg-gray-50 transition-colors duration-300 group"
                >
                  {content.about.getInTouch}
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat: { value: number; suffix: string; label: string; icon: any }, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group border border-white/10 p-8 hover:border-white/20 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-transparent mb-6 text-[#F05A22]">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white mb-2 tracking-tight">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm md:text-base text-gray-500 font-medium uppercase tracking-wider group-hover:text-gray-400 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#F05A22]"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                Guiding Principles
              </span>
              <div className="w-8 h-[1px] bg-[#F05A22]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-6 tracking-tight">
              {content.about.valuesTitle}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              {content.about.valuesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value: { id: string; title: string; description: string; icon: any }, index: number) => (
              <motion.div 
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-none border border-gray-200 hover:border-[#F05A22] transition-colors duration-300 group"
              >
                <div className="w-12 h-12 flex items-center justify-start mb-6 text-[#1A1A1A] group-hover:text-[#F05A22] transition-colors">
                  <value.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4 tracking-wide">{value.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light text-[15px]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Manufacturing Capabilities */}
      <section className="py-16 md:py-24 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#F05A22]"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                Our Capabilities
              </span>
              <div className="w-8 h-[1px] bg-[#F05A22]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-6 tracking-tight">
              Advanced Manufacturing Facilities
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Equipped with 113 sets of state-of-the-art machinery across 5 major workshops: Printing, Lamination, Slitting, Bag Making, and Spout Sealing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Item 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative aspect-[4/3] overflow-hidden bg-gray-100 border border-gray-200 shadow-sm"
            >
              <img src="/images/factory/印刷车间/10002.png" alt="High-Speed Printing Workshop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide uppercase">High-Speed Printing</h3>
                <div className="h-[2px] w-12 bg-[#F05A22] mb-3 transition-all duration-300 group-hover:w-20"></div>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Precision rotogravure printing for vibrant, consistent colors and sharp graphics.</p>
              </div>
            </motion.div>

            {/* Item 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative aspect-[4/3] overflow-hidden bg-gray-100 border border-gray-200 shadow-sm"
            >
              <img src="/images/factory/制袋车间/10006.png" alt="Pouch Converting Workshop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide uppercase">Pouch Converting</h3>
                <div className="h-[2px] w-12 bg-[#F05A22] mb-3 transition-all duration-300 group-hover:w-20"></div>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Automated lines for stand-up, flat-bottom, spout pouches, and custom shaped formats.</p>
              </div>
            </motion.div>

            {/* Item 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative aspect-[4/3] overflow-hidden bg-gray-100 border border-gray-200 shadow-sm"
            >
              <img src="/images/factory/印刷车间/10101 (2).png" alt="Strict Quality Control" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide uppercase">Quality Control</h3>
                <div className="h-[2px] w-12 bg-[#F05A22] mb-3 transition-all duration-300 group-hover:w-20"></div>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Rigorous inspection and testing to ensure 100% compliance with international standards.</p>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/factory" 
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-gray-300 text-gray-800 font-bold text-sm tracking-wide hover:bg-[#F05A22] hover:text-white hover:border-[#F05A22] transition-all duration-300 rounded-none group"
            >
              View Full Factory Tour
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
