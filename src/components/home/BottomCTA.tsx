"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BottomCTA() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#F05A22] overflow-hidden">
      {/* Decorative Background Elements */}
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay" 
        style={{ 
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Subtitle */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-[2px] bg-white/50"></div>
            <span className="text-xs font-bold tracking-[0.25em] text-white uppercase">
              Start Your Project
            </span>
            <div className="w-8 h-[2px] bg-white/50"></div>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white leading-[1.1] tracking-tight mb-8">
            Ready to Elevate Your <br className="hidden md:block" />
            Brand Packaging?
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Partner with HLT Packaging for high-quality, sustainable, and custom-engineered flexible packaging solutions. Let's build it layer by layer.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-white text-[#1A1A1A] font-bold text-[15px] tracking-wide hover:bg-gray-100 hover:shadow-xl transition-all duration-300 rounded-none group"
            >
              Get a Free Quote
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/products" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-transparent border border-white text-white font-bold text-[15px] tracking-wide hover:bg-white/10 transition-colors duration-300 rounded-none"
            >
              Explore Products
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
