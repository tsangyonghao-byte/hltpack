import prisma from "@/lib/prisma";
import NewsForm from "../NewsForm";

export const dynamic = "force-dynamic";

export default async function NewNewsPage() {
  const setting = await prisma.systemSetting.findUnique({
    where: { id: "global" },
  });

  return (
    <div className="p-8">
      <NewsForm seoDefaults={setting || undefined} />
    </div>
  );
}
