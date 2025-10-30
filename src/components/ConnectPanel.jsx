import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wifi, Star, StarOff } from "lucide-react";
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
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch (e) { return []; }
  });

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

  const maskIp = (ip) => {
    // mask middle octet(s): 192.168.1.100 -> 192.***.***.100
    try {
      const parts = ip.split('.');
      if (parts.length !== 4) return ip;
      return `${parts[0]}.***.***.${parts[3]}`;
    } catch (e) { return ip; }
  };

  const saveFavorites = (list) => {
    setFavorites(list);
    try { localStorage.setItem('favorites', JSON.stringify(list)); } catch (e) {}
  };

  const addFavorite = (d) => {
    const exists = favorites.find(f => f.ip === d.ip && f.port === d.port);
    if (exists) return toast('Already favorited');
    const list = [...favorites, { ip: d.ip, port: d.port, name: d.name }];
    saveFavorites(list);
    toast.success('Saved to favorites');
  };

  const removeFavorite = (d) => {
    const list = favorites.filter(f => !(f.ip === d.ip && f.port === d.port));
    saveFavorites(list);
    toast.success('Removed favorite');
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
        body: JSON.stringify({ ip: parsed.ip, port: parsed.port, timeout: 2000 })
      });
      const ct = res.headers.get('content-type') || '';
      if (!res.ok) {
        // try to parse json, but fallback to text
        let bodyText = '';
        try { bodyText = await res.text(); } catch (e) {}
        const friendly = `Unable to reach device (${res.status}). ${bodyText ? 'Details: ' + bodyText.slice(0,200) : ''}`;
        toast.error(friendly);
        setProbeResult({ ok: false, error: friendly });
      } else if (!ct.includes('application/json')) {
        const text = await res.text();
        const friendly = `Unexpected response from server. ${text ? text.slice(0,200) : ''}`;
        toast.error(friendly);
        setProbeResult({ ok: false, error: friendly });
      } else {
        const json = await res.json();
        if (!json.ok) {
          toast.error(json.error || "Check failed");
          setProbeResult({ ok: false, error: json.error });
        } else {
          setProbeResult({ ok: true, status: json.status, ip: parsed.ip, port: parsed.port });
          toast.success("Device available");
        }
      }
    } catch (e) {
      const friendly = `Network error: ${e.message}. Is the backend running at ${BACKEND_BASE}?`;
      toast.error(friendly);
      setProbeResult({ ok: false, error: friendly });
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
  // request a quick scan with shorter timeouts to avoid long waits in the browser
  const res = await fetch(`${BACKEND_BASE}/discover`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ quick: true, timeout: 800, concurrency: 200 }) });
      const ct = res.headers.get('content-type') || '';
      if (!res.ok) {
        const text = await res.text();
        const friendly = `Discovery failed (${res.status}). ${text ? text.slice(0,200) : ''}`;
        toast.error(friendly);
      } else if (!ct.includes('application/json')) {
        const text = await res.text();
        const friendly = `Unexpected response from server during discovery. Details: ${text ? text.slice(0,200) : ''}`;
        toast.error(friendly);
      } else {
        const json = await res.json();
        if (json.ok) {
          // Map to friendly device objects: show app name guess and port small
          const detectName = (d) => {
            try {
              const s = d.status || {};
              if (s.raw && s.raw.information) return 'VLC';
              if (s.rawText && String(s.rawText).toLowerCase().includes('vlc')) return 'VLC';
              return 'Media Player';
            } catch (e) { return 'Media Player'; }
          };

          const devs = json.devices.map(d => ({ ip: d.ip, port: d.port, name: detectName(d), raw: d.status || d }));
          setDevices(devs);
          toast.success(`Found ${devs.length} device(s)`);
        } else {
          toast.error(json.error || "No devices found");
        }
      }
    } catch (e) {
      const friendly = `Network error: ${e.message}. Is the backend running at ${BACKEND_BASE}?`;
      toast.error(friendly);
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
        {favorites.length > 0 && (
          <div className="mb-3">
            <div className="font-medium mb-1">Favorites</div>
            <div className="space-y-2">
              {favorites.map((f, i) => (
                <div key={`fav-${f.ip}-${f.port}-${i}`} className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{f.name || 'Saved Device'}</div>
                    <div className="text-xs text-muted-foreground" title={`${f.ip}:${f.port}`}>port {f.port} • {maskIp(f.ip)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={() => handleConnect({ ip: f.ip, port: f.port })}>Connect</Button>
                    <button title="Remove favorite" onClick={() => removeFavorite(f)} className="p-2 rounded hover:bg-muted/20">
                      <Star className="w-4 h-4 text-yellow-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <hr className="my-3" />
          </div>
        )}
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
                      {favorites.find(f => f.ip === d.ip && f.port === d.port) ? (
                        <button title="Remove favorite" onClick={() => removeFavorite(d)} className="p-2 rounded hover:bg-muted/20">
                          <Star className="w-4 h-4 text-yellow-400" />
                        </button>
                      ) : (
                        <button title="Add favorite" onClick={() => addFavorite(d)} className="p-2 rounded hover:bg-muted/20">
                          <StarOff className="w-4 h-4 text-muted-foreground" />
                        </button>
                      )}
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
