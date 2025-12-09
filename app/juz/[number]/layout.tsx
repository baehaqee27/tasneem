import { Metadata } from "next";

type Props = {
  params: Promise<{ number: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { number } = await params;

  return {
    title: `Juz ${number}`,
    description: `Baca Al-Quran Juz ${number} lengkap dengan tulisan Arab, Latin, dan terjemahan Bahasa Indonesia.`,
    openGraph: {
      title: `Juz ${number} - Tasneem`,
      description: `Baca Al-Quran Juz ${number} online.`,
    },
  };
}

export default function JuzLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
