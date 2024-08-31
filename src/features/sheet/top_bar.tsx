import React, { useEffect, useState } from "react";
import ShareButton from "./components/share_button";
import FilePickerButton from "./components/file_picker_button";
import { useSocket } from "./hooks/use_socket";
import { useSocketContext } from "./providers/socket_context";
import { Socket, io } from "socket.io-client";

export default function TopBar() {
    const [socket, setsocket] = useState<Socket | null>();

    useEffect(() => {
        const _socket = io("https://sih-ws-server.onrender.com");
        _socket.on("STATE", (data) => {
            console.log(data);
        });
        setsocket(_socket);

        // socket.off("STATE", (data) => {});
        // socket.disconnect();
        return () => {
            _socket.off("STATE");
            _socket.disconnect();
        };
    }, []);

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
                    if (socket?.active) {
                        console.log("SOCKET");
                    }

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
            <ShareButton />
        </div>
    );
}

// import React, { useEffect, useState } from "react";

// import ShareButton from "./components/share_button";
// import FilePickerButton from "./components/file_picker_button";
// import { useSocket } from "./hooks/use_socket";
// import { useSocketContext } from "./providers/socket_context";
// import { io } from "socket.io-client";

// export default function TopBar() {
//     const [socket, setSocket] = useState(
//         io("https://sih-ws-server.onrender.com")
//     );

//     useEffect(() => {
//         socket.on("STATE", (data) => {
//             console.log(data);
//         });

//         // socket.off("STATE", (data) => {});
//         // socket.disconnect();
//         return () => {
//             socket.off("STATE");
//             socket.disconnect();
//         };
//     }, [socket]);

//     return (
//         <div className="w-full h-fit flex items-center">
//             <p>SmartSheets</p>
//             <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={async () => {
//                     await socket.connect();
//                 }}
//             >
//                 Connect
//             </button>
//             <button
//                 onClick={async () => {
//                     socket.emit("STATE", {
//                         SpreadSheetId: "abc",
//                         data: [["Hello"]],
//                     });
//                 }}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//                 Send
//             </button>
//             <button
//                 onClick={async () => {
//                     socket.emit("SUBSCRIBE", {
//                         SpreadSheetId: "abc",
//                     });
//                 }}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//                 Subscribe
//             </button>
//             <ShareButton />
//             {/* <FilePickerButton /> */}
//         </div>
//     );
// }
