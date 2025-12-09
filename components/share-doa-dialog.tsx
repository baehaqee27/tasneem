"use client";

import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Download } from "lucide-react";
import { DoaItem } from "@/data/doa-harian";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ShareDoaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doa: DoaItem;
}

export function ShareDoaDialog({
  open,
  onOpenChange,
  doa,
}: ShareDoaDialogProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [showArabic, setShowArabic] = useState(true);
  const [showLatin, setShowLatin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [fontSize, setFontSize] = useState([30]); // Default font size

  const handleDownload = async () => {
    if (ref.current === null) {
      return;
    }

    setLoading(true);

    try {
      // We need to ensure fonts are loaded and layout is stable
      const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 3, // High quality
        style: {
          transform: "scale(1)", // Reset any potential transforms
        },
      });
      download(dataUrl, `mini-quran-doa-${doa.id}.png`);
      onOpenChange(false);
    } catch (err) {
      console.error("Failed to generate image", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Bagikan Doa</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-0 py-2 px-1">
          <div className="flex flex-col items-center space-y-4">
            {/* Preview Container */}
            <div className="w-full overflow-hidden rounded-xl border shadow-sm">
              <div
                ref={ref}
                className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white flex flex-col items-center justify-center text-center space-y-8 min-h-[500px] relative"
              >
                {/* Decorative Border */}
                <div className="absolute inset-4 border border-white/20 rounded-lg pointer-events-none" />
                <div className="absolute inset-4 border border-white/10 rounded-lg transform scale-[0.98] pointer-events-none" />

                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
                  <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>

                {/* Header */}
                <div className="relative z-10 space-y-2">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-medium tracking-widest uppercase text-emerald-400">
                    Doa Harian
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-white drop-shadow-md">
                    {doa.title}
                  </h3>
                </div>

                {/* Arabic Text */}
                {showArabic && (
                  <div className="relative z-10 w-full px-4">
                    <p
                      className="font-bold font-arabic leading-[2.2] text-emerald-50 drop-shadow-sm"
                      style={{ fontSize: `${fontSize[0]}px` }}
                      dir="rtl"
                    >
                      {doa.arabic}
                    </p>
                  </div>
                )}

                {/* Translation */}
                <div className="relative z-10 space-y-4 max-w-sm mx-auto">
                  <div className="w-12 h-0.5 bg-emerald-500/50 mx-auto rounded-full" />
                  {showLatin && (
                    <p
                      className="font-medium text-emerald-200/90 italic"
                      style={{
                        fontSize: `${Math.max(12, fontSize[0] * 0.45)}px`,
                      }}
                    >
                      {doa.latin}
                    </p>
                  )}
                  {showTranslation && (
                    <p
                      className="text-white/80 leading-relaxed"
                      style={{
                        fontSize: `${Math.max(12, fontSize[0] * 0.45)}px`,
                      }}
                    >
                      "{doa.translation}"
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="absolute bottom-6 flex items-center gap-2 opacity-50">
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-serif font-bold tracking-[0.2em] text-white">
                    TASNEEM
                  </span>
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col w-full gap-4 px-2">
              {/* Toggles */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-arabic"
                    checked={showArabic}
                    onCheckedChange={setShowArabic}
                  />
                  <Label htmlFor="show-arabic" className="text-sm font-medium">
                    Arab
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-latin"
                    checked={showLatin}
                    onCheckedChange={setShowLatin}
                  />
                  <Label htmlFor="show-latin" className="text-sm font-medium">
                    Latin
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-translation"
                    checked={showTranslation}
                    onCheckedChange={setShowTranslation}
                  />
                  <Label
                    htmlFor="show-translation"
                    className="text-sm font-medium"
                  >
                    Arti
                  </Label>
                </div>
              </div>

              {/* Font Size Slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm font-medium">Ukuran Font</Label>
                  <span className="text-xs text-muted-foreground">
                    {fontSize[0]}px
                  </span>
                </div>
                <Slider
                  value={fontSize}
                  onValueChange={setFontSize}
                  min={16}
                  max={60}
                  step={1}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full mt-2 shrink-0">
          <Button
            onClick={handleDownload}
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download Gambar
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
