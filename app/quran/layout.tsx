import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baca Al-Quran Digital",
  description:
    "Baca Al-Quran digital 30 Juz lengkap dengan terjemahan Bahasa Indonesia dan audio murottal.",
};

export default function QuranLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
