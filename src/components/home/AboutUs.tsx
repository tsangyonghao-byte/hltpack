"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  const { dict } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      id: 1,
      value: 31,
      suffix: "+",
      label: "Years of Experience",
      description: "Over three decades of expertise in designing and manufacturing premium packaging.",
    },
    {
      id: 2,
      value: 100,
      suffix: "+",
      label: "Advanced Equipments",
      description: "State-of-the-art rotogravure printing, lamination, and pouch making lines.",
    },
    {
      id: 3,
      value: 30,
      suffix: "K+",
      label: "Square Meters",
      description: "Modernized manufacturing facility with rigorous quality control systems.",
    },
    {
      id: 4,
      value: 100,
      suffix: "%",
      label: "Global Delivery",
      description: "Trusted by clients across the US, EU, Japan, and Southeast Asia.",
    },
  ];

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#111111] overflow-hidden" ref={ref}>
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#111111] z-10" />
        <img
          src="https://cdn.myxypt.com/f4a05196/24/07/f361e0c436a1a8876ad142848f16194bb6e87a7f.png?x-oss-process=image/resize,m_lfit,h_800,w_800"
          alt="HLT Packaging Facility"
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity grayscale"
        />
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Text & Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[2px] bg-[#F05A22]"></div>
              <span className="text-xs font-bold tracking-[0.25em] text-white uppercase">
                About HLT Packaging
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white leading-[1.1] tracking-tight mb-8">
              Pioneering <span className="text-[#F05A22]">Flexible</span><br />
              Packaging Since 2001
            </h2>

            <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light mb-10 max-w-xl">
              <p>
                Established in 2001 and located in Shenzhen, China, HAILITONG Packaging has evolved into a global leader in flexible packaging manufacturing. We specialize in engineering premium, sustainable, and high-barrier pouch solutions.
              </p>
              <p>
                Equipped with world-class multi-color rotogravure presses, solventless laminators, and advanced pouch-making lines, we deliver uncompromising quality to brands worldwide. Our mission is simple: <strong className="text-white font-medium">"Premium Quality, Customer First"</strong>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#F05A22] text-white font-bold text-sm tracking-wide hover:bg-white hover:text-[#111111] transition-colors duration-300 rounded-full"
              >
                Discover Our Story
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              
              <button className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-sm tracking-wide hover:bg-white/10 transition-colors duration-300 rounded-full group">
                <Play className="mr-2 w-4 h-4 fill-white group-hover:text-[#F05A22] group-hover:fill-[#F05A22] transition-colors" />
                Factory Tour
              </button>
            </div>
          </motion.div>

          {/* Right Column: Hardcore Data/Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white mb-2 font-serif flex items-baseline tracking-tight">
                  {inView ? (
                    <CountUp end={stat.value} duration={2.5} separator="," />
                  ) : (
                    "0"
                  )}
                  <span className="text-[#F05A22] text-3xl md:text-4xl ml-1">{stat.suffix}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 tracking-wide">
                  {stat.label}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
