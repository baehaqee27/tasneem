"use client";

import { useEffect } from "react";

export const useScrollRestoration = (key: string, ready: boolean = true) => {
  useEffect(() => {
    if (!ready) return;

    // Restore scroll position
    const savedPosition = sessionStorage.getItem(key);
    if (savedPosition) {
      // Use a small timeout to ensure the DOM has fully rendered and layout is stable
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedPosition),
          behavior: "instant", // Use instant to avoid visible scrolling
        });
      }, 100);
    }
  }, [key, ready]);

  useEffect(() => {
    if (!ready) return;

    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        sessionStorage.setItem(key, window.scrollY.toString());
      }, 100); // Debounce scroll events
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [key, ready]);
};
