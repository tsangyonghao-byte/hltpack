import prisma from "@/lib/prisma";
import ProductForm from "../ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const [categories, setting] = await Promise.all([
    prisma.category.findMany(),
    prisma.systemSetting.findUnique({
      where: { id: "global" },
    }),
  ]);

  return (
    <div className="p-8">
      <ProductForm categories={categories} seoDefaults={setting || undefined} />
    </div>
  );
}
