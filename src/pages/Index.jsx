import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Radio, Wifi } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [serverIp, setServerIp] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (!serverIp.trim()) {
      toast.error("Please enter a server IP address");
      return;
    }

    setIsConnecting(true);
    
    // Simulate connection delay
    setTimeout(() => {
      localStorage.setItem("serverIp", serverIp);
      toast.success("Connected successfully!");
      navigate("/dashboard");
      setIsConnecting(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleConnect();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 animate-slide-up">
        {/* Logo/Icon */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary shadow-[var(--shadow-glow)] mb-4">
            <Radio className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            CouchCtrl
          </h1>
          <p className="text-muted-foreground">
            Control your media from anywhere on your network
          </p>
        </div>

        {/* Connect Form */}
        <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] space-y-6">
          <div className="space-y-2">
            <Label htmlFor="serverIp" className="text-base font-medium">
              Server IP Address
            </Label>
            <div className="relative">
              <Wifi className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="serverIp"
                type="text"
                placeholder="192.168.1.100:8080"
                value={serverIp}
                onChange={(e) => setServerIp(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-12 h-14 text-base rounded-2xl border-2 focus:border-primary transition-all"
                disabled={isConnecting}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Enter your CouchCtrl server's local IP address
            </p>
          </div>

          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full h-14 text-base rounded-2xl bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--shadow-glow)] transition-all font-semibold"
          >
            {isConnecting ? "Connecting..." : "Connect"}
          </Button>
        </div>

        {/* Info Card */}
        <div className="bg-primary/10 rounded-2xl p-6 space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Radio className="w-5 h-5" />
            Getting Started
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Make sure your device is on the same Wi-Fi network</li>
            <li>• Start the CouchCtrl server on your PC</li>
            <li>• Enter the server IP shown in the server window</li>
            <li>• Enjoy remote media control!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
