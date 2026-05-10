import prisma from "@/lib/prisma";
import ProductsClient from "./ProductsClient";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { buildRobotsMetadata, buildSeoMetadata, composeSeoTitle, getSiteUrl, getSystemSeo, jsonLdScript, toAbsoluteUrl } from "@/lib/seo";
import { getProductsPageData } from "./shared";

export const dynamic = "force-dynamic";

const productsListText = {
  zh: {
    home: "首页",
    title: "产品中心",
    description: "浏览我们的软包装产品目录，查找适合食品、日化、宠物食品等行业的包装解决方案。",
  },
  en: {
    home: "Home",
    title: "Products",
    description: "Browse our flexible packaging catalog and explore packaging solutions for food, daily chemical, pet food, and more.",
  },
  es: {
    home: "Inicio",
    title: "Productos",
    description: "Descubra nuestro catalogo de envases flexibles y encuentre soluciones para alimentos, cuidado diario, pet food y mas.",
  },
  ar: {
    home: "الرئيسية",
    title: "المنتجات",
    description: "استعرض كتالوج التغليف المرن لدينا واكتشف حلول التعبئة لقطاعات الغذاء والعناية اليومية وأغذية الحيوانات وغيرها.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const text = productsListText[locale as keyof typeof productsListText] || productsListText.en;
  const { siteName, titleSuffix, keywords, defaultImage, siteNoindex, noindexPaths } = await getSystemSeo(locale);

  return buildSeoMetadata({
    title: text.title,
    description: text.description,
    siteName,
    socialTitle: composeSeoTitle(text.title, titleSuffix, siteName),
    keywords,
    canonicalPath: "/products",
    defaultImage,
    robots: buildRobotsMetadata("/products", { siteNoindex, noindexPaths }),
  });
}

export default async function ProductsPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const text = productsListText[locale as keyof typeof productsListText] || productsListText.en;
  const { categories, products } = await getProductsPageData(locale);
  const siteUrl = getSiteUrl();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: text.title,
    description: text.description,
    url: `${siteUrl}/products`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/products/${product.slug || product.id}`,
        name: product.name,
        image: toAbsoluteUrl(product.image),
      })),
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: text.home,
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: text.title,
        item: `${siteUrl}/products`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(itemListJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)} />
      <ProductsClient categories={categories} products={products} />
    </>
  );
}
