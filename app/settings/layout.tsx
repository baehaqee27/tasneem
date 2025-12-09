import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengaturan",
  description: "Atur preferensi aplikasi Tasneem sesuai kebutuhan Anda.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
