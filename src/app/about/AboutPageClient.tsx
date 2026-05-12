"use client";

import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Target, ShieldCheck, Users, ArrowRight, Globe, Building2, X } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteContent } from "@/i18n/siteContent";
import { useSystemSetting } from "@/components/layout/SystemSettingContext";
import { getTranslatedFallback } from "@/lib/localizedContent";
import VideoModal from "./VideoModal";

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
  const setting = useSystemSetting();
  const getSettingText = (zhValue: any, enValue: any, fallback: string) => {
    if (locale === "zh") return zhValue || fallback;
    return getTranslatedFallback(enValue, locale) || fallback;
  };
  const aboutUiText = locale === "ar"
    ? {
        introHighlights: [
          {
            title: "مركز تصدير في شنتشن",
            description: "موقعنا القريب من هونغ كونغ يساعدنا على دعم الشحن العالمي السريع والتنسيق المرن للمشاريع.",
          },
          {
            title: "معتمد وفق BRC و ISO",
            description: "تعتمد منظومة المصنع على رقابة جودة مستقرة وانضباط انتاج غذائي وتسليم موثوق.",
          },
        ],
        gallery: ["ورشة الطباعة", "ورشة تصنيع الاكياس", "خط الانتاج"],
        locations: ["المقر والمصنع في شنتشن", "مكتب نيويورك", "مكتب هونغ كونغ"],
        principles: "المبادئ التوجيهية",
        capabilitiesTag: "قدراتنا",
        capabilitiesTitle: "مرافق تصنيع متقدمة",
        capabilitiesDesc: "مزودون بـ 113 مجموعة من المعدات الحديثة عبر 5 ورش رئيسية: الطباعة، والتصفيح، والتقطيع، وتصنيع الاكياس، ولحام الفوهات.",
        cards: [
          ["طباعة عالية السرعة", "طباعة روتوغرافور دقيقة توفر الوانا قوية وثابتة ورسومات حادة."],
          ["تحويل الاكياس", "خطوط مؤتمتة للاكياس القائمة وذات القاع المسطح واكياس الفوهة والاشكال المخصصة."],
          ["مراقبة الجودة", "فحص واختبارات صارمة لضمان التوافق الكامل مع المعايير الدولية."],
        ],
        factoryTour: "عرض جولة المصنع الكاملة",
        presence: "حضور عالمي",
        presenceTitle: "مكاتبنا العالمية ومصنعنا",
        presenceDesc: "لدينا فروع في شنتشن ونيويورك وهونغ كونغ لنقدم حلولا عالمية مع خدمة محلية.",
      }
    : locale === "es"
      ? {
          introHighlights: [
            {
              title: "Centro de exportacion en Shenzhen",
              description: "Nuestra ubicacion junto a Hong Kong nos ayuda a coordinar proyectos con rapidez y a enviar a todo el mundo con agilidad.",
            },
            {
              title: "Certificados BRC e ISO",
              description: "Los sistemas de fabrica se apoyan en un control de calidad estable, disciplina de produccion alimentaria y entregas fiables.",
            },
          ],
          gallery: ["Taller de impresion", "Taller de fabricacion de bolsas", "Linea de produccion"],
          locations: ["Sede y fabrica de Shenzhen", "Oficina de Nueva York", "Oficina de Hong Kong"],
          principles: "Principios rectores",
          capabilitiesTag: "Nuestras capacidades",
          capabilitiesTitle: "Instalaciones avanzadas de fabricacion",
          capabilitiesDesc: "Contamos con 113 equipos de ultima generacion distribuidos en 5 talleres principales: impresion, laminacion, corte, fabricacion de bolsas y sellado de boquillas.",
          cards: [
            ["Impresion de alta velocidad", "Impresion rotograbada de precision para lograr colores intensos, uniformes y graficos nitidos."],
            ["Conversion de pouches", "Lineas automatizadas para bolsas stand-up, fondo plano, bolsas con boquilla y formatos personalizados."],
            ["Control de calidad", "Inspeccion y pruebas rigurosas para asegurar el 100% de cumplimiento con los estandares internacionales."],
          ],
          factoryTour: "Ver recorrido completo de la fabrica",
          presence: "Presencia global",
          presenceTitle: "Nuestras oficinas globales y fabrica",
          presenceDesc: "Con sedes en Shenzhen, Nueva York y Hong Kong, ofrecemos soluciones globales de empaque con servicio localizado.",
        }
      : {
          introHighlights: [
            {
              title: "Shenzhen-Based Export Hub",
              description: "Located next to Hong Kong, we support fast global shipping and responsive project coordination.",
            },
            {
              title: "BRC / ISO Certified",
              description: "Factory systems are built around stable quality control, food-grade production discipline, and reliable delivery.",
            },
          ],
          gallery: ["Printing Workshop", "Bag Making Workshop", "Production Line"],
          locations: ["Shenzhen Headquarters & Factory", "New York Office", "Hong Kong Office"],
          principles: "Guiding Principles",
          capabilitiesTag: "Our Capabilities",
          capabilitiesTitle: "Advanced Manufacturing Facilities",
          capabilitiesDesc: "Equipped with 113 sets of state-of-the-art machinery across 5 major workshops: Printing, Lamination, Slitting, Bag Making, and Spout Sealing.",
          cards: [
            ["High-Speed Printing", "Precision rotogravure printing for vibrant, consistent colors and sharp graphics."],
            ["Pouch Converting", "Automated lines for stand-up, flat-bottom, spout pouches, and custom shaped formats."],
            ["Quality Control", "Rigorous inspection and testing to ensure 100% compliance with international standards."],
          ],
          factoryTour: "View Full Factory Tour",
          presence: "Global Presence",
          presenceTitle: "Our Global Offices & Factory",
          presenceDesc: "With branches in Shenzhen, New York, and Hong Kong, we provide global packaging solutions with localized service.",
        };
  const contactAddress =
    (locale === "zh" ? setting?.contactAddressZh : getTranslatedFallback(setting?.contactAddressEn, locale)) ||
    content.contact?.address || 
    getTranslatedFallback("No.51, Lan'er Road, Longxin Community, Baolong Street, Longgang District, Shenzhen, China", locale);
  const storyTag = getSettingText(setting?.aboutStoryTagZh, setting?.aboutStoryTagEn, content.about.storyTag);
  const storyTitle = getSettingText(setting?.aboutStoryTitleZh, setting?.aboutStoryTitleEn, content.about.storyTitle);
  const storyBody1 = getSettingText(setting?.aboutStoryBody1Zh, setting?.aboutStoryBody1En, content.about.storyBody1);
  const storyBody2 = getSettingText(setting?.aboutStoryBody2Zh, setting?.aboutStoryBody2En, content.about.storyBody2);
  const storyPrimaryCta = getSettingText(setting?.aboutStoryPrimaryCtaZh, setting?.aboutStoryPrimaryCtaEn, content.about.exploreProducts);
  const storySecondaryCta = getSettingText(setting?.aboutStorySecondaryCtaZh, setting?.aboutStorySecondaryCtaEn, content.about.getInTouch);
  const introHighlights = aboutUiText.introHighlights;
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
  const factoryGallery = [
    {
      name: aboutUiText.gallery[0],
      img: "/images/factory/印刷车间/10001.png",
      className: "absolute left-0 top-0 w-[58%] z-10",
    },
    {
      name: aboutUiText.gallery[1],
      img: "/images/factory/制袋车间/10006.png",
      className: "absolute right-0 top-12 w-[48%] z-20",
    },
    {
      name: aboutUiText.gallery[2],
      img: "/images/factory/制袋车间/10001.png",
      className: "absolute bottom-0 left-1/2 w-[52%] -translate-x-1/2 z-30",
    },
  ];
  const [selectedFactoryIndex, setSelectedFactoryIndex] = useState<number | null>(null);
  const [activeLocation, setActiveLocation] = useState(0);

  const locations = [
    {
      id: 0,
      title: locale === "zh" ? "深圳总部及工厂" : aboutUiText.locations[0],
      address: contactAddress,
      query: "广东省深圳市龙岗区宝龙街道龙新社区兰二路51号深圳市海利通包装用品有限公司"
    },
    {
      id: 1,
      title: locale === "zh" ? "纽约办事处" : aboutUiText.locations[1],
      address: locale === "es" ? "1178 Broadway, 3.er piso #3886, New York, NY 10001, EE. UU." : "1178 Broadway, 3rd Floor #3886 , New York , New York 10001, US",
      query: "1178 Broadway, 3rd Floor #3886, New York, NY 10001, USA"
    },
    {
      id: 2,
      title: locale === "zh" ? "香港办事处" : aboutUiText.locations[2],
      address: locale === "es" ? "Good Hope Commercial Centre, 2-16 Fa Yuen Street, Hong Kong" : "Good Hope Commercial Centre, 2–16 Fa Yuen Street, Hong Kong, HK",
      query: "Good Hope Commercial Centre, 2–16 Fa Yuen Street, Hong Kong"
    }
  ];

  const handlePrevFactory = useCallback(() => {
    setSelectedFactoryIndex((current) => {
      if (current === null) return 0;
      return current === 0 ? factoryGallery.length - 1 : current - 1;
    });
  }, [factoryGallery.length]);

  const handleNextFactory = useCallback(() => {
    setSelectedFactoryIndex((current) => {
      if (current === null) return 0;
      return current === factoryGallery.length - 1 ? 0 : current + 1;
    });
  }, [factoryGallery.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedFactoryIndex(null);
      }

      if (selectedFactoryIndex !== null && event.key === "ArrowLeft") {
        handlePrevFactory();
      }

      if (selectedFactoryIndex !== null && event.key === "ArrowRight") {
        handleNextFactory();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextFactory, handlePrevFactory, selectedFactoryIndex]);

  return (
    <>
    <div className="min-h-screen bg-white">
      {/* Page Hero Banner */}
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#111111] flex flex-col items-center justify-center overflow-hidden min-h-[350px] md:minh-[450px]">
        {/* Background Image / Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity grayscale"
          style={{ backgroundImage: `url('${encodeURI(setting?.aboutHeroImage?.trim() || "/images/factory/印刷车间/10001.png")}')` }}
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[560px_1fr] lg:gap-16 xl:gap-24">
              {/* Left Video Content & Images */}
              <div className="w-full flex flex-col gap-6">
                <VideoModal 
                  videoId="t4a25BQtjmY" 
                  coverImage="/images/factory/制袋车间/10002.png" 
                />
                
                {/* Additional Factory Images Below Video - Staggered Layout */}
                <div className="relative h-[420px] lg:h-[460px]">
                  {factoryGallery.map((item, index) => (
                    <motion.button
                      key={item.name}
                      type="button"
                      initial={{ opacity: 0, y: index === 2 ? 30 : -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                      className={clsx(
                        item.className,
                        "overflow-hidden border border-gray-200 bg-white p-3 text-left shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(240,90,34,0.14)]"
                      )}
                      onClick={() => setSelectedFactoryIndex(index)}
                    >
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Right Text Content */}
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-[2px] bg-[#F05A22]"></div>
                  <span className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase">
                    {storyTag}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-8 leading-tight tracking-tight">
                  {storyTitle}
                </h2>

                <div className="space-y-6 text-gray-500 text-[16px] leading-8 font-light mb-10">
                  <p>{storyBody1}</p>
                  <p>{storyBody2}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                  <Link 
                    href="/products" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#1A1A1A] text-white rounded-none font-bold text-[14px] uppercase tracking-wider hover:bg-[#F05A22] transition-colors duration-300"
                  >
                    {storyPrimaryCta}
                  </Link>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-[#1A1A1A] border border-gray-300 rounded-none font-bold text-[14px] uppercase tracking-wider hover:border-[#1A1A1A] hover:bg-gray-50 transition-colors duration-300 group"
                  >
                    {storySecondaryCta}
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
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
                {aboutUiText.principles}
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
                {aboutUiText.capabilitiesTag}
              </span>
              <div className="w-8 h-[1px] bg-[#F05A22]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-6 tracking-tight">
              {aboutUiText.capabilitiesTitle}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              {aboutUiText.capabilitiesDesc}
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
              <img src="/images/factory/印刷车间/10002.png" alt={aboutUiText.cards[0][0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide uppercase">{aboutUiText.cards[0][0]}</h3>
                <div className="h-[2px] w-12 bg-[#F05A22] mb-3 transition-all duration-300 group-hover:w-20"></div>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{aboutUiText.cards[0][1]}</p>
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
              <img src="/images/factory/制袋车间/10006.png" alt={aboutUiText.cards[1][0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide uppercase">{aboutUiText.cards[1][0]}</h3>
                <div className="h-[2px] w-12 bg-[#F05A22] mb-3 transition-all duration-300 group-hover:w-20"></div>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{aboutUiText.cards[1][1]}</p>
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
              <img src="/images/factory/印刷车间/10101 (2).png" alt={aboutUiText.cards[2][0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide uppercase">{aboutUiText.cards[2][0]}</h3>
                <div className="h-[2px] w-12 bg-[#F05A22] mb-3 transition-all duration-300 group-hover:w-20"></div>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{aboutUiText.cards[2][1]}</p>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/factory" 
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-gray-300 text-gray-800 font-bold text-sm tracking-wide hover:bg-[#F05A22] hover:text-white hover:border-[#F05A22] transition-all duration-300 rounded-none group"
            >
              {aboutUiText.factoryTour}
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#F05A22]"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                {aboutUiText.presence}
              </span>
              <div className="w-8 h-[1px] bg-[#F05A22]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-6 tracking-tight">
              {locale === "zh" ? "全球办事处及工厂" : aboutUiText.presenceTitle}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed whitespace-pre-line">
              {locale === "zh" ? "我们在深圳、纽约和香港均设有分支机构，为您提供全球化的包装解决方案与本地化服务。" : aboutUiText.presenceDesc}
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
            {/* Left: Location Tabs */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocation(loc.id)}
                  className={clsx(
                    "flex flex-col items-start text-left p-6 md:p-8 transition-all duration-300 border-l-4",
                    activeLocation === loc.id
                      ? "bg-[#F05A22]/5 border-[#F05A22] shadow-[0_4px_20px_rgba(240,90,34,0.08)]"
                      : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200 border-l-gray-200"
                  )}
                >
                  <h3 className={clsx(
                    "text-xl font-bold mb-3 tracking-wide transition-colors",
                    activeLocation === loc.id ? "text-[#F05A22]" : "text-[#1A1A1A]"
                  )}>
                    {loc.title}
                  </h3>
                  <p className="text-gray-500 font-light leading-relaxed text-[15px]">
                    {loc.address}
                  </p>
                </button>
              ))}
            </div>

            {/* Right: Map Iframe */}
            <motion.div 
              key={activeLocation}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-2/3 h-[400px] lg:h-auto min-h-[400px] bg-gray-100 shadow-md"
            >
              <iframe
                title={`Location - ${locations[activeLocation].title}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(locations[activeLocation].query)}&t=m&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>
    </div>

    <AnimatePresence>
      {selectedFactoryIndex !== null ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedFactoryIndex(null)}
          />

          <div className="relative z-[10000] flex h-full w-full items-center justify-center px-4 md:px-16 pointer-events-none">
            <div className="pointer-events-auto relative flex h-[82vh] w-full max-w-5xl items-center justify-center">
              <img
                src={factoryGallery[selectedFactoryIndex].img}
                alt={factoryGallery[selectedFactoryIndex].name}
                className="max-h-full max-w-full object-contain drop-shadow-2xl"
              />

              <button
                type="button"
                onClick={handlePrevFactory}
                className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/70 transition-colors hover:bg-[#F05A22] hover:text-white md:-left-10"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={handleNextFactory}
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/70 transition-colors hover:bg-[#F05A22] hover:text-white md:-right-10"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedFactoryIndex(null)}
            className="absolute right-4 top-4 z-[10001] rounded-full border border-white/20 bg-black/60 p-3 text-white transition-colors hover:bg-[#F05A22] md:right-8 md:top-8"
          >
            <X className="h-6 w-6" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
    </>
  );
}
