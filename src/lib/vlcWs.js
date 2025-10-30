export function createVlcSocket(baseWsUrl) {
  // baseWsUrl should be like ws://localhost:3001
  const socket = new WebSocket(baseWsUrl.replace(/\/$/, ""));

  const subscribe = (ip, port = 8080, interval = 1500) => {
    if (socket.readyState !== WebSocket.OPEN) {
      // queue subscribe once open
      socket.addEventListener('open', () => socket.send(JSON.stringify({ action: 'subscribe', ip, port, interval })), { once: true });
    } else {
      socket.send(JSON.stringify({ action: 'subscribe', ip, port, interval }));
    }
  };

  const unsubscribe = () => {
    if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ action: 'unsubscribe' }));
  };

  const sendCommand = (ip, port, command, params) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: 'command', ip, port, command, params }));
    }
  };

  return { socket, subscribe, unsubscribe, sendCommand };
}
