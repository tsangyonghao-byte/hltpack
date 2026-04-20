import prisma from "@/lib/prisma";
import NewsForm from "../NewsForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const [newsItem, setting] = await Promise.all([
    prisma.news.findUnique({
      where: { id: resolvedParams.id },
    }),
    prisma.systemSetting.findUnique({
      where: { id: "global" },
    }),
  ]);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="p-8">
      <NewsForm newsItem={newsItem} seoDefaults={setting || undefined} />
    </div>
  );
}
