"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  BookOpen,
  ScrollText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getJuzDetail, getSurahList } from "@/lib/api";
import { JuzDetail, Surah, JuzVerse } from "@/types/quran";
import { useSettings } from "@/hooks/use-settings";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const toArabicNumber = (n: number) => {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
};

export default function JuzPage() {
  const params = useParams();
  const number = Number(params.number);
  const [juzData, setJuzData] = useState<JuzDetail | null>(null);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const { fontSize } = useSettings();

  // View Mode: 'scroll' | 'page'
  const [viewMode, setViewMode] = useState<"scroll" | "page">("scroll");
  const [currentPage, setCurrentPage] = useState<number>(0); // Index of the page in the pages array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [juzRes, surahRes] = await Promise.all([
          getJuzDetail(number),
          getSurahList(),
        ]);
        setJuzData(juzRes.data);
        setSurahs(surahRes);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (number) {
      fetchData();
    }
  }, [number]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!juzData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Gagal memuat data Juz.</p>
      </div>
    );
  }

  // Group verses by Surah (for Scroll Mode)
  const surahGroups: { surah: Surah | undefined; verses: JuzVerse[] }[] = [];
  let currentSurahNum = juzData.juzStartSurahNumber;
  let currentGroup: JuzVerse[] = [];

  juzData.verses.forEach((verse, index) => {
    if (index > 0 && verse.number.inSurah === 1) {
      const surah = surahs.find((s) => s.nomor === currentSurahNum);
      surahGroups.push({ surah, verses: currentGroup });
      currentGroup = [];
      currentSurahNum++;
    }
    currentGroup.push(verse);
  });
  const lastSurah = surahs.find((s) => s.nomor === currentSurahNum);
  surahGroups.push({ surah: lastSurah, verses: currentGroup });

  // Group verses by Page (for Page Mode)
  const pages: { pageNumber: number; verses: JuzVerse[] }[] = [];
  if (juzData.verses.length > 0) {
    let currentPageNum = juzData.verses[0].meta.page;
    let currentPageVerses: JuzVerse[] = [];

    juzData.verses.forEach((verse) => {
      if (verse.meta.page !== currentPageNum) {
        pages.push({ pageNumber: currentPageNum, verses: currentPageVerses });
        currentPageVerses = [];
        currentPageNum = verse.meta.page;
      }
      currentPageVerses.push(verse);
    });
    pages.push({ pageNumber: currentPageNum, verses: currentPageVerses });
  }

  // Helper to render verses (used by both modes)
  const renderVerses = (verses: JuzVerse[]) => {
    // We still need to group by Surah within a page to show headers
    const pageSurahGroups: { surah: Surah | undefined; verses: JuzVerse[] }[] =
      [];
    if (verses.length === 0) return null;

    let pageCurrentSurahNum = verses[0].number.inQuran; // This is tricky, we need Surah number.
    // Actually, we can just check if verse.number.inSurah === 1 OR if it's the first verse of the block and we want to show header?
    // Better: Iterate and check if Surah changes.

    // Let's use a simpler approach for the page view:
    // Just map through verses and insert header if verse.number.inSurah === 1 OR if it's the very first verse of the page AND it's the start of a Surah (verse.number.inSurah === 1).
    // Wait, if a page starts in the middle of a Surah, we don't show header.
    // If a page starts at verse 1, we show header.

    return (
      <div
        className="text-justify leading-[3] font-arabic py-4"
        dir="rtl"
        style={{
          fontSize: `${fontSize}px`,
          textAlignLast: "center",
        }}
      >
        {verses.map((verse, vIndex) => {
          const isSurahStart = verse.number.inSurah === 1;
          const surah = surahs.find((s) => {
            // We don't have surah number directly in verse object easily accessible without calculation or looking up.
            // But we can infer it.
            // Actually, the API doesn't give Surah number in verse object directly?
            // Let's look at types. JuzVerse.number.inSurah.
            // We tracked currentSurahNum in the scroll loop.
            // For page view, we might need to look it up or pass it.
            // Optimization: Just use the surah list and finding by name? No, we don't have name.
            // We can find surah by iterating surahs and checking verse count? Too complex.
            // Let's look at `meta` again.
            return false; // Placeholder
          });

          // Alternative: We can just check if it's verse 1. If so, we need to find WHICH surah it is.
          // We can find the surah that contains this verse.
          // Since we have `surahs` array, and we know the verse is `verse.number.inSurah` = 1.
          // But which Surah?
          // We can use `verse.meta.juz` etc but not surah number.
          // Wait, `juzData` has `verses`. We can track surah number globally.

          // Let's do a pre-processing step for the whole Juz to assign Surah ID to each verse.
          return (
            <span key={vIndex} className="relative inline">
              {isSurahStart && (
                <div className="w-full block my-6 bg-muted/30 py-2 border-y text-center">
                  {/* We need the Surah name here. */}
                  {/* Since finding it efficiently is hard inside this map, let's pre-process verses to add surahId */}
                  <span className="font-bold text-primary text-sm block font-sans">
                    {/* Placeholder or Logic to find Surah Name */}
                    Surah Baru
                  </span>
                </div>
              )}
              {verse.text.arab}
              <span className="inline-flex items-center justify-center w-[1.75em] h-[1.75em] border border-primary/40 rounded-full text-[0.6em] align-middle mx-2 bg-primary/5 shrink-0 select-none pt-[0.2em]">
                {toArabicNumber(verse.number.inSurah)}
              </span>
            </span>
          );
        })}
      </div>
    );
  };

  // Pre-process verses to attach Surah info
  const versesWithSurah = juzData.verses.map((v) => {
    // This is expensive to do every render if we don't optimize.
    // But for 1 juz (approx 150-200 verses), it's fine.
    // We need to know which Surah this verse belongs to.
    // We can use the cumulative logic again.
    return v;
  });

  // Let's redo the grouping logic to be more robust for both views.
  // We will assign a `surah` object to every verse.
  let trackingSurahNum = juzData.juzStartSurahNumber;
  const enrichedVerses = juzData.verses.map((verse, i) => {
    if (i > 0 && verse.number.inSurah === 1) {
      trackingSurahNum++;
    }
    const surah = surahs.find((s) => s.nomor === trackingSurahNum);
    return { ...verse, surah };
  });

  // Re-group for Pages using enriched verses
  const enrichedPages: { pageNumber: number; verses: typeof enrichedVerses }[] =
    [];
  if (enrichedVerses.length > 0) {
    let currentPageNum = enrichedVerses[0].meta.page;
    let currentPageVerses: typeof enrichedVerses = [];

    enrichedVerses.forEach((verse) => {
      if (verse.meta.page !== currentPageNum) {
        enrichedPages.push({
          pageNumber: currentPageNum,
          verses: currentPageVerses,
        });
        currentPageVerses = [];
        currentPageNum = verse.meta.page;
      }
      currentPageVerses.push(verse);
    });
    enrichedPages.push({
      pageNumber: currentPageNum,
      verses: currentPageVerses,
    });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="flex items-center gap-3">
          <Link href="/quran" className="text-foreground">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-xl font-bold font-serif text-primary">
              Juz {number}
            </h1>
            <p className="text-xs text-muted-foreground">
              {viewMode === "scroll"
                ? "Tampilan Scroll"
                : `Halaman ${enrichedPages[currentPage]?.pageNumber || "-"}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted/50 rounded-lg p-1">
            <Button
              variant={viewMode === "scroll" ? "default" : "ghost"}
              size="sm"
              className="h-8 px-2"
              onClick={() => setViewMode("scroll")}
            >
              <ScrollText className="w-4 h-4 mr-1" />
              <span className="text-xs">Scroll</span>
            </Button>
            <Button
              variant={viewMode === "page" ? "default" : "ghost"}
              size="sm"
              className="h-8 px-2"
              onClick={() => setViewMode("page")}
            >
              <BookOpen className="w-4 h-4 mr-1" />
              <span className="text-xs">Hal</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 container max-w-md mx-auto px-4 py-6 space-y-8">
        {viewMode === "scroll" ? (
          // SCROLL MODE
          surahGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-6">
              {/* Surah Header */}
              <div className="bg-muted/30 py-3 px-4 border-y flex items-center justify-between rounded-lg">
                <span className="font-semibold text-primary">
                  {group.surah?.nama_latin}
                </span>
                <span className="font-arabic font-bold text-xl">
                  {group.surah?.nama}
                </span>
              </div>

              {/* Verses */}
              <div
                className="text-justify leading-[3] font-arabic py-4"
                dir="rtl"
                style={{
                  fontSize: `${fontSize}px`,
                  textAlignLast: "center",
                }}
              >
                {group.verses.map((verse, vIndex) => (
                  <span key={vIndex} className="relative inline">
                    {verse.text.arab}
                    <span className="inline-flex items-center justify-center w-[1.75em] h-[1.75em] border border-primary/40 rounded-full text-[0.6em] align-middle mx-2 bg-primary/5 shrink-0 select-none pt-[0.2em]">
                      {toArabicNumber(verse.number.inSurah)}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          // PAGE MODE
          <div className="space-y-6">
            {enrichedPages[currentPage] && (
              <div
                className="text-justify leading-[3] font-arabic py-4 min-h-[60vh]"
                dir="rtl"
                style={{
                  fontSize: `${fontSize}px`,
                  textAlignLast: "center",
                }}
              >
                {enrichedPages[currentPage].verses.map((verse, vIndex) => {
                  const isSurahStart = verse.number.inSurah === 1;
                  return (
                    <span key={vIndex} className="relative inline">
                      {isSurahStart && (
                        <div className="w-full block my-8 bg-muted/30 py-3 border-y text-center rounded-lg select-none">
                          <div
                            className="flex items-center justify-between px-4"
                            dir="ltr"
                          >
                            <span className="font-semibold text-primary text-sm">
                              {verse.surah?.nama_latin}
                            </span>
                            <span className="font-arabic font-bold text-lg">
                              {verse.surah?.nama}
                            </span>
                          </div>
                        </div>
                      )}
                      {verse.text.arab}
                      <span className="inline-flex items-center justify-center w-[1.75em] h-[1.75em] border border-primary/40 rounded-full text-[0.6em] align-middle mx-2 bg-primary/5 shrink-0 select-none pt-[0.2em]">
                        {toArabicNumber(verse.number.inSurah)}
                      </span>
                    </span>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Sebelumnya
              </Button>
              <span className="text-sm font-medium">
                Hal {currentPage + 1} / {enrichedPages.length}
              </span>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(enrichedPages.length - 1, p + 1)
                  )
                }
                disabled={currentPage === enrichedPages.length - 1}
              >
                Selanjutnya
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
