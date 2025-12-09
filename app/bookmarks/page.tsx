"use client";

import { useBookmarks } from "@/hooks/use-bookmarks";
import { AyatCard } from "@/components/ayat-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useBookmarks();

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4 border-b pb-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Penanda Ayat</h1>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground">
          <p>Belum ada ayat yang ditandai.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((item, index) => (
            <div
              key={`${item.surahNomor}-${item.ayat.id}`}
              className="space-y-2"
            >
              <div className="flex justify-between items-center px-2">
                <Link
                  href={`/surah/${item.surahNomor}`}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  QS. {item.surahNama}: {item.ayat.nomor}
                </Link>
                <span className="text-xs text-muted-foreground">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>
              <AyatCard
                ayat={item.ayat}
                index={index}
                isBookmarked={true}
                onToggleBookmark={() =>
                  toggleBookmark(item.ayat, item.surahNama, item.surahNomor)
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
