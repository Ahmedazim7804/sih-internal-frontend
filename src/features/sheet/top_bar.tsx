import React, { useEffect } from "react";
import ShareButton from "./components/share_button";
import { useSocketContext } from "./providers/socket_context";
import { io } from "socket.io-client";
import FilePickerButton from "./components/file_picker_button";
import ProfileComponent from "./components/profile_component";

export default function TopBar() {
    const socket = useSocketContext();
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
                onClick={async () => {
                    await socket?.connect();
                }}
            >
                Connect
            </button>
            <button
                onClick={async () => {
                    socket?.emit(
                        "STATE",
                        JSON.stringify({
                            SpreadSheetId: "2",
                            SheetId: "1",
                            UserId: "abc",
                            data: [["UUUUUUUU"]],
                        })
                    );
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Send
            </button>
            <button
                onClick={async () => {
                    socket?.emit(
                        "SUBSCRIBE",
                        JSON.stringify({
                            SpreadSheetId: "abc",
                        })
                    );
                }}
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
