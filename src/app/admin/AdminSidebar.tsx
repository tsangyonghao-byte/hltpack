"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  LayoutDashboard,
  Package,
  FileText,
  Layers,
  LogOut,
  MessageSquare,
  Image as ImageIcon,
  Languages,
  Home,
  Navigation,
  Settings,
} from "lucide-react";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import { setAdminLanguage } from "@/actions/adminLangActions";
import { logoutAdmin } from "@/actions/adminAuthActions";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { dict, locale } = useAdminLanguage();

  const navItems = [
    { href: "/admin", label: dict.nav.dashboard, icon: LayoutDashboard, exact: true },
    { href: "/admin/products", label: dict.nav.products, icon: Package },
    { href: "/admin/news", label: dict.nav.news, icon: FileText },
    { href: "/admin/categories", label: dict.nav.categories, icon: Layers },
    { href: "/admin/banners", label: dict.nav.banners, icon: ImageIcon },
    { href: "/admin/navigation", label: locale === "zh" ? "导航栏" : "Navigation", icon: Navigation },
    { href: "/admin/messages", label: dict.nav.messages, icon: MessageSquare },
    { href: "/admin/settings", label: locale === "zh" ? "系统设置" : "Settings", icon: Settings },
  ];

  const toggleLanguage = () => {
    const nextLocale = locale === "zh" ? "en" : "zh";
    startTransition(async () => {
      await setAdminLanguage(nextLocale);
      router.refresh();
    });
  };

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAdmin();
      router.push("/login");
      router.refresh();
    });
  };

  return (
    <aside className="w-64 bg-[#1E293B] text-white flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <span className="text-xl font-bold text-[#F05A22]">HAILITONG</span>
        <span className="ml-2 font-medium text-gray-300">{dict.nav.brandSuffix}</span>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#F05A22] text-white shadow-sm"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800 space-y-2">
        <button
          onClick={toggleLanguage}
          disabled={isPending}
          className="w-full flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
        >
          <Languages className="w-5 h-5 mr-3" />
          {locale === "zh" ? "Switch to English" : "切换为中文"}
        </button>

        <button
          onClick={handleLogout}
          disabled={isPending}
          className="w-full flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
        >
          <LogOut className="w-5 h-5 mr-3" />
          {dict.nav.logout}
        </button>

        <Link href="/" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
          <Home className="w-5 h-5 mr-3" />
          {dict.nav.backToWebsite}
        </Link>
      </div>
    </aside>
  );
}
