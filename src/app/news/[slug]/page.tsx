import prisma from "@/lib/prisma";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Calendar, Tag } from "lucide-react";
import { cookies } from "next/headers";
import { buildRobotsMetadata, buildSeoMetadata, getSiteUrl, getSystemSeo, jsonLdScript, toAbsoluteUrl } from "@/lib/seo";
import { getPreferredProductImage, parseProductGallery } from "@/lib/productImages";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const newsDetailText = {
  en: {
    notFound: "Article Not Found | HAILITONG News",
    home: "Home",
    news: "News",
    back: "Back to Home",
    contact: "Contact us for more details",
    recentPosts: "Recent Posts",
    categories: "Categories",
    featuredProducts: "Featured Products",
    viewProduct: "View Details",
  },
  es: {
    notFound: "Articulo no encontrado | HAILITONG News",
    home: "Inicio",
    news: "Noticias",
    back: "Volver a noticias",
    contact: "Contactenos para mas detalles",
    recentPosts: "Publicaciones Recientes",
    categories: "Categorias",
    featuredProducts: "Productos Destacados",
    viewProduct: "Ver Detalles",
  },
  ar: {
    notFound: "المقال غير موجود | HAILITONG News",
    home: "الرئيسية",
    news: "الأخبار",
    back: "العودة إلى الأخبار",
    contact: "اتصل بنا لمزيد من التفاصيل",
    recentPosts: "المنشورات الأخيرة",
    categories: "التصنيفات",
    featuredProducts: "المنتجات المميزة",
    viewProduct: "عرض التفاصيل",
  },
} as const;

