import prisma from "@/lib/prisma";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, CheckCircle2, MessageSquare } from "lucide-react";
import { cookies } from "next/headers";
import ProductGallery from "@/components/products/ProductGallery";
import { buildRobotsMetadata, buildSeoMetadata, getSiteUrl, getSystemSeo, jsonLdScript, toAbsoluteUrl } from "@/lib/seo";
import { getOrderedProductImages, parseProductGallery } from "@/lib/productImages";
import ProductsClient from "../ProductsClient";
import { getProductsPageData } from "../shared";
import { buildProductCategoryPath, getProductCategoryNameFromParam, isProductCategorySlug } from "@/lib/productCategorySlug";
import { getLocalizedHtml, getLocalizedJsonArray, getLocalizedValue } from "@/lib/localizedContent";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const productDetailText = {
  en: {
    notFound: "Product Not Found | HAILITONG Packaging",
    description: (name: string) =>
      `Discover our ${name}, designed with premium protection and sustainability. Explore key features and request a quote.`,
    ogTitle: (name: string) => `${name} - Flexible Packaging Solutions`,
    ogDescription: (name: string) =>
      `Premium ${name} by HAILITONG. Innovative barrier technologies for product freshness.`,
    home: "Home",
    products: "Products",
    back: "Back to Products",
    intro: (name: string) =>
      `Our ${name.toLowerCase()} offers premium protection, sustainability, and aesthetic appeal. Designed with advanced barrier technologies to ensure product freshness and extend shelf life.`,
    features: "Key Features",
    quote: "Request a Quote",
    samples: "Request Samples",
    relatedProducts: "Related Products",
    viewDetails: "View Details",
    details: "Product Details",
  },
  es: {
    notFound: "Producto no encontrado | HAILITONG Packaging",
    description: (name: string) =>
      `Descubra nuestro ${name}, disenado con proteccion premium y sostenibilidad. Explore caracteristicas clave y solicite una cotizacion.`,
    ogTitle: (name: string) => `${name} - Soluciones de envases flexibles`,
    ogDescription: (name: string) =>
      `${name} premium de HAILITONG. Tecnologias de barrera innovadoras para preservar la frescura del producto.`,
    home: "Inicio",
    products: "Productos",
    back: "Volver a productos",
    intro: (name: string) =>
      `Nuestro ${name.toLowerCase()} ofrece proteccion premium, sostenibilidad y atractivo visual. Esta disenado con tecnologias avanzadas de barrera para mantener la frescura del producto y prolongar su vida util.`,
    features: "Caracteristicas principales",
    quote: "Solicitar cotizacion",
    samples: "Solicitar muestras",
    relatedProducts: "Productos Relacionados",
    viewDetails: "Ver Detalles",
    details: "Detalles del producto",
  },
  ar: {
    notFound: "المنتج غير موجود | HAILITONG Packaging",
    description: (name: string) =>
      `اكتشف ${name} المصمم بحماية عالية واستدامة. تعرّف على الميزات الأساسية واطلب عرض سعر.`,
    ogTitle: (name: string) => `${name} - حلول تغليف مرنة`,
    ogDescription: (name: string) =>
      `${name} المميز من HAILITONG. تقنيات حواجز مبتكرة للحفاظ على نضارة المنتج.`,
    home: "الرئيسية",
    products: "المنتجات",
    back: "العودة إلى المنتجات",
    intro: (name: string) =>
      `يوفر ${name.toLowerCase()} حماية عالية واستدامة ومظهراً جذاباً. تم تصميمه بتقنيات حواجز متقدمة للحفاظ على نضارة المنتج وإطالة عمره التخزيني.`,
    features: "الميزات الرئيسية",
    quote: "طلب عرض سعر",
    samples: "طلب عينات",
    relatedProducts: "منتجات ذات صلة",
    viewDetails: "عرض التفاصيل",
    details: "تفاصيل المنتج",
  },
} as const;

