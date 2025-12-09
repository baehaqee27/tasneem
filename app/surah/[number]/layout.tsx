import { Metadata } from "next";
import { getSurahDetail } from "@/lib/api";

type Props = {
  params: Promise<{ number: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { number } = await params;
  const surah = await getSurahDetail(parseInt(number));

  return {
    title: `Surah ${surah.nama_latin} (${surah.nama})`,
    description: `Baca Surah ${surah.nama_latin} (${surah.arti}) lengkap dengan tulisan Arab, Latin, dan terjemahan Bahasa Indonesia. Surah ke-${surah.nomor} dalam Al-Quran.`,
    openGraph: {
      title: `Surah ${surah.nama_latin} - Tasneem`,
      description: `Baca Surah ${surah.nama_latin} lengkap dengan audio dan terjemahan.`,
    },
  };
}

export default function SurahLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