async function findNewsByParam(value: string) {
  return prisma.news.findFirst({
    where: {
      OR: [{ id: value }, { slug: value }],
    },
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const text = newsDetailText[locale as keyof typeof newsDetailText] || newsDetailText.en;
  const { siteNoindex, noindexPaths } = await getSystemSeo(locale);
  const resolvedParams = await params;
  const newsItem = await findNewsByParam(resolvedParams.slug);

  if (!newsItem) {
    return {
      title: text.notFound,
    };
  }

  const canonicalPath = `/news/${newsItem.slug || newsItem.id}`;

  return buildSeoMetadata({
    title: newsItem.seoTitle || `${newsItem.title} | HAILITONG News`,
    description: newsItem.seoDescription || newsItem.summary,
    canonicalPath,
    image: newsItem.image,
    robots: buildRobotsMetadata(`/news/${resolvedParams.slug}`, { siteNoindex, noindexPaths }),
  });
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const text = newsDetailText[locale as keyof typeof newsDetailText] || newsDetailText.en;
  const resolvedParams = await params;
  const newsItem = await findNewsByParam(resolvedParams.slug);

  if (!newsItem) {
    notFound();
  }

  const canonicalSegment = newsItem.slug || newsItem.id;
  if (resolvedParams.slug !== canonicalSegment) {
    permanentRedirect(`/news/${canonicalSegment}`);
  }

  const [recentNews, categoriesData, featuredProducts] = await Promise.all([
    prisma.news.findMany({
      orderBy: { date: "desc" },
      take: 5,
      where: { id: { not: newsItem.id } },
    }),
    prisma.news.groupBy({
      by: ["category"],
      _count: { category: true },
    }),
    prisma.product.findMany({
      take: 3,
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    }),
  ]);
  const featuredProductsWithMainImage = await Promise.all(
    featuredProducts.map(async (product) => ({
      ...product,
      image: await getPreferredProductImage(product.image, parseProductGallery(product.gallery)),
    }))
  );
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: newsItem.title,
    description: newsItem.seoDescription || newsItem.summary,
    image: [toAbsoluteUrl(newsItem.image)],
    datePublished: newsItem.date,
    dateModified: newsItem.updatedAt?.toISOString?.() || undefined,
    author: {
      "@type": "Organization",
      name: "HAILITONG Packaging",
    },
    publisher: {
      "@type": "Organization",
      name: "HAILITONG Packaging",
    },
    mainEntityOfPage: `${getSiteUrl()}/news/${canonicalSegment}`,
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
        name: text.news,
        item: `${getSiteUrl()}/news`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: newsItem.title,
        item: `${getSiteUrl()}/news/${canonicalSegment}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(articleJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)} />
      <div className="bg-[#121A2F] pt-[120px] pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto flex items-center text-sm text-gray-300">
          <Link href="/" className="hover:text-white transition-colors">{text.home}</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/news" className="hover:text-white transition-colors">{text.news}</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-[#F05A22] font-medium truncate max-w-[200px] md:max-w-none">{newsItem.title}</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col lg:flex-row gap-12">
        <article className="flex-1 w-full lg:max-w-[800px]">
          <Link href="/news" className="inline-flex items-center text-[#F05A22] hover:text-[#D44A18] font-bold mb-8 transition-colors group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            {text.back}
          </Link>

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500 mb-6">
              <div className="flex items-center text-[#F05A22] bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
                <Tag className="w-4 h-4 mr-2" />
                {newsItem.category}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {newsItem.date}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-[1.2] mb-8">
              {newsItem.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed border-l-4 border-[#F05A22] pl-6 mb-12">
              {newsItem.summary}
            </p>

            <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100 mb-12 shadow-lg border border-gray-100 relative group">
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </header>

          <div className="prose prose-lg prose-gray max-w-none prose-headings:text-[#1E293B] prose-headings:font-bold prose-a:text-[#F05A22] hover:prose-a:text-[#D44A18] prose-img:rounded-2xl">
            {newsItem.content ? (
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: newsItem.content }}
              />
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 text-gray-600">
                {text.contact}
              </div>
            )}
          </div>

          {featuredProducts.length > 0 && (
            <div className="mt-20 pt-16 border-t border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-extrabold text-[#1E293B] relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-[#F05A22] after:rounded-full">
                  {text.featuredProducts}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {featuredProductsWithMainImage.map((product) => (
                  <Link key={product.id} href={`/products/${product.slug || product.id}`} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-full aspect-[4/3] bg-gray-50 relative overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="text-[16px] font-bold text-[#1E293B] leading-snug mb-4 group-hover:text-[#F05A22] transition-colors line-clamp-2">
                        {product.name}
                      </h4>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-sm font-bold text-[#F05A22] flex items-center group-hover:translate-x-1 transition-transform">
                          {text.viewProduct} <ChevronRight className="w-4 h-4 ml-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <footer className="mt-16 pt-10 border-t border-gray-100 flex justify-start">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#1E293B] text-white rounded-full font-bold text-[15px] uppercase tracking-wider hover:bg-[#F05A22] shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {text.contact}
            </Link>
          </footer>
        </article>

        <aside className="w-full lg:w-[320px] flex flex-col gap-10">
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <h3 className="text-xl font-extrabold text-[#1E293B] mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-[#F05A22] after:rounded-full">
              {text.recentPosts}
            </h3>
            <div className="flex flex-col gap-6">
              {recentNews.map((recent) => (
                <Link key={recent.id} href={`/news/${recent.slug || recent.id}`} className="group flex gap-4 items-start">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white border border-gray-100 shadow-sm">
                    <img src={recent.image} alt={recent.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[15px] font-bold text-[#1E293B] leading-tight mb-2 group-hover:text-[#F05A22] transition-colors line-clamp-2">
                      {recent.title}
                    </h4>
                    <span className="text-xs text-gray-500 font-medium flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {recent.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <h3 className="text-xl font-extrabold text-[#1E293B] mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-[#F05A22] after:rounded-full">
              {text.categories}
            </h3>
            <ul className="flex flex-col gap-3">
              {categoriesData.map((cat, index) => (
                <li key={index}>
                  <Link
                    href={`/news?category=${encodeURIComponent(cat.category)}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-sm hover:text-[#F05A22] transition-all group border border-transparent hover:border-gray-100"
                  >
                    <span className="font-medium text-gray-700 group-hover:text-[#F05A22] transition-colors">
                      {cat.category}
                    </span>
                    <span className="bg-white group-hover:bg-orange-50 text-gray-500 group-hover:text-[#F05A22] text-xs font-bold px-2.5 py-1 rounded-full transition-colors border border-gray-100 group-hover:border-orange-100">
                      {cat._count.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
