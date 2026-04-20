import { ReactNode } from "react";

export function AdminTableHead({
  children,
}: {
  children: ReactNode;
}) {
  return <thead>{children}</thead>;
}

export function AdminTableHeadRow({
  children,
  className = "bg-gray-50 border-b border-gray-200",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <tr className={className}>{children}</tr>;
}

export function AdminTableHeadCell({
  children,
  className = "px-6 py-4 font-semibold text-gray-600",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <th className={className}>{children}</th>;
}
