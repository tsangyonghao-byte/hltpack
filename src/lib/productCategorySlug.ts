const PRODUCT_CATEGORY_SLUGS: Record<string, string> = {
  // Main Categories
  "Flexible Packaging": "flexible-packaging",
  "Rollstock & Films": "rollstock-films",
  "Shrink Labels": "shrink-labels",
  "Lidding Film": "lidding-film",
  "Protective Packaging": "protective-packaging",
  "Specialty": "specialty",

  // Legacy mappings for backward compatibility
  "Plastic Packaging Bags": "flexible-packaging",
  "Shrink Label Series": "shrink-labels",
  "High-Barrier & Metallized Films": "rollstock-films",
  "Bubble Bags": "bubble-mailer-bag",

  // Subcategories - Flexible Packaging
  "Custom Pet Supplies Bags": "custom-pet-supplies-bags",
  "Tea Bags": "tea-bags",
  "Custom Food Bags": "custom-food-bags",
  "Medical Mask Bags": "medical-mask-bags",
  "Toy Bags": "toy-bags",
  "Shaped Bags": "shaped-bags",
  "Ziplock Bags": "ziplock-bags",
  "Mask Bags": "mask-bags",
  "Kraft Paper Bags": "kraft-paper-bags",
  "Spout Pouches": "spout-pouches",
  "Foil-Clear Bags": "foil-clear-bags",

  // Subcategories - Rollstock & Films
  "Transparent High-Barrier Films (AlOx)": "transparent-high-barrier-films-alox",
  "Metallized Films (VMPET/VMCPP)": "metallized-films-vmpet-vmcpp",
  "Specialty & Functional Films": "specialty-functional-films",
  "Recyclable Mono-Materials": "recyclable-mono-materials",

  // Subcategories - Shrink Labels
  "Shrink Sleeve Labels": "shrink-sleeve-labels",
  "Full Body Shrink Sleeves": "full-body-shrink-sleeves",
  "Tamper Evident Shrink Bands": "tamper-evident-shrink-bands",
  "Printed Shrink Label Rollstock": "printed-shrink-label-rollstock",

  // Subcategories - Protective Packaging
  "BOPP Carton Sealing Tape": "bopp-carton-sealing-tape",
  "Bubble Mailer & Bag": "bubble-mailer-bag",
  "Poly Mailers": "poly-mailers",

  // Subcategories - Specialty
  "Microwavable Pouch": "microwavable-pouch",
  "Retort Pouch": "retort-pouch",
  "Anti-static Packaging": "anti-static-packaging",
  "Moisture Barrier Packaging": "moisture-barrier-packaging",
};

const PRODUCT_CATEGORY_LABELS = {
  en: {
    "Flexible Packaging": "Flexible Packaging",
    "Rollstock & Films": "Rollstock & Films",
    "Shrink Labels": "Shrink Labels",
    "Lidding Film": "Lidding Film",
    "Protective Packaging": "Protective Packaging",
    "Specialty": "Specialty",

    "Plastic Packaging Bags": "Flexible Packaging",
    "High-Barrier & Metallized Films": "Rollstock & Films",
    "Shrink Label Series": "Shrink Labels",
    "Bubble Bags": "Bubble Mailer & Bag",

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
  },
  es: {
    "Flexible Packaging": "Embalaje Flexible",
    "Rollstock & Films": "Bobinas y Películas",
    "Shrink Labels": "Etiquetas Termoencogibles",
    "Lidding Film": "Película de Tapa",
    "Protective Packaging": "Embalaje Protector",
    "Specialty": "Especialidades",

    "Plastic Packaging Bags": "Embalaje Flexible",
    "High-Barrier & Metallized Films": "Bobinas y Películas",
    "Shrink Label Series": "Etiquetas Termoencogibles",
    "Bubble Bags": "Bolsas de Burbuja y Correo",

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
  },
  ar: {
    "Flexible Packaging": "التغليف المرن",
    "Rollstock & Films": "رول و أفلام",
    "Shrink Labels": "الملصقات المنكمشة",
    "Lidding Film": "غطاء الفيلم",
    "Protective Packaging": "التغليف الواقي",
    "Specialty": "المنتجات الخاصة",

    "Plastic Packaging Bags": "التغليف المرن",
    "High-Barrier & Metallized Films": "رول و أفلام",
    "Shrink Label Series": "الملصقات المنكمشة",
    "Bubble Bags": "حقيبة فقاعة و بريد",

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
  },
} as const;

const SLUG_TO_PRODUCT_CATEGORY = Object.fromEntries(
  Object.entries(PRODUCT_CATEGORY_SLUGS).map(([name, slug]) => [slug, name])
);

export function getProductCategorySlug(categoryName?: string | null) {
  if (!categoryName) return null;
  return PRODUCT_CATEGORY_SLUGS[categoryName] || categoryName;
}

export function isProductCategorySlug(slug?: string | null) {
  if (!slug) return false;
  return slug in SLUG_TO_PRODUCT_CATEGORY;
}

export function getProductCategoryNameFromParam(categoryParam?: string | null) {
  if (!categoryParam) return null;
  return SLUG_TO_PRODUCT_CATEGORY[categoryParam] || categoryParam;
}

export function getProductCategoryNameFromPathname(pathname?: string | null) {
  if (!pathname) return null;
  const match = pathname.match(/^\/products\/([^/?#]+)/);
  if (!match) return null;
  return getProductCategoryNameFromParam(match[1]);
}

export function buildProductCategoryPath(categoryName?: string | null) {
  const slug = getProductCategorySlug(categoryName);
  return slug ? `/products/${slug}` : "/products";
}

export function getLocalizedProductCategoryName(
  categoryName?: string | null,
  locale?: string | null
) {
  if (!categoryName) return "";
  const labels =
    PRODUCT_CATEGORY_LABELS[(locale as keyof typeof PRODUCT_CATEGORY_LABELS) || "en"] ||
    PRODUCT_CATEGORY_LABELS.en;
  return labels[categoryName as keyof typeof labels] || categoryName;
}

export function normalizeProductCategoryHref(href?: string) {
  if (!href) return href || "";

  try {
    const url = new URL(href, "https://hltpack.local");
    if (url.pathname !== "/products") {
      return href;
    }

    const categoryParam = url.searchParams.get("category");
    if (!categoryParam) {
      return url.pathname + url.search;
    }

    const categoryName = getProductCategoryNameFromParam(categoryParam);
    const categorySlug = getProductCategorySlug(categoryName);
    if (categorySlug) {
      url.searchParams.delete("category");
      return `${buildProductCategoryPath(categoryName)}${url.search}`;
    }

    return `${url.pathname}${url.search}`;
  } catch {
    return href;
  }
}
