import { ComponentProps } from "react";
import { Search } from "lucide-react";

export function AdminFilterSearchInput({
  className = "",
  ...props
}: ComponentProps<"input">) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        {...props}
        className={`w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#F05A22] ${className}`.trim()}
      />
    </div>
  );
}

export function AdminFilterSelect({
  className = "",
  children,
  ...props
}: ComponentProps<"select">) {
  return (
    <select
      {...props}
      className={`rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#F05A22] ${className}`.trim()}
    >
      {children}
    </select>
  );
}
