"use client";

import React, { createContext, useContext } from "react";
import { dictionaries } from "./dictionaries";

type Dictionary = typeof dictionaries.en;
type LanguageContextType = {
  dict: Dictionary;
  locale: string;
};

const LanguageContext = createContext<LanguageContextType>({
  dict: dictionaries.en,
  locale: "en",
});

export function LanguageProvider({
  dict,
  locale,
  children,
}: {
  dict: Dictionary;
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <LanguageContext.Provider value={{ dict, locale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
