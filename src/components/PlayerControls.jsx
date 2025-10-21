import { Play, Pause, SkipBack, SkipForward, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PlayerControls = ({ 
  isPlaying, 
  onPlayPause, 
  onPrevious, 
  onNext, 
  onFullscreen 
}) => {
  return (
    <div className="bg-card rounded-3xl p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          className="h-12 w-12 rounded-full hover:bg-primary/20 transition-all"
        >
          <SkipBack className="w-6 h-6" />
        </Button>

        <Button
          size="icon"
          onClick={onPlayPause}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--shadow-glow)] transition-all"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8" fill="currentColor" />
          ) : (
            <Play className="w-8 h-8 ml-1" fill="currentColor" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          className="h-12 w-12 rounded-full hover:bg-primary/20 transition-all"
        >
          <SkipForward className="w-6 h-6" />
        </Button>
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onFullscreen}
          className="rounded-full hover:bg-primary/20 transition-all"
        >
          <Maximize className="w-4 h-4 mr-2" />
          Fullscreen
        </Button>
      </div>
    </div>
  );
};
