import { useSocketContext } from "../providers/socket_context";
import { CellWithRowAndCol } from "@fortune-sheet/core";

export function useSocket() {
    const socket = useSocketContext();

    async function connect() {
        await socket.connect();
    }

    function disconnect() {
        socket.disconnect();
    }

    function subscribe(spreadSheetId: string) {
        socket.emit(
            "SUBSCRIBE",
            JSON.stringify({
                SpreadSheetId: spreadSheetId,
            })
        );
    }

    function listen(event: string, callback: (data: any) => void) {
        socket.on(event, callback);
    }

    function stopListen() {
        socket.off("STATE");
    }

    function send({
        data,
        spreadSheetId,
        sheetId,
    }: {
        data: CellWithRowAndCol[];
        spreadSheetId: string;
        sheetId: string;
    }) {
        socket.emit(
            "STATE",
            JSON.stringify({
                SpreadSheetId: spreadSheetId,
                SheetId: sheetId,
                UserId: "abc",
                data: data,
            })
        );
    }

    return { connect, disconnect, subscribe, send, listen, stopListen };
}
