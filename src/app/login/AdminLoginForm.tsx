"use client";

import Link from "next/link";
import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { loginAdmin } from "@/actions/adminAuthActions";
import type { AdminDictionary } from "@/i18n/admin";

export default function AdminLoginForm({
  dict,
  next,
}: {
  dict: AdminDictionary;
  next: string;
}) {
  const [state, formAction, isPending] = useActionState(loginAdmin, null);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next} />

      {state?.error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {state.error === "config" ? dict.auth.configMissing : dict.auth.invalidCredentials}
        </div>
      ) : null}

      <div>
        <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-700">
          {dict.auth.username}
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#F05A22]"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
          {dict.auth.password}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#F05A22]"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F05A22] px-4 py-3 font-medium text-white transition hover:bg-[#D44A18] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LogIn className="h-4 w-4" />
        {isPending ? dict.auth.signingIn : dict.auth.signIn}
      </button>

      <Link
        href="/"
        className="block text-center text-sm font-medium text-gray-500 transition hover:text-gray-700"
      >
        {dict.auth.backHome}
      </Link>
    </form>
  );
}
