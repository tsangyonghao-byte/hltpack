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
import SustainabilityPageClient from "./SustainabilityPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const { siteName, titleSuffix, keywords, siteNoindex, noindexPaths } = await getSystemSeo(locale);
  const setting = await prisma.systemSetting.findUnique({ where: { id: "global" } });

  return buildSeoMetadata({
    title: content.sustainability.heroTitle,
    description: content.sustainability.heroDescription,
    siteName,
    socialTitle: composeSeoTitle(content.sustainability.heroTitle, titleSuffix, siteName),
    keywords,
    canonicalPath: "/sustainability",
    image: setting?.sustainabilityHeroImage || "/images/factory/制袋车间/10008.png",
    robots: buildRobotsMetadata("/sustainability", { siteNoindex, noindexPaths }),
  });
}

export default async function SustainabilityPage() {
  const setting = await prisma.systemSetting.findUnique({ where: { id: "global" } });
  return <SustainabilityPageClient setting={setting} />;
}
