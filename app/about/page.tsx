"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Code2,
  Database,
  Heart,
  ExternalLink,
  BookOpen,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen pb-24 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/30 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b flex items-center px-4 py-3">
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="mr-2 rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-serif text-primary">
          Tentang Aplikasi
        </h1>
      </div>

      <div className="relative z-10 p-6 space-y-12 max-w-md mx-auto">
        {/* Hero Section */}
        <div className="text-center space-y-4 pt-8">
          <div className="relative inline-block">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 bg-background rounded-3xl shadow-xl flex items-center justify-center rotate-3 hover:rotate-6 transition-transform duration-300">
              <BookOpen className="w-12 h-12 text-primary" />
            </div>
            <div className="mt-20 text-center space-y-2">
              <h1 className="text-3xl font-bold font-serif text-primary">
                Tasneem
              </h1>
              <p className="text-muted-foreground">
                Aplikasi Al-Quran Digital Modern
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 text-center space-y-2">
              <h3 className="font-serif font-bold text-primary">
                Filosofi Tasneem
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "Tasneem adalah mata air di Surga yang airnya murni dan diminum
                oleh orang-orang yang didekatkan kepada Allah (Al-Muqarrabun).
                Layaknya mata air tersebut, aplikasi ini hadir untuk memberikan
                pengalaman berinteraksi dengan Al-Quran yang murni, jernih, dan
                menyejukkan hati."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Versi
                </p>
                <p className="font-semibold">1.0.0</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Lisensi
                </p>
                <p className="font-semibold">MIT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Teknologi
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Next.js 16", url: "https://nextjs.org" },
              { name: "React 19", url: "https://react.dev" },
              { name: "Tailwind CSS", url: "https://tailwindcss.com" },
              { name: "Shadcn UI", url: "https://ui.shadcn.com" },
              { name: "Lucide Icons", url: "https://lucide.dev" },
              { name: "Framer Motion", url: "https://www.framer.com/motion" },
            ].map((tech) => (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-card border rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tech.name}
              </a>
            ))}
          </div>
        </div>

        {/* Credits */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Sumber Data
          </h2>
          <div className="space-y-3">
            <a
              href="https://quran-api.santrikoding.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-card border rounded-xl hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    SantriKoding API
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Data Surah & Ayat
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </div>
            </a>
            <a
              href="https://api.quran.gading.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-card border rounded-xl hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    Gading Dev API
                  </h3>
                  <p className="text-xs text-muted-foreground">Data Juz</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 text-center space-y-1">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Tasneem Project. Open Source.
          </p>
          <p className="text-xs text-muted-foreground">
            Developed by{" "}
            <a
              href="https://www.mattrizz.web.id"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Mattrizz
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
