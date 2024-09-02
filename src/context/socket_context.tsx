import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(io("https://sih-ws-server.onrender.com"));

export function useSocketContext() {
    return useContext(SocketContext);
}
