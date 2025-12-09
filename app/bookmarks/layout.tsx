import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Penanda Ayat",
  description: "Daftar ayat Al-Quran yang telah Anda tandai.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
