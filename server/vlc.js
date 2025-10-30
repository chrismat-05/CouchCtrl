import fetch from "node-fetch";

const tryJson = async (url, auth, timeout = 1500) => {
  const headers = {};
  if (auth && auth.username) {
    const basic = Buffer.from(`${auth.username}:${auth.password || ''}`).toString("base64");
    headers.Authorization = `Basic ${basic}`;
  }
  // node-fetch supports a timeout option (ms)
  const res = await fetch(url, { headers, timeout });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error("Not JSON");
  }
};

export async function getStatus(ip, port = 8080, auth, timeout = 1500) {
  const base = `http://${ip}:${port}`;
  // Prefer JSON endpoint
  try {
    const url = `${base}/requests/status.json`;
    const json = await tryJson(url, auth, timeout);
    // Map a small subset to a neat object
    return {
      raw: json,
      state: json.state,
      volume: json.volume,
      time: json.time,
      length: json.length,
      now_playing: json.information && json.information.category && json.information.category.meta,
    };
  } catch (e) {
    // Try XML endpoint as fallback (VLC may return XML)
    try {
      const url = `http://${ip}:${port}/requests/status.xml`;
      const res = await fetch(url, { timeout });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      return { rawText: text };
    } catch (err) {
      throw new Error(`Failed to get status from ${ip}:${port} — ${e.message}; ${err ? err.message : ''}`);
    }
  }
}

export async function sendCommand(ip, port = 8080, command, params = {}, auth, timeout = 1500) {
  const base = `http://${ip}:${port}`;
  // Basic commands are sent to /requests/status.xml?command=...
  const url = new URL(`${base}/requests/status.xml`);
  if (!command) throw new Error("Missing command");
  url.searchParams.set("command", command);
  Object.entries(params || {}).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const headers = {};
  if (auth && auth.username) {
    const basic = Buffer.from(`${auth.username}:${auth.password || ''}`).toString("base64");
    headers.Authorization = `Basic ${basic}`;
  }

  const res = await fetch(url.toString(), { method: "GET", headers, timeout });
  if (!res.ok) throw new Error(`Command HTTP ${res.status}`);
  const text = await res.text();
  return { ok: true, body: text };
}
