import type { Metadata } from "next";
import { cookies } from "next/headers";
import { siteContent } from "@/i18n/siteContent";
import {
  buildRobotsMetadata,
  buildSeoMetadata,
  composeSeoTitle,
  getSystemSeo,
} from "@/lib/seo";
import HowWeWorkPageClient from "./HowWeWorkPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const { siteName, titleSuffix, keywords, siteNoindex, noindexPaths } = await getSystemSeo(locale);

  return buildSeoMetadata({
    title: content.howWeWork.heroTitle,
    description: content.howWeWork.heroDescription,
    siteName,
    socialTitle: composeSeoTitle(content.howWeWork.heroTitle, titleSuffix, siteName),
    keywords,
    canonicalPath: "/how-we-work",
    image: "/images/factory/印刷车间/10001.png",
    robots: buildRobotsMetadata("/how-we-work", { siteNoindex, noindexPaths }),
  });
}

export default function HowWeWorkPage() {
  return <HowWeWorkPageClient />;
}
