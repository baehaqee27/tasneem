import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kumpulan Doa Harian",
  description:
    "Kumpulan doa harian lengkap dengan tulisan Arab, Latin, dan terjemahan Bahasa Indonesia.",
};

export default function DoaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
