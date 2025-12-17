"use client";

import { useState, useEffect } from "react";

export function useSettings() {
  const [fontSize, setFontSize] = useState(32); // Default reduced from text-4xl (~36px)
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const storedSize = localStorage.getItem("quran-font-size");
    if (storedSize) {
      setFontSize(Number(storedSize));
    }
    const storedAutoplay = localStorage.getItem("quran-autoplay");
    if (storedAutoplay) {
      setAutoplay(JSON.parse(storedAutoplay));
    }
  }, []);

  const updateFontSize = (newSize: number) => {
    setFontSize(newSize);
    localStorage.setItem("quran-font-size", String(newSize));
    // Optional: Update CSS variable if needed for other parts
    document.documentElement.style.setProperty(
      "--font-size-arabic",
      `${newSize}px`
    );
  };

  const updateAutoplay = (value: boolean) => {
    setAutoplay(value);
    localStorage.setItem("quran-autoplay", String(value));
  };

  return {
    fontSize,
    setFontSize: updateFontSize,
    autoplay,
    setAutoplay: updateAutoplay,
  };
}
