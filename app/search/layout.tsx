import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pencarian Ayat",
  description: "Cari ayat Al-Quran berdasarkan kata kunci atau topik.",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
