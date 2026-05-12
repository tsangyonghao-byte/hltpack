import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";
import { cookies } from "next/headers";
import { dictionaries } from "@/i18n/dictionaries";
import prisma from "@/lib/prisma";
import { buildRobotsMetadata, getDefaultSeoImage, getSiteUrl, getSystemSeo } from "@/lib/seo";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const [{ siteName, titleSuffix, description, keywords, defaultImage, siteNoindex }, setting] = await Promise.all([
    getSystemSeo(locale),
    prisma.systemSetting.findUnique({
      where: { id: "global" },
      select: { faviconUrl: true },
    }),
  ]);
  const faviconUrl = setting?.faviconUrl || undefined;

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      template: `%s ${titleSuffix}`,
      default: siteName,
    },
    description,
    keywords,
    icons: faviconUrl
      ? {
          icon: faviconUrl,
          shortcut: faviconUrl,
          apple: faviconUrl,
        }
      : undefined,
    robots: buildRobotsMetadata("/", { siteNoindex }),
    openGraph: {
      title: siteName,
      description,
      siteName,
      url: getSiteUrl(),
      images: [{ url: defaultImage || getDefaultSeoImage() }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
      images: [defaultImage || getDefaultSeoImage()],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const dict = dictionaries[locale as keyof typeof dictionaries] || dictionaries.en;
  // Temporarily disable RTL layout for Arabic to prevent styling issues until a full RTL redesign is implemented
  const isRtl = false; // locale === "ar";

  const [rawNavItems, setting] = await Promise.all([
    prisma.navigationItem.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" },
    }),
    prisma.systemSetting.findUnique({
      where: { id: "global" }
    })
  ]);

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${montserrat.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-gray-800 bg-white font-sans">
        <RootLayoutClient dict={dict} locale={locale} navItems={rawNavItems} setting={setting}>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
