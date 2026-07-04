import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { getSiteUrl, parsePathRules } from "@/lib/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = getSiteUrl();

  let setting = null;
  try {
    setting = await prisma.systemSetting.findUnique({
      where: { id: "global" },
    });
  } catch (error) {
    console.error("Failed to generate robots settings:", error);
  }

  if (setting?.siteNoindex) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }

  const disallowRules = parsePathRules(setting?.robotsDisallowPaths || "/admin/*\n/api/*");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: disallowRules,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
