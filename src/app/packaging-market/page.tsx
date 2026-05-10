import type { Metadata } from "next";
import { cookies } from "next/headers";
import { siteContent } from "@/i18n/siteContent";
import {
  buildRobotsMetadata,
  buildSeoMetadata,
  composeSeoTitle,
  getSystemSeo,
} from "@/lib/seo";
import PackagingMarketPageClient from "./PackagingMarketPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const { siteName, titleSuffix, keywords, siteNoindex, noindexPaths } = await getSystemSeo(locale);

  return buildSeoMetadata({
    title: content.packagingMarket.heroTitle,
    description: content.packagingMarket.heroDescription,
    siteName,
    socialTitle: composeSeoTitle(content.packagingMarket.heroTitle, titleSuffix, siteName),
    keywords,
    canonicalPath: "/packaging-market",
    image: "/images/factory/制袋车间/10010.png",
    robots: buildRobotsMetadata("/packaging-market", { siteNoindex, noindexPaths }),
  });
}

export default function PackagingMarketPage() {
  return <PackagingMarketPageClient />;
}
