"use client";

import { useCollections } from "@/hooks/use-collections";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Folder, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AyatCard } from "@/components/ayat-card";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export default function CollectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const collectionId = params.id as string;
  const { collections, deleteCollection, removeFromCollection } =
    useCollections();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const collection = collections.find((c) => c.id === collectionId);

  if (!collection) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-muted-foreground">
        <p>Koleksi tidak ditemukan</p>
        <Link href="/collections">
          <Button variant="link">Kembali ke Koleksi</Button>
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm(`Hapus koleksi "${collection.name}"?`)) {
      deleteCollection(collection.id);
      router.push("/collections");
    }
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/collections">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold font-serif text-primary leading-tight">
              {collection.name}
            </h1>
            <p className="text-xs text-muted-foreground">
              {collection.verses.length} Ayat
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleDelete}
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="divide-y divide-border">
        {collection.verses.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground px-4">
            <Folder className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <h3 className="text-lg font-semibold mb-2">Koleksi Kosong</h3>
            <p className="text-sm">
              Tambahkan ayat ke koleksi ini melalui halaman Surat.
            </p>
          </div>
        ) : (
          collection.verses.map((item, index) => (
            <div key={`${item.ayat.id}-${index}`} className="relative group">
              <div className="absolute top-2 right-12 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-muted-foreground hover:text-destructive text-xs"
                  onClick={() =>
                    removeFromCollection(collection.id, item.ayat.id)
                  }
                >
                  Hapus dari Koleksi
                </Button>
              </div>
              <div className="pt-8">
                <div className="px-4 pb-2 text-xs text-muted-foreground font-medium">
                  QS. {item.surahName}: {item.ayat.nomor}
                </div>
                <AyatCard
                  ayat={item.ayat}
                  index={index}
                  isBookmarked={isBookmarked(item.ayat.id)}
                  onToggleBookmark={() =>
                    toggleBookmark(item.ayat, item.surahName, item.surahNumber)
                  }
                  surahName={item.surahName}
                  surahNumber={item.surahNumber}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
