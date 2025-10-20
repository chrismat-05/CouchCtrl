import { Wifi, WifiOff } from "lucide-react";

export const ConnectionStatus = ({ isConnected, serverIp }) => {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
      isConnected 
        ? 'bg-primary/20 text-foreground' 
        : 'bg-destructive/20 text-destructive'
    }`}>
      {isConnected ? (
        <>
          <Wifi className="w-4 h-4 animate-pulse-glow" />
          <span className="text-sm font-medium">Connected{serverIp ? ` to ${serverIp}` : ''}</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4" />
          <span className="text-sm font-medium">Disconnected</span>
        </>
      )}
    </div>
  );
};
