import prisma from "@/lib/prisma";
import Hero from "@/components/home/Hero";
import Clients from "@/components/home/Clients";
import WhyUs from "@/components/home/WhyUs";
import Showcase from "@/components/home/Showcase";
import Certificates from "@/components/home/Certificates";
import Process from "@/components/home/Process";
import News from "@/components/home/News";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { buildRobotsMetadata, buildSeoMetadata, getDefaultSeoImage, getSiteUrl, getSystemSeo, jsonLdScript } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const { siteName, description, keywords, defaultImage, siteNoindex, noindexPaths } = await getSystemSeo(locale);

  return buildSeoMetadata({
    title: siteName,
    description,
    keywords,
    canonicalPath: "/",
    defaultImage,
    robots: buildRobotsMetadata("/", { siteNoindex, noindexPaths }),
  });
}

export default async function Home() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const { siteName, description } = await getSystemSeo(locale);
  const [banners, allNews, categoryRows, setting] = await Promise.all([
    prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.news.findMany({
      orderBy: { date: "desc" },
    }),
    prisma.news.findMany({
      distinct: ["category"],
      select: { category: true },
      orderBy: { category: "asc" },
    }),
    prisma.systemSetting.findUnique({
      where: { id: "global" },
    }),
  ]);

  const newsCategories = categoryRows.map((item) => item.category).filter(Boolean);
  const siteUrl = getSiteUrl();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: getDefaultSeoImage(),
    contactPoint: setting?.contactEmail || setting?.contactPhone
      ? [
          {
            "@type": "ContactPoint",
            email: setting?.contactEmail || undefined,
            telephone: setting?.contactPhone || undefined,
            contactType: "customer support",
          },
        ]
      : undefined,
    sameAs: [
      setting?.facebook,
      setting?.linkedin,
      setting?.youtube,
      setting?.instagram,
      setting?.twitter,
    ].filter(Boolean),
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd)} />
      {/* Global Background Images for the Top Sections (Hero & WhyUs) */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-[1500px] md:h-[2000px] pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute left-[-40%] md:left-[-32%] top-[200px] md:top-[550px] -translate-y-1/2 w-[120%] md:w-[50%] h-[600px] md:h-[884px] bg-no-repeat bg-contain bg-center opacity-90"
          style={{ backgroundImage: "url('/10001.png')" }}
        />
        <div
          className="absolute right-[-40%] md:right-[-25%] top-[600px] md:top-[250px] -translate-y-1/2 w-[140%] md:w-[85%] h-[800px] md:h-[1328px] bg-no-repeat bg-contain bg-center opacity-90"
          style={{ backgroundImage: "url('/10002.png')" }}
        />
      </div>

      <div className="relative z-10">
        <Hero banners={banners} />
        <Clients />
        <WhyUs />
      </div>
      <div className="relative z-10 bg-white">
        <Showcase />
        <Certificates />
        <Process />
        <News news={allNews} categories={newsCategories} />
      </div>
    </>
  );
}
