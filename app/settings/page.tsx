"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ChevronRight, Info, Download } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { useSettings } from "@/hooks/use-settings";
import { usePwaInstall } from "@/hooks/use-pwa-install";
import { QariSelector } from "@/components/qari-selector";

export default function SettingsPage() {
  const { fontSize, setFontSize } = useSettings();
  const { isInstallable, installApp } = usePwaInstall();
  const { theme, setTheme } = useTheme();
  const [showTranslation, setShowTranslation] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Mock implementation for settings persistence
  useEffect(() => {
    setMounted(true);
    const storedTrans = localStorage.getItem("quran-show-trans");
    if (storedTrans) setShowTranslation(JSON.parse(storedTrans));
  }, []);

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  const handleTranslationToggle = (checked: boolean) => {
    setShowTranslation(checked);
    localStorage.setItem("quran-show-trans", String(checked));
  };

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6 pb-20 container max-w-md mx-auto p-4">
      <div className="flex items-center gap-4 border-b pb-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Pengaturan</h1>
      </div>

      <div className="space-y-4">
        {isInstallable && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-primary">Install Aplikasi</h3>
                <p className="text-xs text-muted-foreground">
                  Pasang aplikasi di perangkat anda untuk akses lebih cepat
                </p>
              </div>
              <Button size="sm" onClick={installApp}>
                <Download className="h-4 w-4 mr-2" />
                Install
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tampilan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Mode Gelap</Label>
                <p className="text-xs text-muted-foreground">
                  Ganti tema aplikasi
                </p>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={handleThemeToggle}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Ukuran Huruf Arab</Label>
                <span className="text-sm text-muted-foreground">
                  {fontSize}px
                </span>
              </div>
              <Slider
                value={[fontSize]}
                min={20}
                max={60}
                step={2}
                onValueChange={handleFontSizeChange}
              />
              <div className="p-4 bg-muted/30 rounded-lg text-right">
                <p
                  className="font-arabic"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Audio</CardTitle>
          </CardHeader>
          <CardContent>
            <QariSelector />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Konten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tampilkan Terjemahan</Label>
                <p className="text-xs text-muted-foreground">
                  Bahasa Indonesia
                </p>
              </div>
              <Switch
                checked={showTranslation}
                onCheckedChange={handleTranslationToggle}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Tentang
          </h2>
          <Card>
            <CardContent className="p-0 divide-y">
              <Link href="/about">
                <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Info className="h-5 w-5 text-primary" />
                    <span className="font-medium">Tentang Aplikasi</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
