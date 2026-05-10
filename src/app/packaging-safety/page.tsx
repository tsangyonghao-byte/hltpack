import type { Metadata } from "next";
import { cookies } from "next/headers";
import { siteContent } from "@/i18n/siteContent";
import {
  buildRobotsMetadata,
  buildSeoMetadata,
  composeSeoTitle,
  getSystemSeo,
} from "@/lib/seo";
import PackagingSafetyPageClient from "./PackagingSafetyPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const { siteName, titleSuffix, keywords, siteNoindex, noindexPaths } = await getSystemSeo(locale);

  return buildSeoMetadata({
    title: content.packagingSafety.heroTitle,
    description: content.packagingSafety.heroDescription,
    siteName,
    socialTitle: composeSeoTitle(content.packagingSafety.heroTitle, titleSuffix, siteName),
    keywords,
    canonicalPath: "/packaging-safety",
    image: "/images/factory/制袋车间/10002.png",
    robots: buildRobotsMetadata("/packaging-safety", { siteNoindex, noindexPaths }),
  });
}

export default function PackagingSafetyPage() {
  return <PackagingSafetyPageClient />;
}
