"use client";

import React, { createContext, useContext } from "react";
import { adminDictionaries, type AdminDictionary, type AdminLocale } from "./admin";

type AdminLanguageContextType = {
  dict: AdminDictionary;
  locale: AdminLocale;
};

const AdminLanguageContext = createContext<AdminLanguageContextType>({
  dict: adminDictionaries.en,
  locale: "en",
});

export function AdminLanguageProvider({
  dict,
  locale,
  children,
}: {
  dict: AdminDictionary;
  locale: AdminLocale;
  children: React.ReactNode;
}) {
  return (
    <AdminLanguageContext.Provider value={{ dict, locale }}>
      {children}
    </AdminLanguageContext.Provider>
  );
}

export function useAdminLanguage() {
  return useContext(AdminLanguageContext);
}
