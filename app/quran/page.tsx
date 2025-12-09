"use client";

import { useState, useEffect } from "react";
import { getSurahList } from "@/lib/api";
import { Surah } from "@/types/quran";
import { SurahCard } from "@/components/surah-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Settings, Search, ArrowLeft, BookOpen, Bookmark } from "lucide-react";
import Link from "next/link";
import { SimpleTooltip } from "@/components/ui/simple-tooltip";
import { useLastRead } from "@/hooks/use-last-read";
import { Button } from "@/components/ui/button";
import { BackgroundPattern } from "@/components/background-pattern";

import { ThemeToggle } from "@/components/theme-toggle";

import { useScrollRestoration } from "@/hooks/use-scroll-restoration";

export default function Home() {
  const [surahs, setSurah] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { lastRead } = useLastRead();

  // Restore scroll position when list is loaded
  useScrollRestoration("quran-list-scroll", !loading);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const data = await getSurahList();
        setSurah(data);
        setFilteredSurahs(data);
      } catch (error) {
        console.error("Failed to fetch surahs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  useEffect(() => {
    const filtered = surahs.filter(
      (surah) =>
        surah.nama_latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.arti.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSurahs(filtered);
  }, [searchQuery, surahs]);

  return (
    <div className="space-y-4 bg-background min-h-screen pb-24 relative">
      <BackgroundPattern />
      {/* Header */}
      <div className="flex items-center justify-between py-4 border-b px-4 sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-foreground">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold font-serif text-primary">
            Al-Quran
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <SimpleTooltip content="Pencarian Ayat">
            <Link href="/search">
              <Search className="w-6 h-6" />
            </Link>
          </SimpleTooltip>
          <ThemeToggle />
          <SimpleTooltip content="Penanda">
            <Link href="/bookmarks">
              <Bookmark className="w-6 h-6" />
            </Link>
          </SimpleTooltip>
          <SimpleTooltip content="Pengaturan">
            <Link href="/settings">
              <Settings className="w-6 h-6" />
            </Link>
          </SimpleTooltip>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="surah" className="w-full px-4">
        <TabsList className="w-full grid grid-cols-3 bg-muted/50 p-1 rounded-lg mb-6">
          <TabsTrigger
            value="surah"
            className="rounded-md data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm font-medium transition-all"
          >
            Surah
          </TabsTrigger>
          <TabsTrigger
            value="juz"
            className="rounded-md data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm font-medium transition-all"
          >
            Juz
          </TabsTrigger>
          <TabsTrigger
            value="riwayat"
            className="rounded-md data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm font-medium transition-all"
          >
            Riwayat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="surah" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Nama Surah"
              className="w-full bg-muted/30 border border-input rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredSurahs.map((surah) => (
                <SurahCard key={surah.nomor} surah={surah} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="juz">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 30 }).map((_, i) => (
              <Link key={i} href={`/juz/${i + 1}`} className="block">
                <div className="bg-card border hover:border-primary/50 hover:bg-primary/5 transition-colors rounded-xl p-4 flex flex-col items-center justify-center gap-2 aspect-square">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold font-arabic">
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium">Juz {i + 1}</span>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="riwayat">
          {lastRead ? (
            <div className="bg-card border rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg">Terakhir Dibaca</h3>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">
                  {lastRead.surahNama}
                </p>
                <p className="text-muted-foreground">
                  Ayat {lastRead.ayatNomor}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(lastRead.timestamp).toLocaleDateString()} •{" "}
                  {new Date(lastRead.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <Link href={`/surah/${lastRead.surahNomor}`} className="block">
                <Button className="w-full mt-4">Lanjutkan Membaca</Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-center px-4">
              <BookOpen className="w-12 h-12 mb-4 opacity-20" />
              <p>Belum ada riwayat bacaan.</p>
              <p className="text-sm mt-2">
                Mulai membaca untuk menyimpan riwayat.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
