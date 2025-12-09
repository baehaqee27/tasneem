"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search as SearchIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useDebounce } from "use-debounce";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchResult {
  verse_key: string;
  verse_id: number;
  text: string;
  translations: {
    text: string;
    resource_id: number;
    name: string;
    language_name: string;
  }[];
}

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const searchQuran = async () => {
      if (!debouncedQuery || debouncedQuery.length < 3) {
        setResults([]);
        return;
      }

      setLoading(true);
      setHasSearched(true);

      try {
        const res = await fetch(
          `https://api.quran.com/api/v4/search?q=${encodeURIComponent(
            debouncedQuery
          )}&language=id&size=20`
        );
        const data = await res.json();
        setResults(data.search.results);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    searchQuran();
  }, [debouncedQuery]);

  const handleResultClick = (verseKey: string) => {
    const [surah, ayat] = verseKey.split(":");
    router.push(`/surah/${surah}#ayat-${ayat}`);
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3 flex items-center gap-3">
        <Link href="/quran">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari ayat (min. 3 karakter)..."
            className="pl-9 rounded-full bg-muted/50 border-none focus-visible:ring-1"
            autoFocus
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Ditemukan {results.length} hasil untuk "{debouncedQuery}"
            </p>
            {results.map((result) => (
              <div
                key={result.verse_id}
                onClick={() => handleResultClick(result.verse_key)}
                className="p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium px-2 py-1 rounded-md bg-primary/10 text-primary">
                    QS. {result.verse_key}
                  </span>
                </div>

                {/* Arabic Text Snippet (Optional, might be partial) */}
                <p className="font-arabic text-xl text-right dir-rtl leading-loose truncate">
                  {result.text}
                </p>

                {/* Translation with Highlight */}
                <div
                  className="text-sm text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: result.translations[0]?.text,
                  }}
                />
              </div>
            ))}
          </div>
        ) : hasSearched && debouncedQuery.length >= 3 ? (
          <div className="text-center py-12 text-muted-foreground">
            <SearchIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>Tidak ada hasil ditemukan</p>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <SearchIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>Ketik kata kunci untuk mencari ayat</p>
            <p className="text-xs mt-2 opacity-70">
              Contoh: "sabar", "shalat", "orang tua"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
