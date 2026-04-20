import { ReactNode } from "react";

const TONE_CLASS_MAP = {
  success: "bg-green-100 text-green-800",
  info: "bg-blue-100 text-blue-800",
  neutral: "bg-gray-100 text-gray-700",
  warning: "bg-amber-100 text-amber-800",
} as const;

export default function AdminStatusBadge({
  label,
  tone = "neutral",
  icon,
  className = "",
}: {
  label: string;
  tone?: keyof typeof TONE_CLASS_MAP;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${TONE_CLASS_MAP[tone]} ${className}`.trim()}
    >
      {icon}
      {label}
    </span>
  );
}
