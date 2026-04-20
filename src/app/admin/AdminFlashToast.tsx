"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { dismissAdminFlash } from "@/actions/adminAuthActions";

export default function AdminFlashToast({
  message,
}: {
  message?: string;
}) {
  const shownRef = useRef(false);

  useEffect(() => {
    if (!message || shownRef.current) {
      return;
    }

    shownRef.current = true;
    toast.success(message);
    void dismissAdminFlash();
  }, [message]);

  return null;
}
