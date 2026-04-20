import { ComponentProps, ReactNode } from "react";

const toneClassMap = {
  orange: "focus:ring-[#F05A22]/20 focus:border-[#F05A22]",
  green: "focus:ring-green-500/20 focus:border-green-500",
} as const;

type Tone = keyof typeof toneClassMap;

export function AdminField({
  label,
  htmlFor,
  hint,
  children,
  className = "space-y-2",
  labelClassName = "text-sm font-semibold text-gray-700",
  hintClassName = "text-xs text-gray-500",
}: {
  label: ReactNode;
  htmlFor?: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
  hintClassName?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={labelClassName}>
        {label}
      </label>
      {children}
      {hint ? <p className={hintClassName}>{hint}</p> : null}
    </div>
  );
}

export function AdminInput({
  tone = "orange",
  className = "",
  ...props
}: ComponentProps<"input"> & { tone?: Tone }) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-colors focus:bg-white focus:ring-2 ${toneClassMap[tone]} ${className}`.trim()}
    />
  );
}

export function AdminTextarea({
  tone = "orange",
  className = "",
  ...props
}: ComponentProps<"textarea"> & { tone?: Tone }) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-colors resize-none focus:bg-white focus:ring-2 ${toneClassMap[tone]} ${className}`.trim()}
    />
  );
}

export function AdminSelect({
  tone = "orange",
  className = "",
  children,
  ...props
}: ComponentProps<"select"> & { tone?: Tone }) {
  return (
    <select
      {...props}
      className={`w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-colors focus:bg-white focus:ring-2 ${toneClassMap[tone]} ${className}`.trim()}
    >
      {children}
    </select>
  );
}

export function AdminToggleField({
  id,
  name,
  label,
  hint,
  defaultChecked,
  checked,
  onChange,
  className = "flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4",
}: {
  id: string;
  name: string;
  label: ReactNode;
  hint?: ReactNode;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: ComponentProps<"input">["onChange"];
  className?: string;
}) {
  return (
    <div className={className}>
      <input
        type="checkbox"
        id={id}
        name={name}
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 rounded border-gray-300 text-[#F05A22] focus:ring-[#F05A22]"
      />
      <div className="flex flex-col">
        <label htmlFor={id} className="cursor-pointer text-sm font-semibold text-gray-800">
          {label}
        </label>
        {hint ? <span className="text-xs text-gray-500">{hint}</span> : null}
      </div>
    </div>
  );
}
