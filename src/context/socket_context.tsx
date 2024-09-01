import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(io("http://13.127.205.104:4000"));

export function useSocketContext() {
    return useContext(SocketContext);
}
