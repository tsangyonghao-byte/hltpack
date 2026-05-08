"use client";

import { createContext, useContext } from "react";

const SystemSettingContext = createContext<any>(null);

export function SystemSettingProvider({
  setting,
  children,
}: {
  setting?: any;
  children: React.ReactNode;
}) {
  return (
    <SystemSettingContext.Provider value={setting || null}>
      {children}
    </SystemSettingContext.Provider>
  );
}

export function useSystemSetting() {
  return useContext(SystemSettingContext);
}
