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
    mainCat1: "Flexible Packaging",
    mainCat2: "Shrink Labels",
    mainCat3: "Rollstock & Films",
    mainCat4: "Lidding Film",
    mainCat5: "Protective Packaging",
    mainCat6: "Specialty",
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
    mainCat1: "Embalaje Flexible",
    mainCat2: "Etiquetas Termoencogibles",
    mainCat3: "Bobinas y Películas",
    mainCat4: "Película de Tapa",
    mainCat5: "Embalaje Protector",
    mainCat6: "Especialidades",
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
    customDesc: "يمكن لفريقنا الهندسي تصميم التغليف المثالي وفق متمتطلبات منتجك الخاصة.",
    customBtn: "تواصل مع الخبراء",
    viewDetails: "عرض التفاصيل",
    emptyTitle: "لم يتم العثور على منتجات",
    emptyDesc: "لم نعثر على منتجات تطابق عوامل التصفية الحالية. جرّب تعديل البحث أو اختيار فئة أخرى.",
    clearFilters: "مسح الفلاتر",
    mainCat1: "التغليف المرن",
    mainCat2: "الملصقات المنكمشة",
    mainCat3: "رول و أفلام",
    mainCat4: "غطاء الفيلم",
    mainCat5: "التغليف الواقي",
    mainCat6: "المنتجات الخاصة",
  },
} as const;

