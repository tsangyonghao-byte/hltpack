import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import CertificateForm from "../CertificateForm";

export default async function EditCertificatePage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const certificate = await prisma.certificate.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!certificate) {
    notFound();
  }

  return <CertificateForm certificate={certificate} />;
}
