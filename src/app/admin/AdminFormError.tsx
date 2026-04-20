export default function AdminFormError({
  message,
  className = "mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700",
}: {
  message?: string;
  className?: string;
}) {
  if (!message) return null;

  return <div className={className}>{message}</div>;
}
