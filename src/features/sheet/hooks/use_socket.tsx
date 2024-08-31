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

    function subscribe(event: string, callback: (data: string) => void) {
        socket.on(event, callback);
    }

    function unsubscribe(event: string) {
        socket.off(event);
    }

    function send(event: string, data: Cell) {
        socket.emit(event, data);
    }

    function receive(event: string, callback: (data: Cell) => void) {
        socket.on(event, callback);
    }

    return { connect, disconnect, subscribe, unsubscribe, send, receive };
}
