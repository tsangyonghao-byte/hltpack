import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { ADMIN_CARD_PADDED } from "./adminUi";

const accentClassMap = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  purple: "bg-purple-50 text-purple-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
  slate: "bg-slate-100 text-slate-700",
} as const;

export function AdminDashboardSectionCard({
  title,
  action,
  children,
  className = ADMIN_CARD_PADDED,
}: {
  title: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

export function AdminDashboardStatCard({
  title,
  description,
  value,
  href,
  linkText,
  icon: Icon,
  accent,
}: {
  title: string;
  description: string;
  value: number;
  href: string;
  linkText: string;
  icon: LucideIcon;
  accent: keyof typeof accentClassMap;
}) {
  return (
    <div className={ADMIN_CARD_PADDED}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${accentClassMap[accent]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-3xl font-bold text-gray-800">{value}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-4">{description}</p>
      <Link href={href} className="inline-flex items-center gap-1 font-medium hover:underline">
        {linkText}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export function AdminDashboardQuickLink({
  href,
  label,
  icon: Icon,
  className,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  className: string;
}) {
  return (
    <Link
      href={href}
      className={className}
    >
      <span className="font-medium">{label}</span>
      <Icon className="w-4 h-4" />
    </Link>
  );
}
