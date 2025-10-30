import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wifi } from "lucide-react";
import { toast } from "sonner";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { createVlcSocket } from "@/lib/vlcWs";

// Use Vite env instead of process.env in the browser
const BACKEND_BASE = import.meta.env.VITE_COUCHCTRL_BACKEND || "http://localhost:3001";

export default function ConnectPanel() {
  const [input, setInput] = useState("");
  const [probing, setProbing] = useState(false);
  const [probeResult, setProbeResult] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [serverIp, setServerIp] = useState(null);
  const [devices, setDevices] = useState([]);
  const wsRef = useRef(null);

  const navigate = useNavigate();

  const parseIpPort = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return null;
    if (trimmed.includes(":")) {
      const [ip, port] = trimmed.split(":");
      return { ip, port: Number(port) };
    }
    return { ip: trimmed, port: 8080 };
  };

  // Scan a single host (verify) — renamed from 'probe' to 'verify' internally
  const handleVerify = async () => {
    const parsed = parseIpPort(input);
    if (!parsed) return toast.error("Enter IP or IP:PORT");
    setProbing(true);
    setProbeResult(null);
    try {
      const res = await fetch(`${BACKEND_BASE}/probe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip: parsed.ip, port: parsed.port })
      });
      const json = await res.json();
      if (!json.ok) {
        toast.error(json.error || "Check failed");
        setProbeResult({ ok: false, error: json.error });
      } else {
        setProbeResult({ ok: true, status: json.status, ip: parsed.ip, port: parsed.port });
        toast.success("Device available");
      }
    } catch (e) {
      toast.error(e.message || "Check failed");
      setProbeResult({ ok: false, error: e.message });
    } finally {
      setProbing(false);
    }
  };

  const handleConnect = ({ ip, port }) => {
    const target = ip && port ? { ip, port } : parseIpPort(input);
    if (!target) return toast.error("Select or enter an IP to connect");
    // create websocket and subscribe
    // Use shared vlcClient so other components can receive status updates
    import("@/lib/vlcClient").then(async (mod) => {
      try {
        const client = mod;
        await client.connectToServer(target.ip, target.port);
        client.onEvent((ev) => {
          if (ev.type === 'subscribed') {
            setIsConnected(true);
            setServerIp(`${target.ip}:${target.port}`);
            localStorage.setItem("serverIp", `${target.ip}:${target.port}`);
            toast.success("Connected — opening dashboard...");
            navigate("/dashboard");
          }
          if (ev.type === 'error') {
            toast.error(ev.error || 'Error from backend');
          }
        });

        client.onStatus((status) => setProbeResult({ ok: true, status }));
      } catch (e) {
        toast.error(e.message || 'Connection failed');
      }
    });
  };

  useEffect(() => {
    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  // Scan the entire local network (calls backend /discover)
  const handleScanNetwork = async () => {
    setProbing(true);
    setDevices([]);
    try {
      const res = await fetch(`${BACKEND_BASE}/discover`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
      const json = await res.json();
      if (json.ok) {
        // Map to friendly device objects: show app name guess and port small
        const detectName = (d) => {
          try {
            const s = d.status || {};
            if (s.raw && s.raw.information) return 'VLC';
            if (s.rawText && s.rawText.toLowerCase().includes('vlc')) return 'VLC';
            // other heuristics could be added here
            return 'Media Player';
          } catch (e) {
            return 'Media Player';
          }
        };

        const devs = json.devices.map(d => ({ ip: d.ip, port: d.port, name: detectName(d), raw: d.status || d }));
        setDevices(devs);
        toast.success(`Found ${devs.length} device(s)`);
      } else {
        toast.error(json.error || "No devices found");
      }
    } catch (e) {
      toast.error(e.message || "Scan failed");
    } finally {
      setProbing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="serverIp" className="text-base font-medium">Server IP Address</Label>
        <div className="relative">
          <Wifi className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input id="serverIp" type="text" placeholder="192.168.1.100:8080" value={input}
            onChange={(e) => setInput(e.target.value)} className="pl-12 h-14 text-base rounded-2xl border-2" />
        </div>
        <p className="text-sm text-muted-foreground">Enter your VLC host (ip or ip:port). Default port 8080.</p>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleScanNetwork} className="flex-1 h-14" disabled={probing}>{probing ? 'Scanning...' : 'Scan network'}</Button>
        <Button onClick={() => handleVerify()} className="flex-1 h-14">Check</Button>
      </div>

      <div>
        <ConnectionStatus isConnected={isConnected} serverIp={serverIp} />
      </div>

      <div className="bg-card rounded-xl p-4 text-sm text-left">
        <div className="font-medium mb-2">Discovered devices</div>
        {devices.length ? (
          <div className="space-y-2">
                {devices.map((d, i) => (
                  <div key={`${d.ip}:${d.port}:${i}`} className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold">{d.name || 'Unknown'}</div>
                      <div className="text-xs text-muted-foreground">port {d.port}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button title={`Copy IP ${d.ip}`} onClick={() => { navigator.clipboard?.writeText(d.ip + ':' + d.port); toast.success('IP copied to clipboard'); }} className="text-xs text-muted-foreground px-2 py-1 rounded">IP</button>
                      <Button size="sm" onClick={() => handleConnect({ ip: d.ip, port: d.port })}>Connect</Button>
                    </div>
                  </div>
                ))}
          </div>
        ) : (
          <div className="text-muted-foreground">No devices discovered yet. Try scanning the network.</div>
        )}

        <div className="mt-4">
          <div className="font-medium mb-1">Last check</div>
          {probeResult ? (
            probeResult.ok ? (
              <pre className="text-xs max-h-40 overflow-auto">{JSON.stringify(probeResult.status, null, 2)}</pre>
            ) : (
              <div className="text-destructive">Check error: {probeResult.error}</div>
            )
          ) : (
            <div className="text-muted-foreground">No single-host check performed yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
