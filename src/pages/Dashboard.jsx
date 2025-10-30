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
import ThemeToggle from "@/components/ThemeToggle";
import * as vlcClient from "@/lib/vlcClient";

const Dashboard = () => {
  const navigate = useNavigate();
  const [serverIp, setServerIp] = useState(localStorage.getItem("serverIp") || "");
  const [isConnected, setIsConnected] = useState(false);
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

    let offStatus = null;
    let offEvent = null;
    let disconnected = false;

    (async () => {
      try {
        const [ip, portStr] = serverIp.split(":");
        const port = Number(portStr) || 8080;
        await vlcClient.connectToServer(ip, port);
        toast.success("Connected to CouchCtrl Server");

        offStatus = vlcClient.onStatus((status) => {
          try {
            setIsConnected(true);
            setIsPlaying(status.state === 'playing' || status.state === 'play');
            if (status.volume !== undefined) setVolume(Number(status.volume));
            if (status.time !== undefined) setCurrentTime(Number(status.time));
            if (status.length !== undefined) setDuration(Number(status.length));
            if (status.now_playing) {
              const meta = status.now_playing;
              setTrack({
                title: meta.title || meta.filename || 'VLC',
                artist: meta.artist || meta.album || 'Unknown Artist',
                artwork: null
              });
            }
          } catch (e) {}
        });

        offEvent = vlcClient.onEvent((ev) => {
          if (ev.type === 'subscribed') {
            setIsConnected(true);
          }
          if (ev.type === 'unsubscribed') {
            setIsConnected(false);
          }
          if (ev.type === 'error') {
            toast.error(ev.error || 'Backend error');
          }
        });
      } catch (e) {
        toast.error("Failed to connect to server: " + (e.message || e));
        navigate('/');
      }
    })();

    return () => {
      try {
        if (offStatus) offStatus();
        if (offEvent) offEvent();
        vlcClient.disconnect();
        disconnected = true;
      } catch (e) {}
    };
  }, [serverIp, navigate]);

  const handlePlayPause = () => {
    try {
      vlcClient.sendVlcCommand('pl_pause');
      setIsPlaying(prev => !prev);
      toast.info(isPlaying ? "Paused" : "Playing");
    } catch (e) {
      toast.error('Failed to send play/pause: ' + (e.message || e));
    }
  };

  const handlePrevious = () => {
    try {
      vlcClient.sendVlcCommand('pl_previous');
      setCurrentTime(0);
      toast.info("Previous track");
    } catch (e) {
      toast.error('Failed to send previous: ' + (e.message || e));
    }
  };

  const handleNext = () => {
    try {
      vlcClient.sendVlcCommand('pl_next');
      setCurrentTime(0);
      toast.info("Next track");
    } catch (e) {
      toast.error('Failed to send next: ' + (e.message || e));
    }
  };

  const handleFullscreen = () => {
    try {
      vlcClient.sendVlcCommand('fullscreen');
      toast.info("Toggled fullscreen");
    } catch (e) {
      toast.error('Failed to toggle fullscreen: ' + (e.message || e));
    }
  };

  const handleVolumeChange = (newVolume) => {
    try {
      // VLC expects volume as an integer; this may need mapping depending on VLC config
      vlcClient.sendVlcCommand('volume', { val: newVolume });
      setVolume(newVolume);
    } catch (e) {
      toast.error('Failed to set volume: ' + (e.message || e));
    }
  };

  const handleSeek = (newTime) => {
    try {
      vlcClient.sendVlcCommand('seek', { val: newTime });
      setCurrentTime(newTime);
    } catch (e) {
      toast.error('Failed to seek: ' + (e.message || e));
    }
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
            <ThemeToggle />
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
