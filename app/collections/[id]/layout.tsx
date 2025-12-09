import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Koleksi",
  description: "Lihat daftar ayat dalam koleksi Anda.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CollectionDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
