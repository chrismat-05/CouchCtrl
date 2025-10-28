import { Slider } from "@/components/ui/slider";

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const SeekBar = ({ currentTime, duration, onSeek }) => {
  return (
    <div className="bg-card rounded-3xl p-6 shadow-[var(--shadow-card)]">
      <Slider
        value={[currentTime]}
        onValueChange={(values) => onSeek(values[0])}
        max={duration || 100}
        step={1}
        className="mb-2"
      />
      <div className="flex justify-between text-sm text-muted-foreground font-medium">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};
