import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { getStatus, sendCommand } from "./vlc.js";
import { discoverNetwork } from "./discover.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/probe", async (req, res) => {
  const { ip, port = 8080, auth } = req.body || {};
  if (!ip) return res.status(400).json({ ok: false, error: "Missing ip" });
  try {
    const status = await getStatus(ip, port, auth);
    return res.json({ ok: true, status });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

// Discover devices across the local network (scans common ports).
app.post("/discover", async (req, res) => {
  const { ports, auth } = req.body || {};
  try {
    const found = await discoverNetwork({ ports, auth });
    return res.json({ ok: true, devices: found });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/command", async (req, res) => {
  const { ip, port = 8080, command, params = {}, auth } = req.body || {};
  if (!ip || !command) return res.status(400).json({ ok: false, error: "Missing ip or command" });
  try {
    const r = await sendCommand(ip, port, command, params, auth);
    return res.json({ ok: true, result: r });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

const server = createServer(app);
const wss = new WebSocketServer({ server });

// Map of ws -> polling interval id
const subs = new Map();

wss.on("connection", (ws) => {
  ws.on("message", async (msg) => {
    let data;
    try {
      data = JSON.parse(msg.toString());
    } catch (e) {
      ws.send(JSON.stringify({ type: "error", error: "invalid json" }));
      return;
    }

    if (data.action === "subscribe") {
      const ip = data.ip;
      const port = data.port || 8080;
      if (!ip) return ws.send(JSON.stringify({ type: "error", error: "missing ip" }));
      // start polling
      if (subs.has(ws)) clearInterval(subs.get(ws));
      const interval = setInterval(async () => {
        try {
          const status = await getStatus(ip, port, data.auth);
          if (ws.readyState === ws.OPEN) ws.send(JSON.stringify({ type: "status", status }));
        } catch (e) {
          if (ws.readyState === ws.OPEN) ws.send(JSON.stringify({ type: "error", error: e.message }));
        }
      }, data.interval || 1500);
      subs.set(ws, interval);
      ws.send(JSON.stringify({ type: "subscribed", ip, port }));
    }

    if (data.action === "unsubscribe") {
      const interval = subs.get(ws);
      if (interval) clearInterval(interval);
      subs.delete(ws);
      ws.send(JSON.stringify({ type: "unsubscribed" }));
    }

    if (data.action === "command") {
      const { ip, port = 8080, command, params = {}, auth } = data;
      if (!ip || !command) return ws.send(JSON.stringify({ type: "error", error: "missing ip or command" }));
      try {
        const r = await sendCommand(ip, port, command, params, auth);
        ws.send(JSON.stringify({ type: "commandResult", result: r }));
      } catch (e) {
        ws.send(JSON.stringify({ type: "error", error: e.message }));
      }
    }
  });

  ws.on("close", () => {
    const intv = subs.get(ws);
    if (intv) clearInterval(intv);
    subs.delete(ws);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`CouchCtrl backend running on http://localhost:${PORT}`));
