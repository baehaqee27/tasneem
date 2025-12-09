"use client";

import { useState, useEffect } from "react";

export interface Qari {
  id: string;
  name: string;
  urlPattern: string; // e.g., "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/"
}

export const QARIS: Qari[] = [
  {
    id: "mishary",
    name: "Mishary Rashid Al-Afasy",
    urlPattern:
      "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/",
  },
  {
    id: "abdulbasit",
    name: "Abdul Basit (Murattal)",
    urlPattern: "https://download.quranicaudio.com/quran/abdul_basit_murattal/",
  },
  {
    id: "sudais",
    name: "Abdurrahmaan As-Sudais",
    urlPattern:
      "https://download.quranicaudio.com/quran/abdurrahmaan_as-sudays/",
  },
  {
    id: "husary",
    name: "Mahmoud Khalil Al-Husary",
    urlPattern:
      "https://download.quranicaudio.com/quran/mahmoud_khalil_al-hussary/",
  },
];

export function useQari() {
  const [selectedQari, setSelectedQari] = useState<Qari>(QARIS[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("selectedQariId");
    if (saved) {
      const qari = QARIS.find((q) => q.id === saved);
      if (qari) setSelectedQari(qari);
    }
  }, []);

  const changeQari = (qariId: string) => {
    const qari = QARIS.find((q) => q.id === qariId);
    if (qari) {
      setSelectedQari(qari);
      localStorage.setItem("selectedQariId", qariId);
    }
  };

  return {
    selectedQari,
    changeQari,
    availableQaris: QARIS,
    mounted,
  };
}
