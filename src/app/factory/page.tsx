import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  buildRobotsMetadata,
  buildSeoMetadata,
  composeSeoTitle,
  getSystemSeo,
} from "@/lib/seo";
import FactoryGalleryClient from "./FactoryGalleryClient";

const FACTORY_METADATA_TEXT = {
  en: {
    title: "Factory Gallery",
    description:
      "Explore our state-of-the-art manufacturing facility, equipped with world-class printing and pouch-making technology.",
  },
  es: {
    title: "Galeria de Fabrica",
    description:
      "Explore nuestra moderna planta de manufactura, equipada con tecnologia de impresion y fabricacion de bolsas de clase mundial.",
  },
  ar: {
    title: "معرض المصنع",
    description:
      "استكشف منشاتنا التصنيعية الحديثة والمجهزة بتقنيات طباعة وتصنيع اكياس على مستوى عالمي.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const text = FACTORY_METADATA_TEXT[locale as keyof typeof FACTORY_METADATA_TEXT] || FACTORY_METADATA_TEXT.en;
  const { siteName, titleSuffix, keywords, siteNoindex, noindexPaths } = await getSystemSeo(locale);

  return buildSeoMetadata({
    title: text.title,
    description: text.description,
    siteName,
    socialTitle: composeSeoTitle(text.title, titleSuffix, siteName),
    keywords,
    canonicalPath: "/factory",
    image: "/images/factory/印刷车间/10101 (2).png",
    robots: buildRobotsMetadata("/factory", { siteNoindex, noindexPaths }),
  });
}

export default function FactoryGalleryPage() {
  return <FactoryGalleryClient />;
}
