import { Music } from "lucide-react";

export const NowPlaying = ({ track, isPlaying }) => {
  return (
    <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] animate-slide-up">
      <div className="aspect-square bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
        {track?.artwork ? (
          <img src={track.artwork} alt="Album art" className="w-full h-full object-cover" />
        ) : (
          <Music className="w-24 h-24 text-white/50" />
        )}
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground line-clamp-1">
          {track?.title || "No track playing"}
        </h2>
        <p className="text-muted-foreground line-clamp-1">
          {track?.artist || "Unknown Artist"}
        </p>
      </div>
    </div>
  );
};
