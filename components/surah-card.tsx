import Link from "next/link";
import { Surah } from "@/types/quran";

interface SurahCardProps {
  surah: Surah;
}

export function SurahCard({ surah }: SurahCardProps) {
  return (
    <Link href={`/surah/${surah.nomor}`}>
      <div className="flex items-center justify-between py-4 hover:bg-muted/5 transition-colors">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
            {/* Rub el Hizb Icon (Two Overlapping Squares) */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="w-10 h-10 text-primary"
            >
              <rect x="5.5" y="5.5" width="13" height="13" rx="0.5" />
              <rect
                x="5.5"
                y="5.5"
                width="13"
                height="13"
                rx="0.5"
                transform="rotate(45 12 12)"
              />
            </svg>
            <span className="absolute text-xs font-bold text-primary flex items-center justify-center">
              {surah.nomor}
            </span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg font-serif text-primary">
              {surah.nama_latin}
            </h3>
            <span className="text-xs text-muted-foreground">
              {surah.arti} ({surah.jumlah_ayat} Ayat)
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-xl font-arabic font-medium text-foreground">
            {surah.nama}
          </span>
        </div>
      </div>
    </Link>
  );
}
