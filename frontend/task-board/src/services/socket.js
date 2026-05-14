import { io } from "socket.io-client";

// backend URL (change if needed)
const SOCKET_URL = "http://localhost:5000";

const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  transports: ["websocket"],
});

export default socket;