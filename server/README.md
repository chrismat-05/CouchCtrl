# CouchCtrl backend

This is a minimal Node backend that proxies requests to VLC's HTTP interface and provides a WebSocket for realtime status updates.

Quick start (from the `server/` folder):

1. Install dependencies

   npm install

2. Start the server

   npm run start

By default the server listens on port 3001. Endpoints:

- POST /probe { ip, port? } → probes VLC `requests/status.json` and returns parsed info.
- POST /command { ip, port?, command, params? } → forwards a command to the VLC HTTP interface.

WebSocket: connect to `ws://<host>:3001` and send:

  { "action": "subscribe", "ip": "192.168.x.x", "port": 8080 }

The server will poll the VLC endpoint and emit messages of the form `{ type: 'status', status: {...} }`.
