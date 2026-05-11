"use client";

import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, Menu, Phone, Home, Globe, ChevronDown, ChevronRight, X, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHero } from "@/components/home/HeroContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { setLanguage } from "@/actions/langActions";
import { siteContent } from "@/i18n/siteContent";
import { useSystemSetting } from "@/components/layout/SystemSettingContext";
import {
  buildProductCategoryPath,
  getProductCategoryNameFromParam,
  getProductCategoryNameFromPathname,
  normalizeProductCategoryHref,
} from "@/lib/productCategorySlug";

export default function Navbar({ navItems = [] }: { navItems?: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileGroup, setActiveMobileGroup] = useState<string | null>(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);
  const [activeMegaSubCategory, setActiveMegaSubCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSwitchingLanguage, setIsSwitchingLanguage] = useState(false);
  const { currentSlideIndex } = useHero();
  const { dict, locale } = useLanguage();
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const setting = useSystemSetting();
  const contactPhone = setting?.contactPhone || "";
  const phoneHref = contactPhone ? `tel:${contactPhone.replace(/\s+/g, "")}` : "/contact";
  const currentCategory =
    getProductCategoryNameFromPathname(pathname) ||
    getProductCategoryNameFromParam(searchParams.get("category"));
  const navbarText = {
    toggleMenu: locale === "es" ? "Abrir menu" : locale === "ar" ? "فتح القائمة" : "Toggle Menu",
    closeMenu: locale === "es" ? "Cerrar menu" : locale === "ar" ? "اغلاق القائمة" : "Close Menu",
    exploreAll: locale === "es" ? "Explorar todo" : locale === "ar" ? "استكشاف الكل" : "Explore All",
    featuredProduct: locale === "es" ? "Producto destacado" : locale === "ar" ? "منتج مميز" : "Featured Product",
  };
  const fallbackCategoryLabels = {
    en: {
      "Custom Pet Supplies Bags": "Custom Pet Supplies Bags",
      "Tea Bags": "Tea Bags",
      "Custom Food Bags": "Custom Food Bags",
      "Medical Mask Bags": "Medical Mask Bags",
      "Toy Bags": "Toy Bags",
      "Shaped Bags": "Shaped Bags",
      "Ziplock Bags": "Ziplock Bags",
      "Mask Bags": "Mask Bags",
      "Kraft Paper Bags": "Kraft Paper Bags",
      "Bubble Bags": "Bubble Bags",
      "Spout Pouches": "Spout Pouches",
      "Foil-Clear Bags": "Foil-Clear Bags",
      "Transparent High-Barrier Films (AlOx)": "Transparent High-Barrier Films (AlOx)",
      "Metallized Films (VMPET/VMCPP)": "Metallized Films (VMPET/VMCPP)",
      "Specialty & Functional Films": "Specialty & Functional Films",
      "Recyclable Mono-Materials": "Recyclable Mono-Materials",
    },
    es: {
      "Custom Pet Supplies Bags": "Bolsas personalizadas para mascotas",
      "Tea Bags": "Bolsas para te",
      "Custom Food Bags": "Bolsas personalizadas para alimentos",
      "Medical Mask Bags": "Bolsas para mascarillas medicas",
      "Toy Bags": "Bolsas para juguetes",
      "Shaped Bags": "Bolsas con forma",
      "Ziplock Bags": "Bolsas ziplock",
      "Mask Bags": "Bolsas para mascarillas",
      "Kraft Paper Bags": "Bolsas de papel kraft",
      "Bubble Bags": "Bolsas burbuja",
      "Spout Pouches": "Bolsas con boquilla",
      "Foil-Clear Bags": "Bolsas foil transparentes",
      "Transparent High-Barrier Films (AlOx)": "Peliculas transparentes de alta barrera (AlOx)",
      "Metallized Films (VMPET/VMCPP)": "Peliculas metalizadas (VMPET/VMCPP)",
      "Specialty & Functional Films": "Peliculas especiales y funcionales",
      "Recyclable Mono-Materials": "Monomateriales reciclables",
    },
    ar: {
      "Custom Pet Supplies Bags": "اكياس مخصصة لمستلزمات الحيوانات الاليفة",
      "Tea Bags": "اكياس الشاي",
      "Custom Food Bags": "اكياس مخصصة للاغذية",
      "Medical Mask Bags": "اكياس للكمامات الطبية",
      "Toy Bags": "اكياس الالعاب",
      "Shaped Bags": "اكياس مشكلة",
      "Ziplock Bags": "اكياس بسحاب",
      "Mask Bags": "اكياس الاقنعة",
      "Kraft Paper Bags": "اكياس ورق كرافت",
      "Bubble Bags": "اكياس فقاعية",
      "Spout Pouches": "اكياس بفوهة",
      "Foil-Clear Bags": "اكياس شفافة مع رقائق",
      "Transparent High-Barrier Films (AlOx)": "افلام شفافة عالية الحاجز (AlOx)",
      "Metallized Films (VMPET/VMCPP)": "افلام معدنية (VMPET/VMCPP)",
      "Specialty & Functional Films": "افلام متخصصة ووظيفية",
      "Recyclable Mono-Materials": "مواد احادية قابلة لاعادة التدوير",
    },
  } as const;
  const translateFallbackCategoryName = (name: string) => {
    const labelMap = fallbackCategoryLabels[locale as keyof typeof fallbackCategoryLabels] || fallbackCategoryLabels.en;
    return labelMap[name as keyof typeof labelMap] || name;
  };

  const getHrefCategory = (href?: string) => {
    if (!href) return null;
    try {
      const url = new URL(href, "https://hltpack.local");
      const categoryParam = url.searchParams.get("category");
      if (categoryParam) {
        return getProductCategoryNameFromParam(categoryParam);
      }
      return getProductCategoryNameFromPathname(url.pathname);
    } catch {
      return null;
    }
  };

  const isTopLevelLinkActive = (href?: string) => {
    if (!href) return false;
    const hrefPath = href.split("?")[0];
    if (hrefPath === "/products") {
      return pathname === "/products";
    }
    return pathname === hrefPath;
  };

  const isMegaSubLinkActive = (href?: string) => {
    if (pathname !== "/products") return false;
    const hrefCategory = getHrefCategory(href);
    return Boolean(hrefCategory && currentCategory === hrefCategory);
  };

  const isMegaCategoryActive = (item: any) => {
    if (pathname !== "/products") return false;
    const hrefCategory = getHrefCategory(item?.href);
    if (!hrefCategory) return false;

    if (currentCategory === hrefCategory) return true;
    return Boolean(item?.children?.some((sub: any) => isMegaSubLinkActive(sub.href)));
  };

  // Close Mega Menu on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
  }, [pathname, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLanguageChange = async (nextLocale: string) => {
    if (isSwitchingLanguage || nextLocale === locale) {
      setActiveMegaMenu(null);
      return;
    }

    const currentQuery = searchParams.toString();
    const currentUrl = currentQuery ? `${pathname}?${currentQuery}` : pathname || "/";

    try {
      setIsSwitchingLanguage(true);
      setActiveMegaMenu(null);
      setActiveMobileGroup(null);
      setIsMobileMenuOpen(false);
      await setLanguage(nextLocale);

      // Force a full reload so server components, cookies, and dynamic images stay in sync.
      window.location.replace(currentUrl);
    } finally {
      setIsSwitchingLanguage(false);
    }
  };

  useEffect(() => {
    const syncScrollState = () => {
      setScrolled(window.scrollY > 50);
    };

    syncScrollState();
    const frameId = window.requestAnimationFrame(syncScrollState);

    window.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("load", syncScrollState);
    window.addEventListener("pageshow", syncScrollState);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", syncScrollState);
      window.removeEventListener("load", syncScrollState);
      window.removeEventListener("pageshow", syncScrollState);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setActiveMobileGroup(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Build dynamic nav links from database
  const buildNavLinks = () => {
    const getTranslatedName = (item: any) => {
      if (locale === "zh") return item.nameZh || item.nameEn;
      
      let name = item.nameEn || item.nameZh;
      
      // Top level mapping
      if (locale !== "en") {
        if (item.nameEn === "Who we are") name = dict.nav.whoWeAre;
        else if (item.nameEn === "Our Products") name = dict.nav.products;
        else if (item.nameEn === "Packaging Market") name = dict.nav.packagingMarket;
        else if (item.nameEn === "How we work") name = dict.nav.howWeWork;
        else if (item.nameEn === "Packaging Safety") name = dict.nav.packagingSafety;
        else if (item.nameEn === "Sustainability") name = dict.nav.sustainability;
        else if (item.nameEn === "Contact Us") name = dict.nav.contact;
      }

      // Second level mapping
      if (locale !== "en" && content?.navbar?.productChildren) {
        if (item.nameEn === "Plastic Packaging Bags") name = content.navbar.productChildren[0];
        else if (item.nameEn === "Shrink Label Series") name = content.navbar.productChildren[1];
        else if (item.nameEn === "High-Barrier & Metallized Films") name = content.navbar.productChildren[2];
      }

      if (locale !== "en") {
        name = translateFallbackCategoryName(name);
      }

      // Third level mapping (packaging market)
      if (locale !== "en" && siteContent.en.packagingMarket?.markets) {
        const index = siteContent.en.packagingMarket.markets.findIndex((m: any) => m.title === item.nameEn);
        if (index !== -1 && content?.packagingMarket?.markets?.[index]) {
          name = content.packagingMarket.markets[index].title;
        }
      }

      return name || "";
    };

    if (!navItems || navItems.length === 0) {
      // Fallback if db is empty
      return [
        { name: dict.nav.whoWeAre, href: "/about" },
        {
          name: dict.nav.products,
          href: "/products",
          children: [
            {
              name: content.navbar.productChildren[0],
              href: buildProductCategoryPath("Plastic Packaging Bags"),
              children: [
                { name: translateFallbackCategoryName("Custom Pet Supplies Bags"), href: buildProductCategoryPath("Custom Pet Supplies Bags"), image: "/products/塑料包装袋系列/宠物用品包装袋/定制宠物食品包装袋/10001.jpg" },
                { name: translateFallbackCategoryName("Tea Bags"), href: buildProductCategoryPath("Tea Bags"), image: "/products/塑料包装袋系列/茶叶袋/茶叶袋/10002.jpg" },
                { name: translateFallbackCategoryName("Custom Food Bags"), href: buildProductCategoryPath("Custom Food Bags"), image: "/products/塑料包装袋系列/定制食品袋/定制印刷拉链塑料立式自封包装袋食品零食软包装袋/10002.jpg" },
                { name: translateFallbackCategoryName("Medical Mask Bags"), href: buildProductCategoryPath("Medical Mask Bags"), image: "/products/塑料包装袋系列/口罩袋/医用口罩包装袋/10002.jpg" },
                { name: translateFallbackCategoryName("Toy Bags"), href: buildProductCategoryPath("Toy Bags"), image: "/products/塑料包装袋系列/玩具袋/可重复密封自立拉链包装袋/10001.jpg" },
                { name: translateFallbackCategoryName("Shaped Bags"), href: buildProductCategoryPath("Shaped Bags"), image: "/products/塑料包装袋系列/异型袋/异型包装袋/10002.jpg" },
                { name: translateFallbackCategoryName("Ziplock Bags"), href: buildProductCategoryPath("Ziplock Bags"), image: "/products/塑料包装袋系列/自封袋/定制自立袋带拉链全彩色零食食品铝箔站立袋/10001.jpg" },
                { name: translateFallbackCategoryName("Mask Bags"), href: buildProductCategoryPath("Mask Bags"), image: "/products/塑料包装袋系列/口罩袋/口罩袋/10001.jpg" },
                { name: translateFallbackCategoryName("Kraft Paper Bags"), href: buildProductCategoryPath("Kraft Paper Bags"), image: "/products/塑料包装袋系列/牛皮纸袋/带拉链站立袋可重新密封牛皮纸袋/10001.jpg" },
                { name: translateFallbackCategoryName("Bubble Bags"), href: buildProductCategoryPath("Bubble Bags"), image: "/products/塑料包装袋系列/气泡袋/自封气泡邮寄袋/10002.jpg" },
                { name: translateFallbackCategoryName("Spout Pouches"), href: buildProductCategoryPath("Spout Pouches"), image: "/products/塑料包装袋系列/吸嘴袋/带喷嘴塑料袋/10001.jpg" },
                { name: translateFallbackCategoryName("Foil-Clear Bags"), href: buildProductCategoryPath("Foil-Clear Bags"), image: "/products/塑料包装袋系列/阴阳袋/带自封口的直立铝箔阴阳拉链袋/10001.jpg" }
              ]
            },
            {
              name: content.navbar.productChildren[1],
              href: buildProductCategoryPath("Shrink Label Series"),
              children: [
                { name: translateFallbackCategoryName("Heat Shrink Sleeve Label"), href: buildProductCategoryPath("Heat Shrink Sleeve Label"), image: "/products/收缩标签系列/热收缩标签/10001.jpg" }
              ]
            },
            {
              name: content.navbar.productChildren[2],
              href: buildProductCategoryPath("High-Barrier & Metallized Films"),
              children: [
                {
                  name: translateFallbackCategoryName("Transparent High-Barrier Films (AlOx)"),
                  href: buildProductCategoryPath("Transparent High-Barrier Films (AlOx)"),
                  image: "/products/高阻隔及镀铝薄膜系列/透明高阻隔薄膜（AlOx）/高阻隔透明PET-AlOx薄膜（可水煮）- PET-AlOx-010/10001.jpg",
                },
                {
                  name: translateFallbackCategoryName("Metallized Films (VMPET/VMCPP)"),
                  href: buildProductCategoryPath("Metallized Films (VMPET/VMCPP)"),
                  image: "/products/高阻隔及镀铝薄膜系列/镀铝薄膜（VMPET VMCPP）/高阻隔PET镀铝薄膜-VMPET/10001.jpg",
                },
                {
                  name: translateFallbackCategoryName("Specialty & Functional Films"),
                  href: buildProductCategoryPath("Specialty & Functional Films"),
                  image: "/products/高阻隔及镀铝薄膜系列/特种与功能性薄膜/高阻隔可降解镀铝薄膜-VMPLA/10001.jpg",
                },
                {
                  name: translateFallbackCategoryName("Recyclable Mono-Materials"),
                  href: buildProductCategoryPath("Recyclable Mono-Materials"),
                  image: "/products/高阻隔及镀铝薄膜系列/单一可回收材料/可回收高阻隔镀铝薄膜-VMPE/10001.jpg",
                },
              ]
            }
          ]
        },
        {
          name: dict.nav.packagingMarket,
          href: "/packaging-market",
        },
        { name: dict.nav.howWeWork, href: "/how-we-work" },
        { name: dict.nav.packagingSafety, href: "/packaging-safety" },
        { name: dict.nav.sustainability, href: "/sustainability" },
      ];
    }

    const mainItems = navItems
      .filter((i: any) => !i.parentId && i.link !== "/news" && i.link !== "/contact")
      .sort((a, b) => a.order - b.order);
    return mainItems.map((item: any) => {
      // 只有产品栏目（或特定包含 mega menu 的栏目）才保留下拉菜单数据，其他只保留一级
      const isProducts = item.link.includes('products');
      const children = isProducts ? navItems.filter((i: any) => i.parentId === item.id).sort((a, b) => a.order - b.order) : [];
      
      return {
        name: getTranslatedName(item),
        href: normalizeProductCategoryHref(item.link),
        children: children.length > 0 ? children.map((child: any) => {
          const subChildren = navItems.filter((i: any) => i.parentId === child.id).sort((a, b) => a.order - b.order);
          return {
            name: getTranslatedName(child),
            href: normalizeProductCategoryHref(child.link),
            image: child.image,
            children: subChildren.length > 0 ? subChildren.map((subChild: any) => ({
              name: getTranslatedName(subChild),
              href: normalizeProductCategoryHref(subChild.link),
              image: subChild.image
            })) : undefined
          };
        }) : undefined
      };
    });
  };

  const navLinks = buildNavLinks();

  const isSolid = !isHomePage || scrolled;

  return (
    <header 
      className={`w-full fixed top-0 z-[100] transition-all duration-[750ms] ease-out bg-transparent`}
    >
      {/* Background pseudoelement equivalent from target site */}
      <div 
        className={`absolute top-0 left-0 w-full transition-all duration-[750ms] ease-out z-[-1] ${
          isSolid ? "h-[80px] md:h-[100px] bg-white/95 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.16)]" : "h-[80px] md:h-[125px] xl:h-[161px] bg-transparent"
        }`}
      />

      <div className={`max-w-[1744px] mx-auto px-4 md:px-[16px] xl:px-[20px] flex flex-col md:flex-row justify-between items-stretch md:items-start transition-transform duration-[750ms] ease-out ${
        isSolid ? "translate-y-0" : ""
      }`}>
        
        {/* Left: Logo and Mobile Menu Button */}
        <div className="flex-shrink-0 flex items-center justify-between w-full md:w-auto h-[80px] md:h-auto md:pt-[20px] xl:pt-[41px] px-[10px] md:px-[7px] xl:px-[5px] transition-transform duration-[750ms] ease-out">
          <Link href="/" className={`inline-block transition-transform duration-[750ms] ease-out ${
            isSolid ? "scale-[0.85] origin-left md:scale-[0.68] xl:scale-[0.75] md:-translate-y-[22px] xl:-translate-y-[28px]" : "scale-[0.85] md:scale-[0.9] xl:scale-100 origin-left translate-y-[10px]"
          }`}>
            <img 
              src="/logo.png" 
              alt="HAILITONG Packaging" 
              className={`w-[140px] md:w-[160px] xl:w-[180px] h-auto object-contain transition-all duration-[750ms] drop-shadow-md ${!isSolid ? 'brightness-0 invert' : ''}`} 
            />
          </Link>
          
          {/* Mobile Menu Button (Only visible on small screens) */}
          <button 
            className="md:hidden flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white text-[#1A1A1A] shadow-[0_8px_20px_rgba(0,0,0,0.1)] border border-gray-100 transition-transform duration-300 active:scale-95"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label={navbarText.toggleMenu}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

          {/* Right Section */}
        <div className={`hidden md:flex flex-grow flex-col items-end pt-[18px] xl:pt-[30px] gap-[16px] xl:gap-[25px] transition-transform duration-[750ms] ease-out`}>
          
          {/* Top Bar: Tools & Lang (Capsule) - 滚动时保持在最右侧，紧贴顶部 */}
          <div className={`relative z-[60] flex items-center transition-all duration-[750ms] ease-out origin-top-right ${
            isSolid ? "translate-y-[-30px] rounded-b-[23px] rounded-t-none" : "rounded-[30px]"
          }`}>
            <div className={`transition-all duration-[750ms] ease-out ${
              isSolid ? "rounded-b-[23px] rounded-t-none bg-[#F05A22] shadow-md" : "rounded-[30px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            } w-auto px-[20px] xl:px-[30px]`}>
              <div className={`bg-transparent h-full w-full py-[12px] flex items-center justify-center gap-[24px] transition-all duration-[750ms] ease-out ${
                isSolid ? "rounded-b-[23px] rounded-t-none pb-[12px] pt-[8px] xl:pb-[14px] xl:pt-[10px]" : "rounded-[30px]"
              }`}>
                {/* Tool Icons */}
                <Link href="/" className={`transition-colors ${isSolid ? "text-white/90 hover:text-white" : "text-[#F05A22]/90 hover:text-[#F05A22]"}`}>
                  <Home className="w-[20px] h-[20px] xl:w-[24px] xl:h-[24px]" strokeWidth={1.5} />
                </Link>
                <Link href={phoneHref} className={`transition-colors ${isSolid ? "text-white/90 hover:text-white" : "text-[#F05A22]/90 hover:text-[#F05A22]"}`}>
                  <Phone className="w-[20px] h-[20px] xl:w-[24px] xl:h-[24px]" strokeWidth={1.5} />
                </Link>
                <Link href="/products" className={`transition-colors ${isSolid ? "text-white/90 hover:text-white" : "text-[#F05A22]/90 hover:text-[#F05A22]"}`}>
                  <Search className="w-[20px] h-[20px] xl:w-[24px] xl:h-[24px]" strokeWidth={1.5} />
                </Link>
                
                {/* Divider */}
                <div className={`w-[1px] h-[20px] xl:h-[24px] transition-colors duration-[750ms] ${isSolid ? "bg-white/30" : "bg-[#F05A22]/20"}`}></div>
                
                {/* Language Switcher */}
                <div className={`group relative flex items-center cursor-pointer transition-colors duration-[750ms] ${isSolid ? "text-white" : "text-[#F05A22]"}`}>
                  <Globe className="w-[20px] h-[20px] xl:w-[24px] xl:h-[24px] mr-[6px] xl:mr-[8px]" strokeWidth={1.5} />
                  <span className="text-[14px] xl:text-[16px] font-medium tracking-wide">{dict.nav.language}</span>
                  <ChevronDown className="w-[16px] h-[16px] xl:w-[18px] xl:h-[18px] ml-[6px] xl:ml-[8px] opacity-80" strokeWidth={1.5} />
                  
                  {/* Desktop Dropdown */}
                  <div className="absolute top-full right-0 pt-[15px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[110]">
                    <div className="w-32 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden text-gray-800">
                      <div className="py-2 flex flex-col relative z-20">
                        <button disabled={isSwitchingLanguage} onClick={() => void handleLanguageChange('en')} className={`px-4 py-2 hover:bg-orange-50 hover:text-[#F05A22] text-[15px] font-medium transition-colors text-left disabled:opacity-60 disabled:cursor-not-allowed ${locale === 'en' ? 'text-[#F05A22] bg-orange-50' : ''}`}>{content.navbar.languages.en}</button>
                        <button disabled={isSwitchingLanguage} onClick={() => void handleLanguageChange('es')} className={`px-4 py-2 hover:bg-orange-50 hover:text-[#F05A22] text-[15px] font-medium transition-colors text-left disabled:opacity-60 disabled:cursor-not-allowed ${locale === 'es' ? 'text-[#F05A22] bg-orange-50' : ''}`}>{content.navbar.languages.es}</button>
                        <button disabled={isSwitchingLanguage} onClick={() => void handleLanguageChange('ar')} className={`px-4 py-2 hover:bg-orange-50 hover:text-[#F05A22] text-[15px] font-medium transition-colors text-left disabled:opacity-60 disabled:cursor-not-allowed ${locale === 'ar' ? 'text-[#F05A22] bg-orange-50' : ''}`}>{content.navbar.languages.ar}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Navigation */}
          <nav className={`flex items-center space-x-[24px] xl:space-x-[53px] justify-end transition-transform duration-[750ms] ease-out origin-right ${
            isSolid ? "translate-y-[-45px]" : "translate-y-0"
          }`}>
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => {
                  if (link.children?.length) {
                    const matchedChild = link.children.find((child: any) => isMegaCategoryActive(child));
                    const matchedSub = matchedChild?.children?.find((sub: any) => isMegaSubLinkActive(sub.href));
                    setActiveMegaMenu(link.name);
                    setActiveMegaCategory(matchedChild?.name || link.children[0]?.name || null);
                    setActiveMegaSubCategory(matchedSub?.name || null);
                  }
                }}
                onMouseLeave={() => {
                  setActiveMegaMenu(null);
                  setActiveMegaCategory(null);
                  setActiveMegaSubCategory(null);
                }}
              >
                <Link
                  href={link.href}
                  className={`group inline-flex items-center text-[13px] xl:text-[15px] font-bold transition-colors duration-[300ms] tracking-[0.5px] xl:tracking-[1px] relative ${isSolid ? "pb-0" : "pb-1"} ${
                    isTopLevelLinkActive(link.href) ? "text-[#F05A22]" : "text-[#1A1A1A]"
                  }`}
                >
                  {link.name}
                  {link.children?.length ? <ChevronDown className={`ml-1 h-3.5 w-3.5 xl:h-4 xl:w-4 transition-transform ${activeMegaMenu === link.name ? "rotate-180" : ""}`} /> : null}
                  <span className={`absolute bottom-[-4px] left-1/2 -translate-x-1/2 h-[1.5px] transition-all duration-300 ease-out ${
                    isTopLevelLinkActive(link.href) ? "bg-[#F05A22]" : "bg-[#1A1A1A]"
                  } ${activeMegaMenu === link.name || isTopLevelLinkActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                </Link>

                {/* Mega Menu Dropdown (Only for Products or links matching /products) */}
                  <AnimatePresence>
                    {link.children?.length && activeMegaMenu === link.name && link.href.includes('products') && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute left-1/2 top-[calc(100%+25px)] z-[120] -translate-x-1/2 w-[980px] xl:w-[1100px] h-[520px] rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden flex"
                      >
                        {/* Left Column: Categories */}
                        <div className="w-[300px] xl:w-[320px] bg-white overflow-y-auto custom-scrollbar py-4 border-r border-gray-50">
                          {link.children.map((child: any) => (
                            <Link
                              key={child.name}
                              href={child.href || '#'}
                              onMouseEnter={() => {
                                setActiveMegaCategory(child.name);
                                setActiveMegaSubCategory(null);
                              }}
                              onClick={() => {
                                setActiveMegaMenu(null);
                              }}
                              className={`w-full flex items-center justify-between px-8 py-4 text-left text-[16px] transition-all duration-200 border-l-4 ${
                                activeMegaCategory === child.name || isMegaCategoryActive(child)
                                  ? "bg-[#EEF2FA]/80 text-[#F05A22] font-bold border-[#F05A22]" 
                                  : "border-transparent text-gray-700 hover:bg-gray-50 hover:text-[#F05A22]"
                              }`}
                            >
                              <span>{child.name}</span>
                              <ChevronRight className={`w-4 h-4 transition-opacity ${activeMegaCategory === child.name || isMegaCategoryActive(child) ? 'opacity-100' : 'opacity-40'}`} />
                            </Link>
                          ))}
                        </div>
                        
                        {/* Middle Column: Sub-items */}
                        <div className="w-[300px] xl:w-[320px] bg-[#EEF2FA]/40 py-8 px-10 flex flex-col">
                          {(() => {
                            const catIndex = link.children.findIndex((c: any) => c.name === activeMegaCategory);
                            const safeIndex = catIndex === -1 ? 0 : catIndex;
                            const child = link.children[safeIndex];
                            const subItems = child?.children || [];

                            return (
                              <>
                                <div className="flex flex-col space-y-2">
                                  {subItems.length > 0 ? subItems.map((sub: any, idx: number) => (
                                    <Link 
                                      key={idx}
                                      href={sub.href} 
                                      onMouseEnter={() => setActiveMegaSubCategory(sub.name)}
                                      onClick={() => setActiveMegaMenu(null)}
                                      className={`px-4 py-3 rounded-xl text-[15px] transition-all duration-200 ${
                                        activeMegaSubCategory === sub.name || isMegaSubLinkActive(sub.href)
                                          ? "bg-[#EEF2FA] text-[#F05A22] font-bold shadow-sm" 
                                          : "text-gray-700 hover:bg-[#EEF2FA]/60 hover:text-[#F05A22]"
                                      }`}
                                    >
                                      {sub.name}
                                    </Link>
                                  )) : null}
                                </div>
                                
                                <Link 
                                  href={child?.href || '#'}
                                  onClick={() => setActiveMegaMenu(null)}
                                  className="inline-flex items-center text-[#F05A22] font-bold hover:underline mt-auto pt-8 text-[15px] px-4"
                                >
                                  {navbarText.exploreAll} <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                              </>
                            );
                          })()}
                        </div>
  
                        {/* Right Column: Featured Image */}
                        <div className="flex-1 bg-white p-8 flex items-center justify-center">
                          {(() => {
                            const catIndex = link.children.findIndex((c: any) => c.name === activeMegaCategory);
                            const safeIndex = catIndex === -1 ? 0 : catIndex;
                            const child = link.children[safeIndex];
                            const subItems = child?.children || [];
                            
                            // Get image from active subcategory if hovered, otherwise from the first subcategory, fallback to child image
                        let imgSrc = (child as any)?.image || '';
                            
                            if (activeMegaSubCategory) {
                                const activeSub = subItems.find((s: any) => s.name === activeMegaSubCategory);
                                if (activeSub && activeSub.image) imgSrc = activeSub.image;
                            } else if (subItems.length > 0 && subItems[0].image) {
                                imgSrc = subItems[0].image;
                            }
                            
                            return (
                              <div className="w-full h-full rounded-2xl border border-gray-50 flex items-center justify-center overflow-hidden relative group">
                                {imgSrc ? (
                                  <img 
                                    key={imgSrc} // forces re-render/animation on source change
                                    src={imgSrc} 
                                    alt={activeMegaSubCategory || activeMegaCategory || navbarText.featuredProduct} 
                                    className="max-w-[90%] max-h-[90%] object-contain mix-blend-multiply group-hover:scale-105 transition-all duration-500 ease-out"
                                  />
                                ) : null}
                              </div>
                            );
                          })()}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                 {/* Simple Dropdown for other items with children (like Packaging Market) removed as per user request */}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden fixed inset-0 z-[120] bg-[rgba(248,249,251,0.98)] backdrop-blur-xl"
          >
            {/* NO longer hiding whatsapp, so that it remains visible just like on logospack */}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-[100dvh] flex-col"
            >
              <div className="flex items-center justify-between px-5 pt-5">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <img src="/logo.png" alt="HAILITONG Packaging" className="w-[106px] h-auto object-contain" />
                </Link>
                <button
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white text-[#1A1A1A] shadow-[0_8px_20px_rgba(0,0,0,0.1)] border border-gray-100 transition-transform duration-300 active:scale-95"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label={navbarText.closeMenu}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 pb-[130px] pt-10">
                <div className="mb-8 flex items-center justify-center gap-6 text-[#1A1A1A]">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="transition-colors hover:text-[#F05A22]">
                    <Home className="h-5 w-5" />
                  </Link>
                  <div className="h-[16px] w-[1px] bg-gray-300"></div>
                  <div className="relative">
                    <button 
                      className="flex items-center text-[15px] font-medium transition-colors hover:text-[#F05A22]"
                      onClick={() => setActiveMegaMenu(activeMegaMenu === 'lang' ? null : 'lang')}
                    >
                      <Globe className="mr-2 h-5 w-5" />
                      <span>{dict.nav.language}</span>
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${activeMegaMenu === 'lang' ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {activeMegaMenu === 'lang' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -10, height: 0 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-32 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-10 flex flex-col"
                        >
                          <button disabled={isSwitchingLanguage} onClick={() => void handleLanguageChange('en')} className={`px-4 py-3 text-center text-[15px] font-medium hover:bg-orange-50 hover:text-[#F05A22] transition-colors border-b border-gray-50 disabled:opacity-60 disabled:cursor-not-allowed ${locale === 'en' ? 'text-[#F05A22] bg-orange-50' : ''}`}>{content.navbar.languages.en}</button>
                          <button disabled={isSwitchingLanguage} onClick={() => void handleLanguageChange('es')} className={`px-4 py-3 text-center text-[15px] font-medium hover:bg-orange-50 hover:text-[#F05A22] transition-colors border-b border-gray-50 disabled:opacity-60 disabled:cursor-not-allowed ${locale === 'es' ? 'text-[#F05A22] bg-orange-50' : ''}`}>{content.navbar.languages.es}</button>
                          <button disabled={isSwitchingLanguage} onClick={() => void handleLanguageChange('ar')} className={`px-4 py-3 text-center text-[15px] font-medium hover:bg-orange-50 hover:text-[#F05A22] transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${locale === 'ar' ? 'text-[#F05A22] bg-orange-50' : ''}`}>{content.navbar.languages.ar}</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Search Input for Mobile */}
                <form onSubmit={handleSearch} className="relative mb-10">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={dict.nav.searchPlaceholder}
                    className="h-[44px] w-full rounded-[12px] border border-white/70 bg-white/80 pl-5 pr-12 text-[15px] text-gray-700 shadow-[0_10px_30px_rgba(16,24,40,0.05)] outline-none transition-all placeholder:text-[#8C93A8] focus:border-[#F05A22]/20 focus:ring-2 focus:ring-[#F05A22]/10"
                  />
                  <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Search className="h-5 w-5 text-[#9CA3AF] hover:text-[#F05A22] transition-colors" />
                  </button>
                </form>

                <div className="flex flex-col items-center">
                  {navLinks.map((link, index) => {
                    const hasChildren = Boolean(link.children?.length);
                    const isOpen = activeMobileGroup === link.name;

                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + index * 0.05, duration: 0.3 }}
                        className="w-full max-w-[280px]"
                      >
                        {hasChildren ? (
                          <button
                            className="flex w-full items-center justify-center py-4 text-[17px] font-bold tracking-[0.02em] text-[#1A1A1A] transition-colors hover:text-[#F05A22]"
                            onClick={() => setActiveMobileGroup(isOpen ? null : link.name)}
                          >
                            <span>{link.name}</span>
                            <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                          </button>
                        ) : (
                          <Link
                            href={link.href}
                            className="flex w-full items-center justify-center py-4 text-[17px] font-bold tracking-[0.02em] text-[#1A1A1A] transition-colors hover:text-[#F05A22]"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.name}
                          </Link>
                        )}

                        <AnimatePresence initial={false}>
                          {hasChildren && isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="mb-2 flex flex-col items-center gap-1 pb-3">
                                  {link.children?.map((child: any) => (
                                    <Link
                                    key={child.href}
                                    href={child.href}
                                    className="py-2 text-[14px] text-[#6B7280] transition-colors hover:text-[#F05A22]"
                                    onClick={() => {
                                      setActiveMobileGroup(null);
                                      setIsMobileMenuOpen(false);
                                    }}
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
