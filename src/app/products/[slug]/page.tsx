import prisma from "@/lib/prisma";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, CheckCircle2, MessageSquare } from "lucide-react";
import { cookies } from "next/headers";
import ProductGallery from "@/components/products/ProductGallery";
import { buildRobotsMetadata, buildSeoMetadata, getSiteUrl, getSystemSeo, jsonLdScript, toAbsoluteUrl } from "@/lib/seo";

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
  const product = await findProductByParam(resolvedParams.slug);

  if (!product) {
    return {
      title: text.notFound,
    };
  }

  const canonicalPath = `/products/${product.slug || product.id}`;

  return buildSeoMetadata({
    title: product.seoTitle || `${product.name} | HAILITONG Packaging`,
    description: product.seoDescription || text.description(product.name),
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

  const features = JSON.parse(product.features) as string[];
  const gallery = product.gallery ? (JSON.parse(product.gallery) as string[]) : [];
  const allImages = [product.image, ...gallery];
  const productPath = `/products/${canonicalSegment}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: allImages.map((item) => toAbsoluteUrl(item)),
    description: product.seoDescription || text.description(product.name),
    sku: product.id,
    category: product.category.name,
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
        name: text.products,
        item: `${getSiteUrl()}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${getSiteUrl()}${productPath}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(productJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)} />
      <div className="bg-[#121A2F] pt-[120px] pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto flex items-center text-sm text-gray-300">
          <Link href="/" className="hover:text-white transition-colors">{text.home}</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/products" className="hover:text-white transition-colors">{text.products}</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-[#F05A22] font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Link href="/products" className="inline-flex items-center text-gray-500 hover:text-[#F05A22] font-medium mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {text.back}
        </Link>

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="flex flex-col gap-4 w-full lg:max-w-md">
              <ProductGallery images={allImages} alt={product.name} />
            </div>

            <div className="flex flex-col justify-start">
              <div className="inline-flex px-3 py-1.5 rounded-full text-xs font-bold bg-orange-50 text-[#F05A22] uppercase tracking-wider mb-4 w-max border border-orange-100">
                {product.category.name}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#1E293B] mb-6 leading-tight">
                {product.name}
              </h1>

              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                {text.intro(product.name)}
              </p>

              <div className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-[#1E293B] mb-4">{text.features}</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-[#F05A22] mr-3 shrink-0 mt-0.5" />
                      <span className="font-medium text-[15px]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/contact?type=quote&product=${encodeURIComponent(product.name)}&productId=${product.id}&source=${encodeURIComponent(productPath)}`}
                  className="flex-1 flex items-center justify-center px-8 py-4 bg-[#F05A22] text-white rounded-xl font-bold hover:bg-[#D44A18] transition-all shadow-lg shadow-[#F05A22]/30 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  {text.quote}
                </Link>
                <Link
                  href={`/contact?type=samples&product=${encodeURIComponent(product.name)}&productId=${product.id}&source=${encodeURIComponent(productPath)}`}
                  className="flex-1 flex items-center justify-center px-8 py-4 bg-white text-[#1E293B] border-2 border-gray-200 rounded-xl font-bold hover:border-[#1E293B] transition-all"
                >
                  {text.samples}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {product.content && (
          <div className="bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100 mb-16">
            <h2 className="text-2xl font-extrabold text-[#1E293B] mb-8 pb-4 border-b border-gray-100 relative after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-16 after:h-[3px] after:bg-[#F05A22]">
              Product Details
            </h2>
            <div
              className="prose prose-lg max-w-none prose-gray prose-headings:text-[#1E293B] prose-a:text-[#F05A22] hover:prose-a:text-[#D44A18] prose-img:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          </div>
        )}

        {relatedProducts.length > 0 && (
          <div className="pt-10 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E293B] relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[3px] after:bg-[#F05A22]">
                {text.relatedProducts}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <Link key={rp.id} href={`/products/${rp.slug || rp.id}`} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-full aspect-square bg-gray-50 relative overflow-hidden flex items-center justify-center p-6">
                    <img src={rp.image} alt={rp.name} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h4 className="text-[16px] font-bold text-[#1E293B] leading-snug mb-3 group-hover:text-[#F05A22] transition-colors line-clamp-2">
                      {rp.name}
                    </h4>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm font-bold text-[#F05A22] flex items-center group-hover:translate-x-1 transition-transform">
                        {text.viewDetails} <ChevronRight className="w-4 h-4 ml-1" />
                      </span>
                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-[#F05A22] transition-colors">
                        <ArrowLeft className="w-4 h-4 text-[#F05A22] group-hover:text-white rotate-135" style={{ transform: "rotate(135deg)" }} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
