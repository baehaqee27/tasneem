"use client";

import { usePlaylists } from "@/hooks/use-playlists";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Play,
  Music,
  Trash2,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PlaylistsPage() {
  const { playlists, createPlaylist, deletePlaylist, mounted } = usePlaylists();
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  if (!mounted) return null;

  const systemPlaylists = playlists.filter((p) => p.type === "system");
  const customPlaylists = playlists.filter((p) => p.type === "custom");

  const handleCreate = () => {
    if (!newPlaylistName.trim()) return;
    createPlaylist(newPlaylistName);
    setNewPlaylistName("");
    setIsDialogOpen(false);
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8 pb-32">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Daftar Putar</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Buat Baru
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buat Playlist Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 py-4">
              <Label>Nama Playlist</Label>
              <Input
                placeholder="Contoh: Hafalan Juz 30"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleCreate}>Buat</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          ✨ Rekomendasi
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {systemPlaylists.map((playlist, i) => (
            <Link
              href={`/playlists/${playlist.id}`}
              key={playlist.id}
              className="group block h-full"
            >
              <div
                className={`relative overflow-hidden rounded-2xl p-6 shadow-md transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px] h-full flex flex-col justify-between
                ${
                  i % 2 === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-teal-600 text-white"
                }`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Music className="w-24 h-24 rotate-12 translate-x-8 -translate-y-8" />
                </div>

                <div className="space-y-2 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2">
                    <Music className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-muted">
                    {playlist.name}
                  </h3>
                  <p className="text-sm opacity-90 line-clamp-2 leading-relaxed text-primary-foreground/80">
                    {playlist.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                  <span className="text-xs font-medium bg-black/10 px-2 py-1 rounded-full">
                    {playlist.surahs.length} Surah
                  </span>
                  <div className="bg-white/20 p-2 rounded-full opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Playlist Saya</h2>
        {customPlaylists.length === 0 ? (
          <div className="text-center py-12 border rounded-xl border-dashed text-muted-foreground">
            <Music className="h-10 w-10 mx-auto mb-3 opacity-50" />
            <p>Belum ada playlist</p>
            <Button variant="link" onClick={() => setIsDialogOpen(true)}>
              Buat sekarang
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {customPlaylists.map((playlist) => (
              <div key={playlist.id} className="group relative">
                <Link href={`/playlists/${playlist.id}`} className="block">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card border transition-all duration-200 hover:shadow-md hover:border-primary/20 cursor-pointer pr-12">
                    <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center text-secondary-foreground">
                      <Music className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base">
                        {playlist.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {playlist.surahs.length} Surah
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm("Hapus playlist ini?"))
                            deletePlaylist(playlist.id);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
