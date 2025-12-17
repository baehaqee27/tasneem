"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  X,
  SkipBack,
  SkipForward,
  ChevronDown,
  ChevronUp,
  Music,
  Square,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/use-settings";

interface AudioPlayerProps {
  src: string;
  title: string;
  subtitle?: string;
  autoPlayOnMount?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}

export function AudioPlayer({
  src,
  title,
  subtitle,
  autoPlayOnMount,
  onNext,
  onPrev,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { autoplay } = useSettings();

  useEffect(() => {
    let active = true;

    const playAudio = async () => {
      if (audioRef.current && src) {
        audioRef.current.src = src;
        setProgress(0);

        // Only autoplay if setting is enabled OR forced by prop
        if (autoplay || autoPlayOnMount) {
          setIsPlaying(true);
          try {
            await audioRef.current.play();
          } catch (error: any) {
            if (!active) return;
            if (
              error.name !== "AbortError" &&
              error.name !== "NotAllowedError"
            ) {
              console.error("Playback failed:", error);
            }
            if (error.name === "NotAllowedError") {
              setIsPlaying(false);
            }
          }
        } else {
          setIsPlaying(false);
        }

        setIsVisible(true);
        setIsMinimized(false);
      }
    };

    playAudio();

    return () => {
      active = false;
    };
  }, [src, autoplay, autoPlayOnMount]);

  const togglePlay = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error("Play failed:", error);
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && !isDragging) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value[0]);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onNext) {
      onNext();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
        className="hidden"
      />

      {isMinimized ? (
        <div className="fixed bottom-24 right-4 z-50">
          <div
            className="bg-primary text-primary-foreground shadow-lg rounded-full p-2 flex items-center gap-2 cursor-pointer hover:bg-primary/90 transition-all animate-in fade-in slide-in-from-bottom-4"
            onClick={() => setIsMinimized(false)}
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse-slow">
              <Music className="w-4 h-4" />
            </div>
            <div className="flex flex-col max-w-[100px]">
              <span className="text-xs font-bold truncate">{title}</span>
              <span className="text-[10px] opacity-80">
                {formatTime(progress)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full hover:bg-white/20 text-primary-foreground"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 fill-current" />
                ) : (
                  <Play className="h-4 w-4 fill-current" />
                )}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full hover:bg-white/20 text-primary-foreground"
                onClick={handleStop}
              >
                <Square className="h-3 w-3 fill-current" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
          <div className="bg-background/80 backdrop-blur-lg border shadow-lg rounded-2xl overflow-hidden p-4 animate-in fade-in slide-in-from-bottom-8">
            {/* Progress Bar */}
            <div className="mb-2">
              <Slider
                value={[progress]}
                max={duration || 100}
                step={1}
                onValueChange={(val) => {
                  setIsDragging(true);
                  setProgress(val[0]);
                }}
                onValueCommit={(val) => {
                  setIsDragging(false);
                  handleSeek(val);
                }}
                className="h-2"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1 px-1">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              {/* Info */}
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-bold truncate text-primary">
                  {title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {subtitle || "Sedang Memutar"}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onPrev}
                  disabled={!onPrev}
                  className="h-8 w-8 text-muted-foreground hover:text-primary"
                >
                  <SkipBack className="h-5 w-5 fill-current" />
                </Button>

                <Button
                  size="icon"
                  className="h-10 w-10 rounded-full shadow-md bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 fill-current" />
                  ) : (
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  )}
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={handleStop}
                >
                  <Square className="h-4 w-4 fill-current" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onNext}
                  disabled={!onNext}
                  className="h-8 w-8 text-muted-foreground hover:text-primary"
                >
                  <SkipForward className="h-5 w-5 fill-current" />
                </Button>
              </div>

              {/* Minimize */}
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={() => setIsMinimized(true)}
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
