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
import PackagingSafetyPageClient from "./PackagingSafetyPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const { siteName, titleSuffix, keywords, siteNoindex, noindexPaths } = await getSystemSeo(locale);
  const setting = await prisma.systemSetting.findUnique({ where: { id: "global" } });

  return buildSeoMetadata({
    title: content.packagingSafety.heroTitle,
    description: content.packagingSafety.heroDescription,
    siteName,
    socialTitle: composeSeoTitle(content.packagingSafety.heroTitle, titleSuffix, siteName),
    keywords,
    canonicalPath: "/packaging-safety",
    image: setting?.safetyHeroImage || "/images/factory/制袋车间/10002.png",
    robots: buildRobotsMetadata("/packaging-safety", { siteNoindex, noindexPaths }),
  });
}

export default async function PackagingSafetyPage() {
  const setting = await prisma.systemSetting.findUnique({ where: { id: "global" } });
  return <PackagingSafetyPageClient setting={setting} />;
}
