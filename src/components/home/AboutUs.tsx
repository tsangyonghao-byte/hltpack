"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  const { locale } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const textMap = {
    en: {
      eyebrow: "About HLT Packaging",
      title1: "Pioneering",
      accent: "Flexible",
      title2: "Packaging Since 2001",
      story1:
        "Established in 2001 and located in Shenzhen, China, HAILITONG Packaging has evolved into a global leader in flexible packaging manufacturing. We specialize in engineering premium, sustainable, and high-barrier pouch solutions.",
      story2:
        "Equipped with world-class multi-color rotogravure presses, solventless laminators, and advanced pouch-making lines, we deliver uncompromising quality to brands worldwide. Our mission is simple: ",
      mission: "\"Premium Quality, Customer First\".",
      cta: "Discover Our Story",
      imageAlt: "HLT Packaging Facility",
      stats: [
        ["Years of Experience", "Over three decades of expertise in designing and manufacturing premium packaging."],
        ["Advanced Equipments", "State-of-the-art rotogravure printing, lamination, and pouch making lines."],
        ["Square Meters", "Modernized manufacturing facility with rigorous quality control systems."],
        ["Global Delivery", "Trusted by clients across the US, EU, Japan, and Southeast Asia."],
      ],
    },
    es: {
      eyebrow: "Sobre HLT Packaging",
      title1: "Pioneros en",
      accent: "empaque",
      title2: "flexible desde 2001",
      story1:
        "Fundada en 2001 en Shenzhen, China, HAILITONG Packaging se ha convertido en un referente global en la fabricacion de empaques flexibles. Nos especializamos en soluciones premium, sostenibles y de alta barrera.",
      story2:
        "Con prensas de huecograbado multicolor, laminadoras sin solventes y lineas avanzadas de fabricacion de bolsas, ofrecemos calidad sin concesiones a marcas de todo el mundo. Nuestra mision es simple: ",
      mission: "\"Calidad premium, cliente primero\".",
      cta: "Descubrir nuestra historia",
      imageAlt: "Instalaciones de HLT Packaging",
      stats: [
        ["Años de experiencia", "Mas de tres decadas de experiencia en diseño y fabricacion de empaques premium."],
        ["Equipos avanzados", "Lineas de impresion en huecograbado, laminacion y fabricacion de bolsas de ultima generacion."],
        ["Metros cuadrados", "Planta moderna de produccion con sistemas rigurosos de control de calidad."],
        ["Entrega global", "La confianza de clientes en EE. UU., la UE, Japon y el Sudeste Asiatico."],
      ],
    },
    ar: {
      eyebrow: "عن HLT Packaging",
      title1: "رواد في",
      accent: "التغليف",
      title2: "المرن منذ 2001",
      story1:
        "تأسست HAILITONG Packaging عام 2001 في شنتشن بالصين، وتطورت لتصبح شركة رائدة عالميا في تصنيع التغليف المرن. نحن متخصصون في الحلول عالية الجودة والمستدامة وذات الحواجز العالية.",
      story2:
        "بفضل مطابع الروتوغرافور متعددة الالوان، وآلات الترقق بدون مذيبات، وخطوط تصنيع الاكياس المتقدمة، نقدم جودة ثابتة لعلامات تجارية حول العالم. مهمتنا بسيطة: ",
      mission: "\"جودة ممتازة، والعميل اولا\".",
      cta: "اكتشف قصتنا",
      imageAlt: "منشأة HLT Packaging",
      stats: [
        ["سنوات الخبرة", "اكثر من ثلاثة عقود من الخبرة في تصميم وتصنيع حلول التغليف عالية الجودة."],
        ["معدات متقدمة", "خطوط متطورة للطباعة واللصق وتصنيع الاكياس."],
        ["امتار مربعة", "منشأة انتاج حديثة مزودة بانظمة صارمة لمراقبة الجودة."],
        ["تسليم عالمي", "موثوق من قبل عملاء في الولايات المتحدة والاتحاد الاوروبي واليابان وجنوب شرق اسيا."],
      ],
    },
  } as const;
  const text = textMap[locale as keyof typeof textMap] || textMap.en;

  const stats = [
    {
      id: 1,
      value: 31,
      suffix: "+",
      label: text.stats[0][0],
      description: text.stats[0][1],
    },
    {
      id: 2,
      value: 100,
      suffix: "+",
      label: text.stats[1][0],
      description: text.stats[1][1],
    },
    {
      id: 3,
      value: 30,
      suffix: "K+",
      label: text.stats[2][0],
      description: text.stats[2][1],
    },
    {
      id: 4,
      value: 100,
      suffix: "%",
      label: text.stats[3][0],
      description: text.stats[3][1],
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
          alt={text.imageAlt}
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
                {text.eyebrow}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white leading-[1.1] tracking-tight mb-8">
              {text.title1} <span className="text-[#F05A22]">{text.accent}</span><br />
              {text.title2}
            </h2>

            <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light mb-10 max-w-xl">
              <p>
                {text.story1}
              </p>
              <p>
                {text.story2}<strong className="text-white font-medium">{text.mission}</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#F05A22] text-white font-bold text-sm tracking-wide hover:bg-white hover:text-[#111111] transition-colors duration-300 rounded-full"
              >
                {text.cta}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
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
                    <CountUp end={stat.value} duration={8} separator="," />
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
