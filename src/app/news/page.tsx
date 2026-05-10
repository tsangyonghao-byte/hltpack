import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Calendar, Tag } from "lucide-react";
import { cookies } from "next/headers";

import prisma from "@/lib/prisma";
import { buildRobotsMetadata, buildSeoMetadata, composeSeoTitle, getSiteUrl, getSystemSeo, jsonLdScript, toAbsoluteUrl } from "@/lib/seo";
import { getLocalizedValue } from "@/lib/localizedContent";

export const dynamic = "force-dynamic";

const newsListText = {
  en: {
    title: "News | HAILITONG",
    heading: "Latest Insights",
    subtitle: "INDUSTRY NEWS & UPDATES",
    home: "Home",
    news: "News",
    all: "All",
    empty: "No news articles match this category yet.",
    readMore: "Read More",
  },
  es: {
    title: "Noticias | HAILITONG",
    heading: "Ultimas Perspectivas",
    subtitle: "NOTICIAS Y ACTUALIZACIONES DE LA INDUSTRIA",
    home: "Inicio",
    news: "Noticias",
    all: "Todas",
    empty: "Aun no hay noticias para esta categoria.",
    readMore: "Leer Mas",
  },
  ar: {
    title: "الاخبار | HAILITONG",
    heading: "احدث الرؤى",
    subtitle: "اخبار وتحديثات الصناعة",
    home: "الرئيسية",
    news: "الاخبار",
    all: "الكل",
    empty: "لا توجد اخبار لهذه الفئة حاليا.",
    readMore: "اقرا المزيد",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const text = newsListText[locale as keyof typeof newsListText] || newsListText.en;
  const { siteName, titleSuffix, keywords, defaultImage, siteNoindex, noindexPaths } = await getSystemSeo(locale);
  const description =
    locale === "zh"
      ? "查看海力通最新包装新闻、行业趋势与企业动态。"
      : locale === "es"
        ? "Consulte las ultimas noticias, tendencias del sector y actualizaciones de HAILITONG."
        : locale === "ar"
          ? "اطلع على آخر أخبار HAILITONG واتجاهات الصناعة وتحديثات التعبئة."
          : "Explore the latest HAILITONG news, packaging trends, and industry updates.";

  return buildSeoMetadata({
    title: composeSeoTitle(text.news, titleSuffix, siteName),
    description,
    keywords,
    canonicalPath: "/news",
    defaultImage,
    robots: buildRobotsMetadata("/news", { siteNoindex, noindexPaths }),
  });
}

export default async function NewsListPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const text = newsListText[locale as keyof typeof newsListText] || newsListText.en;
  const params = await searchParams;
  const category = params.category?.trim() || "";
  const page = parseInt(params.page || "1", 10);
  const pageSize = 9;
  const skip = (page - 1) * pageSize;

  const [newsItems, categoryRows, totalCount] = await Promise.all([
    prisma.news.findMany({
      where: category ? { category } : undefined,
      orderBy: { date: "desc" },
      take: pageSize,
      skip: skip,
    }),
    prisma.news.findMany({
      distinct: ["category"],
      select: { category: true, categoryEs: true, categoryAr: true },
      orderBy: { category: "asc" },
    }),
    prisma.news.count({
      where: category ? { category } : undefined,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);
  const categories = categoryRows
    .map((item) => ({
      value: item.category,
      label: getLocalizedValue(item, "category", locale),
    }))
    .filter((item) => item.value);
  const selectedCategory = categoryRows.find((item) => item.category === category);
  const selectedCategoryLabel = selectedCategory ? getLocalizedValue(selectedCategory, "category", locale) : category;
  const siteUrl = getSiteUrl();
  const listTitle = category ? `${text.news}: ${selectedCategoryLabel}` : text.news;
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: listTitle,
    description:
      category
        ? `${text.news} - ${category}`
        : text.heading,
    url: `${siteUrl}/news${category ? `?category=${encodeURIComponent(category)}` : ""}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: newsItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/news/${item.slug || item.id}`,
        name: getLocalizedValue(item, "title", locale),
        image: toAbsoluteUrl(item.image),
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
        name: text.news,
        item: `${siteUrl}/news`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(itemListJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)} />
      <div className="bg-[#1E293B] pt-[120px] pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto flex items-center text-sm text-gray-300">
          <Link href="/" className="hover:text-white transition-colors">
            {text.home}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-[#F05A22] font-medium">{text.news}</span>
        </div>
      </div>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-10 text-center md:text-left">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F05A22]">{text.subtitle}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-[#1E293B]">{text.heading}</h1>
        </div>

        <div className="mb-10 flex flex-wrap justify-center md:justify-start gap-3">
          <Link
            href="/news"
            className={`rounded-full border px-5 py-2 text-sm font-bold transition-colors ${
              !category
                ? "border-[#F05A22] bg-[#F05A22] text-white"
                : "border-gray-200 text-[#1E293B] hover:border-[#F05A22] hover:text-[#F05A22]"
            }`}
          >
            {text.all}
          </Link>
          {categories.map((item) => (
            <Link
              key={item.value}
              href={`/news?category=${encodeURIComponent(item.value)}`}
              className={`rounded-full border px-5 py-2 text-sm font-bold transition-colors ${
                category === item.value
                  ? "border-[#F05A22] bg-[#F05A22] text-white"
                  : "border-gray-200 text-[#1E293B] hover:border-[#F05A22] hover:text-[#F05A22]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {newsItems.length === 0 ? (
          <div className="rounded-3xl border border-gray-100 bg-gray-50 px-8 py-16 text-center text-gray-500">
            {text.empty}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {newsItems.map((newsItem) => {
              const title = getLocalizedValue(newsItem, "title", locale);
              const summary = getLocalizedValue(newsItem, "summary", locale);
              const categoryLabel = getLocalizedValue(newsItem, "category", locale);

              return (
              <Link
                key={newsItem.id}
                href={`/news/${newsItem.slug || newsItem.id}`}
                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={newsItem.image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider">
                    <span className="inline-flex items-center text-[#F05A22]">
                      <Tag className="mr-1 h-3.5 w-3.5" />
                      {categoryLabel}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="inline-flex items-center text-gray-500">
                      <Calendar className="mr-1 h-3.5 w-3.5" />
                      {newsItem.date}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold leading-tight text-[#1E293B] transition-colors group-hover:text-[#F05A22]">
                    {title}
                  </h2>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-500">{summary}</p>
                  <div className="mt-6 inline-flex items-center text-sm font-bold uppercase tracking-wider text-[#1E293B] transition-colors group-hover:text-[#F05A22]">
                    {text.readMore}
                  </div>
                </div>
              </Link>
            )})}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-2">
            <Link
              href={`/news?${new URLSearchParams({
                ...(category ? { category } : {}),
                page: Math.max(1, page - 1).toString(),
              }).toString()}`}
              className={`w-10 h-10 rounded-none flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-[#1E293B] hover:text-white hover:border-[#1E293B] transition-colors ${page === 1 ? 'pointer-events-none opacity-50' : ''}`}
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </Link>
            
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <Link
                  key={pageNum}
                  href={`/news?${new URLSearchParams({
                    ...(category ? { category } : {}),
                    page: pageNum.toString(),
                  }).toString()}`}
                  className={`w-10 h-10 rounded-none flex items-center justify-center text-[14px] font-bold transition-colors ${
                    page === pageNum 
                      ? "bg-[#1E293B] text-white border border-[#1E293B]" 
                      : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}

            <Link
              href={`/news?${new URLSearchParams({
                ...(category ? { category } : {}),
                page: Math.min(totalPages, page + 1).toString(),
              }).toString()}`}
              className={`w-10 h-10 rounded-none flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-[#1E293B] hover:text-white hover:border-[#1E293B] transition-colors ${page === totalPages ? 'pointer-events-none opacity-50' : ''}`}
            >
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
