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
