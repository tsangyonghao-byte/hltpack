"use client";

import Link from "next/link";
import { Globe, Mail, Phone, MapPin, ChevronUp, ChevronsRight, Link as LinkIcon, Video, Camera, MessageCircle, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteContent } from "@/i18n/siteContent";
import { motion, useAnimation } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { subscribeNewsletter } from "@/actions/contactActions";

export default function Footer({ setting, navItems = [] }: { setting?: any, navItems?: any[] }) {
  const { locale } = useLanguage();
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  
  // Slider State
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [mobileEmail, setMobileEmail] = useState("");
  const [desktopEmail, setDesktopEmail] = useState("");
  const [isDesktopSubmitting, setIsDesktopSubmitting] = useState(false);
  const [isDesktopSubscribed, setIsDesktopSubscribed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const controls = useAnimation();

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const thumbWidth = 130; // Approx width of the "Submit >>" thumb
        setDragConstraints({ left: 0, right: containerWidth - thumbWidth });
      }
    };
    
    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  const handleDragEnd = async (event: any, info: any) => {
    // If dragged more than 80% of the way, snap to end and submit
    if (info.offset.x >= dragConstraints.right * 0.8) {
      if (mobileEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mobileEmail)) {
        setIsSubscribed(true);
        controls.start({ x: dragConstraints.right });
        
        await subscribeNewsletter(mobileEmail);
        setMobileEmail("");

        // Reset after 3 seconds
        setTimeout(() => {
          setIsSubscribed(false);
          controls.start({ x: 0 });
        }, 3000);
      } else {
        // Email invalid, snap back
        controls.start({ x: 0 });
        alert("Please enter a valid email address first.");
      }
    } else {
      // Snap back to start
      controls.start({ x: 0 });
    }
  };

  const handleDesktopSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!desktopEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(desktopEmail)) {
      alert("Please enter a valid email address.");
      return;
    }
    
    setIsDesktopSubmitting(true);
    await subscribeNewsletter(desktopEmail);
    setIsDesktopSubmitting(false);
    setIsDesktopSubscribed(true);
    setDesktopEmail("");
    
    setTimeout(() => {
      setIsDesktopSubscribed(false);
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const siteName = locale === "zh" ? (setting?.siteNameZh || "海力通包装") : (setting?.siteNameEn || "HAILITONG Packaging");
  const copyright = locale === "zh" ? setting?.footerCopyZh : setting?.footerCopyEn;
  const address = locale === "zh" ? setting?.contactAddressZh : setting?.contactAddressEn;

  return (
    <>
    <footer className="bg-[#121A2F] text-gray-300 pt-10 md:pt-20 pb-20 md:pb-10 font-sans relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F05A22] to-transparent opacity-50"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================= */}
        {/* DESKTOP FOOTER (Hidden on Mobile)           */}
        {/* ========================================= */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: About */}
          <div className="col-span-1">
            <div className="inline-block p-4 rounded-2xl mb-6 backdrop-blur-sm">
              <img src={setting?.logoUrl || "/logo.png"} alt={siteName} className="h-[40px] object-contain brightness-0 invert" />
            </div>
            <p className="text-[15px] text-gray-400 mb-8 leading-relaxed">
              {content.footer.description}
            </p>
            <div className="flex space-x-3 mt-8">
              {(setting?.facebook || true) && (
                <a href={setting?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-[#F05A22] hover:text-white hover:border-[#F05A22] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              )}
              {(setting?.linkedin || true) && (
                <a href={setting?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-[#F05A22] hover:text-white hover:border-[#F05A22] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              )}
              {(setting?.youtube || true) && (
                <a href={setting?.youtube || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-[#F05A22] hover:text-white hover:border-[#F05A22] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 7.1A2 2 0 0 1 4.5 5h15a2 2 0 0 1 2 2v9.8a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2z"/><path d="m10 9 5 3-5 3z"/></svg>
                </a>
              )}
              {(setting?.instagram || true) && (
                <a href={setting?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-[#F05A22] hover:text-white hover:border-[#F05A22] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              )}
              {(setting?.twitter || true) && (
                <a href={setting?.twitter || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-[#F05A22] hover:text-white hover:border-[#F05A22] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-[18px] font-bold mb-8 uppercase tracking-wider relative inline-block">
              {content.footer.quickLinks}
              <div className="absolute -bottom-3 left-0 w-12 h-[2px] bg-[#F05A22]"></div>
            </h3>
            <ul className="space-y-4 text-[15px]">
              <li><Link href="/about" className="text-gray-400 hover:text-[#F05A22] transition-all duration-300">{content.footer.whoWeAre}</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-[#F05A22] transition-all duration-300">{content.footer.ourProducts}</Link></li>
              <li><Link href="/packaging-market" className="text-gray-400 hover:text-[#F05A22] transition-all duration-300">{content.footer.packagingMarket}</Link></li>
              <li><Link href="/how-we-work" className="text-gray-400 hover:text-[#F05A22] transition-all duration-300">{content.footer.howWeWork}</Link></li>
              <li><Link href="/packaging-safety" className="text-gray-400 hover:text-[#F05A22] transition-all duration-300">{content.footer.packagingSafety}</Link></li>
              <li><Link href="/sustainability" className="text-gray-400 hover:text-[#F05A22] transition-all duration-300">{content.footer.sustainability}</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-[#F05A22] transition-all duration-300">{content.footer.news}</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white text-[18px] font-bold mb-8 uppercase tracking-wider relative inline-block">
              {content.footer.contactUs}
              <div className="absolute -bottom-3 left-0 w-12 h-[2px] bg-[#F05A22]"></div>
            </h3>
            <ul className="space-y-5 text-[15px]">
              {(address || true) && (
                <li className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#F05A22]" />
                  </div>
                  <span className="text-gray-400 leading-relaxed mt-1">{address || content.footer.address}</span>
                </li>
              )}
              {(setting?.contactPhone || true) && (
                <li className="flex items-center space-x-4 group">
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#F05A22]" />
                  </div>
                  <span className="text-gray-400 mt-1">{setting?.contactPhone || content.footer.phone}</span>
                </li>
              )}
              {(setting?.contactEmail || true) && (
                <li className="flex items-center space-x-4 group">
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#F05A22]" />
                  </div>
                  <a href={`mailto:${setting?.contactEmail || content.footer.email}`} className="text-gray-400 hover:text-white transition-colors mt-1">{setting?.contactEmail || content.footer.email}</a>
                </li>
              )}
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-full bg-[#F05A22] px-6 py-3 text-[14px] font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#D64816] hover:shadow-[0_12px_30px_rgba(240,90,34,0.28)]"
            >
              {content.footer.contact}
            </Link>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white text-[18px] font-bold mb-8 uppercase tracking-wider relative inline-block">
              {content.footer.newsletter}
              <div className="absolute -bottom-3 left-0 w-12 h-[2px] bg-[#F05A22]"></div>
            </h3>
            <p className="text-[15px] text-gray-400 mb-6 leading-relaxed">
              {content.footer.newsletterText}
            </p>
            <form onSubmit={handleDesktopSubmit} className="flex flex-col space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  required
                  value={desktopEmail}
                  onChange={(e) => setDesktopEmail(e.target.value)}
                  placeholder={content.footer.emailPlaceholder} 
                  className="w-full bg-white border border-gray-700 text-gray-800 px-5 py-4 rounded-[30px] text-[14px] focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22] transition-all placeholder-gray-400"
                />
              </div>
              {isDesktopSubscribed && (
                <div className="text-emerald-400 text-xs font-medium px-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {content.footer.successMessage || "Subscription successful! Our staff will contact you shortly."}
                </div>
              )}
              <button 
                type="submit"
                disabled={isDesktopSubmitting || isDesktopSubscribed}
                className={`w-full text-white px-5 py-4 rounded-[30px] text-[14px] font-bold uppercase tracking-wider transition-all ${
                  isDesktopSubscribed 
                    ? "bg-[#25D366] hover:bg-[#25D366]" 
                    : "bg-[#F05A22] hover:bg-[#D64816] hover:shadow-[0_0_20px_rgba(240,90,34,0.3)]"
                }`}
              >
                {isDesktopSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </span>
                ) : isDesktopSubscribed ? (
                  <span className="flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4" /> Success</span>
                ) : (
                  content.footer.subscribeNow
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="hidden md:flex border-t border-gray-800 pt-8 pb-4 flex-col md:flex-row justify-center items-center text-[14px] text-gray-500">
          {copyright ? (
            <div dangerouslySetInnerHTML={{ __html: copyright }} />
          ) : (
            <p>{`Copyright © ${currentYear} ${siteName}. All rights reserved.`}</p>
          )}
        </div>

        {/* ========================================= */}
        {/* MOBILE FOOTER (Hidden on Desktop)           */}
        {/* ========================================= */}
        <div className="md:hidden flex flex-col pt-2">
          {/* Logo */}
          <div className="mb-8">
            <div className="inline-flex p-2 rounded-lg items-center justify-center">
              <img src={setting?.logoUrl || "/logo.png"} alt={siteName} className="h-[28px] object-contain brightness-0 invert" />
            </div>
          </div>
          
          {/* 2-Column Links */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-white text-[15px] font-bold mb-10">
            <Link href="/" className="hover:text-[#F05A22]">{content.footer.home}</Link>
            <Link href="/how-we-work" className="hover:text-[#F05A22]">{content.footer.howWeWork}</Link>
            <Link href="/about" className="hover:text-[#F05A22]">{content.footer.whoWeAre}</Link>
            <Link href="/packaging-safety" className="hover:text-[#F05A22]">{content.footer.packagingSafety}</Link>
            <Link href="/products" className="hover:text-[#F05A22]">{content.footer.products}</Link>
            <Link href="/sustainability" className="hover:text-[#F05A22]">{content.footer.sustainability}</Link>
            <Link href="/packaging-market" className="hover:text-[#F05A22]">{content.footer.packagingMarket}</Link>
            <Link href="/news" className="hover:text-[#F05A22]">{content.footer.news}</Link>
          </div>
          <Link
            href="/contact"
            className="mb-8 inline-flex w-full items-center justify-center rounded-[30px] bg-[#F05A22] px-6 py-4 text-[15px] font-extrabold uppercase tracking-wider text-white transition-colors hover:bg-[#D64816]"
          >
            {content.footer.contact}
          </Link>

          {/* Follow Us */}
          <div className="flex items-center gap-6 mb-8">
            <span className="text-white text-[20px] font-extrabold tracking-wide">{content.footer.followUs}</span>
            <div className="flex space-x-3">
              {(setting?.facebook || true) && (
                <a href={setting?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1E293B] hover:bg-[#F05A22] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              )}
              {(setting?.linkedin || true) && (
                <a href={setting?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1E293B] hover:bg-[#F05A22] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              )}
              {(setting?.youtube || true) && (
                <a href={setting?.youtube || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1E293B] hover:bg-[#F05A22] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 7.1A2 2 0 0 1 4.5 5h15a2 2 0 0 1 2 2v9.8a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2z"/><path d="m10 9 5 3-5 3z"/></svg>
                </a>
              )}
              {(setting?.instagram || true) && (
                <a href={setting?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1E293B] hover:bg-[#F05A22] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              )}
              {(setting?.twitter || true) && (
                <a href={setting?.twitter || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1E293B] hover:bg-[#F05A22] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-white/20 mb-8"></div>

          {/* Newsletter */}
          <div className="mb-10">
            <p className="text-gray-300 text-[14px] mb-2 tracking-wide">{content.footer.mobileNewsletterLead}</p>
            <h3 className="text-white text-[16px] font-extrabold mb-5 tracking-wide">{content.footer.mobileNewsletterTitle}</h3>
            
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                value={mobileEmail}
                onChange={(e) => setMobileEmail(e.target.value)}
                placeholder={content.footer.mobileEmailPlaceholder} 
                className="w-full bg-white text-gray-800 px-5 py-3.5 rounded-[30px] text-[14px] outline-none shadow-sm"
              />
              {isSubscribed && (
                <div className="text-emerald-400 text-xs font-medium px-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {content.footer.successMessage || "Subscription successful! Our staff will contact you shortly."}
                </div>
              )}
              <div 
                ref={containerRef}
                className="relative flex w-full bg-white rounded-[30px] overflow-hidden h-[48px] shadow-sm items-center select-none"
              >
                {/* Background Text */}
                <div className="absolute w-full flex items-center justify-center text-gray-400 text-[14px] z-0 pl-[40%] pointer-events-none">
                  {isSubscribed ? "" : content.footer.slideToRight}
                </div>
                
                {/* Drag Thumb */}
                <motion.div
                  drag={!isSubscribed ? "x" : false}
                  dragConstraints={dragConstraints}
                  dragElastic={0.1}
                  dragMomentum={false}
                  onDragEnd={handleDragEnd}
                  animate={controls}
                  className={`absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center rounded-[30px] font-bold text-[15px] text-white cursor-grab active:cursor-grabbing min-w-[130px] transition-colors duration-300 ${
                    isSubscribed ? "bg-[#25D366]" : "bg-[#F05A22] hover:bg-[#d94d1b]"
                  }`}
                  style={{ touchAction: "none" }}
                >
                  {isSubscribed ? (
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Success</span>
                  ) : (
                    <span className="flex items-center gap-1 pointer-events-none">{content.footer.submit} <ChevronsRight className="w-4 h-4" /></span>
                  )}
                </motion.div>
                
                {/* Filled background behind the thumb */}
                {!isSubscribed && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 bg-[#F05A22]/10 z-0 rounded-l-[30px]"
                    style={{
                      width: "100%", // This won't work perfectly without mapping x value. We'll skip the trailing color for simplicity, or use useMotionValue.
                      display: "none" 
                    }}
                  />
                )}
              </div>
            </form>
          </div>

          {/* Bottom */}
          <div className="flex justify-between items-end pb-4">
            <div className="text-gray-400 text-[12px] leading-[1.6]">
              {copyright ? (
                <div dangerouslySetInnerHTML={{ __html: copyright }} />
              ) : (
                <p>{`Copyright © ${currentYear} ${siteName}`}</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </footer>

    {/* Fixed WhatsApp Bar (Mobile Only) */}
    {setting?.whatsapp && (
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#25D366] h-[55px] flex items-center justify-center z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <a href={setting.whatsapp} className="flex items-center gap-2 text-white font-extrabold text-[17px] tracking-wide w-full h-full justify-center">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          {content.floating.whatsapp}
        </a>
      </div>
    )}
    </>
  );
}
