const PRODUCT_CATEGORY_SLUGS: Record<string, string> = {
  "Plastic Packaging Bags": "plastic-packaging-bags",
  "Shrink Label Series": "shrink-label-series",
  "High-Barrier & Metallized Films": "high-barrier-metallized-films",
  "Custom Pet Supplies Bags": "custom-pet-supplies-bags",
  "Tea Bags": "tea-bags",
  "Custom Food Bags": "custom-food-bags",
  "Medical Mask Bags": "medical-mask-bags",
  "Toy Bags": "toy-bags",
  "Shaped Bags": "shaped-bags",
  "Ziplock Bags": "ziplock-bags",
  "Mask Bags": "mask-bags",
  "Kraft Paper Bags": "kraft-paper-bags",
  "Bubble Bags": "bubble-bags",
  "Spout Pouches": "spout-pouches",
  "Foil-Clear Bags": "foil-clear-bags",
  "Transparent High-Barrier Films (AlOx)": "transparent-high-barrier-films-alox",
  "Metallized Films (VMPET/VMCPP)": "metallized-films-vmpet-vmcpp",
  "Specialty & Functional Films": "specialty-functional-films",
  "Recyclable Mono-Materials": "recyclable-mono-materials",
};

const PRODUCT_CATEGORY_LABELS = {
  en: {
    "Plastic Packaging Bags": "Plastic Packaging Bags",
    "Shrink Label Series": "Shrink Label Series",
    "High-Barrier & Metallized Films": "High-Barrier & Metallized Films",
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
    "Plastic Packaging Bags": "Bolsas de Embalaje de Plastico",
    "Shrink Label Series": "Serie de Etiquetas Termoencogibles",
    "High-Barrier & Metallized Films": "Peliculas Metalizadas y de Alta Barrera",
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
    "Plastic Packaging Bags": "سلسلة اكياس التغليف البلاستيكية",
    "Shrink Label Series": "سلسلة الملصقات المنكمشة",
    "High-Barrier & Metallized Films": "افلام عالية الحاجز ومعدنية",
    "Custom Pet Supplies Bags": "اكياس مخصصة لمستلزمات الحيوانات الاليفة",
    "Tea Bags": "اكياس الشاي",
    "Custom Food Bags": "اكياس مخصصة للاغذية",
    "Medical Mask Bags": "اكياس للكمامات الطبية",
    "Toy Bags": "اكياس الالعاب",
    "Shaped Bags": "اكياس مشكلة",
    "Ziplock Bags": "اكياس بسحاب",
    "Mask Bags": "اكياس الكمامات",
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
