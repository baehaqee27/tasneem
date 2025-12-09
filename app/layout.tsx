import type { Metadata, Viewport } from "next";
import { Outfit, Lora, Scheherazade_New } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { BottomNav } from "@/components/bottom-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { PwaRegistrar } from "@/components/pwa-registrar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
const arabic = Scheherazade_New({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Tasneem - Al-Quran Digital Indonesia",
    template: "%s | Tasneem",
  },
  description:
    "Aplikasi Al-Quran Digital dengan terjemahan Bahasa Indonesia, audio murottal, doa harian, asmaul husna, dan tahlil. Bebas iklan dan open source.",
  applicationName: "Tasneem",
  authors: [{ name: "Tasneem Team" }],
  generator: "Next.js",
  keywords: [
    "Al-Quran",
    "Quran Digital",
    "Al-Quran Indonesia",
    "Murottal",
    "Doa Harian",
    "Asmaul Husna",
    "Tahlil",
    "Tasneem",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Tasneem Team",
  publisher: "Tasneem Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tasneem.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tasneem - Al-Quran Digital Indonesia",
    description:
      "Aplikasi Al-Quran Digital dengan terjemahan Bahasa Indonesia, audio murottal, doa harian, asmaul husna, dan tahlil.",
    url: "https://tasneem.vercel.app",
    siteName: "Tasneem",
    images: [
      {
        url: "/og-image.png", // We might need to create this
        width: 1200,
        height: 630,
        alt: "Tasneem - Al-Quran Digital",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasneem - Al-Quran Digital Indonesia",
    description:
      "Aplikasi Al-Quran Digital dengan terjemahan Bahasa Indonesia, audio murottal, doa harian, asmaul husna, dan tahlil.",
    images: ["/og-image.png"],
    creator: "@tasneem",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${lora.variable} ${arabic.variable} min-h-screen bg-gray-100 text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PwaRegistrar />
          <div className="w-full min-h-screen bg-background relative md:max-w-md md:mx-auto md:shadow-2xl">
            <main className="container py-4 pb-24 px-4">{children}</main>
            <BottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
