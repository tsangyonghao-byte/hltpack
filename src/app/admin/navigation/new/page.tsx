import prisma from "@/lib/prisma";
import NavigationForm from "../NavigationForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NewNavigationPage() {
  const parentOptions = await prisma.navigationItem.findMany({
    select: { id: true, nameZh: true, nameEn: true, parentId: true },
    orderBy: { order: 'asc' }
  });

  return (
    <div className="p-8">
      <NavigationForm parentOptions={parentOptions} />
    </div>
  );
}