export default function ProductsClient({
  categories,
  products,
  initialCategory,
  initialSearchQuery
}: {
  categories: string[];
  products: any[];
  initialCategory?: string | null;
  initialSearchQuery?: string | null;
}) {
  const { dict, locale } = useLanguage();
  const text = productText[locale as keyof typeof productText] || productText.en;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const flexiblePackagingSubs = [
    "Custom Pet Supplies Bags",
    "Tea Bags",
    "Custom Food Bags",
    "Medical Mask Bags",
    "Toy Bags",
    "Shaped Bags",
    "Ziplock Bags",
    "Mask Bags",
    "Kraft Paper Bags",
    "Spout Pouches",
    "Foil-Clear Bags"
  ];

  const rollstockFilmsSubs = [
    "Transparent High-Barrier Films (AlOx)",
    "Metallized Films (VMPET/VMCPP)",
    "Specialty & Functional Films",
    "Recyclable Mono-Materials"
  ];

  const shrinkLabelsSubs = [
    "Shrink Sleeve Labels",
    "Full Body Shrink Sleeves",
    "Tamper Evident Shrink Bands",
    "Printed Shrink Label Rollstock"
  ];

  const protectivePackagingSubs = [
    "BOPP Carton Sealing Tape",
    "Bubble Mailer & Bag",
    "Poly Mailers"
  ];

  const specialtySubs = [
    "Microwavable Pouch",
    "Retort Pouch",
    "Anti-static Packaging",
    "Moisture Barrier Packaging"
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
      "Spout Pouches": "Spout Pouches",
      "Foil-Clear Bags": "Foil-Clear Bags",
      "Transparent High-Barrier Films (AlOx)": "Transparent High-Barrier Films (AlOx)",
      "Metallized Films (VMPET/VMCPP)": "Metallized Films (VMPET/VMCPP)",
      "Specialty & Functional Films": "Specialty & Functional Films",
      "Recyclable Mono-Materials": "Recyclable Mono-Materials",
      "Shrink Sleeve Labels": "Shrink Sleeve Labels",
      "Full Body Shrink Sleeves": "Full Body Shrink Sleeves",
      "Tamper Evident Shrink Bands": "Tamper Evident Shrink Bands",
      "Printed Shrink Label Rollstock": "Printed Shrink Label Rollstock",
      "BOPP Carton Sealing Tape": "BOPP Carton Sealing Tape",
      "Bubble Mailer & Bag": "Bubble Mailer & Bag",
      "Poly Mailers": "Poly Mailers",
      "Microwavable Pouch": "Microwavable Pouch",
      "Retort Pouch": "Retort Pouch",
      "Anti-static Packaging": "Anti-static Packaging",
      "Moisture Barrier Packaging": "Moisture Barrier Packaging",
      "Flexible Packaging": productText.en.mainCat1,
      "Shrink Labels": productText.en.mainCat2,
      "Rollstock & Films": productText.en.mainCat3,
      "Lidding Film": productText.en.mainCat4,
      "Protective Packaging": productText.en.mainCat5,
      "Specialty": productText.en.mainCat6,
    },
    es: {
      "Custom Pet Supplies Bags": "Bolsas personalizadas para mascotas",
      "Tea Bags": "Bolsas para té",
      "Custom Food Bags": "Bolsas personalizadas para alimentos",
      "Medical Mask Bags": "Bolsas para mascarillas médicas",
      "Toy Bags": "Bolsas para juguetes",
      "Shaped Bags": "Bolsas con forma",
      "Ziplock Bags": "Bolsas ziplock",
      "Mask Bags": "Bolsas para mascarillas",
      "Kraft Paper Bags": "Bolsas de papel kraft",
      "Spout Pouches": "Bolsas con boquilla",
      "Foil-Clear Bags": "Bolsas foil transparentes",
      "Transparent High-Barrier Films (AlOx)": "Películas transparentes de alta barrera (AlOx)",
      "Metallized Films (VMPET/VMCPP)": "Películas metalizadas (VMPET/VMCPP)",
      "Specialty & Functional Films": "Películas especiales y funcionales",
      "Recyclable Mono-Materials": "Monomateriales reciclables",
      "Shrink Sleeve Labels": "Etiquetas de Manga Termoencogible",
      "Full Body Shrink Sleeves": "Mangas Termoencogibles de Cuerpo Completo",
      "Tamper Evident Shrink Bands": "Bandas de Garantía Termoencogibles",
      "Printed Shrink Label Rollstock": "Bobinas de Etiquetas Termoencogibles Impresas",
      "BOPP Carton Sealing Tape": "Cinta de Embalaje BOPP",
      "Bubble Mailer & Bag": "Bolsas y Sobres de Burbuja",
      "Poly Mailers": "Bolsas de Correo de Polietileno",
      "Microwavable Pouch": "Bolsa para Microondas",
      "Retort Pouch": "Bolsa Retorta",
      "Anti-static Packaging": "Embalaje Antiestático",
      "Moisture Barrier Packaging": "Embalaje de Barrera contra la Humedad",
      "Flexible Packaging": productText.es.mainCat1,
      "Shrink Labels": productText.es.mainCat2,
      "Rollstock & Films": productText.es.mainCat3,
      "Lidding Film": productText.es.mainCat4,
      "Protective Packaging": productText.es.mainCat5,
      "Specialty": productText.es.mainCat6,
    },
    ar: {
      "Custom Pet Supplies Bags": "أكياس مخصصة لمستلزمات الحيوانات الأليفة",
      "Tea Bags": "أكياس الشاي",
      "Custom Food Bags": "أكياس مخصصة للأغذية",
      "Medical Mask Bags": "أكياس للكمامات الطبية",
      "Toy Bags": "أكياس الألعاب",
      "Shaped Bags": "أكياس مشكلة",
      "Ziplock Bags": "أكياس بسحاب",
      "Mask Bags": "أكياس الأقنعة",
      "Kraft Paper Bags": "أكياس ورق كرافت",
      "Spout Pouches": "أكياس بفوهة",
      "Foil-Clear Bags": "أكياس شفافة مع رقائق",
      "Transparent High-Barrier Films (AlOx)": "أفلام شفافة عالية الحاجز (AlOx)",
      "Metallized Films (VMPET/VMCPP)": "أفلام معدنية (VMPET/VMCPP)",
      "Specialty & Functional Films": "أفلام متخصصة ووظيفية",
      "Recyclable Mono-Materials": "مواد أحادية قابلة لإعادة التدوير",
      "Shrink Sleeve Labels": "ملصقات الأكمام المنكمشة",
      "Full Body Shrink Sleeves": "أكمام منكمشة كاملة للجسم",
      "Tamper Evident Shrink Bands": "أشرطة منكمشة مانعة للتلاعب",
      "Printed Shrink Label Rollstock": "رول ملصقات منكمشة مطبوعة",
      "BOPP Carton Sealing Tape": "شريط تغليف الكرتون BOPP",
      "Bubble Mailer & Bag": "أكياس وشواحن فقاعية",
      "Poly Mailers": "مغلفات البريد البولي",
      "Microwavable Pouch": "كيس قابل للتسخين في الميكروويف",
      "Retort Pouch": "كيس蒸煮 (ريتورت)",
      "Anti-static Packaging": "تغليف مضاد للاستاتيكية",
      "Moisture Barrier Packaging": "تغليف حاجز الرطوبة",
      "Flexible Packaging": productText.ar.mainCat1,
      "Shrink Labels": productText.ar.mainCat2,
      "Rollstock & Films": productText.ar.mainCat3,
      "Lidding Film": productText.ar.mainCat4,
      "Protective Packaging": productText.ar.mainCat5,
      "Specialty": productText.ar.mainCat6,
    },
  } as const;
  const labelMap = subcategoryLabels[locale as keyof typeof subcategoryLabels] || subcategoryLabels.en;
  const getCategoryLabel = (name: string) => labelMap[name as keyof typeof labelMap] || name;
  const getCanonicalCategory = (name: string) => {
    const matched = Object.entries(labelMap).find(([, value]) => value === name);
    return matched?.[0] || name;
  };

  const categoryParam =
    initialCategory ||
    getProductCategoryNameFromPathname(pathname) ||
    getProductCategoryNameFromParam(searchParams.get("category"));
  const searchParam = initialSearchQuery || searchParams.get("search") || "";

  const isFlexibleCategory =
    categoryParam === "Flexible Packaging" || Boolean(categoryParam && flexiblePackagingSubs.includes(categoryParam));
  const isRollstockCategory =
    categoryParam === "Rollstock & Films" || Boolean(categoryParam && rollstockFilmsSubs.includes(categoryParam));
  const isShrinkCategory =
    categoryParam === "Shrink Labels" || Boolean(categoryParam && shrinkLabelsSubs.includes(categoryParam));
  const isLiddingCategory = categoryParam === "Lidding Film";
  const isProtectiveCategory =
    categoryParam === "Protective Packaging" || Boolean(categoryParam && protectivePackagingSubs.includes(categoryParam));
  const isSpecialtyCategory =
    categoryParam === "Specialty" || Boolean(categoryParam && specialtySubs.includes(categoryParam));

  const getInitialActiveCategory = () => {
    if (!categoryParam) {
      return text.allProducts;
    }
    if (categoryParam === "Flexible Packaging") return text.mainCat1;
    if (categoryParam === "Shrink Labels") return text.mainCat2;
    if (categoryParam === "Rollstock & Films") return text.mainCat3;
    if (categoryParam === "Lidding Film") return text.mainCat4;
    if (categoryParam === "Protective Packaging") return text.mainCat5;
    if (categoryParam === "Specialty") return text.mainCat6;
    return getCategoryLabel(categoryParam);
  };

  const [activeCategory, setActiveCategory] = useState<string>(getInitialActiveCategory());
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlexibleOpen, setIsFlexibleOpen] = useState(isFlexibleCategory || !categoryParam);
  const [isRollstockOpen, setIsRollstockOpen] = useState(isRollstockCategory || !categoryParam);
  const [isShrinkOpen, setIsShrinkOpen] = useState(isShrinkCategory);
  const [isProtectiveOpen, setIsProtectiveOpen] = useState(isProtectiveCategory);
  const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(isSpecialtyCategory);
  const ITEMS_PER_PAGE = 9;

  const syncFiltersFromUrl = () => {
    const categoryParam =
      getProductCategoryNameFromPathname(pathname) ||
      getProductCategoryNameFromParam(searchParams.get("category"));
    const searchParam = searchParams.get("search");

    const isFlexibleCategory =
      categoryParam === "Flexible Packaging" || Boolean(categoryParam && flexiblePackagingSubs.includes(categoryParam));
    const isRollstockCategory =
      categoryParam === "Rollstock & Films" || Boolean(categoryParam && rollstockFilmsSubs.includes(categoryParam));
    const isShrinkCategory =
      categoryParam === "Shrink Labels" || Boolean(categoryParam && shrinkLabelsSubs.includes(categoryParam));
    const isProtectiveCategory =
      categoryParam === "Protective Packaging" || Boolean(categoryParam && protectivePackagingSubs.includes(categoryParam));
    const isSpecialtyCategory =
      categoryParam === "Specialty" || Boolean(categoryParam && specialtySubs.includes(categoryParam));

    setIsFlexibleOpen(isFlexibleCategory || !categoryParam);
    setIsRollstockOpen(isRollstockCategory || !categoryParam);
    setIsShrinkOpen(isShrinkCategory);
    setIsProtectiveOpen(isProtectiveCategory);
    setIsSpecialtyOpen(isSpecialtyCategory);

    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery("");
    }

    if (!categoryParam) {
      setActiveCategory(text.allProducts);
      return;
    }

    if (categoryParam === "Flexible Packaging") {
      setActiveCategory(text.mainCat1);
      return;
    }
    if (categoryParam === "Shrink Labels") {
      setActiveCategory(text.mainCat2);
      return;
    }
    if (categoryParam === "Rollstock & Films") {
      setActiveCategory(text.mainCat3);
      return;
    }
    if (categoryParam === "Lidding Film") {
      setActiveCategory(text.mainCat4);
      return;
    }
    if (categoryParam === "Protective Packaging") {
      setActiveCategory(text.mainCat5);
      return;
    }
    if (categoryParam === "Specialty") {
      setActiveCategory(text.mainCat6);
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
        const query = params.toString();
        router.push(query ? `/products?${query}` : "/products", { scroll: false });
        return;
      } else {
        const categoryName =
          nextCategory === text.mainCat1
            ? "Flexible Packaging"
            : nextCategory === text.mainCat2
              ? "Shrink Labels"
              : nextCategory === text.mainCat3
                ? "Rollstock & Films"
                : nextCategory === text.mainCat4
                  ? "Lidding Film"
                  : nextCategory === text.mainCat5
                    ? "Protective Packaging"
                    : nextCategory === text.mainCat6
                      ? "Specialty"
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

  // Read URL params whenever route search params or pathname changes
  useEffect(() => {
    syncFiltersFromUrl();
  }, [searchParams, pathname, text.allProducts, text.mainCat1, text.mainCat2, text.mainCat3, text.mainCat4, text.mainCat5, text.mainCat6]);

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
      matchesCategory = productCategory === "Flexible Packaging" || flexiblePackagingSubs.includes(productCategory);
    } else if (activeCategory === text.mainCat2) {
      matchesCategory = productCategory === "Shrink Labels" || shrinkLabelsSubs.includes(productCategory);
    } else if (activeCategory === text.mainCat3) {
      matchesCategory = productCategory === "Rollstock & Films" || rollstockFilmsSubs.includes(productCategory);
    } else if (activeCategory === text.mainCat4) {
      matchesCategory = productCategory === "Lidding Film";
    } else if (activeCategory === text.mainCat5) {
      matchesCategory = productCategory === "Protective Packaging" || protectivePackagingSubs.includes(productCategory);
    } else if (activeCategory === text.mainCat6) {
      matchesCategory = productCategory === "Specialty" || specialtySubs.includes(productCategory);
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

                  {/* Main Category 1 (Flexible Packaging) with Subcategories */}
                  <li>
                    <div
                      className={clsx(
                        "w-full text-left px-5 py-4 rounded-none text-[14px] font-bold transition-all duration-300 flex items-center justify-between group border-l-2 cursor-pointer",
                        (activeCategory === text.mainCat1 || flexiblePackagingSubs.includes(getCanonicalCategory(activeCategory)))
                          ? "bg-white border-[#F05A22] text-[#1A1A1A] shadow-sm" 
                          : "bg-transparent border-transparent text-gray-500 hover:bg-white hover:text-[#1A1A1A] hover:border-gray-200"
                      )}
                      onClick={() => {
                        setActiveCategory(text.mainCat1);
                        setIsFlexibleOpen(!isFlexibleOpen);
                        updateUrlFilters(text.mainCat1);
                      }}
                    >
                      {text.mainCat1}
                      <motion.div 
                        animate={{ rotate: isFlexibleOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className={clsx(
                          "w-4 h-4", 
                          (activeCategory === text.mainCat1 || flexiblePackagingSubs.includes(getCanonicalCategory(activeCategory))) ? "text-[#F05A22]" : "text-gray-400 group-hover:text-[#1A1A1A]"
                        )} />
                      </motion.div>
                    </div>

                    {/* Subcategories Dropdown */}
                    <motion.div
                      initial={false}
                      animate={{ height: isFlexibleOpen ? "auto" : 0, opacity: isFlexibleOpen ? 1 : 0 }}
                      className="overflow-hidden bg-gray-50"
                    >
                      <ul className="py-2">
                        {flexiblePackagingSubs.map((sub) => (
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

                  {/* Main Category 2 (Shrink Labels) with Subcategories */}
                  <li>
                    <div
                      className={clsx(
                        "w-full text-left px-5 py-4 rounded-none text-[14px] font-bold transition-all duration-300 flex items-center justify-between group border-l-2 cursor-pointer",
                        (activeCategory === text.mainCat2 || shrinkLabelsSubs.includes(getCanonicalCategory(activeCategory)))
                          ? "bg-white border-[#F05A22] text-[#1A1A1A] shadow-sm" 
                          : "bg-transparent border-transparent text-gray-500 hover:bg-white hover:text-[#1A1A1A] hover:border-gray-200"
                      )}
                      onClick={() => {
                        setActiveCategory(text.mainCat2);
                        setIsShrinkOpen(!isShrinkOpen);
                        updateUrlFilters(text.mainCat2);
                      }}
                    >
                      {text.mainCat2}
                      <motion.div 
                        animate={{ rotate: isShrinkOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className={clsx(
                          "w-4 h-4", 
                          (activeCategory === text.mainCat2 || shrinkLabelsSubs.includes(getCanonicalCategory(activeCategory))) ? "text-[#F05A22]" : "text-gray-400 group-hover:text-[#1A1A1A]"
                        )} />
                      </motion.div>
                    </div>

                    {/* Subcategories Dropdown */}
                    <motion.div
                      initial={false}
                      animate={{ height: isShrinkOpen ? "auto" : 0, opacity: isShrinkOpen ? 1 : 0 }}
                      className="overflow-hidden bg-gray-50"
                    >
                      <ul className="py-2">
                        {shrinkLabelsSubs.map((sub) => (
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

                  {/* Main Category 3 (Rollstock & Films) with Subcategories */}
                  <li>
                    <div
                      className={clsx(
                        "w-full text-left px-5 py-4 rounded-none text-[14px] font-bold transition-all duration-300 flex items-center justify-between group border-l-2 cursor-pointer",
                        (activeCategory === text.mainCat3 || rollstockFilmsSubs.includes(getCanonicalCategory(activeCategory)))
                          ? "bg-white border-[#F05A22] text-[#1A1A1A] shadow-sm" 
                          : "bg-transparent border-transparent text-gray-500 hover:bg-white hover:text-[#1A1A1A] hover:border-gray-200"
                      )}
                      onClick={() => {
                        setActiveCategory(text.mainCat3);
                        setIsRollstockOpen(!isRollstockOpen);
                        updateUrlFilters(text.mainCat3);
                      }}
                    >
                      {text.mainCat3}
                      <motion.div 
                        animate={{ rotate: isRollstockOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className={clsx(
                          "w-4 h-4", 
                          (activeCategory === text.mainCat3 || rollstockFilmsSubs.includes(getCanonicalCategory(activeCategory))) ? "text-[#F05A22]" : "text-gray-400 group-hover:text-[#1A1A1A]"
                        )} />
                      </motion.div>
                    </div>

                    {/* Subcategories Dropdown */}
                    <motion.div
                      initial={false}
                      animate={{ height: isRollstockOpen ? "auto" : 0, opacity: isRollstockOpen ? 1 : 0 }}
                      className="overflow-hidden bg-gray-50"
                    >
                      <ul className="py-2">
                        {rollstockFilmsSubs.map((sub) => (
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

                  {/* Main Category 4 (Lidding Film) */}
                  <li>
                    <button
                      onClick={() => {
                        setActiveCategory(text.mainCat4);
                        setIsMobileFilterOpen(false);
                        updateUrlFilters(text.mainCat4);
                      }}
                      className={clsx(
                        "w-full text-left px-5 py-4 rounded-none text-[14px] font-bold transition-all duration-300 flex items-center justify-between group border-l-2",
                        activeCategory === text.mainCat4 
                          ? "bg-white border-[#F05A22] text-[#1A1A1A] shadow-sm" 
                          : "bg-transparent border-transparent text-gray-500 hover:bg-white hover:text-[#1A1A1A] hover:border-gray-200"
                      )}
                    >
                      {text.mainCat4}
                      {activeCategory === text.mainCat4 && (
                        <motion.div layoutId="activeArrow">
                          <ChevronRight className="w-4 h-4 text-[#F05A22]" />
                        </motion.div>
                      )}
                    </button>
                  </li>

                  {/* Main Category 5 (Protective Packaging) with Subcategories */}
                  <li>
                    <div
                      className={clsx(
                        "w-full text-left px-5 py-4 rounded-none text-[14px] font-bold transition-all duration-300 flex items-center justify-between group border-l-2 cursor-pointer",
                        (activeCategory === text.mainCat5 || protectivePackagingSubs.includes(getCanonicalCategory(activeCategory)))
                          ? "bg-white border-[#F05A22] text-[#1A1A1A] shadow-sm" 
                          : "bg-transparent border-transparent text-gray-500 hover:bg-white hover:text-[#1A1A1A] hover:border-gray-200"
                      )}
                      onClick={() => {
                        setActiveCategory(text.mainCat5);
                        setIsProtectiveOpen(!isProtectiveOpen);
                        updateUrlFilters(text.mainCat5);
                      }}
                    >
                      {text.mainCat5}
                      <motion.div 
                        animate={{ rotate: isProtectiveOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className={clsx(
                          "w-4 h-4", 
                          (activeCategory === text.mainCat5 || protectivePackagingSubs.includes(getCanonicalCategory(activeCategory))) ? "text-[#F05A22]" : "text-gray-400 group-hover:text-[#1A1A1A]"
                        )} />
                      </motion.div>
                    </div>

                    {/* Subcategories Dropdown */}
                    <motion.div
                      initial={false}
                      animate={{ height: isProtectiveOpen ? "auto" : 0, opacity: isProtectiveOpen ? 1 : 0 }}
                      className="overflow-hidden bg-gray-50"
                    >
                      <ul className="py-2">
                        {protectivePackagingSubs.map((sub) => (
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

                  {/* Main Category 6 (Specialty) with Subcategories */}
                  <li>
                    <div
                      className={clsx(
                        "w-full text-left px-5 py-4 rounded-none text-[14px] font-bold transition-all duration-300 flex items-center justify-between group border-l-2 cursor-pointer",
                        (activeCategory === text.mainCat6 || specialtySubs.includes(getCanonicalCategory(activeCategory)))
                          ? "bg-white border-[#F05A22] text-[#1A1A1A] shadow-sm" 
                          : "bg-transparent border-transparent text-gray-500 hover:bg-white hover:text-[#1A1A1A] hover:border-gray-200"
                      )}
                      onClick={() => {
                        setActiveCategory(text.mainCat6);
                        setIsSpecialtyOpen(!isSpecialtyOpen);
                        updateUrlFilters(text.mainCat6);
                      }}
                    >
                      {text.mainCat6}
                      <motion.div 
                        animate={{ rotate: isSpecialtyOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className={clsx(
                          "w-4 h-4", 
                          (activeCategory === text.mainCat6 || specialtySubs.includes(getCanonicalCategory(activeCategory))) ? "text-[#F05A22]" : "text-gray-400 group-hover:text-[#1A1A1A]"
                        )} />
                      </motion.div>
                    </div>

                    {/* Subcategories Dropdown */}
                    <motion.div
                      initial={false}
                      animate={{ height: isSpecialtyOpen ? "auto" : 0, opacity: isSpecialtyOpen ? 1 : 0 }}
                      className="overflow-hidden bg-gray-50"
                    >
                      <ul className="py-2">
                        {specialtySubs.map((sub) => (
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
                      <div className="group bg-white rounded-none overflow-hidden border border-gray-200 hover:border-[#F05A22] transition-colors duration-500 cursor-pointer flex flex-col h-full">
                        <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-100">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full transition-transform duration-700 group-hover:scale-105 mix-blend-multiply object-contain p-2 sm:p-4"
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
                      </div>
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
