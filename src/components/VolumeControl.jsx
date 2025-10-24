import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export const VolumeControl = ({ volume, onVolumeChange }) => {
  return (
    <div className="bg-card rounded-3xl p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-4">
        <VolumeX className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        <Slider
          value={[volume]}
          onValueChange={(values) => onVolumeChange(values[0])}
          max={100}
          step={1}
          className="flex-1"
        />
        <Volume2 className="w-5 h-5 text-foreground flex-shrink-0" />
      </div>
      <div className="text-center mt-2">
        <span className="text-sm text-muted-foreground font-medium">{volume}%</span>
      </div>
    </div>
  );
};
