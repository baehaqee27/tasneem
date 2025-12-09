"use client";

import { usePrayerTimes } from "@/hooks/use-prayer-times";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function PrayerTimesWidget() {
  const { prayerData, loading, error, locationName } = usePrayerTimes();
  const [nextPrayer, setNextPrayer] = useState<{
    name: string;
    time: string;
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!prayerData) return;

    const calculateNextPrayer = () => {
      const now = new Date();
      const timings = prayerData.timings;
      const prayers = [
        { name: "Subuh", time: timings.Fajr },
        { name: "Dzuhur", time: timings.Dhuhr },
        { name: "Ashar", time: timings.Asr },
        { name: "Maghrib", time: timings.Maghrib },
        { name: "Isya", time: timings.Isha },
      ];

      for (const prayer of prayers) {
        const [hours, minutes] = prayer.time.split(":").map(Number);
        const prayerDate = new Date();
        prayerDate.setHours(hours, minutes, 0, 0);

        if (prayerDate > now) {
          setNextPrayer(prayer);
          const diff = prayerDate.getTime() - now.getTime();
          const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
          const minutesLeft = Math.floor(
            (diff % (1000 * 60 * 60)) / (1000 * 60)
          );
          setTimeLeft(
            `${
              hoursLeft > 0 ? `${hoursLeft} jam ` : ""
            }${minutesLeft} menit lagi`
          );
          return;
        }
      }

      // If all prayers passed, next is Fajr tomorrow (simplified logic)
      setNextPrayer({ name: "Subuh", time: timings.Fajr });
      setTimeLeft("Besok");
    };

    calculateNextPrayer();
    const interval = setInterval(calculateNextPrayer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [prayerData]);

  if (loading) {
    return (
      <Card className="bg-muted/30 border-none shadow-none animate-pulse">
        <CardContent className="p-6 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error || !prayerData) return null;

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/10 shadow-sm relative overflow-hidden">
      <CardContent className="p-5 flex items-center justify-between relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-medium text-primary/80">
            <MapPin className="w-3 h-3" />
            {locationName}
          </div>
          <h3 className="font-bold text-lg text-foreground">
            {nextPrayer?.name}{" "}
            <span className="font-normal text-muted-foreground text-sm">
              pukul
            </span>{" "}
            {nextPrayer?.time}
          </h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" /> {timeLeft}
          </p>
        </div>

        <div className="text-right space-y-1">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            {prayerData.date.hijri.day} {prayerData.date.hijri.month.en}
          </div>
          <div className="text-xs font-semibold text-foreground">
            {prayerData.date.readable}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
