import prisma from "@/lib/prisma";
import ProductForm from "../ProductForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const [product, categories, setting] = await Promise.all([
    prisma.product.findUnique({
      where: { id: resolvedParams.id },
    }),
    prisma.category.findMany(),
    prisma.systemSetting.findUnique({
      where: { id: "global" },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="p-8">
      <ProductForm product={product} categories={categories} seoDefaults={setting || undefined} />
    </div>
  );
}
