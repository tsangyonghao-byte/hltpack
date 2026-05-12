import type { Metadata } from "next";
import { cookies } from "next/headers";
import { siteContent } from "@/i18n/siteContent";
import {
  buildRobotsMetadata,
  buildSeoMetadata,
  composeSeoTitle,
  getSystemSeo,
} from "@/lib/seo";
import prisma from "@/lib/prisma";
import PackagingMarketPageClient from "./PackagingMarketPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const { siteName, titleSuffix, keywords, siteNoindex, noindexPaths } = await getSystemSeo(locale);
  const setting = await prisma.systemSetting.findUnique({ where: { id: "global" } });

  return buildSeoMetadata({
    title: content.packagingMarket.heroTitle,
    description: content.packagingMarket.heroDescription,
    siteName,
    socialTitle: composeSeoTitle(content.packagingMarket.heroTitle, titleSuffix, siteName),
    keywords,
    canonicalPath: "/packaging-market",
    image: setting?.marketHeroImage || "/images/factory/制袋车间/10010.png",
    robots: buildRobotsMetadata("/packaging-market", { siteNoindex, noindexPaths }),
  });
}

export default async function PackagingMarketPage() {
  const setting = await prisma.systemSetting.findUnique({ where: { id: "global" } });
  return <PackagingMarketPageClient setting={setting} />;
}
