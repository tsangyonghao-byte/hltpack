import prisma from "@/lib/prisma";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const setting = await prisma.systemSetting.findUnique({
    where: { id: "global" }
  });

  return (
    <div className="p-8">
      <SettingsForm setting={setting || {}} />
    </div>
  );
}
