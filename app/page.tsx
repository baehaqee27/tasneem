"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Bookmark,
  ArrowRight,
  Sparkles,
  Search,
  Folder,
  Music,
} from "lucide-react";
import { useLastRead } from "@/hooks/use-last-read";
import { BackgroundPattern } from "@/components/background-pattern";
import { PrayerTimesWidget } from "@/components/prayer-times-widget";

import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  const { lastRead } = useLastRead();

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden bg-background">
      <BackgroundPattern />
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold font-serif text-primary">Tasneem</h1>
        <div className="flex items-center gap-2">
          <Link href="/search">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="w-5 h-5" />
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <div className="relative z-10 space-y-8 px-6 pt-6">
        {/* Prayer Times Widget */}
        <PrayerTimesWidget />

        {/* Last Read Hero Section */}
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 opacity-50 animate-pulse" />
            <BookOpen className="w-24 h-24 text-primary relative z-10 mx-auto drop-shadow-lg" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Terakhir Dibaca
            </span>
            {lastRead ? (
              <>
                <h2 className="text-4xl font-bold font-serif text-foreground">
                  {lastRead.surahNama}
                </h2>
                <p className="text-lg text-muted-foreground font-medium">
                  Ayat {lastRead.ayatNomor}
                </p>
                <div className="pt-4">
                  <Link href={`/surah/${lastRead.surahNomor}`}>
                    <Button
                      size="lg"
                      className="rounded-full px-8 shadow-lg hover:shadow-primary/25 transition-all duration-300"
                    >
                      Lanjutkan Membaca <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold font-serif text-foreground">
                  Mulai Membaca
                </h2>
                <p className="text-muted-foreground">
                  Belum ada riwayat bacaan.
                </p>
                <div className="pt-4">
                  <Link href="/quran">
                    <Button
                      size="lg"
                      className="rounded-full px-8 shadow-lg hover:shadow-primary/25 transition-all duration-300"
                    >
                      Buka Al-Quran <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Menu */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/quran">
            <div className="group relative overflow-hidden rounded-2xl bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-primary/20 transition-all duration-300 p-6 text-center cursor-pointer">
              <div className="mb-3 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Baca Quran</h3>
              <p className="text-xs text-muted-foreground">Daftar Surah</p>
            </div>
          </Link>

          <Link href="/bookmarks">
            <div className="group relative overflow-hidden rounded-2xl bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-primary/20 transition-all duration-300 p-6 text-center cursor-pointer h-full">
              <div className="mb-3 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Penanda</h3>
              <p className="text-xs text-muted-foreground">Ayat Tersimpan</p>
            </div>
          </Link>

          <Link href="/tahlil">
            <div className="group relative overflow-hidden rounded-2xl bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-primary/20 transition-all duration-300 p-6 text-center cursor-pointer h-full">
              <div className="mb-3 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                <span className="font-serif font-bold text-xl">ت</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Tahlil</h3>
              <p className="text-xs text-muted-foreground">Doa Arwah</p>
            </div>
          </Link>

          <Link href="/doa">
            <div className="group relative overflow-hidden rounded-2xl bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-primary/20 transition-all duration-300 p-6 text-center cursor-pointer h-full">
              <div className="mb-3 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                <span className="font-serif font-bold text-xl">د</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Doa</h3>
              <p className="text-xs text-muted-foreground">Doa Harian</p>
            </div>
          </Link>

          <Link href="/playlists" className="col-span-2">
            <div className="group relative overflow-hidden rounded-2xl bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-primary/20 transition-all duration-300 p-6 text-center cursor-pointer flex items-center justify-between px-8">
              <div className="text-left">
                <h3 className="font-semibold text-foreground mb-1">
                  Daftar Putar
                </h3>
                <p className="text-xs text-muted-foreground">
                  Rekomendasi & Custom
                </p>
              </div>
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                <Music className="w-6 h-6" />
              </div>
            </div>
          </Link>

          <Link href="/collections" className="col-span-2">
            <div className="group relative overflow-hidden rounded-2xl bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-primary/20 transition-all duration-300 p-6 text-center cursor-pointer flex items-center justify-between px-8">
              <div className="text-left">
                <h3 className="font-semibold text-foreground mb-1">
                  Koleksi Ayat
                </h3>
                <p className="text-xs text-muted-foreground">
                  Simpanan Pribadi
                </p>
              </div>
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                <Folder className="w-6 h-6" />
              </div>
            </div>
          </Link>

          <Link href="/asmaul-husna" className="col-span-2">
            <div className="group relative overflow-hidden rounded-2xl bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-primary/20 transition-all duration-300 p-6 text-center cursor-pointer flex items-center justify-between px-8">
              <div className="text-left">
                <h3 className="font-semibold text-foreground mb-1">
                  Asmaul Husna
                </h3>
                <p className="text-xs text-muted-foreground">99 Nama Allah</p>
              </div>
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
