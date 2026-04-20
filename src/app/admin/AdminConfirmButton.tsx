"use client";

import { ReactNode, useEffect, useState } from "react";

export default function AdminConfirmButton({
  onConfirm,
  children,
  armedChildren,
  disabled,
  className,
  armedClassName,
  title,
  armedTitle,
  resetMs = 3000,
}: {
  onConfirm: () => void | Promise<void>;
  children: ReactNode;
  armedChildren?: ReactNode;
  disabled?: boolean;
  className: string;
  armedClassName?: string;
  title?: string;
  armedTitle?: string;
  resetMs?: number;
}) {
  const [isArmed, setIsArmed] = useState(false);

  useEffect(() => {
    if (!isArmed) return;

    const timer = window.setTimeout(() => {
      setIsArmed(false);
    }, resetMs);

    return () => window.clearTimeout(timer);
  }, [isArmed, resetMs]);

  const handleClick = () => {
    if (disabled) return;

    if (isArmed) {
      void onConfirm();
      setIsArmed(false);
      return;
    }

    setIsArmed(true);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={isArmed && armedClassName ? armedClassName : className}
      title={isArmed ? armedTitle : title}
    >
      {isArmed && armedChildren ? armedChildren : children}
    </button>
  );
}
