"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: { id: string; label: string; badge?: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  size?: "sm" | "default";
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
  size = "default",
}: TabsProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xl bg-zinc-900/90 p-1 border border-zinc-800/80 backdrop-blur-sm",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            type="button"
            className={cn(
              "relative flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all duration-200 cursor-pointer",
              size === "sm"
                ? "px-2.5 py-1 text-xs"
                : "px-3.5 py-1.5 text-xs sm:text-sm",
              isActive
                ? "bg-gradient-to-r from-zinc-800 to-zinc-850 text-white font-semibold shadow-sm border border-zinc-700/60 text-cyan-400"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
            )}
          >
            {tab.label}
            {tab.badge && (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.2 text-[10px] font-mono",
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300"
                    : "bg-zinc-800 text-zinc-400"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
