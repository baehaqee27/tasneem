import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Koleksi Ayat",
  description: "Buat dan kelola koleksi ayat Al-Quran favorit Anda.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
