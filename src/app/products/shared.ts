import prisma from "@/lib/prisma";
import { getPreferredProductImage, parseProductGallery } from "@/lib/productImages";

export async function getProductsPageData(locale: string) {
  const allProductsLabel =
    locale === "es" ? "Todos los productos" : locale === "ar" ? "كل المنتجات" : "All Products";

  const dbCategories = await prisma.category.findMany();
  const dbProducts = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  const categories = [allProductsLabel, ...dbCategories.map((c) => c.name)];

  const products = await Promise.all(
    dbProducts.map(async (p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.category.name,
      image: await getPreferredProductImage(p.image, parseProductGallery(p.gallery)),
      features: JSON.parse(p.features),
    }))
  );

  return {
    categories,
    products,
  };
}
