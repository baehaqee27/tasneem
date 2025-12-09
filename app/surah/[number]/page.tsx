"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSurahDetail, getTafsir } from "@/lib/api";
import { SurahDetail, Ayat } from "@/types/quran";
import { AyatCard } from "@/components/ayat-card";
import { AudioPlayer } from "@/components/audio-player";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ArrowLeft, MoreVertical, Info, Settings } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { useLastRead } from "@/hooks/use-last-read";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/theme-toggle";
import { useQari } from "@/hooks/use-qari";
import { TafsirDialog } from "@/components/tafsir-dialog";

export default function SurahPage() {
  const params = useParams();
  const router = useRouter();
  const nomor = Number(params.number);
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [tafsirData, setTafsirData] = useState<
    { ayat: number; teks: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [showStickyTitle, setShowStickyTitle] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);

  // Tafsir State
  const [showTafsirDialog, setShowTafsirDialog] = useState(false);
  const [selectedTafsirAyat, setSelectedTafsirAyat] = useState<Ayat | null>(
    null
  );

  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { saveLastRead } = useLastRead();
  const { selectedQari } = useQari();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowStickyTitle(true);
      } else {
        setShowStickyTitle(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!nomor || isNaN(nomor)) {
        setLoading(false);
        return;
      }

      try {
        // Fetch in parallel for better performance
        const [surahData, tafsirRes] = await Promise.all([
          getSurahDetail(nomor),
          getTafsir(nomor),
        ]);

        setSurah(surahData);
        setTafsirData(tafsirRes);

        // Save last read when opening surah (default to ayat 1)
        saveLastRead(surahData.nomor, surahData.nama_latin, 1);
      } catch (error) {
        console.error("Failed to fetch surah data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nomor]);

  // Handle Hash Scrolling
  useEffect(() => {
    if (!loading && surah) {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        // Use a slight delay to allow layout to settle
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.classList.add("bg-primary/10");
            setTimeout(() => {
              element.classList.remove("bg-primary/10");
            }, 2000);
          }
        }, 500);
      }
    }
  }, [loading, surah]);

  // Helper to get audio URL
  const getAudioUrl = () => {
    if (!surah) return "";
    // Format surah number to 3 digits (e.g. 001, 012, 114)
    const surahNum = surah.nomor.toString().padStart(3, "0");
    return `${selectedQari.urlPattern}${surahNum}.mp3`;
  };

  const handleTafsirClick = (ayat: Ayat) => {
    setSelectedTafsirAyat(ayat);
    setShowTafsirDialog(true);
  };

  const getTafsirText = (ayatNomor: number) => {
    return tafsirData.find((t) => t.ayat === ayatNomor)?.teks || null;
  };

  if (loading) {
    return (
      <div className="space-y-6 p-4">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-8" />
        </div>
        <div className="text-center space-y-2 mb-8">
          <Skeleton className="h-10 w-48 mx-auto" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
        <div className="space-y-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!surah) {
    return <div>Surah not found</div>;
  }

  return (
    <div className="bg-background min-h-screen pb-48">
      {/* Header */}
      <div
        className={`sticky top-4 z-20 px-4 transition-all duration-300 ${
          showStickyTitle ? "translate-y-0" : "translate-y-0"
        }`}
      >
        <div
          className={`w-full flex items-center justify-between rounded-full px-4 py-2 transition-all duration-300 ${
            showStickyTitle
              ? "bg-background/80 backdrop-blur-md shadow-lg border"
              : "bg-transparent"
          }`}
        >
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className={showStickyTitle ? "h-8 w-8" : ""}
            >
              <ArrowLeft className="h-6 w-6 text-foreground" />
            </Button>
          </Link>

          <div
            className={`flex flex-col items-center transition-all duration-300 ${
              showStickyTitle ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            {showStickyTitle && (
              <span className="text-sm font-bold font-serif text-primary">
                {surah.nama_latin}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={showStickyTitle ? "h-8 w-8" : ""}
                >
                  <MoreVertical className="h-6 w-6 text-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowInfoDialog(true)}>
                  <Info className="mr-2 h-4 w-4" />
                  Info Surah
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Pengaturan
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
          <DialogContent className="max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex flex-col gap-1">
                <span className="font-serif text-2xl text-primary">
                  {surah.nama_latin}
                </span>
                <span className="text-sm font-normal text-muted-foreground">
                  {surah.arti} • {surah.jumlah_ayat} Ayat • {surah.tempat_turun}
                </span>
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex-1 pr-4">
              <div
                className="text-sm leading-relaxed text-muted-foreground space-y-4"
                dangerouslySetInnerHTML={{ __html: surah.deskripsi }}
              />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {/* Surah Info */}
      <div className="px-4 py-6 text-center border-b">
        <h2 className="text-3xl font-arabic font-bold mb-2 text-primary">
          {surah.nama}
        </h2>
        <p className="text-foreground font-medium">
          {surah.nama_latin} • {surah.jumlah_ayat} Ayat
        </p>
      </div>

      {/* Ayat List */}
      <div className="divide-y divide-border">
        {surah.ayat.map((ayat, index) => (
          <AyatCard
            key={ayat.id}
            ayat={ayat}
            index={index}
            isBookmarked={isBookmarked(ayat.id)}
            onToggleBookmark={() =>
              toggleBookmark(ayat, surah.nama_latin, surah.nomor)
            }
            onTafsirClick={() => handleTafsirClick(ayat)}
            surahName={surah.nama_latin}
            surahNumber={surah.nomor}
          />
        ))}
      </div>

      {/* Audio Player */}
      {surah && (
        <AudioPlayer
          src={getAudioUrl()}
          title={`Surah ${surah.nama_latin}`}
          onNext={
            nomor < 114 ? () => router.push(`/surah/${nomor + 1}`) : undefined
          }
          onPrev={
            nomor > 1 ? () => router.push(`/surah/${nomor - 1}`) : undefined
          }
        />
      )}

      {/* Tafsir Dialog */}
      <TafsirDialog
        open={showTafsirDialog}
        onOpenChange={setShowTafsirDialog}
        ayat={selectedTafsirAyat}
        tafsir={
          selectedTafsirAyat ? getTafsirText(selectedTafsirAyat.nomor) : null
        }
        surahName={surah.nama_latin}
      />
    </div>
  );
}
