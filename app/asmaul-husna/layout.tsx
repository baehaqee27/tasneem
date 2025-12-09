import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asmaul Husna",
  description:
    "99 Nama Allah (Asmaul Husna) lengkap dengan tulisan Arab, Latin, dan artinya.",
};

export default function AsmaulHusnaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
