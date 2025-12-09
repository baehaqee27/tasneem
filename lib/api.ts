import { Surah, SurahDetail } from "@/types/quran";

const BASE_URL = "https://quran-api.santrikoding.com/api";

export async function getSurahList(): Promise<Surah[]> {
  const res = await fetch(`${BASE_URL}/surah`);
  if (!res.ok) {
    throw new Error("Failed to fetch surah list");
  }
  return res.json();
}

export async function getSurahDetail(nomor: number): Promise<SurahDetail> {
  const res = await fetch(`${BASE_URL}/surah/${nomor}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch surah detail for nomor ${nomor}`);
  }
  return res.json();
}

export async function getJuzDetail(juz: number): Promise<any> {
  const res = await fetch(`https://api.quran.gading.dev/juz/${juz}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch juz detail for juz ${juz}`);
  }
  return res.json();
}

export async function getTafsir(number: number) {
  try {
    const res = await fetch(`https://equran.id/api/v2/tafsir/${number}`);
    if (!res.ok) throw new Error("Failed to fetch tafsir");
    const data = await res.json();
    return data.data.tafsir as { ayat: number; teks: string }[];
  } catch (error) {
    console.error("Error fetching tafsir:", error);
    return [];
  }
}
