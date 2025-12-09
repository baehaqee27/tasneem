"use client";

import { useState, useEffect } from "react";
import { Ayat } from "@/types/quran";
import { toast } from "sonner";

export interface Collection {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  verses: {
    ayat: Ayat;
    surahName: string;
    surahNumber: number;
  }[];
}

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tasneem-collections");
    if (saved) {
      try {
        setCollections(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse collections", e);
      }
    }
    setMounted(true);
  }, []);

  const saveCollections = (newCollections: Collection[]) => {
    setCollections(newCollections);
    localStorage.setItem("tasneem-collections", JSON.stringify(newCollections));
  };

  const createCollection = (name: string, description: string = "") => {
    const newCollection: Collection = {
      id: crypto.randomUUID(),
      name,
      description,
      createdAt: Date.now(),
      verses: [],
    };
    const updated = [newCollection, ...collections];
    saveCollections(updated);
    toast.success("Koleksi berhasil dibuat");
    return newCollection;
  };

  const deleteCollection = (id: string) => {
    const updated = collections.filter((c) => c.id !== id);
    saveCollections(updated);
    toast.success("Koleksi berhasil dihapus");
  };

  const addToCollection = (
    collectionId: string,
    ayat: Ayat,
    surahName: string,
    surahNumber: number
  ) => {
    const collectionIndex = collections.findIndex((c) => c.id === collectionId);
    if (collectionIndex === -1) return;

    const collection = collections[collectionIndex];
    if (collection.verses.some((v) => v.ayat.id === ayat.id)) {
      toast.error("Ayat sudah ada di koleksi ini");
      return;
    }

    const updatedCollection = {
      ...collection,
      verses: [...collection.verses, { ayat, surahName, surahNumber }],
    };

    const updatedCollections = [...collections];
    updatedCollections[collectionIndex] = updatedCollection;
    saveCollections(updatedCollections);
    toast.success("Ayat ditambahkan ke koleksi");
  };

  const removeFromCollection = (collectionId: string, ayatId: number) => {
    const collectionIndex = collections.findIndex((c) => c.id === collectionId);
    if (collectionIndex === -1) return;

    const collection = collections[collectionIndex];
    const updatedCollection = {
      ...collection,
      verses: collection.verses.filter((v) => v.ayat.id !== ayatId),
    };

    const updatedCollections = [...collections];
    updatedCollections[collectionIndex] = updatedCollection;
    saveCollections(updatedCollections);
    toast.success("Ayat dihapus dari koleksi");
  };

  return {
    collections,
    createCollection,
    deleteCollection,
    addToCollection,
    removeFromCollection,
    mounted,
  };
}
