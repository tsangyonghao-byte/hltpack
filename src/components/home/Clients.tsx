"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Clients() {
  const { dict } = useLanguage();
  const clients = [
    { name: "Partner 1", logo: "/海利通合作伙伴/图片1.png" },
    { name: "Partner 2", logo: "/海利通合作伙伴/图片2.png" },
    { name: "Partner 3", logo: "/海利通合作伙伴/图片3.png" },
    { name: "Partner 4", logo: "/海利通合作伙伴/图片4.png" },
    { name: "Partner 5", logo: "/海利通合作伙伴/图片5.png" },
    { name: "Partner 6", logo: "/海利通合作伙伴/图片6.png" },
    { name: "Partner 7", logo: "/海利通合作伙伴/图片7.png" },
    { name: "Partner 8", logo: "/海利通合作伙伴/图片8.png" },
    { name: "Partner 9", logo: "/海利通合作伙伴/图片9.png" },
    { name: "Partner 10", logo: "/海利通合作伙伴/图片10.png" },
    { name: "Partner 11", logo: "/海利通合作伙伴/图片11.png" },
    { name: "Partner 12", logo: "/海利通合作伙伴/图片12.png" },
    { name: "Partner 13", logo: "/海利通合作伙伴/图片13.png" },
    { name: "Partner 14", logo: "/海利通合作伙伴/图片14.png" },
  ];

  // Duplicate array for seamless infinite scroll
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="pt-4 pb-8 md:pt-8 md:pb-12 bg-transparent overflow-hidden relative z-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-sm md:text-[15px] font-bold text-gray-500 uppercase tracking-[0.2em]">
            {dict.home.clients.trustedBy}
          </p>
        </div>

        {/* Infinite Scroll Ticker Container */}
        <div className="relative w-full flex items-center">
          {/* Scrolling Content with true CSS transparency mask */}
          <div 
            className="flex w-full overflow-hidden py-2"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
          >
            <motion.div
              className="flex items-center gap-12 md:gap-24 w-max shrink-0 pr-12 md:pr-24"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 50,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {duplicatedClients.map((client, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-center w-[180px] md:w-[280px] h-[100px] md:h-[130px] opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}