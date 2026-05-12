import prisma from "@/lib/prisma";
import CertificatesClient from "./CertificatesClient";
import { requireAdminSession } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  await requireAdminSession();
  const certificates = await prisma.certificate.findMany({
    orderBy: { order: "asc" },
  });
  return <CertificatesClient initialData={certificates} />;
}