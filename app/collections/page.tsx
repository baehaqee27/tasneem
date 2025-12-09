"use client";

import { useCollections } from "@/hooks/use-collections";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Folder, Plus, Trash2, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export default function CollectionsPage() {
  const { collections, createCollection, deleteCollection } = useCollections();
  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  const handleCreate = () => {
    if (!newCollectionName.trim()) return;
    createCollection(newCollectionName);
    setNewCollectionName("");
    setIsCreating(false);
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/quran">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold font-serif text-primary">Koleksi</h1>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Baru
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buat Koleksi Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Koleksi</Label>
                <Input
                  id="name"
                  placeholder="Misal: Ayat Hafalan"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setIsCreating(false)}>
                  Batal
                </Button>
                <Button
                  onClick={handleCreate}
                  disabled={!newCollectionName.trim()}
                >
                  Buat
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {collections.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Folder className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <h3 className="text-lg font-semibold mb-2">Belum ada koleksi</h3>
            <p className="text-sm max-w-xs mx-auto">
              Buat koleksi baru untuk menyimpan ayat-ayat pilihan Anda.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="group relative bg-card border rounded-xl p-4 hover:bg-muted/30 transition-all"
              >
                <Link
                  href={`/collections/${collection.id}`}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <Folder className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {collection.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {collection.verses.length} Ayat •{" "}
                        {formatDistanceToNow(collection.createdAt, {
                          addSuffix: true,
                          locale: id,
                        })}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={(e) => {
                    e.preventDefault();
                    if (confirm(`Hapus koleksi "${collection.name}"?`)) {
                      deleteCollection(collection.id);
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
