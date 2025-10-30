import os from "os";
import { getStatus } from "./vlc.js";

function ipBaseFromAddress(addr) {
  // derive /24 base
  const parts = addr.split(".");
  if (parts.length !== 4) return null;
  return `${parts[0]}.${parts[1]}.${parts[2]}`;
}

async function checkHost(ip, ports, auth) {
  for (const port of ports) {
    try {
      const status = await getStatus(ip, port, auth);
      return { ip, port, status };
    } catch (e) {
      // ignore
    }
  }
  return null;
}

export async function discoverNetwork({ ports = [8080, 8081, 8000, 3000, 9090], auth } = {}) {
  // Determine local IPv4 addresses
  const nets = os.networkInterfaces();
  const candidates = [];
  for (const name of Object.keys(nets)) {
    for (const ni of nets[name]) {
      if (ni.family === "IPv4" && !ni.internal) {
        candidates.push(ni.address);
      }
    }
  }

  const baseSet = new Set();
  for (const c of candidates) {
    const base = ipBaseFromAddress(c);
    if (base) baseSet.add(base);
  }

  // if no interfaces found, fallback to localhost
  if (baseSet.size === 0) baseSet.add("127.0.0");

  const results = [];

  // Limit concurrency
  const concurrency = 60;
  const tasks = [];

  for (const base of baseSet) {
    for (let i = 1; i <= 254; i++) {
      const ip = `${base}.${i}`;
      tasks.push({ ip });
    }
  }

  let idx = 0;
  async function worker() {
    while (idx < tasks.length) {
      const cur = tasks[idx++];
      try {
        const found = await checkHost(cur.ip, ports, auth);
        if (found) results.push(found);
      } catch (e) {
        // ignore
      }
    }
  }

  const workers = new Array(concurrency).fill(0).map(() => worker());
  await Promise.all(workers);

  return results;
}
