import prisma from "@/lib/prisma";
import CategoryForm from "./CategoryForm";
import { notFound } from "next/navigation";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  if (id === "new") {
    return <CategoryForm />;
  }

  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    notFound();
  }

  return <CategoryForm category={category} />;
}
