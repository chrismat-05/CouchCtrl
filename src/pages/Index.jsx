import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radio } from "lucide-react";
import ConnectPanel from "@/components/ConnectPanel";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const navigate = useNavigate();
  const [serverIp, setServerIp] = useState("");

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
          <p className="text-muted-foreground">Control your media from anywhere on your network</p>
          <div className="mt-3 flex justify-center">
            {/* Theme toggle added to header */}
            <ThemeToggle />
          </div>
        </div>

        {/* Connect Form (new component) */}
        <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] space-y-6">
          <ConnectPanel />
        </div>

        {/* Info Card */}
        <div className="bg-primary/10 rounded-2xl p-6 space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Radio className="w-5 h-5" /> Getting Started
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
