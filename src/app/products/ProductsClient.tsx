"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Filter, Search } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";

const productText = {
  en: {
    allProducts: "All Products",
    title: "Our Products",
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
  },
  es: {
    allProducts: "Todos los productos",
    title: "Nuestros Productos",
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
  },
  ar: {
    allProducts: "كل المنتجات",
    title: "منتجاتنا",
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
  },
} as const;

export default function ProductsClient({ categories, products }: { categories: string[], products: any[] }) {
  const { dict, locale } = useLanguage();
  const text = productText[locale as keyof typeof productText] || productText.en;
  const [activeCategory, setActiveCategory] = useState<string>(text.allProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Read URL params on mount to support global search
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, []);

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

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === text.allProducts || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Page Hero Banner */}
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#1E293B] flex flex-col items-center justify-center overflow-hidden min-h-[350px] md:min-h-[450px]">
        {/* Background Image / Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://www.logospack.com.hk/cache/img/cf1f784f1e2d0010ea43d775a6884a3a190f292bbf73.jpg')" }}
        ></div>
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-[#1E293B]/70"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center flex-grow">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight uppercase"
          >
            {text.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-300 font-medium"
          >
            <Link href="/" className="hover:text-white transition-colors">{text.allProducts === productText.ar.allProducts ? "الرئيسية" : text.allProducts === productText.es.allProducts ? "Inicio" : "Home"}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#F05A22]">{dict.nav.products}</span>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <div className="relative w-full max-w-xs">
                <input 
                  type="text" 
                  placeholder={text.search} 
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22] text-sm transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <button 
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="ml-4 flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-700 shadow-sm"
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
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 sticky top-24">
                
                {/* Desktop Search */}
                <div className="hidden lg:block relative mb-8">
                  <input 
                    type="text" 
                    placeholder={text.search} 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22] text-sm transition-all bg-gray-50/50 focus:bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                <h3 className="text-lg font-extrabold text-[#1E293B] mb-6 uppercase tracking-wider">
                  {text.categories}
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => {
                          setActiveCategory(category);
                          setIsMobileFilterOpen(false);
                        }}
                        className={clsx(
                          "w-full text-left px-4 py-3 rounded-xl text-[15px] font-bold transition-all duration-300 flex items-center justify-between group",
                          activeCategory === category 
                            ? "bg-[#F05A22] text-white shadow-md shadow-[#F05A22]/20" 
                            : "text-gray-600 hover:bg-gray-50 hover:text-[#F05A22]"
                        )}
                      >
                        {category}
                        {activeCategory === category && (
                          <motion.div layoutId="activeArrow">
                            <ChevronRight className="w-4 h-4" />
                          </motion.div>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Contact Banner in Sidebar */}
                <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-6 text-white relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#F05A22] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <h4 className="text-lg font-bold mb-2">{text.customTitle}</h4>
                  <p className="text-sm text-gray-300 mb-6 line-clamp-3">{text.customDesc}</p>
                  <Link href="/contact" className="inline-block w-full text-center px-4 py-3 bg-[#F05A22] hover:bg-[#D44A18] text-white rounded-xl text-sm font-bold transition-colors">
                    {text.customBtn}
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-extrabold text-[#1E293B]">
                  {activeCategory} <span className="text-gray-400 text-base font-medium ml-2">({filteredProducts.length})</span>
                </h2>
              </div>

              {filteredProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {currentProducts.map((product, index) => (
                      <Link 
                        href={`/products/${product.slug || product.id}`}
                        key={product.id}
                      >
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col h-full"
                      >
                        {/* Image Area */}
                        <div className="relative aspect-[4/3] bg-gray-50/50 p-6 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[11px] font-bold text-[#F05A22] uppercase tracking-wider shadow-sm border border-gray-100">
                            {product.category}
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-[18px] font-bold text-[#1E293B] mb-4 leading-snug group-hover:text-[#F05A22] transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                          
                          <ul className="space-y-2 mb-6 mt-auto">
                            {product.features.map((feature: string, i: number) => (
                              <li key={i} className="flex items-start text-[13px] text-gray-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#F05A22]/50 mt-1.5 mr-2 shrink-0"></div>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
                            <span className="text-[14px] font-bold text-[#1E293B] group-hover:text-[#F05A22] transition-colors">
                              {text.viewDetails}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#F05A22] group-hover:text-white transition-colors duration-300 text-gray-400">
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-2">
                      <button
                        onClick={() => {
                          setCurrentPage(p => Math.max(1, p - 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-[#F05A22] hover:text-white hover:border-[#F05A22] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 disabled:hover:border-gray-200 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                      </button>
                      
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setCurrentPage(i + 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={clsx(
                            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                            currentPage === i + 1 
                              ? "bg-[#F05A22] text-white shadow-md shadow-[#F05A22]/20" 
                              : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                          )}
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => {
                          setCurrentPage(p => Math.min(totalPages, p + 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-[#F05A22] hover:text-white hover:border-[#F05A22] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 disabled:hover:border-gray-200 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center flex flex-col items-center justify-center h-[400px]">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E293B] mb-2">{text.emptyTitle}</h3>
                  <p className="text-gray-500 max-w-md mx-auto">{text.emptyDesc}</p>
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory(text.allProducts);
                    }}
                    className="mt-6 px-6 py-2.5 bg-[#1E293B] text-white rounded-full text-sm font-bold hover:bg-[#F05A22] transition-colors"
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
