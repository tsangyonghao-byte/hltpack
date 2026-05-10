import prisma from "@/lib/prisma";
import { getPreferredProductImage, parseProductGallery } from "@/lib/productImages";
import { getLocalizedJsonArray, getLocalizedValue } from "@/lib/localizedContent";

export async function getProductsPageData(locale: string) {
  const allProductsLabel =
    locale === "es" ? "Todos los productos" : locale === "ar" ? "كل المنتجات" : "All Products";

  const dbCategories = await prisma.category.findMany();
  const dbProducts = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  const categories = [allProductsLabel, ...dbCategories.map((c) => getLocalizedValue(c, "name", locale))];

  const products = await Promise.all(
    dbProducts.map(async (p) => ({
      id: p.id,
      slug: p.slug,
        name: getLocalizedValue(p, "name", locale),
      category: p.category.name,
        categoryLabel: getLocalizedValue(p.category, "name", locale),
      image: await getPreferredProductImage(p.image, parseProductGallery(p.gallery)),
        features: getLocalizedJsonArray(p, "features", locale),
    }))
  );

  return {
    categories,
    products,
  };
}
