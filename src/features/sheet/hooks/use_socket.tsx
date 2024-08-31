import { useSocketContext } from "../providers/socket_context";
import { Cell } from "@fortune-sheet/core";

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

    function send(data: string) {
        socket.emit("STATE", {
            SpreadSheetId: "123",
            data: [["Hello"]],
        });
    }

    function receive(callback: (data: Cell[][]) => void) {
        socket.on("STATE", callback);
    }

    return { connect, disconnect, subscribe, unsubscribe, send, receive };
}
