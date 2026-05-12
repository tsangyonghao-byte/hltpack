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
import ContactPageClient from "./ContactPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const { siteName, titleSuffix, keywords, siteNoindex, noindexPaths } = await getSystemSeo(locale);
  const setting = await prisma.systemSetting.findUnique({ where: { id: "global" } });

  return buildSeoMetadata({
    title: content.contact.heroTitle,
    description: content.contact.heroDescription,
    siteName,
    socialTitle: composeSeoTitle(content.contact.heroTitle, titleSuffix, siteName),
    keywords,
    canonicalPath: "/contact",
    image: setting?.contactHeroImage || "/images/factory/制袋车间/10006.png",
    robots: buildRobotsMetadata("/contact", { siteNoindex, noindexPaths }),
  });
}

export default function ContactPage() {
  return <ContactPageClient />;
}
