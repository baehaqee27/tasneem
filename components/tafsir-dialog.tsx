"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Ayat } from "@/types/quran";

interface TafsirDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ayat: Ayat | null;
  tafsir: string | null;
  surahName: string;
}

export function TafsirDialog({
  open,
  onOpenChange,
  ayat,
  tafsir,
  surahName,
}: TafsirDialogProps) {
  if (!ayat) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] flex flex-col p-0 gap-0 sm:max-w-lg overflow-hidden">
        <DialogHeader className="px-5 py-4 border-b shrink-0 bg-background z-10 flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="flex flex-col gap-1">
            <span className="font-serif text-lg text-primary">
              Tafsir Ayat {ayat.nomor}
            </span>
            <span className="text-xs font-normal text-muted-foreground">
              {surahName} : {ayat.nomor}
            </span>
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Tutup</span>
          </Button>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 space-y-6">
            {/* Arabic Text */}
            <div className="bg-primary/5 border border-primary/10 p-5 rounded-xl text-right relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl -mr-8 -mt-8" />
              <p className="font-arabic text-2xl leading-loose text-foreground relative z-10">
                {ayat.ar}
              </p>
            </div>

            {/* Translation */}
            <div className="space-y-2">
              <h4 className="font-semibold text-xs text-primary uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-3 bg-primary rounded-full" />
                Terjemahan
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {ayat.idn}
              </p>
            </div>

            {/* Tafsir */}
            <div className="space-y-2">
              <h4 className="font-semibold text-xs text-primary uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-3 bg-primary rounded-full" />
                Tafsir (Kemenag RI)
              </h4>
              <div className="text-sm text-foreground leading-relaxed text-justify whitespace-pre-line pb-4">
                {tafsir ? (
                  tafsir
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs">Memuat tafsir...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
