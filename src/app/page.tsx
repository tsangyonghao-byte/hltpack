import prisma from "@/lib/prisma";
import Hero from "@/components/home/Hero";
import BentoFeatures from "@/components/home/BentoFeatures";
import Industries from "@/components/home/Industries";
import AboutUs from "@/components/home/AboutUs";
import FactoryTour from "@/components/home/FactoryTour";
import Certificates from "@/components/home/Certificates";
import News from "@/components/home/News";
import BottomCTA from "@/components/home/BottomCTA";
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
    siteName,
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
      {/* Modern Vibe Backgrounds (Replaces old industrial 10001/10002.png) */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-[1500px] pointer-events-none z-0 overflow-hidden bg-[#FAFAFA]">
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-[#F05A22]/5 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 bg-[#FAFAFA] lg:bg-transparent">
        <Hero banners={banners} />
      </div>
      <div className="relative z-10 bg-white">
        <BentoFeatures />
        <Industries />
        <AboutUs />
        <FactoryTour />
        <Certificates />
        <News news={allNews} categories={newsCategories} />
        <BottomCTA />
      </div>
    </>
  );
}
