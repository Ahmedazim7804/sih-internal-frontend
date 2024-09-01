import { useEffect } from "react";
import "@fortune-sheet/react/dist/index.css";
import { Workbook } from "@fortune-sheet/react";
import TopBar from "./top_bar";
import { useSheetContext } from "../../context/sheet_provider";

import { Op } from "@fortune-sheet/core";
import { useSocket } from "../../hooks/use_socket";
import useSheet from "../../hooks/use_sheet";
import { useNavigate, useParams } from "react-router-dom";

export default function Sheet() {
    const navigation = useNavigate();

    const params = useParams();

    useEffect(() => {
        if (localStorage.getItem("token") == null) {
            navigation("/");
        }
    }, [navigation]);
    const { sheet, key, executeOperation, setWorkBookInstance } =
        useSheetContext();
    const { connect, disconnect, listen, send, subscribe, stopListen } =
        useSocket();
    const { syncData } = useSheet();

    useEffect(() => {
        connect().then(() => {
            subscribe("3");

            listen("STATE", ({ data }: { data: Op[] }) => {
                data.forEach((operation) => {
                    executeOperation(operation);
                });
            });
        });

        return () => {
            stopListen();
            disconnect();
        };
    }, []);

    if (params.id == null || params.id == undefined) {
        navigation("/");
    }
    const sheetId = params.id;

    const userSheets = localStorage.getItem("userSeets");

    if (userSheets === null || !userSheets.includes(sheetId!)) {
        navigation("/");
    }

    return (
        <div className="w-full h-full z-0 flex flex-col font-lexend">
            <TopBar></TopBar>
            <Workbook
                key={key.toString()}
                showSheetTabs={false}
                ref={(instance) => {
                    setWorkBookInstance(instance);
                }}
                column={100}
                onOp={(ops) => {
                    const newOps: Op[] = ops.filter((op) => op.path[3] != "ct");

                    if (newOps.length == 0) {
                        return;
                    }

                    send({
                        data: newOps,
                        spreadSheetId: sheetId!,
                        sheetId: "1",
                    });
                }}
                onChange={(data) => syncData(data)}
                data={[
                    {
                        name: "Sheet 1",
                        hide: 0,
                        id: "1",
                        celldata: sheet,
                    },
                ]}
                toolbarItems={[
                    "undo",
                    "redo",
                    "clear-format",
                    "|",
                    "currency-format",
                    "percentage-format",
                    "number-decrease",
                    "number-increase",
                    "format",
                    "font-size",
                    "|",
                    "bold",
                    "italic",
                    "strike-through",
                    "underline",
                    "|",
                    "background",
                    "|",
                    "horizontal-align",
                    "vertical-align",
                    "text-wrap",
                    "text-rotation",
                    "|",
                    "sort",
                    "quick-formula",
                ]}
                cellContextMenu={[
                    "copy",
                    "paste",
                    "|",
                    "insert-row",
                    "insert-column",
                    "delete-row",
                    "delete-column",
                    "delete-cell",
                    "hide-row",
                    "hide-column",
                    "clear",
                    "sort",
                    "filter",
                    "link",
                    "data",
                    "cell-format",
                ]}
            ></Workbook>
        </div>
    );
}
