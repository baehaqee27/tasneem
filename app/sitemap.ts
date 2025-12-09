import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tasneem.vercel.app";

  // Static routes
  const routes = [
    "",
    "/quran",
    "/doa",
    "/asmaul-husna",
    "/tahlil",
    "/bookmarks",
    "/settings",
    "/about",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Surah routes (1-114)
  const surahRoutes = Array.from({ length: 114 }, (_, i) => ({
    url: `${baseUrl}/surah/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Juz routes (1-30)
  const juzRoutes = Array.from({ length: 30 }, (_, i) => ({
    url: `${baseUrl}/juz/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...routes, ...surahRoutes, ...juzRoutes];
}
