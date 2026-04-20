import Link from "next/link";
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

export default function AdminFormHeader({
  backHref,
  title,
  actions,
  backClassName = "p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors",
  containerClassName = "flex items-center gap-4 mb-8 pb-6 border-b border-gray-100",
}: {
  backHref: string;
  title: ReactNode;
  actions?: ReactNode;
  backClassName?: string;
  containerClassName?: string;
}) {
  return (
    <div className={containerClassName}>
      <div className="flex items-center gap-4 flex-1">
        <Link href={backHref} className={backClassName}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
