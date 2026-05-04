"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, HeartHandshake, ShieldCheck, Layers } from "lucide-react";
import Link from "next/link";

export default function BentoFeatures() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Editorial Style */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-[1px] bg-[#F05A22]"></div>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#1A1A1A] uppercase">
                Powerful Manufacturer
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[40px] md:text-[64px] font-bold text-[#1A1A1A] tracking-[-0.02em] leading-[1.05]"
            >
              <span className="text-[#F05A22]">Core</span> Advantages.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[15px] md:text-[17px] text-gray-500 leading-[1.7] max-w-md font-light"
          >
            With complete in-house production lines and a customer-first approach, we deliver premium packaging solutions tailored to your exact specifications.
          </motion.p>
        </div>

        {/* The "Blueprint" Grid - Sharp, minimal borders, very structured */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[1px] bg-gray-200 border border-gray-200 auto-rows-[minmax(280px,auto)] md:auto-rows-[340px]">
          
          {/* Block 1: Custom Solutions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-8 md:row-span-2 relative bg-white overflow-hidden group flex flex-col"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src="https://cdn.myxypt.com/f4a05196/24/07/eb7d0b54afe9c10e026f4a332c9cec3d4c4890f5.png?x-oss-process=image/resize,m_lfit,h_800,w_800" 
                alt="Custom Packaging Solutions" 
                className="w-full h-full object-cover transition-all duration-1000 ease-out scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>
            
            <div className="relative z-10 p-8 md:p-12 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 border border-white/20">
                  Tailored For You
                </span>
                <span className="font-serif italic text-white/50 text-2xl md:text-3xl">01</span>
              </div>
              
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="w-8 h-8 text-[#F05A22]" />
                  <h3 className="text-3xl md:text-[42px] font-bold text-white tracking-tight leading-tight">
                    Custom Solutions
                  </h3>
                </div>
                <p className="text-white/80 text-sm md:text-base font-light leading-relaxed max-w-md">
                  Tailored packaging solutions for food, medical, cosmetics, and electronics industries. We engineer the perfect structure for your product's unique needs.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Block 2: Fast Delivery */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-4 md:row-span-1 bg-white p-8 md:p-10 flex flex-col justify-between group transition-colors relative overflow-hidden"
          >
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src="https://cdn.myxypt.com/f4a05196/24/07/8e799c5f492b56bb55203b31cd615bf8b9cc3da3.jpg" 
                alt="Fast Delivery" 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-white/30 group-hover:from-white/85 group-hover:via-white/50 transition-colors duration-500"></div>
            </div>
            <div className="relative z-10 flex justify-between items-start mb-8">
              <Clock className="w-8 h-8 text-[#F05A22]" strokeWidth={1.5} />
              <span className="font-serif italic text-gray-400 text-xl md:text-2xl group-hover:text-[#F05A22] transition-colors">02</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-3 leading-tight tracking-tight">
                Fast Delivery
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed font-light">
                Complete in-house facilities—from film blowing to pouch making—ensuring rapid and reliable turnaround.
              </p>
            </div>
          </motion.div>

          {/* Block 3: Certified Quality */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-4 md:row-span-1 bg-[#1A1A1A] p-8 md:p-10 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src="https://cdn.myxypt.com/f4a05196/24/07/b3adb55ea799b1b2c5518c8c7f78f19936c96c9a.jpg" 
                alt="Certified Quality" 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/95 via-[#1A1A1A]/70 to-[#1A1A1A]/30 group-hover:from-[#1A1A1A]/85 group-hover:via-[#1A1A1A]/50 transition-colors duration-500"></div>
            </div>
            {/* Subtle background texture/grid */}
            <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
            
            <div className="relative z-10 flex justify-between items-start mb-8">
              <ShieldCheck className="w-8 h-8 text-white" strokeWidth={1.5} />
              <span className="font-serif italic text-white/20 text-xl md:text-2xl group-hover:text-white transition-colors">03</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight tracking-tight">
                Certified Quality
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light mb-6">
                Rigorous multi-stage quality control by experienced technicians. Stable quality that meets international standards.
              </p>
            </div>
          </motion.div>

          {/* Block 4: Dedicated Support */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-12 md:row-span-1 bg-[#F05A22] p-8 md:p-12 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src="https://cdn.myxypt.com/f4a05196/24/07/d867f072ab512595ae08791c4f35689a8801d47e.png" 
                alt="Dedicated Support" 
                className="w-full h-full object-cover opacity-[0.15] mix-blend-overlay group-hover:scale-105 transition-all duration-1000 ease-out"
              />
            </div>
            
            <HeartHandshake className="absolute -right-8 -bottom-8 w-64 h-64 text-black/10 -rotate-12 group-hover:rotate-0 transition-transform duration-1000 ease-out z-0 pointer-events-none" />
            
            <div className="relative z-10 flex justify-between items-start mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 border-b border-white/20 pb-1">
                Customer First
              </span>
              <span className="font-serif italic text-white/30 text-xl md:text-2xl group-hover:text-white transition-colors">04</span>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight tracking-tight">
                  Dedicated Support & Service
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
                  "Premium Quality, Customer First." We stand behind every pouch we manufacture, providing seamless service from initial design consultation to global delivery.
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.15em] text-white hover:text-[#1A1A1A] transition-colors group/link shrink-0 bg-black/20 hover:bg-white px-6 py-4 rounded-none border border-white/30 hover:border-white backdrop-blur-sm">
                Get a Quote 
                <ArrowRight className="w-5 h-5 ml-3 transform group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
