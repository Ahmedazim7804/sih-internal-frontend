import { useSocketContext } from "../providers/socket_context";
import { Cell } from "@fortune-sheet/core";
import { io } from "socket.io-client";

export function useSocket() {
    const socket = useSocketContext();

    function connect() {
        socket.connect();
    }

    function disconnect() {
        socket.disconnect();
    }

    function subscribe() {
        socket.emit("subscribe", {
            SpreadSheetId: "123",
        });
    }

    function unsubscribe(event: string) {
        socket.off(event);
    }

    function send(event: string) {
        socket.emit("state", {
            SpreadSheetId: "123",
            data: "Hello",
        });
    }

    function receive() {
        socket.on("state", (data) => {
            console.log(data);
        });
    }

    return { connect, disconnect, subscribe, unsubscribe, send, receive };
}
