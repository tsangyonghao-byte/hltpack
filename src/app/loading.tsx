"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50/50 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-6">
        {/* Premium Rotating Indicator */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-gray-200/80 border-t-[#F05A22] animate-spin"></div>
          <div className="absolute w-10 h-10 rounded-full border border-gray-100 border-b-[#1A1A1A] animate-spin [animation-direction:reverse]"></div>
        </div>
        
        {/* Pulsing Brand name */}
        <div className="flex items-center space-x-1.5 animate-pulse">
          <span className="text-lg font-bold tracking-[0.2em] text-[#1A1A1A] uppercase">HLT</span>
          <span className="text-lg font-bold tracking-[0.2em] text-[#F05A22] uppercase">Pack</span>
        </div>
        
        {/* Sleek Subtext */}
        <p className="text-[11px] text-gray-400 uppercase tracking-[0.25em] font-medium animate-pulse">
          Loading packaging solutions
        </p>
      </div>
    </div>
  );
}
