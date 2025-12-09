"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SimpleTooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
}

export function SimpleTooltip({
  children,
  content,
  className,
}: SimpleTooltipProps) {
  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <div
        className={cn(
          "absolute bottom-full mb-2 hidden whitespace-nowrap rounded bg-primary px-2 py-1 text-xs text-primary-foreground shadow-md group-hover:block z-50",
          className
        )}
      >
        {content}
        {/* Triangle */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary" />
      </div>
    </div>
  );
}
