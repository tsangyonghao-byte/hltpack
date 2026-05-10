"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, ChevronDown, Filter, Search } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildProductCategoryPath, getProductCategoryNameFromParam, getProductCategoryNameFromPathname, getProductCategorySlug } from "@/lib/productCategorySlug";

const productText = {
  en: {
    home: "Home",
    allProducts: "All Products",
    title: "Our Products",
    searchTitle: "Search Results",
    searchIn: "in",
    search: "Search products...",
    filters: "Filters",
    categories: "Categories",
    customTitle: "Need a Custom Solution?",
    customDesc: "Our engineering team can design the perfect packaging for your specific product requirements.",
    customBtn: "Contact Experts",
    viewDetails: "View Details",
    emptyTitle: "No products found",
    emptyDesc: "We couldn't find any products matching your current filters. Try adjusting your search or selecting a different category.",
    clearFilters: "Clear Filters",
    mainCat1: "Plastic Packaging Bags",
    mainCat2: "Shrink Label Series",
    mainCat3: "High-Barrier & Metallized Films",
  },
  es: {
    home: "Inicio",
    allProducts: "Todos los productos",
    title: "Nuestros Productos",
    searchTitle: "Resultados de busqueda",
    searchIn: "en",
    search: "Buscar productos...",
    filters: "Filtros",
    categories: "Categorías",
    customTitle: "¿Necesita una solución personalizada?",
    customDesc: "Nuestro equipo de ingeniería puede diseñar el embalaje perfecto para los requisitos específicos de su producto.",
    customBtn: "Contactar expertos",
    viewDetails: "Ver detalles",
    emptyTitle: "No se encontraron productos",
    emptyDesc: "No encontramos productos que coincidan con los filtros actuales. Intente ajustar la búsqueda o seleccionar otra categoría.",
    clearFilters: "Limpiar filtros",
    mainCat1: "Bolsas de Embalaje de Plástico",
    mainCat2: "Serie de Etiquetas Termoencogibles",
    mainCat3: "Películas Metalizadas y de Alta Barrera",
  },
  ar: {
    home: "الرئيسية",
    allProducts: "كل المنتجات",
    title: "منتجاتنا",
    searchTitle: "نتائج البحث",
    searchIn: "في",
    search: "ابحث عن المنتجات...",
    filters: "الفلاتر",
    categories: "الفئات",
    customTitle: "هل تحتاج إلى حل مخصص؟",
    customDesc: "يمكن لفريقنا الهندسي تصميم التغليف المثالي وفق متطلبات منتجك الخاصة.",
    customBtn: "تواصل مع الخبراء",
    viewDetails: "عرض التفاصيل",
    emptyTitle: "لم يتم العثور على منتجات",
    emptyDesc: "لم نعثر على منتجات تطابق عوامل التصفية الحالية. جرّب تعديل البحث أو اختيار فئة أخرى.",
    clearFilters: "مسح الفلاتر",
    mainCat1: "سلسلة أكياس التغليف البلاستيكية",
    mainCat2: "سلسلة الملصقات المنكمشة",
    mainCat3: "أفلام عالية الحاجز والمعدنية",
  },
} as const;

