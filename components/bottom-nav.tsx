"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookMarked, Settings, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Beranda",
      icon: Home,
    },
    {
      href: "/quran",
      label: "Quran",
      icon: BookOpen,
    },
    {
      href: "/bookmarks",
      label: "Penanda",
      icon: BookMarked,
    },
    {
      href: "/settings",
      label: "Pengaturan",
      icon: Settings,
    },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-safe">
      <div className="flex h-16 items-center justify-around">
        <TooltipProvider>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary/70"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-6 w-6 transition-all stroke-[.5px]",
                        isActive && "stroke-[2px]"
                      )}
                    />
                    <span className="text-[10px] font-medium">
                      {item.label}
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
}
