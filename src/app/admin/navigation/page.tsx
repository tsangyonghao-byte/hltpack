import prisma from "@/lib/prisma";
import NavigationClient from "./NavigationClient";

export const dynamic = "force-dynamic";

export default async function NavigationPage() {
  const items = await prisma.navigationItem.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });

  return <NavigationClient items={items} />;
}
