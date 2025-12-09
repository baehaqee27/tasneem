"use client";

import { useQari } from "@/hooks/use-qari";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function QariSelector() {
  const { selectedQari, changeQari, availableQaris, mounted } = useQari();

  if (!mounted) return null;

  return (
    <div className="space-y-2">
      <Label>Pilih Qari (Pengisi Suara)</Label>
      <Select value={selectedQari.id} onValueChange={changeQari}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pilih Qari" />
        </SelectTrigger>
        <SelectContent>
          {availableQaris.map((qari) => (
            <SelectItem key={qari.id} value={qari.id}>
              {qari.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
