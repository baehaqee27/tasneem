"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface Qari {
  id: string;
  name: string;
}

export const QARIS: Qari[] = [
  {
    id: "01",
    name: "Abdullah Al-Juhany",
  },
  {
    id: "02",
    name: "Abdul Muhsin Al-Qasim",
  },
  {
    id: "03",
    name: "Abdurrahman As-Sudais",
  },
  {
    id: "04",
    name: "Ibrahim Al-Dossari",
  },
  {
    id: "05",
    name: "Mishary Rashid Al-Afasy",
  },
  {
    id: "06",
    name: "Yasser Al-Dosari",
  },
];

export function useQari() {
  const [selectedQari, setSelectedQari] = useState<Qari>(QARIS[4]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tasneem-selected-qari");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Find if the saved qari still exists in our updated list
        // Since we changed IDs from 'mishary' to '05', old saved data might be invalid
        // We should migrate or reset if invalid.
        // Simple check: if ID length is 2 (new format) or name matches?
        // Let's just check if ID exists in current QARIS
        const exists = QARIS.find((q) => q.id === parsed.id);
        if (exists) {
          setSelectedQari(exists);
        } else {
          // Fallback to default if saved one is invalid (e.g. old ID)
          setSelectedQari(QARIS[4]);
        }
      } catch (e) {
        console.error("Failed to parse selected qari", e);
      }
    }
    setMounted(true);
  }, []);

  const changeQari = (qariId: string) => {
    const qari = QARIS.find((q) => q.id === qariId);
    if (qari) {
      setSelectedQari(qari);
      localStorage.setItem("tasneem-selected-qari", JSON.stringify(qari));
      toast.success(`Qari diubah ke ${qari.name}`);
    }
  };

  return {
    selectedQari,
    changeQari,
    availableQaris: QARIS,
    mounted,
  };
}
