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
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#1E293B] flex flex-col items-center justify-center overflow-hidden min-h-[350px] md:min-h-[450px]">
        {/* Background Image / Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://www.logospack.com.hk/cache/img/596de946fdb47fa3480f1a1bc5d5dfab839845a8fbb1.png')" }}
        ></div>
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-[#1E293B]/80"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center flex-grow">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight uppercase leading-tight"
          >
            {content.about.heroTitle.replace(content.about.heroAccent, "")}
            <span className="text-[#F05A22]">{content.about.heroAccent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light"
          >
            {content.about.heroDescription}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider"
          >
            <Link href="/" className="hover:text-white transition-colors">{content.footer.home}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#F05A22]">{content.about.breadcrumb}</span>
          </motion.div>
        </div>
      </section>

      {/* About Company Intro */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://www.logospack.com.hk/cache/img/03b562fb9ec251c3164c6e1171c0273ae7fb098bccd4.png" 
                  alt="HAILITONG Packaging Solutions" 
                  className="w-full h-full object-cover bg-gray-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F05A22] rounded-full mb-4">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{content.about.imageTitle}</h3>
                </div>
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 bg-white p-6 md:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#1E293B] rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-[#F05A22]" />
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-[#1E293B]">BRC & ISO</div>
                    <div className="text-gray-500 font-medium">{content.about.certLabel}</div>
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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F05A22]/10 text-sm font-bold uppercase tracking-widest mb-6 text-[#F05A22]">
                <span className="w-2 h-2 rounded-full bg-[#F05A22]"></span>
                {content.about.storyTag}
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E293B] mb-6 leading-tight">
                {content.about.storyTitle.split("Our Future")[0]}
                <span className="text-[#F05A22]">Our Future</span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {content.about.storyBody1}
              </p>
              
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                {content.about.storyBody2}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/products" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#1E293B] text-white rounded-full font-bold text-[15px] uppercase tracking-wider hover:bg-[#F05A22] hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  {content.about.exploreProducts}
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1E293B] border-2 border-gray-200 rounded-full font-bold text-[15px] uppercase tracking-wider hover:border-[#1E293B] hover:bg-gray-50 transition-all duration-300 group"
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
      <section className="py-16 bg-[#1E293B] border-y border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat: { value: number; suffix: string; label: string; icon: any }, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-[#F05A22] mb-6 group-hover:bg-[#F05A22] group-hover:text-white transition-colors duration-300">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E293B] mb-6">
              {content.about.valuesTitle}
            </h2>
            <p className="text-lg text-gray-600">
              {content.about.valuesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value: { id: string; title: string; description: string; icon: any; color: string; bg: string }, index: number) => (
              <motion.div 
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", value.bg, value.color)}>
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E293B] mb-6">
              {content.about.milestonesTitle}
            </h2>
          </div>

          <div className="relative">
            {/* Center Line for Desktop, Left Line for Mobile */}
            <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#F05A22]/20"></div>

            <div className="space-y-8 md:space-y-12">
              {content.about.milestones.map((milestone: { year: string; title: string; description: string }, index: number) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className={clsx(
                      "relative flex flex-col md:flex-row items-start md:items-center",
                      isEven ? "md:flex-row-reverse" : ""
                    )}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-[13px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-[#F05A22] border-[3px] border-white shadow-md z-10"></div>

                    {/* Content Box */}
                    <div className={clsx(
                      "w-full md:w-1/2 pl-12 md:pl-0 pt-[-4px] md:pt-0",
                      isEven ? "md:pr-16 text-left md:text-right" : "md:pl-16 text-left"
                    )}>
                      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 group hover:border-[#F05A22]/30 hover:shadow-lg transition-all">
                        <div className="text-3xl md:text-4xl font-black text-[#1E293B]/10 mb-2 group-hover:text-[#F05A22]/20 transition-colors">
                          {milestone.year}
                        </div>
                        <h3 className="text-[18px] md:text-xl font-bold text-[#1E293B] mb-2 md:mb-3">{milestone.title}</h3>
                        <p className="text-[14px] md:text-base text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
