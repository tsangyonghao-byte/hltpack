import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  buildRobotsMetadata,
  buildSeoMetadata,
  composeSeoTitle,
  getSystemSeo,
} from "@/lib/seo";
import prisma from "@/lib/prisma";
import CertificatesPageClient from "./CertificatesPageClient";

const CERTIFICATES_METADATA_TEXT = {
  en: {
    title: "Global Certifications",
    description: "Our commitment to excellence is validated by international standards.",
  },
  es: {
    title: "Certificaciones globales",
    description: "Nuestro compromiso con la excelencia está respaldado por normas internacionales.",
  },
  ar: {
    title: "شهادات عالمية",
    description: "يلتزم مصنعنا بالتميز وفق المعايير الدولية.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const text = CERTIFICATES_METADATA_TEXT[locale as keyof typeof CERTIFICATES_METADATA_TEXT] || CERTIFICATES_METADATA_TEXT.en;
  const { siteName, titleSuffix, keywords, siteNoindex, noindexPaths } = await getSystemSeo(locale);

  return buildSeoMetadata({
    title: text.title,
    description: text.description,
    siteName,
    socialTitle: composeSeoTitle(text.title, titleSuffix, siteName),
    keywords,
    canonicalPath: "/certificates",
    image: "https://cdn.myxypt.com/f4a05196/24/07/b3adb55ea799b1b2c5518c8c7f78f19936c96c9a.jpg",
    robots: buildRobotsMetadata("/certificates", { siteNoindex, noindexPaths }),
  });
}

export default async function CertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
  });
  return <CertificatesPageClient initialCerts={certificates} />;
}
