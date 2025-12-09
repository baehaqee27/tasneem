import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bacaan Tahlil Lengkap",
  description:
    "Bacaan Tahlil lengkap dengan tulisan Arab, Latin, dan terjemahan Bahasa Indonesia.",
};

export default function TahlilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
