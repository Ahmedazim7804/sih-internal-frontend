import { useSocketContext } from "../providers/socket_context";
import { CellWithRowAndCol, Op } from "@fortune-sheet/core";
import { getCellMatrixesDifference } from "../utils/cellmatrix_diffrence";

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

    async function send({
        data,
        spreadSheetId,
        sheetId,
    }: {
        data: Op[];
        spreadSheetId: string;
        sheetId: string;
    }) {
        await socket.emit(
            "STATE",
            JSON.stringify({
                SpreadSheetId: spreadSheetId,
                SheetId: sheetId,
                UserId: "1",
                data: data,
            })
        );
    }

    return { connect, disconnect, subscribe, send, listen, stopListen };
}
