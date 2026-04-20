import { ReactNode } from "react";

export default function AdminPageHeader({
  title,
  actions,
  className = "mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
  titleClassName = "text-2xl font-bold text-gray-800 sm:text-3xl",
}: {
  title: ReactNode;
  actions?: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={className}>
      <h1 className={titleClassName}>{title}</h1>
      {actions ? <div className="flex w-full sm:w-auto sm:justify-end">{actions}</div> : null}
    </div>
  );
}
