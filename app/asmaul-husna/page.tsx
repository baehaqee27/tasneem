"use client";

import { asmaulHusnaData } from "@/data/asmaul-husna";
import { BackgroundPattern } from "@/components/background-pattern";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AsmaulHusnaPage() {
  return (
    <div className="min-h-screen pb-24 relative bg-background">
      <BackgroundPattern />

      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b flex items-center gap-3 px-6 py-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="-ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-serif text-primary">
          Asmaul Husna
        </h1>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4 relative z-10">
        {asmaulHusnaData.map((item) => (
          <div
            key={item.urutan}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 hover:bg-card/80 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary mb-1 group-hover:scale-110 transition-transform">
              {item.urutan}
            </div>
            <h3 className="font-arabic text-2xl font-bold text-foreground">
              {item.arab}
            </h3>
            <div>
              <p className="font-semibold text-sm text-primary">{item.latin}</p>
              <p className="text-[10px] text-muted-foreground leading-tight mt-1">
                {item.arti}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
