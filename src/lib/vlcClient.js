import { createVlcSocket } from "./vlcWs";

const BACKEND_BASE = import.meta.env.VITE_COUCHCTRL_BACKEND || "http://localhost:3001";
const WS_BASE = BACKEND_BASE.replace(/^http/, "ws");

let socketObj = null;
const statusHandlers = new Set();
const eventHandlers = new Set();

export async function connectToServer(ip, port = 8080) {
  if (socketObj && socketObj.ip === ip && socketObj.port === port && socketObj.socket.readyState === WebSocket.OPEN) {
    return socketObj;
  }

  if (socketObj && socketObj.socket) {
    try { socketObj.socket.close(); } catch (e) {}
  }

  const { socket, subscribe, unsubscribe, sendCommand } = createVlcSocket(WS_BASE);
  socketObj = { socket, subscribe, unsubscribe, sendCommand, ip, port };

  socket.addEventListener("message", (ev) => {
    try {
      const d = JSON.parse(ev.data);
      if (d.type === "status") {
        statusHandlers.forEach(h => { try { h(d.status); } catch (e) {} });
      }
      if (d.type === "subscribed") {
        eventHandlers.forEach(h => { try { h({ type: 'subscribed', ip: d.ip, port: d.port }); } catch (e) {} });
      }
      if (d.type === "unsubscribed") {
        eventHandlers.forEach(h => { try { h({ type: 'unsubscribed' }); } catch (e) {} });
      }
      if (d.type === "commandResult") {
        eventHandlers.forEach(h => { try { h({ type: 'commandResult', result: d.result }); } catch (e) {} });
      }
      if (d.type === "error") {
        eventHandlers.forEach(h => { try { h({ type: 'error', error: d.error }); } catch (e) {} });
      }
    } catch (e) {
      // ignore
    }
  });

  socket.addEventListener("open", () => {
    subscribe(ip, port);
  });

  return socketObj;
}

export function onStatus(handler) {
  statusHandlers.add(handler);
  return () => statusHandlers.delete(handler);
}

export function onEvent(handler) {
  eventHandlers.add(handler);
  return () => eventHandlers.delete(handler);
}

export function sendVlcCommand(command, params = {}) {
  if (!socketObj || !socketObj.socket || socketObj.socket.readyState !== WebSocket.OPEN) {
    throw new Error("Not connected to backend websocket");
  }
  socketObj.sendCommand(socketObj.ip, socketObj.port, command, params);
}

export function disconnect() {
  if (socketObj && socketObj.socket) {
    try { socketObj.unsubscribe(); } catch (e) {}
    try { socketObj.socket.close(); } catch (e) {}
    socketObj = null;
  }
}

export function getConnectedServer() {
  if (!socketObj) return null;
  return { ip: socketObj.ip, port: socketObj.port };
}
