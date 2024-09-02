import { useAuthContext } from "../context/auth_provider";
import { useSocketContext } from "../context/socket_context";
import { ISocketRecieveData } from "../types";
export function useSocket() {
    const socket = useSocketContext();

    const { user } = useAuthContext();

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
    }: {
        data: ISocketRecieveData;
        spreadSheetId: string;
    }) {
        await socket.emit(
            "STATE",
            JSON.stringify({
                SpreadSheetId: spreadSheetId,
                UserId: user?.id,
                data: {
                    ...data,
                },
            })
        );
    }

    return { connect, disconnect, subscribe, send, listen, stopListen };
}
