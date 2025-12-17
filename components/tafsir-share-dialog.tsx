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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface TafsirShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  surahName: string;
  ayatNumber: number;
  tafsirText: string;
  surahMean: string;
  surahType: string;
}

export function TafsirShareDialog({
  open,
  onOpenChange,
  surahName,
  ayatNumber,
  tafsirText,
  surahMean,
  surahType,
}: TafsirShareDialogProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [fontSize, setFontSize] = useState([18]);

  const handleDownload = async () => {
    if (ref.current === null) {
      return;
    }

    setLoading(true);

    try {
      const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 2,
        style: {
          transform: "scale(1)",
        },
      });
      download(dataUrl, `tafsir-${surahName}-${ayatNumber}.png`);
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
          <DialogTitle>Bagikan Tafsir</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-0 py-2 px-1">
          <div className="flex flex-col items-center space-y-4">
            {/* Preview Container */}
            <div className="w-full overflow-hidden rounded-xl border shadow-sm bg-gray-50 dark:bg-black">
              <div
                ref={ref}
                className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-8 text-white flex flex-col items-center justify-center text-center space-y-6 min-h-[500px] relative"
              >
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-4 border border-white/10 rounded-lg pointer-events-none" />

                {/* Header */}
                <div className="relative z-10 space-y-2">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-medium tracking-widest uppercase text-indigo-300">
                    Tafsir Kemenag RI
                  </div>
                  <h3 className="text-xl font-bold font-serif text-white drop-shadow-md">
                    QS. {surahName}: {ayatNumber}
                  </h3>
                  <div className="text-indigo-200/60 text-xs font-serif mt-1 tracking-wider uppercase">
                    {surahMean} • {surahType}
                  </div>
                </div>

                {/* Content Area */}
                <div className="relative z-10 w-full px-4 text-justify">
                  <div className="space-y-4">
                    {tafsirText.split("\n\n").map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-indigo-50/90 leading-relaxed font-serif tracking-wide"
                        style={{ fontSize: `${fontSize[0]}px` }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-8 flex items-center gap-2 opacity-50">
                  <div className="w-1 h-1 rounded-full bg-indigo-400" />
                  <span className="text-[10px] font-serif font-bold tracking-[0.2em] text-white">
                    TASNEEM
                  </span>
                  <div className="w-1 h-1 rounded-full bg-indigo-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Controls & Footer */}
        <div className="space-y-4 pt-4 border-t mt-2 shrink-0 bg-background z-10">
          {/* Controls */}
          <div className="px-2">
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
                min={12}
                max={32}
                step={1}
              />
            </div>
          </div>

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
