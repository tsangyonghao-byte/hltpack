import prisma from "@/lib/prisma";
import NavigationForm from "../NavigationForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditNavigationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const [item, parentOptions] = await Promise.all([
    prisma.navigationItem.findUnique({
      where: { id: resolvedParams.id },
    }),
    prisma.navigationItem.findMany({
      where: { id: { not: resolvedParams.id } },
      select: { id: true, nameZh: true, nameEn: true, parentId: true },
      orderBy: { order: 'asc' }
    })
  ]);

  if (!item) {
    notFound();
  }

  return (
    <div className="p-8">
      <NavigationForm item={item} parentOptions={parentOptions} />
    </div>
  );
}
