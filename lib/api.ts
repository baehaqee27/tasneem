import { Surah, SurahDetail } from "@/types/quran";

const BASE_URL = "https://equran.id/api/v2";

export async function getSurahList(): Promise<Surah[]> {
  const res = await fetch(`${BASE_URL}/surat`);
  if (!res.ok) {
    throw new Error("Failed to fetch surah list");
  }
  const data = await res.json();

  // Map API response to Surah interface
  return data.data.map((item: any) => ({
    nomor: item.nomor,
    nama: item.nama,
    nama_latin: item.namaLatin,
    jumlah_ayat: item.jumlahAyat,
    tempat_turun: item.tempatTurun,
    arti: item.arti,
    deskripsi: item.deskripsi,
    audio: item.audioFull["05"], // Using Mishary Rashid Al-Afasy
    audioFull: item.audioFull,
  }));
}

export async function getSurahDetail(nomor: number): Promise<SurahDetail> {
  const res = await fetch(`${BASE_URL}/surat/${nomor}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch surah detail for nomor ${nomor}`);
  }
  const data = await res.json();
  const surahData = data.data;

  return {
    nomor: surahData.nomor,
    nama: surahData.nama,
    nama_latin: surahData.namaLatin,
    jumlah_ayat: surahData.jumlahAyat,
    tempat_turun: surahData.tempatTurun,
    arti: surahData.arti,
    deskripsi: surahData.deskripsi,
    audio: surahData.audioFull["05"],
    audioFull: surahData.audioFull,
    ayat: surahData.ayat.map((ayat: any) => ({
      id: ayat.nomorAyat, // Using nomorAyat as ID since it's unique within surah
      surah: surahData.nomor,
      nomor: ayat.nomorAyat,
      ar: ayat.teksArab,
      tr: ayat.teksLatin,
      idn: ayat.teksIndonesia,
    })),
    surat_selanjutnya: surahData.suratSelanjutnya
      ? {
          id: surahData.suratSelanjutnya.nomor,
          nomor: surahData.suratSelanjutnya.nomor,
          nama: surahData.suratSelanjutnya.nama,
          nama_latin: surahData.suratSelanjutnya.namaLatin,
          jumlah_ayat: surahData.suratSelanjutnya.jumlahAyat,
          tempat_turun: surahData.suratSelanjutnya.tempatTurun,
          arti: surahData.suratSelanjutnya.arti,
          deskripsi: surahData.suratSelanjutnya.deskripsi,
          audio: "", // Optional/not needed for next/prev navigation usually
        }
      : false,
    surat_sebelumnya: surahData.suratSebelumnya
      ? {
          id: surahData.suratSebelumnya.nomor,
          nomor: surahData.suratSebelumnya.nomor,
          nama: surahData.suratSebelumnya.nama,
          nama_latin: surahData.suratSebelumnya.namaLatin,
          jumlah_ayat: surahData.suratSebelumnya.jumlahAyat,
          tempat_turun: surahData.suratSebelumnya.tempatTurun,
          arti: surahData.suratSebelumnya.arti,
          deskripsi: surahData.suratSebelumnya.deskripsi,
          audio: "",
        }
      : false,
  };
}

export async function getJuzDetail(juz: number): Promise<any> {
  // Keep using existing API for Juz or migrate?
  // User request focused on Surah/Verse truncation.
  // The existing implementation used api.quran.gading.dev for this.
  // Let's keep it for now unless it's broken too.
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
