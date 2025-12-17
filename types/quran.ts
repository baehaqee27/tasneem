export interface Surah {
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
  audioFull: Record<string, string>;
}

export interface Tafsir {
  ayat: number;
  teks: string;
}

export interface Ayat {
  id: number;
  surah: number;
  nomor: number;
  ar: string;
  tr: string;
  idn: string;
}

export interface SurahDetail extends Surah {
  ayat: Ayat[];
  surat_selanjutnya: false | SurahNextPrev;
  surat_sebelumnya: false | SurahNextPrev;
}

export interface SurahNextPrev {
  id: number;
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
}

export interface JuzVerse {
  number: {
    inQuran: number;
    inSurah: number;
  };
  meta: {
    juz: number;
    page: number;
    manzil: number;
    ruku: number;
    hizbQuarter: number;
  };
  text: {
    arab: string;
    transliteration: {
      en: string;
    };
  };
  translation: {
    en: string;
    id: string;
  };
  audio: {
    primary: string;
    secondary: string[];
  };
  tafsir: {
    id: {
      short: string;
      long: string;
    };
  };
}

export interface JuzDetail {
  juz: number;
  juzStartSurahNumber: number;
  juzEndSurahNumber: number;
  juzStartInfo: string;
  juzEndInfo: string;
  totalVerses: number;
  verses: JuzVerse[];
}
