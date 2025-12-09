"use client";

import { tahlilData } from "@/data/tahlil";
import { BackgroundPattern } from "@/components/background-pattern";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TahlilPage() {
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
        <h1 className="text-xl font-bold font-serif text-primary">Tahlil</h1>
      </div>

      <div className="p-6 space-y-6 relative z-10 max-w-2xl mx-auto">
        {tahlilData.map((item) => (
          <Card
            key={item.id}
            className="bg-card/50 backdrop-blur-sm border-border/50"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-border/20 pb-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                  {item.id}
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
              </div>

              <div className="space-y-4">
                <p className="font-arabic text-2xl font-bold text-right leading-loose text-foreground">
                  {item.arabic}
                </p>
                {item.latin && (
                  <p className="text-sm font-medium text-primary/80 italic">
                    {item.latin}
                  </p>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.translation}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
