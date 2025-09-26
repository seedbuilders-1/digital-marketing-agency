// src/lib/socket.ts

import { io, Socket } from "socket.io-client";

// ADD THIS LOG:
console.log("--- Initializing Socket Singleton ---");

const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!URL) {
  throw new Error(
    "FATAL ERROR: NEXT_PUBLIC_API_BASE_URL is not defined in .env.local"
  );
}

console.log(`Socket will connect to: ${URL}`);

const socket: Socket = io(URL, {
  transports: ["websocket"],
});

socket.on("connect_error", (err) => {
  console.error("Socket Connection Error:", err.message, err.cause);
});

socket.on("connect", () => {
  console.log("--- Socket Singleton Connected Successfully ---", socket.id);
});

export default socket;
