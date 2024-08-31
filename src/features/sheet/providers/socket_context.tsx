import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(io());

export function useSocketContext() {
    return useContext(SocketContext);
}
