import React, { useEffect, useState } from "react";
import ShareButton from "./components/share_button";
import FilePickerButton from "./components/file_picker_button";
import { useSocket } from "./hooks/use_socket";
import { useSocketContext } from "./providers/socket_context";
import { io } from "socket.io-client";

export default function TopBar() {
    const [socket, setSocket] = useState(
        io("https://sih-ws-server.onrender.com")
    );

    useEffect(() => {
        socket.on("STATE", (data) => {
            console.log(data);
        });

        // socket.off("STATE", (data) => {});
        // socket.disconnect();
        return () => {
            socket.off("STATE");
            socket.disconnect();
        };
    }, [socket]);

    return (
        <div className="w-full h-fit flex items-center">
            <p>SmartSheets</p>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={async () => {
                    await socket.connect();
                }}
            >
                Connect
            </button>
            <button
                onClick={async () => {
                    socket.emit("STATE", {
                        SpreadSheetId: "abc",
                        data: [["Hello"]],
                    });
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Send
            </button>
            <button
                onClick={async () => {
                    socket.emit("SUBSCRIBE", {
                        SpreadSheetId: "abc",
                    });
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Subscribe
            </button>
            <ShareButton />
            {/* <FilePickerButton /> */}
        </div>
    );
}
