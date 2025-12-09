"use client";

import { useState, useEffect } from "react";
import { Ayat } from "@/types/quran";

export interface BookmarkItem {
  ayat: Ayat;
  surahNama: string;
  surahNomor: number;
  timestamp: number;
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("quran-bookmarks");
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, []);

  const toggleBookmark = (
    ayat: Ayat,
    surahNama: string,
    surahNomor: number
  ) => {
    const newBookmarks = [...bookmarks];
    const index = newBookmarks.findIndex((b) => b.ayat.id === ayat.id);

    if (index > -1) {
      newBookmarks.splice(index, 1);
    } else {
      newBookmarks.push({
        ayat,
        surahNama,
        surahNomor,
        timestamp: Date.now(),
      });
    }

    setBookmarks(newBookmarks);
    localStorage.setItem("quran-bookmarks", JSON.stringify(newBookmarks));
  };

  const isBookmarked = (ayatId: number) => {
    return bookmarks.some((b) => b.ayat.id === ayatId);
  };

  return { bookmarks, toggleBookmark, isBookmarked };
}
