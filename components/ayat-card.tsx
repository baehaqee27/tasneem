import { useState } from "react";
import { Ayat } from "@/types/quran";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Bookmark,
  Copy,
  Share2,
  Image as ImageIcon,
  BookOpen,
  FolderPlus,
} from "lucide-react";
import { toast } from "sonner";
import { useSettings } from "@/hooks/use-settings";
import { ShareDialog } from "@/components/share-dialog";
import { AddToCollectionDialog } from "@/components/add-to-collection-dialog";

interface AyatCardProps {
  ayat: Ayat;
  index: number;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onTafsirClick?: () => void;
  surahName?: string;
  surahNumber?: number;
}

export function AyatCard({
  ayat,
  index,
  isBookmarked,
  onToggleBookmark,
  onTafsirClick,
  surahName = "Surah",
  surahNumber = 0,
}: AyatCardProps) {
  const { fontSize } = useSettings();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showCollectionDialog, setShowCollectionDialog] = useState(false);

  const handleCopy = () => {
    const text = `QS. ${surahName}: ${ayat.nomor}\n\n${ayat.ar}\n\n${ayat.idn}`;
    navigator.clipboard.writeText(text);
    toast.success("Ayat berhasil disalin");
  };

  const handleShare = async () => {
    const text = `QS. ${surahName}: ${ayat.nomor}\n\n${ayat.ar}\n\n${ayat.idn}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `QS. ${surahName}: ${ayat.nomor}`,
          text: text,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <>
      <div
        id={`ayat-${ayat.nomor}`}
        className={`p-4 hover:bg-muted/20 transition-colors ${
          index % 2 === 0 ? "bg-background" : "bg-muted/10"
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold font-arabic text-lg shrink-0">
              {ayat.nomor.toLocaleString("ar-EG")}
            </div>
            <div className="flex gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={onTafsirClick}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Lihat Tafsir
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onToggleBookmark}>
                    <Bookmark
                      className={`mr-2 h-4 w-4 ${
                        isBookmarked ? "fill-primary text-primary" : ""
                      }`}
                    />
                    {isBookmarked ? "Hapus Penanda" : "Tandai Ayat"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowCollectionDialog(true)}
                  >
                    <FolderPlus className="mr-2 h-4 w-4" />
                    Simpan ke Koleksi
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCopy}>
                    <Copy className="mr-2 h-4 w-4" />
                    Salin Teks
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowShareDialog(true)}>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Bagikan Gambar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Bagikan Teks
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p
            className="text-right font-arabic font-bold leading-[2.5] text-foreground"
            dir="rtl"
            style={{ fontSize: `${fontSize}px` }}
          >
            {ayat.ar}
          </p>
          <div className="space-y-1">
            <p
              className="text-primary font-semibold text-sm"
              dangerouslySetInnerHTML={{ __html: ayat.tr }}
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              {ayat.idn}
            </p>
          </div>
        </div>
      </div>

      <ShareDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        ayat={ayat}
        surahName={surahName}
        surahNumber={surahNumber}
      />

      <AddToCollectionDialog
        open={showCollectionDialog}
        onOpenChange={setShowCollectionDialog}
        ayat={ayat}
        surahName={surahName}
        surahNumber={surahNumber}
      />
    </>
  );
}
