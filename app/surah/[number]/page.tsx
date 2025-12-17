"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MoreVertical,
  Play,
  Info,
  Settings,
  Share2,
  Music,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSurahDetail, getTafsir } from "@/lib/api";
import type {
  SurahDetail as SurahDetailType,
  Tafsir,
  Ayat,
} from "@/types/quran";
import { Skeleton } from "@/components/ui/skeleton";
import { AyatCard } from "@/components/ayat-card";
import { AudioPlayer } from "@/components/audio-player";
import { useBookmarks } from "@/hooks/use-bookmarks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/theme-toggle";
import { useQari } from "@/hooks/use-qari";
import { usePlaylists } from "@/hooks/use-playlists";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TafsirShareDialog } from "@/components/tafsir-share-dialog";
import { ImageDown } from "lucide-react";
import { TafsirDialog } from "@/components/tafsir-dialog";

export default function SurahDetail({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = React.use(params);
  const router = useRouter();
  const nomor = parseInt(number);

  const [surah, setSurah] = useState<SurahDetailType | null>(null);
  const [tafsirData, setTafsirData] = useState<Tafsir[]>([]);
  const [loading, setLoading] = useState(true);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { selectedQari } = useQari();
  const { playlists, addToPlaylist, createPlaylist } = usePlaylists();

  const [showTafsirDialog, setShowTafsirDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [showPlaylistDialog, setShowPlaylistDialog] = useState(false);
  const [selectedTafsirAyat, setSelectedTafsirAyat] = useState<Ayat | null>(
    null
  );
  const [showStickyTitle, setShowStickyTitle] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showTafsirShareDialog, setShowTafsirShareDialog] = useState(false);

  useEffect(() => {
    const loadSurah = async () => {
      try {
        const detail = await getSurahDetail(nomor);
        setSurah(detail);
        const tafsir = await getTafsir(nomor);
        setTafsirData(tafsir);
      } catch (error) {
        console.error("Failed to fetch surah data", error);
      } finally {
        setLoading(false);
      }
    };
    loadSurah();
  }, [nomor]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowStickyTitle(scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getAudioUrl = () => {
    if (!surah) return "";
    return surah.audioFull[selectedQari.id] || surah.audio || "";
  };

  const handleTafsirClick = (ayat: Ayat) => {
    setSelectedTafsirAyat(ayat);
    setShowTafsirDialog(true);
  };

  const getTafsirText = (ayatNomor: number) => {
    return tafsirData.find((t) => t.ayat === ayatNomor)?.teks || null;
  };

  const handleAddToPlaylist = (playlistId: string) => {
    if (!surah) return;
    addToPlaylist(playlistId, surah.nomor);
    setShowPlaylistDialog(false);
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;
    const newPl = createPlaylist(newPlaylistName);
    if (surah) addToPlaylist(newPl.id, surah.nomor);
    setNewPlaylistName("");
    setShowPlaylistDialog(false);
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
          <Link href="/quran">
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
            <Button
              variant="ghost"
              size="icon"
              className={showStickyTitle ? "h-8 w-8" : ""}
              onClick={() => setShowPlaylistDialog(true)}
              title="Simpan ke Playlist"
            >
              <Music className="h-5 w-5 text-foreground" />
              <span className="sr-only">Simpan ke Playlist</span>
            </Button>
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
                <DropdownMenuItem onClick={() => setShowPlaylistDialog(true)}>
                  <Music className="mr-2 h-4 w-4" />
                  Simpan ke Playlist
                </DropdownMenuItem>
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

        <Dialog open={showPlaylistDialog} onOpenChange={setShowPlaylistDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Simpan ke Playlist</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Playlist Saya</Label>
                <div className="grid gap-2 max-h-[200px] overflow-y-auto">
                  {playlists.filter((p) => p.type === "custom").length ===
                    0 && (
                    <p className="text-sm text-muted-foreground">
                      Belum ada playlist custom.
                    </p>
                  )}
                  {playlists
                    .filter((p) => p.type === "custom")
                    .map((p) => (
                      <Button
                        key={p.id}
                        variant="outline"
                        className="justify-start"
                        onClick={() => handleAddToPlaylist(p.id)}
                      >
                        <Music className="mr-2 h-4 w-4" />
                        {p.name}
                      </Button>
                    ))}
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t">
                <Label>Buat Playlist Baru</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Nama playlist..."
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                  />
                  <Button onClick={handleCreatePlaylist}>Buat</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Surah Info */}
      <div className="px-4 py-6 text-center border-b">
        <h2 className="text-3xl font-arabic font-bold mb-2 text-primary">
          {surah.nama}
        </h2>
        <p className="text-foreground font-medium">
          {surah.nama_latin} • {surah.arti} • {surah.jumlah_ayat} Ayat •{" "}
          {surah.tempat_turun}
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
          subtitle={`Sedang Memutar Surah ${surah.nama_latin}`}
          onNext={
            nomor < 114 ? () => router.push(`/surah/${nomor + 1}`) : undefined
          }
          onPrev={
            nomor > 1 ? () => router.push(`/surah/${nomor - 1}`) : undefined
          }
        />
      )}

      <TafsirDialog
        open={showTafsirDialog}
        onOpenChange={setShowTafsirDialog}
        ayat={selectedTafsirAyat}
        tafsir={
          selectedTafsirAyat ? getTafsirText(selectedTafsirAyat.nomor) : null
        }
        surahName={surah.nama_latin}
        onShare={() => setShowTafsirShareDialog(true)}
      />

      {selectedTafsirAyat && (
        <TafsirShareDialog
          open={showTafsirShareDialog}
          onOpenChange={setShowTafsirShareDialog}
          surahName={surah.nama_latin}
          ayatNumber={selectedTafsirAyat.nomor}
          tafsirText={getTafsirText(selectedTafsirAyat.nomor) || ""}
          surahMean={surah.arti}
          surahType={surah.tempat_turun}
        />
      )}
    </div>
  );
}
