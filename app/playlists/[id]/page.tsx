"use client";

import { usePlaylists, Playlist } from "@/hooks/use-playlists";
import { getSurahList } from "@/lib/api";
import { Surah } from "@/types/quran";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Play,
  Pause,
  Music,
  Info,
  Share2,
  MoreVertical,
  Plus,
  Search,
  X,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { AudioPlayer } from "@/components/audio-player";
import { useQari } from "@/hooks/use-qari";
import { BackgroundPattern } from "@/components/background-pattern";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PlaylistDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { playlists, addToPlaylist, mounted } = usePlaylists();
  const { selectedQari } = useQari();

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [surahList, setSurahList] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);

  // Search State for Add Surah
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Queue State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    if (mounted) {
      const found = playlists.find((p) => p.id === id);
      setPlaylist(found || null);
    }
  }, [id, mounted, playlists]);

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const data = await getSurahList();
        setSurahList(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadSurahs();
  }, []);

  const filteredSurahsToAdd = useMemo(() => {
    if (!searchQuery) return surahList;
    return surahList.filter(
      (s) =>
        s.nama_latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.arti.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [surahList, searchQuery]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 space-y-4">
        <h1 className="text-xl font-bold">Playlist tidak ditemukan</h1>
        <Button onClick={() => router.push("/playlists")}>Kembali</Button>
      </div>
    );
  }

  // Filter surahs
  const playlistItems = playlist.surahs
    .map((num) => surahList.find((s) => s.nomor === num))
    .filter((s): s is Surah => !!s);

  const getAudioUrl = (surah: Surah) => {
    return surah.audioFull?.[selectedQari.id] || surah.audio || "";
  };

  const handlePlayAll = () => {
    if (playlistItems.length > 0) {
      setCurrentIndex(0);
      setIsPlaying(true);
    }
  };

  const handleItemClick = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const handleAddSurah = (surahNomor: number) => {
    addToPlaylist(id, surahNomor);
    setIsAddDialogOpen(false);
  };

  const activeSurah =
    currentIndex !== null && playlistItems[currentIndex]
      ? playlistItems[currentIndex]
      : null;

  return (
    <div className="bg-background min-h-screen pb-48 relative overflow-hidden flex flex-col">
      <BackgroundPattern />

      {/* Decorative Blobs - Made larger and smoother */}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-[10%] left-[-20%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <div className="relative pt-6 pb-8 px-6 z-10">
        <div className="container max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Link href="/playlists">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-muted/50"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            {playlist.type === "custom" && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-muted/50"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="h-6 w-6" />
              </Button>
            )}
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-28 w-28 rounded-[2rem] bg-gradient-to-br from-primary to-primary/80 shadow-2xl shadow-primary/20 flex items-center justify-center text-primary-foreground mb-2">
              <Music className="h-12 w-12" />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-bold font-serif tracking-tight">
                {playlist.name}
              </h1>
              <p className="text-muted-foreground text-sm max-w-[280px] mx-auto leading-relaxed">
                {playlist.description}
              </p>
              <div className="flex justify-center items-center gap-2 pt-2">
                <span className="text-xs font-medium px-3 py-1 bg-secondary/30 rounded-full text-secondary-foreground border border-secondary/20">
                  {playlistItems.length} Surah
                </span>
                <span className="text-xs font-medium px-3 py-1 bg-muted/50 rounded-full text-muted-foreground border border-border/50">
                  {playlist.type === "system" ? "Official" : "Custom"}
                </span>
              </div>
            </div>

            <div className="pt-2 w-full max-w-xs">
              <Button
                className="w-full h-11 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95 text-sm font-semibold"
                onClick={handlePlayAll}
              >
                <Play className="h-4 w-4 mr-2 fill-current" />
                Putar Semua
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Layer - Removed 'cut off' look by using full width spacing */}
      <div className="flex-1 w-full bg-transparent z-10">
        <div className="container max-w-2xl mx-auto px-4 pb-8">
          <div className="space-y-2">
            {playlistItems.map((surah, index) => {
              const isActive = currentIndex === index;
              return (
                <div
                  key={`${surah.nomor}-${index}`}
                  className={`group relative flex items-center gap-4 p-3 rounded-2xl transition-colors duration-200 cursor-pointer border ${
                    isActive
                      ? "bg-primary/5 border-primary/20"
                      : "bg-card/50 border-transparent hover:bg-muted/40"
                  }`}
                  onClick={() => handleItemClick(index)}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/80 text-muted-foreground"
                    }`}
                  >
                    {isActive ? (
                      <div className="flex gap-0.5 items-end h-3">
                        <span className="w-0.5 h-3 bg-current animate-music-bar-1" />
                        <span className="w-0.5 h-2 bg-current animate-music-bar-2" />
                        <span className="w-0.5 h-3 bg-current animate-music-bar-3" />
                      </div>
                    ) : (
                      surah.nomor
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3
                        className={`font-semibold truncate text-sm ${
                          isActive ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {surah.nama_latin}
                      </h3>
                      <span className="font-arabic text-lg leading-none opacity-40">
                        {surah.nama}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {surah.arti} • {surah.jumlah_ayat} Ayat
                    </p>
                  </div>
                </div>
              );
            })}

            {playlistItems.length === 0 && playlist.type === "custom" && (
              <div className="text-center py-12 px-4 rounded-3xl border border-dashed border-muted-foreground/20 bg-muted/10">
                <p className="text-muted-foreground text-sm mb-4">
                  Playlist ini masih kosong.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Surah
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {activeSurah && (
        <AudioPlayer
          key={activeSurah.nomor}
          src={getAudioUrl(activeSurah)}
          title={activeSurah.nama_latin}
          subtitle={`Playlist: ${playlist.name} (${currentIndex! + 1}/${
            playlistItems.length
          })`}
          autoPlayOnMount={true}
          onNext={() => {
            if (
              currentIndex !== null &&
              currentIndex < playlistItems.length - 1
            ) {
              setCurrentIndex(currentIndex + 1);
            }
          }}
          onPrev={() => {
            if (currentIndex !== null && currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
            }
          }}
        />
      )}

      {/* Add Surah Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Tambah Surah ke Playlist</DialogTitle>
          </DialogHeader>
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama surah atau arti..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex-1 overflow-y-auto min-h-[300px]">
            <div className="space-y-1 pr-2">
              {filteredSurahsToAdd.map((surah) => (
                <div
                  key={surah.nomor}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => handleAddSurah(surah.nomor)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                      {surah.nomor}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{surah.nama_latin}</p>
                      <p className="text-xs text-muted-foreground">
                        {surah.arti}
                      </p>
                    </div>
                  </div>
                  <Plus className="h-4 w-4 text-primary" />
                </div>
              ))}
              {filteredSurahsToAdd.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-8">
                  Surah tidak ditemukan.
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
