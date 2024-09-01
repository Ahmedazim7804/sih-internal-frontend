import React, { useEffect } from "react";
import ShareButton from "./components/share_button";
import { useSocketContext } from "./providers/socket_context";
import { io } from "socket.io-client";
import FilePickerButton from "./components/file_picker_button";
import ProfileComponent from "./components/profile_component";
import { useSheetContext } from "./providers/sheet_provider";
import { useSocket } from "./hooks/use_socket";

export default function TopBar() {
    const { sheet, setSheet, updateData } = useSheetContext();
    const { connect, disconnect, listen, send, subscribe, stopListen } =
        useSocket();

    useEffect(() => {
        listen("STATE", (data) => {
            console.log(data.data);

            setSheet(data.data);
            updateData();
        });

        return () => {
            stopListen();
            disconnect();
        };
    });

    return (
        <div className="w-full h-fit flex items-center">
            <img
                src="./img/logo.PNG"
                alt="logo"
                style={{
                    width: "185px",
                    height: "65px",
                    padding: "10px",
                    borderRadius: "20px",
                }}
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => connect()}
            >
                Connect
            </button>
            <button
                onClick={async () =>
                    send({
                        data: sheet,
                        spreadSheetId: "ABC",
                        sheetId: "123",
                    })
                }
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Send
            </button>
            <button
                onClick={async () => subscribe("ABC")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Subscribe
            </button>
            <div className="ml-auto flex">
                <FilePickerButton></FilePickerButton>
                <ShareButton />
                <ProfileComponent />
            </div>
        </div>
    );
}
