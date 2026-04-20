import { ReactNode } from "react";

export function AdminImageCell({
  src,
  alt,
  emptyIcon,
  wrapperClassName = "w-16 h-12 rounded bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center",
  imageClassName = "w-full h-full object-cover",
}: {
  src?: string | null;
  alt: string;
  emptyIcon?: ReactNode;
  wrapperClassName?: string;
  imageClassName?: string;
}) {
  return (
    <div className={wrapperClassName}>
      {src ? <img src={src} alt={alt} className={imageClassName} /> : emptyIcon}
    </div>
  );
}

export function AdminTagCell({
  label,
  className = "inline-flex rounded-full border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700",
}: {
  label: ReactNode;
  className?: string;
}) {
  return <span className={className}>{label}</span>;
}

export function AdminDateCell({
  value,
  className = "text-sm text-gray-500 whitespace-nowrap",
}: {
  value: ReactNode;
  className?: string;
}) {
  return <span className={className}>{value}</span>;
}

export function AdminExcerptCell({
  value,
  className = "text-sm text-gray-600 truncate",
}: {
  value: ReactNode;
  className?: string;
}) {
  return <div className={className}>{value}</div>;
}
