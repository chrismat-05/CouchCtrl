import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wifi } from "lucide-react";
import { toast } from "sonner";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { createVlcSocket } from "@/lib/vlcWs";

const BACKEND_BASE = process.env.VITE_COUCHCTRL_BACKEND || "http://localhost:3001";

export default function ConnectPanel() {
  const [input, setInput] = useState("");
  const [probing, setProbing] = useState(false);
  const [probeResult, setProbeResult] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [serverIp, setServerIp] = useState(null);
  const wsRef = useRef(null);

  const parseIpPort = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return null;
    if (trimmed.includes(":")) {
      const [ip, port] = trimmed.split(":");
      return { ip, port: Number(port) };
    }
    return { ip: trimmed, port: 8080 };
  };

  const handleProbe = async () => {
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
        toast.error(json.error || "Probe failed");
        setProbeResult({ ok: false, error: json.error });
      } else {
        setProbeResult({ ok: true, status: json.status });
        toast.success("Probe successful");
      }
    } catch (e) {
      toast.error(e.message || "Probe failed");
      setProbeResult({ ok: false, error: e.message });
    } finally {
      setProbing(false);
    }
  };

  const handleConnect = () => {
    const parsed = parseIpPort(input);
    if (!parsed) return toast.error("Enter IP or IP:PORT");
    // create websocket and subscribe
    if (wsRef.current) wsRef.current.close();
    const { socket, subscribe } = createVlcSocket(`${BACKEND_BASE.replace(/^http/, "ws")}`);
    wsRef.current = socket;
    socket.onopen = () => {
      subscribe(parsed.ip, parsed.port);
      setIsConnected(true);
      setServerIp(`${parsed.ip}:${parsed.port}`);
      toast.success("Connected (websocket)");
    };
    socket.onclose = () => {
      setIsConnected(false);
      toast("Disconnected");
    };
    socket.onmessage = (ev) => {
      try {
        const d = JSON.parse(ev.data);
        if (d.type === "status") {
          // keep last probeResult in sync
          setProbeResult({ ok: true, status: d.status });
        }
      } catch (e) {
        // ignore
      }
    };
  };

  useEffect(() => {
    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

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
        <Button onClick={handleProbe} className="flex-1 h-14" disabled={probing}>{probing ? 'Probing...' : 'Probe'}</Button>
        <Button onClick={handleConnect} className="flex-1 h-14">Connect (WS)</Button>
      </div>

      <div>
        <ConnectionStatus isConnected={isConnected} serverIp={serverIp} />
      </div>

      <div className="bg-card rounded-xl p-4 text-sm text-left">
        {probeResult ? (
          probeResult.ok ? (
            <div>
              <div className="font-medium mb-1">Status</div>
              <pre className="text-xs max-h-40 overflow-auto">{JSON.stringify(probeResult.status, null, 2)}</pre>
            </div>
          ) : (
            <div className="text-destructive">Probe error: {probeResult.error}</div>
          )
        ) : (
          <div className="text-muted-foreground">No probe performed yet.</div>
        )}
      </div>
    </div>
  );
}
