import Link from "next/link";
import { ReactNode } from "react";
import { Edit, Trash2, Eye } from "lucide-react";

export function AdminTableActions({
  children,
  className = "flex items-center justify-end gap-2",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function AdminPreviewAction({
  href,
  title = "Preview",
}: {
  href: string;
  title?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center p-2 text-green-600 bg-green-50 border border-green-100 rounded-lg hover:bg-green-100 hover:border-green-200 transition-colors shadow-sm"
      title={title}
    >
      <Eye className="w-4 h-4" />
    </a>
  );
}

export function AdminEditAction({
  href,
  title,
}: {
  href: string;
  title?: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center p-2 text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 hover:border-blue-200 transition-colors shadow-sm"
      title={title}
    >
      <Edit className="w-4 h-4" />
    </Link>
  );
}

export function AdminDeleteAction({
  onClick,
  disabled,
  title,
}: {
  onClick: () => void;
  disabled?: boolean;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center p-2 text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 hover:border-red-200 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      title={title}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