async function findProductByParam(value: string) {
  return prisma.product.findFirst({
    where: {
      OR: [{ id: value }, { slug: value }],
    },
    include: { category: true },
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const text = productDetailText[locale as keyof typeof productDetailText] || productDetailText.en;
  const { siteNoindex, noindexPaths } = await getSystemSeo(locale);
  const resolvedParams = await params;
  const categoryName = getProductCategoryNameFromParam(resolvedParams.slug);

  if (isProductCategorySlug(resolvedParams.slug) && categoryName) {
    return buildSeoMetadata({
      title: `${categoryName} | HAILITONG Packaging`,
      description: `Browse ${categoryName.toLowerCase()} from HAILITONG Packaging.`,
      canonicalPath: `/products/${resolvedParams.slug}`,
      robots: buildRobotsMetadata(`/products/${resolvedParams.slug}`, { siteNoindex, noindexPaths }),
    });
  }

  const product = await findProductByParam(resolvedParams.slug);

  if (!product) {
    return {
      title: text.notFound,
    };
  }

  const canonicalPath = `/products/${product.slug || product.id}`;
  const localizedName = getLocalizedValue(product, "name", locale) || product.name;
  const localizedSeoTitle = getLocalizedValue(product, "seoTitle", locale);
  const localizedSeoDescription = getLocalizedValue(product, "seoDescription", locale);

  return buildSeoMetadata({
    title: localizedSeoTitle || `${localizedName} | HAILITONG Packaging`,
    description: localizedSeoDescription || text.description(localizedName),
    canonicalPath,
    image: product.image,
    robots: buildRobotsMetadata(`/products/${resolvedParams.slug}`, { siteNoindex, noindexPaths }),
  });
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const text = productDetailText[locale as keyof typeof productDetailText] || productDetailText.en;
  const resolvedParams = await params;
  const categoryName = getProductCategoryNameFromParam(resolvedParams.slug);

  if (isProductCategorySlug(resolvedParams.slug) && categoryName) {
    const { categories, products } = await getProductsPageData(locale);
    return <ProductsClient categories={categories} products={products} />;
  }

  const product = await findProductByParam(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const canonicalSegment = product.slug || product.id;
  if (resolvedParams.slug !== canonicalSegment) {
    permanentRedirect(`/products/${canonicalSegment}`);
  }

  const relatedProducts = await prisma.product.findMany({
    where: { id: { not: product.id } },
    take: 4,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  const productName = getLocalizedValue(product, "name", locale) || product.name;
  const productCategoryLabel = getLocalizedValue(product.category, "name", locale) || product.category.name;
  const productSeoDescription = getLocalizedValue(product, "seoDescription", locale);
  const productContent = getLocalizedHtml(product, "content", locale);
  const features = getLocalizedJsonArray(product, "features", locale);
  const gallery = parseProductGallery(product.gallery);
  const allImages = await getOrderedProductImages(product.image, gallery);
  const detailImages = allImages.length > 1 ? allImages.slice(1) : allImages;
  const productPath = `/products/${canonicalSegment}`;
  const categoryPath = buildProductCategoryPath(product.category.name);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    image: allImages.map((item) => toAbsoluteUrl(item)),
    description: productSeoDescription || text.description(productName),
    sku: product.id,
    category: productCategoryLabel,
    brand: {
      "@type": "Brand",
      name: "HAILITONG Packaging",
    },
    url: `${getSiteUrl()}${productPath}`,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: text.home,
        item: getSiteUrl(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: productCategoryLabel,
        item: `${getSiteUrl()}${categoryPath}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: productName,
        item: `${getSiteUrl()}${productPath}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(productJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)} />
      <div className="bg-[#111111] pt-[120px] pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto flex items-center text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">{text.home}</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href={categoryPath} className="hover:text-white transition-colors">{productCategoryLabel}</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-white font-bold">{productName}</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Link href={categoryPath} className="inline-flex items-center text-gray-500 hover:text-[#F05A22] font-bold text-sm uppercase tracking-wider mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {`${text.back}: ${productCategoryLabel}`}
        </Link>

        <div className="bg-white rounded-none p-6 md:p-12 border border-gray-200 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="flex flex-col gap-4 w-full lg:max-w-md">
              <ProductGallery images={allImages} alt={productName} />
            </div>

            <div className="flex flex-col justify-start">
              <div className="inline-flex px-3 py-1.5 rounded-none text-[11px] font-bold bg-[#1A1A1A] text-white uppercase tracking-widest mb-6 w-max">
                {productCategoryLabel}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1A1A1A] mb-6 leading-tight tracking-tight">
                {productName}
              </h1>

              <p className="text-base text-gray-500 mb-10 leading-relaxed font-light">
                {text.intro(productName)}
              </p>

              {features.length > 0 && (
                <div className="mb-12 bg-gray-50 rounded-none p-8 border border-gray-100">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-6 uppercase tracking-wider">{text.features}</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-600">
                        <CheckCircle2 className="w-5 h-5 text-[#F05A22] mr-3 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="font-medium text-[14px] leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/contact?type=quote&product=${encodeURIComponent(productName)}&productId=${product.id}&source=${encodeURIComponent(productPath)}`}
                  className="flex-1 flex items-center justify-center px-8 py-4 bg-[#F05A22] text-white rounded-none font-bold text-[14px] uppercase tracking-wider hover:bg-[#D44A18] transition-colors"
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  {text.quote}
                </Link>
                <Link
                  href={`/contact?type=samples&product=${encodeURIComponent(productName)}&productId=${product.id}&source=${encodeURIComponent(productPath)}`}
                  className="flex-1 flex items-center justify-center px-8 py-4 bg-transparent text-[#1A1A1A] border border-gray-300 rounded-none font-bold text-[14px] uppercase tracking-wider hover:border-[#1A1A1A] hover:bg-gray-50 transition-colors"
                >
                  {text.samples}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {(productContent || detailImages.length > 0) && (
          <div className="bg-white rounded-none p-8 md:p-12 border border-gray-200 mb-16">
            <h2 className="text-2xl font-extrabold text-[#1A1A1A] mb-8 pb-4 border-b border-gray-200 relative after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-16 after:h-[2px] after:bg-[#F05A22] uppercase tracking-wider">
              {text.details}
            </h2>
            {detailImages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {detailImages.map((imageUrl, index) => (
                  <div
                    key={`${imageUrl}-${index}`}
                    className="bg-gray-50 border border-gray-100 p-6 flex items-center justify-center min-h-[260px]"
                  >
                    <img
                      src={imageUrl}
                      alt={`${productName} - Detail ${index + 1}`}
                      className="w-full h-full max-h-[420px] object-contain mix-blend-multiply"
                    />
                  </div>
                ))}
              </div>
            )}
            {productContent && (
              <div
                className="prose prose-lg max-w-none prose-gray prose-headings:text-[#1A1A1A] prose-a:text-[#F05A22] hover:prose-a:text-[#D44A18] prose-img:rounded-none"
                dangerouslySetInnerHTML={{ __html: productContent }}
              />
            )}
          </div>
        )}

        {relatedProducts.length > 0 && (
          <div className="pt-16 mt-16 border-t border-gray-200">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[2px] after:bg-[#F05A22] uppercase tracking-wider">
                {text.relatedProducts}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((rp) => (
                <Link key={rp.id} href={`/products/${rp.slug || rp.id}`} className="group flex flex-col bg-white rounded-none overflow-hidden border border-gray-200 hover:border-[#F05A22] transition-colors duration-500 cursor-pointer h-full">
                  {(() => {
                    const relatedName = getLocalizedValue(rp, "name", locale) || rp.name;

                    return (
                      <>
                  <div className="w-full aspect-[4/3] bg-white relative overflow-hidden flex items-center justify-center p-8 border-b border-gray-100">
                    <img src={rp.image} alt={relatedName} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-[15px] font-bold text-[#1A1A1A] leading-snug mb-6 group-hover:text-[#F05A22] transition-colors line-clamp-2 tracking-wide">
                      {relatedName}
                    </h4>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[12px] font-bold text-[#1A1A1A] uppercase tracking-widest group-hover:text-[#F05A22] transition-colors">
                        {text.viewDetails}
                      </span>
                      <div className="w-8 h-8 rounded-none bg-gray-50 flex items-center justify-center group-hover:bg-[#F05A22] transition-colors duration-300 text-gray-400 group-hover:text-white">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                      </>
                    );
                  })()}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
