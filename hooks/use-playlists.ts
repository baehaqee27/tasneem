export interface Playlist {
  id: string;
  name: string;
  description: string;
  type: "system" | "custom";
  surahs: number[]; // Surah numbers
  createdAt: number;
}

const SYSTEM_PLAYLISTS: Playlist[] = [
  {
    id: "subuh-recs",
    name: "Qiraah Subuh",
    description: "Surah-surah pilihan untuk dibaca/didengar di waktu subuh",
    type: "system",
    surahs: [36, 56, 55], // Ya-Sin, Al-Waqi'ah, Ar-Rahman (example)
    createdAt: 0,
  },
  {
    id: "petang-recs",
    name: "Qiraah Petang",
    description: "Tenangkan hati di penghujung hari",
    type: "system",
    surahs: [67, 32], // Al-Mulk, As-Sajdah
    createdAt: 0,
  },
  {
    id: "jumat-recs",
    name: "Malam Jumat",
    description: "Sunnah membaca Surah Al-Kahfi",
    type: "system",
    surahs: [18], // Al-Kahf
    createdAt: 0,
  },
];

import { useState, useEffect } from "react";
import { toast } from "sonner";

export function usePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>(SYSTEM_PLAYLISTS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("tasneem-playlists");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge saved custom playlists with system playlists
        // This ensures system playlists updates are reflected if code changes
        const customOnly = parsed.filter((p: Playlist) => p.type === "custom");
        setPlaylists([...SYSTEM_PLAYLISTS, ...customOnly]);
      } catch (e) {
        console.error("Failed to parse playlists", e);
      }
    }
  }, []);

  const savePlaylists = (newPlaylists: Playlist[]) => {
    setPlaylists(newPlaylists);
    // Only save custom playlists to storage
    const customOnly = newPlaylists.filter((p) => p.type === "custom");
    localStorage.setItem("tasneem-playlists", JSON.stringify(customOnly));
  };

  const createPlaylist = (name: string, description: string = "") => {
    const newPlaylist: Playlist = {
      id: crypto.randomUUID(),
      name,
      description,
      type: "custom",
      surahs: [],
      createdAt: Date.now(),
    };
    const updated = [...playlists, newPlaylist];
    savePlaylists(updated);
    toast.success("Playlist berhasil dibuat");
    return newPlaylist;
  };

  const deletePlaylist = (id: string) => {
    const target = playlists.find((p) => p.id === id);
    if (target?.type === "system") {
      toast.error("Playlist sistem tidak dapat dihapus");
      return;
    }
    const updated = playlists.filter((p) => p.id !== id);
    savePlaylists(updated);
    toast.success("Playlist berhasil dihapus");
  };

  const addToPlaylist = (playlistId: string, surahNumber: number) => {
    const index = playlists.findIndex((p) => p.id === playlistId);
    if (index === -1) return;

    if (playlists[index].type === "system") {
      toast.error("Tidak dapat mengubah playlist sistem");
      return;
    }

    if (playlists[index].surahs.includes(surahNumber)) {
      toast.error("Surah sudah ada di playlist ini");
      return;
    }

    const updatedPlaylist = {
      ...playlists[index],
      surahs: [...playlists[index].surahs, surahNumber],
    };

    const updated = [...playlists];
    updated[index] = updatedPlaylist;
    savePlaylists(updated);
    toast.success("Surah ditambahkan ke playlist");
  };

  const removeFromPlaylist = (playlistId: string, surahNumber: number) => {
    const index = playlists.findIndex((p) => p.id === playlistId);
    if (index === -1) return;

    if (playlists[index].type === "system") {
      toast.error("Tidak dapat mengubah playlist sistem");
      return;
    }

    const updatedPlaylist = {
      ...playlists[index],
      surahs: playlists[index].surahs.filter((s) => s !== surahNumber),
    };

    const updated = [...playlists];
    updated[index] = updatedPlaylist;
    savePlaylists(updated);
    toast.success("Surah dihapus dari playlist");
  };

  return {
    playlists,
    createPlaylist,
    deletePlaylist,
    addToPlaylist,
    removeFromPlaylist,
    mounted,
  };
}
