import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tasneem",
    short_name: "Tasneem",
    description: "Aplikasi Al-Quran Digital Minimalis",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f4f6",
    theme_color: "#15aab8",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
