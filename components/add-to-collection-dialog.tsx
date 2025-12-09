"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Folder, Check } from "lucide-react";
import { useCollections } from "@/hooks/use-collections";
import { Ayat } from "@/types/quran";

interface AddToCollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ayat: Ayat;
  surahName: string;
  surahNumber: number;
}

export function AddToCollectionDialog({
  open,
  onOpenChange,
  ayat,
  surahName,
  surahNumber,
}: AddToCollectionDialogProps) {
  const { collections, createCollection, addToCollection } = useCollections();
  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  const handleCreate = () => {
    if (!newCollectionName.trim()) return;
    const newCollection = createCollection(newCollectionName);
    addToCollection(newCollection.id, ayat, surahName, surahNumber);
    setNewCollectionName("");
    setIsCreating(false);
    onOpenChange(false);
  };

  const handleSelect = (collectionId: string) => {
    addToCollection(collectionId, ayat, surahName, surahNumber);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Simpan ke Koleksi</DialogTitle>
        </DialogHeader>

        {isCreating ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Koleksi Baru</Label>
              <Input
                id="name"
                placeholder="Misal: Ayat Favorit"
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
                Buat & Simpan
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="max-h-[300px] -mx-6 px-6">
              <div className="space-y-2 py-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 h-12 border-dashed"
                  onClick={() => setIsCreating(true)}
                >
                  <Plus className="w-4 h-4" />
                  Buat Koleksi Baru
                </Button>
                {collections.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-8">
                    Belum ada koleksi. Buat baru untuk menyimpan ayat.
                  </p>
                )}
                {collections.map((collection) => {
                  const isAlreadyIn = collection.verses.some(
                    (v) => v.ayat.id === ayat.id
                  );
                  return (
                    <Button
                      key={collection.id}
                      variant="ghost"
                      className="w-full justify-between h-14 px-4 hover:bg-muted/50 border border-transparent hover:border-border"
                      onClick={() => handleSelect(collection.id)}
                      disabled={isAlreadyIn}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          <Folder className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{collection.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {collection.verses.length} ayat
                          </p>
                        </div>
                      </div>
                      {isAlreadyIn && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </Button>
                  );
                })}
              </div>
            </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
