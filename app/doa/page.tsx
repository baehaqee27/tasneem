"use client";

import { doaHarianData } from "@/data/doa-harian";
import { BackgroundPattern } from "@/components/background-pattern";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DoaCard } from "@/components/doa-card";

export default function DoaPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoa = doaHarianData.filter(
    (doa) =>
      doa.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doa.translation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-24 relative bg-background">
      <BackgroundPattern />

      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b px-6 py-4 space-y-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="-ml-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold font-serif text-primary">
            Doa Harian
          </h1>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari doa..."
            className="pl-9 bg-muted/50 border-border/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="p-6 space-y-4 relative z-10 max-w-2xl mx-auto">
        {filteredDoa.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Tidak ada doa yang ditemukan</p>
          </div>
        ) : (
          filteredDoa.map((item) => <DoaCard key={item.id} doa={item} />)
        )}
      </div>
    </div>
  );
}
