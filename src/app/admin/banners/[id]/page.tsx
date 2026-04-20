import prisma from "@/lib/prisma";
import BannerForm from "./BannerForm";
import { notFound } from "next/navigation";

export default async function EditBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  if (id === "new") {
    return <BannerForm />;
  }

  const banner = await prisma.banner.findUnique({
    where: { id },
  });

  if (!banner) {
    notFound();
  }

  return <BannerForm banner={banner} />;
}
