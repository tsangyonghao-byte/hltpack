"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type HeroContextType = {
  currentSlideIndex: number;
  setCurrentSlideIndex: (index: number) => void;
};

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export function HeroProvider({ children }: { children: ReactNode }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  return (
    <HeroContext.Provider value={{ currentSlideIndex, setCurrentSlideIndex }}>
      {children}
    </HeroContext.Provider>
  );
}

export function useHero() {
  const context = useContext(HeroContext);
  if (context === undefined) {
    throw new Error('useHero must be used within a HeroProvider');
  }
  return context;
}