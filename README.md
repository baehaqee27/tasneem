# Tasneem - Aplikasi Al-Quran Digital 📖

![Tasneem Preview](/public/og-image.png)

**Tasneem** adalah aplikasi Al-Quran digital modern yang dikembangkan dengan teknologi web terbaru untuk memberikan pengalaman membaca, mendengarkan, dan mempelajari Al-Quran yang nyaman, cepat, dan estetis.

Aplikasi ini dirancang dengan antarmuka yang bersih (clean UI), responsif untuk mobile, dan dilengkapi dengan fitur-fitur pendukung ibadah harian.

## ✨ Fitur Utama

- **📖 Al-Quran Digital 30 Juz**: Baca Al-Quran lengkap dengan terjemahan Bahasa Indonesia (Kemenag).
- **🎧 Audio Murottal**: Dengarkan lantunan ayat suci dari berbagai Qari ternama (Mishary Rashid Al-Afasy, dll).
- **🤲 Doa Harian**: Kumpulan doa-doa harian lengkap dengan Arab, Latin, dan Artinya.
- **📿 Asmaul Husna**: 99 Nama Allah yang indah beserta maknanya.
- **💀 Tahlil**: Bacaan Tahlil lengkap untuk keperluan ibadah.
- **📑 Penanda (Bookmarks)**: Simpan ayat-ayat favorit atau terakhir dibaca.
- **📂 Koleksi Ayat**: Buat playlist atau koleksi ayat pribadi untuk hafalan atau tema tertentu.
- **🖼️ Berbagi Ayat & Doa**: Bagikan ayat atau doa dalam bentuk gambar yang indah (Image Generator) dengan kustomisasi font dan tampilan.
- **🔍 Pencarian Cepat**: Cari surat atau ayat dengan mudah.
- **🌙 Dark Mode**: Dukungan tema gelap untuk kenyamanan membaca di malam hari.
- **📱 PWA Ready**: Dapat diinstal sebagai aplikasi di HP (Progressive Web App).

## 🛠️ Teknologi

Dibangun dengan stack teknologi modern untuk performa dan developer experience terbaik:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks (Context API for Audio)
- **Image Generation**: `html-to-image`
- **Animations**: `framer-motion` (untuk beberapa interaksi halus)

## 🚀 Cara Menjalankan (Local Development)

Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) (versi 18+ direkomendasikan).

1.  **Clone repository ini**

    ```bash
    git clone https://github.com/username/mini-quran.git
    cd mini-quran
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # atau
    yarn install
    # atau
    pnpm install
    ```

3.  **Jalankan server development**

    ```bash
    npm run dev
    ```

4.  **Buka di browser**
    Buka [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

## 📡 Sumber Data (API)

Terima kasih kepada penyedia API terbuka yang memungkinkan aplikasi ini berjalan:

- **Al-Quran & Terjemahan**: [Santrikoding Quran API](https://quran-api.santrikoding.com/) & [EQuran.id](https://equran.id/)
- **Audio Murottal**: [QuranicAudio.com](https://quranicaudio.com/)
- **Tafsir**: [EQuran.id](https://equran.id/)

## 📝 Lisensi

Project ini bersifat **Open Source** di bawah lisensi [MIT](LICENSE). Bebas untuk dipelajari, dimodifikasi, dan dikembangkan ulang.

---

Dibuat dengan ❤️ oleh [Tim Tasneem](https://github.com/mattrizz)
