"use client";

import { useState, useEffect } from "react";

export interface LastRead {
  surahNomor: number;
  surahNama: string;
  ayatNomor: number;
  timestamp: number;
}

export function useLastRead() {
  const [lastRead, setLastRead] = useState<LastRead | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("quran-last-read");
    if (stored) {
      setLastRead(JSON.parse(stored));
    }
  }, []);

  const saveLastRead = (
    surahNomor: number,
    surahNama: string,
    ayatNomor: number
  ) => {
    const data: LastRead = {
      surahNomor,
      surahNama,
      ayatNomor,
      timestamp: Date.now(),
    };
    setLastRead(data);
    localStorage.setItem("quran-last-read", JSON.stringify(data));
  };

  return { lastRead, saveLastRead };
}
