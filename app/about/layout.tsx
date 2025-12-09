import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Aplikasi",
  description:
    "Informasi tentang aplikasi Tasneem, sumber data, dan pengembang.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
