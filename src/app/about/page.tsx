import type { Metadata } from "next";
import { cookies } from "next/headers";
import { siteContent } from "@/i18n/siteContent";
import {
  buildRobotsMetadata,
  buildSeoMetadata,
  composeSeoTitle,
  getSystemSeo,
} from "@/lib/seo";
import AboutPageClient from "./AboutPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const { siteName, titleSuffix, keywords, siteNoindex, noindexPaths } = await getSystemSeo(locale);

  return buildSeoMetadata({
    title: content.about.heroTitle,
    description: content.about.heroDescription,
    siteName,
    socialTitle: composeSeoTitle(content.about.heroTitle, titleSuffix, siteName),
    keywords,
    canonicalPath: "/about",
    image: "/images/factory/印刷车间/10001.png",
    robots: buildRobotsMetadata("/about", { siteNoindex, noindexPaths }),
  });
}

export default function AboutPage() {
  return <AboutPageClient />;
}
