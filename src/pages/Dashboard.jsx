import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { NowPlaying } from "@/components/NowPlaying";
import { PlayerControls } from "@/components/PlayerControls";
import { VolumeControl } from "@/components/VolumeControl";
import { SeekBar } from "@/components/SeekBar";
import { Button } from "@/components/ui/button";
import { Settings, LogOut } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [serverIp, setServerIp] = useState(localStorage.getItem("serverIp") || "");
  const [isConnected, setIsConnected] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(245);
  const [track, setTrack] = useState({
    title: "Demo Track",
    artist: "CouchCtrl Player",
    artwork: null
  });

  useEffect(() => {
    if (!serverIp) {
      navigate("/");
      return;
    }

    // Simulate connection
    toast.success("Connected to CouchCtrl Server");

    // Simulate playback time update
    const interval = setInterval(() => {
      if (isPlaying && currentTime < duration) {
        setCurrentTime(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [serverIp, navigate, isPlaying, currentTime, duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast.info(isPlaying ? "Paused" : "Playing");
  };

  const handlePrevious = () => {
    setCurrentTime(0);
    toast.info("Previous track");
  };

  const handleNext = () => {
    setCurrentTime(0);
    toast.info("Next track");
  };

  const handleFullscreen = () => {
    toast.info("Toggled fullscreen");
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const handleSeek = (newTime) => {
    setCurrentTime(newTime);
  };

  const handleDisconnect = () => {
    localStorage.removeItem("serverIp");
    navigate("/");
    toast.info("Disconnected from server");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CouchCtrl
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => toast.info("Settings coming soon")}
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={handleDisconnect}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Connection Status */}
        <div className="flex justify-center">
          <ConnectionStatus isConnected={isConnected} serverIp={serverIp} />
        </div>

        {/* Now Playing */}
        <NowPlaying track={track} isPlaying={isPlaying} />

        {/* Seek Bar */}
        <SeekBar 
          currentTime={currentTime} 
          duration={duration} 
          onSeek={handleSeek}
        />

        {/* Player Controls */}
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onFullscreen={handleFullscreen}
        />

        {/* Volume Control */}
        <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
      </div>
    </div>
  );
};

export default Dashboard;
