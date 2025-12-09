"use client";

import { useState } from "react";
import { DoaItem } from "@/data/doa-harian";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Copy, Share2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { ShareDoaDialog } from "@/components/share-doa-dialog";

interface DoaCardProps {
  doa: DoaItem;
}

export function DoaCard({ doa }: DoaCardProps) {
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleCopy = () => {
    const text = `${doa.title}\n\n${doa.arabic}\n\n${doa.latin}\n\n"${doa.translation}"`;
    navigator.clipboard.writeText(text);
    toast.success("Doa berhasil disalin");
  };

  const handleShare = async () => {
    const text = `${doa.title}\n\n${doa.arabic}\n\n${doa.latin}\n\n"${doa.translation}"`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: doa.title,
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
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-colors group">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start justify-between border-b border-border/20 pb-2">
            <h3 className="font-semibold text-lg text-primary">{doa.title}</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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

          <div className="space-y-4">
            <p className="font-arabic text-2xl font-bold text-right leading-loose text-foreground">
              {doa.arabic}
            </p>
            <div className="space-y-1">
              <p className="text-sm font-medium text-primary/80 italic">
                {doa.latin}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {doa.translation}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ShareDoaDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        doa={doa}
      />
    </>
  );
}
