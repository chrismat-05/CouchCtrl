import os from "os";
import { getStatus } from "./vlc.js";

function ipBaseFromAddress(addr) {
  // derive /24 base
  const parts = addr.split(".");
  if (parts.length !== 4) return null;
  return `${parts[0]}.${parts[1]}.${parts[2]}`;
}

async function checkHost(ip, ports, auth, timeout) {
  for (const port of ports) {
    try {
      const status = await getStatus(ip, port, auth, timeout);
      return { ip, port, status };
    } catch (e) {
      // ignore and try next port
    }
  }
  return null;
}

export async function discoverNetwork({ ports = [8080, 8081, 8000, 3000, 9090, 8090, 8082, 8443], auth, timeout = 700, concurrency = 50, quick = true, stopOnFirst = true } = {}) {
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

  // Build tasks (support quick scan which checks a handful of common addresses)
  const tasks = [];
  for (const base of baseSet) {
    if (quick) {
      // common likely hosts on home networks
      const quickList = [1, 2, 10, 50, 100, 254];
      for (const i of quickList) tasks.push({ ip: `${base}.${i}` });
    } else {
      for (let i = 1; i <= 254; i++) {
        const ip = `${base}.${i}`;
        tasks.push({ ip });
      }
    }
  }

  let idx = 0;
  async function worker() {
    while (true) {
      const curIdx = idx++;
      if (curIdx >= tasks.length) break;
      // If requested, stop early when we already found a device
      if (stopOnFirst && results.length > 0) break;
      const cur = tasks[curIdx];
      try {
        const found = await checkHost(cur.ip, ports, auth, timeout);
        if (found) results.push(found);
        if (stopOnFirst && results.length > 0) break;
      } catch (e) {
        // ignore per-host errors
      }
    }
  }

  const workers = new Array(Math.max(1, Math.min(concurrency, tasks.length))).fill(0).map(() => worker());
  await Promise.all(workers);

  return results;
}
