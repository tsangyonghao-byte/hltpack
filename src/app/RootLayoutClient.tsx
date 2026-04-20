"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWidgets from "@/components/layout/FloatingWidgets";
import { HeroProvider } from "@/components/home/HeroContext";
import { LanguageProvider } from "@/i18n/LanguageContext";

export default function RootLayoutClient({
  children,
  dict,
  locale,
  navItems = [],
  setting,
}: {
  children: React.ReactNode;
  dict: any;
  locale: string;
  navItems?: any[];
  setting?: any;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isLogin = pathname === "/login";

  if (isAdmin || isLogin) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <LanguageProvider dict={dict} locale={locale}>
      <div className="flex flex-col min-h-screen w-full max-w-[1920px] mx-auto">
        <HeroProvider>
          <Navbar navItems={navItems} />
          <main className="flex-grow">{children}</main>
          <Footer setting={setting} navItems={navItems} />
          <FloatingWidgets />
        </HeroProvider>
      </div>
    </LanguageProvider>
  );
}