export default function ProductsClient({ categories, products }: { categories: string[], products: any[] }) {
  const { dict, locale } = useLanguage();
  const text = productText[locale as keyof typeof productText] || productText.en;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>(text.allProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlasticBagsOpen, setIsPlasticBagsOpen] = useState(true);
  const [isHighBarrierOpen, setIsHighBarrierOpen] = useState(true);
  const ITEMS_PER_PAGE = 9;

  // Hardcoded subcategories for the first main category based on DB seeds
  const plasticBagSubs = [
    "Custom Pet Supplies Bags",
    "Tea Bags",
    "Custom Food Bags",
    "Medical Mask Bags",
    "Toy Bags",
    "Shaped Bags",
    "Ziplock Bags",
    "Mask Bags",
    "Kraft Paper Bags",
    "Bubble Bags",
    "Spout Pouches",
    "Foil-Clear Bags"
  ];

  // Hardcoded subcategories for the new High-Barrier & Metallized Films category
  const highBarrierSubs = [
    "Transparent High-Barrier Films (AlOx)",
    "Metallized Films (VMPET/VMCPP)",
    "Specialty & Functional Films",
    "Recyclable Mono-Materials"
  ];
  const subcategoryLabels = {
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
      "Shrink Label Series": productText.en.mainCat2,
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
      "Shrink Label Series": productText.es.mainCat2,
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
      "Shrink Label Series": productText.ar.mainCat2,
    },
  } as const;
  const labelMap = subcategoryLabels[locale as keyof typeof subcategoryLabels] || subcategoryLabels.en;
  const getCategoryLabel = (name: string) => labelMap[name as keyof typeof labelMap] || name;
  const getCanonicalCategory = (name: string) => {
    const matched = Object.entries(labelMap).find(([, value]) => value === name);
    return matched?.[0] || name;
  };

  const syncFiltersFromUrl = () => {
    const categoryParam =
      getProductCategoryNameFromPathname(pathname) ||
      getProductCategoryNameFromParam(searchParams.get("category"));
    const searchParam = searchParams.get("search");
    const isPlasticCategory =
      categoryParam === "Plastic Packaging Bags" || Boolean(categoryParam && plasticBagSubs.includes(categoryParam));
    const isHighBarrierCategory =
      categoryParam === "High-Barrier & Metallized Films" || Boolean(categoryParam && highBarrierSubs.includes(categoryParam));

    setIsPlasticBagsOpen(isPlasticCategory || !categoryParam);
    setIsHighBarrierOpen(isHighBarrierCategory || !categoryParam);

    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery("");
    }

    if (!categoryParam) {
      setActiveCategory(text.allProducts);
      return;
    }

    if (categoryParam === "Plastic Packaging Bags") {
      setActiveCategory(text.mainCat1);
      return;
    }

    if (categoryParam === "High-Barrier & Metallized Films") {
      setActiveCategory(text.mainCat3);
      return;
    }

    setActiveCategory(getCategoryLabel(categoryParam));
  };

  const updateUrlFilters = (nextCategory?: string, nextSearch?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextSearch !== undefined) {
      if (nextSearch.trim()) {
        params.set("search", nextSearch.trim());
      } else {
        params.delete("search");
      }
    }

    if (nextCategory !== undefined) {
      if (
        nextCategory === text.allProducts ||
        !nextCategory
      ) {
        params.delete("category");
      } else {
        const categoryName =
          nextCategory === text.mainCat1
            ? "Plastic Packaging Bags"
            : nextCategory === text.mainCat3
              ? "High-Barrier & Metallized Films"
              : nextCategory === text.mainCat2
                ? "Shrink Label Series"
                : getCanonicalCategory(nextCategory);
        const categoryPath = buildProductCategoryPath(categoryName);
        const query = params.toString();
        router.push(query ? `${categoryPath}?${query}` : categoryPath, { scroll: false });
        return;
      }
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  // Read URL params whenever route search params change
  useEffect(() => {
    syncFiltersFromUrl();
  }, [searchParams, text.allProducts, text.mainCat1, text.mainCat3]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    setActiveCategory((current) =>
      current === productText.en.allProducts ||
      current === productText.es.allProducts ||
      current === productText.ar.allProducts
        ? text.allProducts
        : current
    );
  }, [text.allProducts]);

  const matchesActiveCategory = (productCategory: string) => {
    let matchesCategory = false;
    const activeCanonical = getCanonicalCategory(activeCategory);

    if (activeCategory === text.allProducts) {
      matchesCategory = true;
    } else if (activeCategory === text.mainCat1) {
      matchesCategory = plasticBagSubs.includes(productCategory);
    } else if (activeCategory === text.mainCat3) {
      matchesCategory = highBarrierSubs.includes(productCategory);
    } else {
      matchesCategory = productCategory === activeCanonical;
    }

    return matchesCategory;
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = matchesActiveCategory(product.category);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.categoryLabel?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const pageTitle =
    searchQuery.trim() && activeCategory !== text.allProducts
      ? `${activeCategory}`
      : searchQuery.trim()
        ? text.searchTitle
        : activeCategory === text.allProducts
          ? text.title
          : activeCategory;

  const pageSubtitle =
    searchQuery.trim() && activeCategory !== text.allProducts
      ? `"${searchQuery.trim()}" ${text.searchIn} ${activeCategory}`
      : searchQuery.trim()
        ? `"${searchQuery.trim()}"`
        : activeCategory === text.allProducts
          ? dict.nav.products
          : activeCategory;

  const breadcrumbTrail = [
    text.home,
    text.title,
    ...(activeCategory !== text.allProducts ? [activeCategory] : []),
  ];

  const heroBackgroundImage = "/images/factory/印刷车间/10003.png";

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Helper to generate smart pagination array (e.g., 1, 2, 3, ..., 18)
  const getPaginationArray = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }).map((_, i) => i + 1);
    }
    
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    
    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Page Hero Banner */}
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#111111] flex flex-col items-center justify-center overflow-hidden min-h-[350px] md:min-h-[450px]">
        {/* Background Image / Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity grayscale"
          style={{ backgroundImage: `url('${heroBackgroundImage}')` }}
        ></div>
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/55"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center flex-grow">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-wrap items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/65"
          >
            {breadcrumbTrail.map((item, index) => (
              <div key={`${item}-${index}`} className="flex items-center gap-3">
                {index > 0 ? <span className="text-[#F05A22]">/</span> : null}
                <span className={index === breadcrumbTrail.length - 1 ? "text-white" : ""}>{item}</span>
              </div>
            ))}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
            <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              {dict.nav.products}
            </span>
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white mb-6 tracking-tight uppercase leading-tight"
          >
            {pageTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="max-w-2xl text-sm md:text-base text-white/70 tracking-[0.08em] uppercase"
          >
            {pageSubtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <div className="relative w-full max-w-xs">
                <input 
                  type="text" 
                  placeholder={text.search} 
                  className="w-full pl-10 pr-4 py-3 rounded-none border border-gray-200 focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22] text-[14px] transition-all bg-white"
                  value={searchQuery}
                  onChange={(e) => {
                    const nextValue = e.target.value;
                    setSearchQuery(nextValue);
                    updateUrlFilters(undefined, nextValue);
                  }}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <button 
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="ml-4 flex items-center gap-2 px-5 py-3 bg-[#1A1A1A] border border-[#1A1A1A] rounded-none text-[14px] font-bold text-white uppercase tracking-wider"
              >
                <Filter className="w-4 h-4" />
                {text.filters}
              </button>
            </div>

            {/* Sidebar - Categories */}
            <div className={clsx(
              "lg:w-[280px] shrink-0",
              isMobileFilterOpen ? "block" : "hidden lg:block"
            )}>
              <div className="bg-transparent sticky top-24">
                
                {/* Desktop Search */}
                <div className="hidden lg:block relative mb-10">
                  <input 
                    type="text" 
                    placeholder={text.search} 
                    className="w-full pl-10 pr-4 py-4 rounded-none border border-gray-200 focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22] text-[14px] transition-all bg-white"
                    value={searchQuery}
                    onChange={(e) => {
                      const nextValue = e.target.value;
                      setSearchQuery(nextValue);
                      updateUrlFilters(undefined, nextValue);
                    }}
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-4 h-[2px] bg-[#F05A22]"></div>
                  <h3 className="text-[13px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                    {text.categories}
                  </h3>
                </div>

                <ul className="space-y-1 mb-12">
                  {/* All Products */}
                  <li>
                    <button
                      onClick={() => {
                        setActiveCategory(text.allProducts);
                        setIsMobileFilterOpen(false);
                        updateUrlFilters(text.allProducts);
                      }}
                      className={clsx(
                        "w-full text-left px-5 py-4 rounded-none text-[14px] font-bold transition-all duration-300 flex items-center justify-between group border-l-2",
                        activeCategory === text.allProducts 
                          ? "bg-white border-[#F05A22] text-[#1A1A1A] shadow-sm" 
                          : "bg-transparent border-transparent text-gray-500 hover:bg-white hover:text-[#1A1A1A] hover:border-gray-200"
                      )}
                    >
                      {text.allProducts}
                      {activeCategory === text.allProducts && (
                        <motion.div layoutId="activeArrow">
                          <ChevronRight className="w-4 h-4 text-[#F05A22]" />
                        </motion.div>
                      )}
                    </button>
                  </li>

                  {/* Main Category 1 with Subcategories */}
                  <li>
                    <div
                      className={clsx(
                        "w-full text-left px-5 py-4 rounded-none text-[14px] font-bold transition-all duration-300 flex items-center justify-between group border-l-2 cursor-pointer",
                        (activeCategory === text.mainCat1 || plasticBagSubs.includes(getCanonicalCategory(activeCategory)))
                          ? "bg-white border-[#F05A22] text-[#1A1A1A] shadow-sm" 
                          : "bg-transparent border-transparent text-gray-500 hover:bg-white hover:text-[#1A1A1A] hover:border-gray-200"
                      )}
                      onClick={() => {
                        setActiveCategory(text.mainCat1);
                        setIsPlasticBagsOpen(!isPlasticBagsOpen);
                        updateUrlFilters(text.mainCat1);
                      }}
                    >
                      {text.mainCat1}
                      <motion.div 
                        animate={{ rotate: isPlasticBagsOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className={clsx(
                          "w-4 h-4", 
                          (activeCategory === text.mainCat1 || plasticBagSubs.includes(getCanonicalCategory(activeCategory))) ? "text-[#F05A22]" : "text-gray-400 group-hover:text-[#1A1A1A]"
                        )} />
                      </motion.div>
                    </div>

                    {/* Subcategories Dropdown */}
                    <motion.div
                      initial={false}
                      animate={{ height: isPlasticBagsOpen ? "auto" : 0, opacity: isPlasticBagsOpen ? 1 : 0 }}
                      className="overflow-hidden bg-gray-50"
                    >
                      <ul className="py-2">
                        {plasticBagSubs.map((sub) => (
                          <li key={sub}>
                            <button
                              onClick={() => {
                                setActiveCategory(getCategoryLabel(sub));
                                setIsMobileFilterOpen(false);
                                updateUrlFilters(getCategoryLabel(sub));
                              }}
                              className={clsx(
                                "w-full text-left pl-10 pr-5 py-2.5 text-[13px] transition-colors flex items-center justify-between group",
                                getCanonicalCategory(activeCategory) === sub 
                                  ? "text-[#F05A22] font-bold bg-orange-50/50" 
                                  : "text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100"
                              )}
                            >
                              {getCategoryLabel(sub)}
                              {getCanonicalCategory(activeCategory) === sub && <ChevronRight className="w-3 h-3 text-[#F05A22]" />}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </li>

                  {/* Main Category 2 */}
                  <li>
                    <button
                      onClick={() => {
                        setActiveCategory(text.mainCat2);
                        setIsMobileFilterOpen(false);
                        updateUrlFilters(text.mainCat2);
                      }}
                      className={clsx(
                        "w-full text-left px-5 py-4 rounded-none text-[14px] font-bold transition-all duration-300 flex items-center justify-between group border-l-2",
                        activeCategory === text.mainCat2 
                          ? "bg-white border-[#F05A22] text-[#1A1A1A] shadow-sm" 
                          : "bg-transparent border-transparent text-gray-500 hover:bg-white hover:text-[#1A1A1A] hover:border-gray-200"
                      )}
                    >
                      {text.mainCat2}
                      {activeCategory === text.mainCat2 && (
                        <motion.div layoutId="activeArrow">
                          <ChevronRight className="w-4 h-4 text-[#F05A22]" />
                        </motion.div>
                      )}
                    </button>
                  </li>
                  {/* Main Category 3 (High-Barrier Films) with Subcategories */}
                  <li>
                    <div
                      className={clsx(
                        "w-full text-left px-5 py-4 rounded-none text-[14px] font-bold transition-all duration-300 flex items-center justify-between group border-l-2 cursor-pointer",
                        (activeCategory === text.mainCat3 || highBarrierSubs.includes(getCanonicalCategory(activeCategory)))
                          ? "bg-white border-[#F05A22] text-[#1A1A1A] shadow-sm" 
                          : "bg-transparent border-transparent text-gray-500 hover:bg-white hover:text-[#1A1A1A] hover:border-gray-200"
                      )}
                      onClick={() => {
                        setActiveCategory(text.mainCat3);
                        setIsHighBarrierOpen(!isHighBarrierOpen);
                        updateUrlFilters(text.mainCat3);
                      }}
                    >
                      {text.mainCat3}
                      <motion.div 
                        animate={{ rotate: isHighBarrierOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className={clsx(
                          "w-4 h-4", 
                          (activeCategory === text.mainCat3 || highBarrierSubs.includes(getCanonicalCategory(activeCategory))) ? "text-[#F05A22]" : "text-gray-400 group-hover:text-[#1A1A1A]"
                        )} />
                      </motion.div>
                    </div>

                    {/* High-Barrier Subcategories Dropdown */}
                    <motion.div
                      initial={false}
                      animate={{ height: isHighBarrierOpen ? "auto" : 0, opacity: isHighBarrierOpen ? 1 : 0 }}
                      className="overflow-hidden bg-gray-50"
                    >
                      <ul className="py-2">
                        {highBarrierSubs.map((sub) => (
                          <li key={sub}>
                            <button
                              onClick={() => {
                                setActiveCategory(getCategoryLabel(sub));
                                setIsMobileFilterOpen(false);
                                updateUrlFilters(getCategoryLabel(sub));
                              }}
                              className={clsx(
                                "w-full text-left pl-10 pr-5 py-2.5 text-[13px] transition-colors flex items-center justify-between group",
                                getCanonicalCategory(activeCategory) === sub 
                                  ? "text-[#F05A22] font-bold bg-orange-50/50" 
                                  : "text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100"
                              )}
                            >
                              {getCategoryLabel(sub)}
                              {getCanonicalCategory(activeCategory) === sub && <ChevronRight className="w-3 h-3 text-[#F05A22]" />}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </li>
                </ul>

                {/* Contact Banner in Sidebar */}
                <div className="bg-[#111111] p-8 text-white relative overflow-hidden rounded-none border border-gray-800">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#F05A22] rounded-full blur-3xl opacity-20"></div>
                  <h4 className="text-[18px] font-bold mb-4 tracking-wide">{text.customTitle}</h4>
                  <p className="text-[14px] text-gray-400 font-light mb-8 leading-relaxed">{text.customDesc}</p>
                  <Link href="/contact" className="inline-flex items-center justify-center w-full px-6 py-4 bg-[#F05A22] hover:bg-[#D44A18] text-white rounded-none text-[13px] font-bold uppercase tracking-wider transition-colors duration-300">
                    {text.customBtn}
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                  {pageTitle} <span className="text-gray-400 text-lg font-light ml-2">({filteredProducts.length})</span>
                </h2>
              </div>

              {filteredProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
                    {currentProducts.map((product, index) => (
                      <Link 
                        href={`/products/${product.slug || product.id}`}
                        key={product.id}
                      >
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="group bg-white rounded-none overflow-hidden border border-gray-200 hover:border-[#F05A22] transition-colors duration-500 cursor-pointer flex flex-col h-full"
                      >
                        <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-100">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="object-contain w-full h-full p-2 sm:p-4 transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                          />
                        </div>

                        {/* Content Area */}
                        <div className="p-3 sm:p-6 flex flex-col flex-grow">
                          <h3 className="text-[13px] sm:text-[16px] font-medium text-[#1A1A1A] mb-2 sm:mb-4 leading-snug group-hover:text-[#F05A22] transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                          
                          <div className="pt-2 sm:pt-4 border-t border-gray-100 mt-auto flex items-center justify-end">
                            <span className="text-[11px] sm:text-[12px] font-medium text-gray-400 group-hover:text-[#F05A22] transition-colors flex items-center gap-1">
                              {text.viewDetails}
                              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </span>
                          </div>
                        </div>
                      </motion.div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-16 flex justify-center items-center gap-2">
                      <button
                        onClick={() => {
                          setCurrentPage(p => Math.max(1, p - 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-none flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 disabled:hover:border-gray-200 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                      </button>
                      
                      {getPaginationArray().map((pageNum, index) => {
                        if (pageNum === '...') {
                          return (
                            <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-400 font-bold">
                              ...
                            </span>
                          );
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => {
                              setCurrentPage(pageNum as number);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={clsx(
                              "w-10 h-10 rounded-none flex items-center justify-center text-[14px] font-bold transition-colors",
                              currentPage === pageNum 
                                ? "bg-[#1A1A1A] text-white border border-[#1A1A1A]" 
                                : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                            )}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => {
                          setCurrentPage(p => Math.min(totalPages, p + 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-none flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 disabled:hover:border-gray-200 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-none border border-dashed border-gray-200 p-12 text-center flex flex-col items-center justify-center h-[400px]">
                  <div className="w-16 h-16 bg-gray-50 rounded-none flex items-center justify-center mb-6">
                    <Search className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{text.emptyTitle}</h3>
                  <p className="text-gray-500 max-w-md mx-auto font-light leading-relaxed mb-8">{text.emptyDesc}</p>
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory(text.allProducts);
                      updateUrlFilters(text.allProducts, "");
                    }}
                    className="px-8 py-3 bg-[#1A1A1A] text-white rounded-none text-[13px] font-bold uppercase tracking-wider hover:bg-[#F05A22] transition-colors"
                  >
                    {text.clearFilters}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
