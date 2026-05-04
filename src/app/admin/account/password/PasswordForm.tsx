"use client";

import { useActionState } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";
import { changeCurrentAdminPassword } from "@/actions/adminAuthActions";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import { ADMIN_ADD_BUTTON } from "../../adminUi";
import AdminFormError from "../../AdminFormError";

type IdentitySummary = {
  username: string;
  name: string;
  role: string;
  isRoot: boolean;
};

const INITIAL_STATE = null;

export default function PasswordForm({
  identity,
}: {
  identity: IdentitySummary;
}) {
  const { locale } = useAdminLanguage();
  const [state, formAction, isPending] = useActionState(changeCurrentAdminPassword, INITIAL_STATE);

  const errorMessage =
    state?.error === "required"
      ? locale === "zh"
        ? "请完整填写当前密码、新密码和确认密码。"
        : "Please fill in current password, new password, and confirmation."
      : state?.error === "length"
        ? locale === "zh"
          ? "新密码至少需要 8 位。"
          : "New password must be at least 8 characters."
        : state?.error === "mismatch"
          ? locale === "zh"
            ? "两次输入的新密码不一致。"
            : "The new passwords do not match."
          : state?.error === "same"
            ? locale === "zh"
              ? "新密码不能与当前密码相同。"
              : "The new password must be different from the current password."
            : state?.error === "invalidCurrent"
              ? locale === "zh"
                ? "当前密码不正确。"
                : "Current password is incorrect."
              : state?.error === "unauthorized"
                ? locale === "zh"
                  ? "当前登录状态已失效，请重新登录。"
                  : "Your session has expired. Please sign in again."
                : undefined;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-5">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F05A22]/10 text-[#F05A22]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-900">
              {locale === "zh" ? "当前登录账号" : "Current Account"}
            </h2>
            <p className="text-sm text-gray-600">
              {locale === "zh" ? "用户名" : "Username"}: <span className="font-medium text-gray-900">{identity.username}</span>
            </p>
            <p className="text-sm text-gray-500">
              {identity.isRoot
                ? locale === "zh"
                  ? "当前为 .env 超级管理员，修改后会同步更新默认后台密码。"
                  : "You are signed in as the .env super admin. Updating here also updates the default admin password."
                : locale === "zh"
                  ? "当前为数据库管理员账号，仅修改该账号本身的密码。"
                  : "You are signed in as a database-backed admin user. This only updates the current account password."}
            </p>
          </div>
        </div>
      </div>

      <form action={formAction} className="space-y-6 px-6 py-6 md:px-8">
        {state?.success ? (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {locale === "zh" ? "密码修改成功，后续请使用新密码登录。" : "Password updated successfully. Please use the new password next time you sign in."}
          </div>
        ) : null}

        <AdminFormError message={errorMessage} />

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-900">
              {locale === "zh" ? "当前密码" : "Current Password"}
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#F05A22]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="nextPassword" className="block text-sm font-semibold text-gray-900">
              {locale === "zh" ? "新密码" : "New Password"}
            </label>
            <input
              id="nextPassword"
              name="nextPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#F05A22]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900">
              {locale === "zh" ? "确认新密码" : "Confirm New Password"}
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#F05A22]"
            />
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-gray-200 pt-5">
          <button type="submit" disabled={isPending} className={ADMIN_ADD_BUTTON}>
            <KeyRound className="mr-2 h-4 w-4" />
            {isPending
              ? locale === "zh"
                ? "保存中..."
                : "Saving..."
              : locale === "zh"
                ? "更新密码"
                : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
