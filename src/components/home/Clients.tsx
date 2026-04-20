"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Clients() {
  const { dict } = useLanguage();
  const clients = [
    { name: "Heinz", logo: "https://www.logospack.com.hk/cache/img/cf1f784f1e2d3ef764d9836114729546d458339197d1.jpg" },
    { name: "Nestle", logo: "https://www.logospack.com.hk/cache/img/cf1f784f1e2d0010ea43d775a6884a3a190f292bbf73.jpg" },
    { name: "FamilyMart", logo: "https://www.logospack.com.hk/cache/img/cf1f784f1e2d2f80a80a35375b0baa269b5357c8d929.jpg" },
    { name: "Royal Canin", logo: "https://www.logospack.com.hk/cache/img/cf1f784f1e2dba581c4d40c516cec0fffcc146d2c2b0.jpg" },
    { name: "Mars", logo: "https://www.logospack.com.hk/cache/img/cf1f784f1e2d6a60d5c5a76e3782df5318e668d1249d.jpg" },
    { name: "Inaba", logo: "https://www.logospack.com.hk/cache/img/cf1f784f1e2d3c9ec3b1b9b717eae20f4fee66f1be11.png" },
    { name: "Purina", logo: "https://www.logospack.com.hk/cache/img/cf1f784f1e2daaefce95509f7cae997760b5a5f646a4.png" },
    { name: "Neste", logo: "https://www.logospack.com.hk/cache/img/cf1f784f1e2d09241e4150443b31d5110a319d7ba1bf.png" },
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