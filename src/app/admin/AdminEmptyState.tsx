import Link from "next/link";

export default function AdminEmptyState({
  title,
  description,
  actionHref,
  actionLabel,
  className = "flex flex-col items-center justify-center gap-2 py-6 text-center",
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
        <span className="h-4 w-4 rounded-full border-2 border-gray-300" />
      </div>
      <p className="text-sm font-medium text-gray-700">{title}</p>
      {description ? <p className="max-w-md text-sm leading-6 text-gray-500">{description}</p> : null}
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="mt-1 inline-flex items-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
