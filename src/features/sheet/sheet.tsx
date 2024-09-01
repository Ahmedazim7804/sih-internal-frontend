import React, { useEffect, useRef } from "react";
import "@fortune-sheet/react/dist/index.css";
import { Workbook, WorkbookInstance } from "@fortune-sheet/react";
import TopBar from "./top_bar";
import { useNavigate } from "react-router-dom";
import { useSheetContext } from "./providers/sheet_provider";
import useSheet from "./hooks/use_sheet";
import { useSocket } from "./hooks/use_socket";
import { Op } from "@fortune-sheet/core";

export default function Sheet() {
    const { sheet, key, executeOperation, setWorkBookInstance } =
        useSheetContext();
    const { connect, disconnect, listen, send, subscribe, stopListen } =
        useSocket();

    useEffect(() => {
        connect().then(() => {
            subscribe("3");

            listen("STATE", ({ data }: { data: Op[] }) => {
                console.log(data);

                data.forEach((operation) => {
                    executeOperation(operation);
                });
            });
        });

        return () => {
            stopListen();
            disconnect();
        };
    }, [disconnect, listen, stopListen, connect, subscribe, executeOperation]);
    const { syncData } = useSheet();

    return (
        <div className="w-full h-full z-0 flex flex-col">
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
                        spreadSheetId: "3",
                        sheetId: "1",
                    });
                }}
                onChange={(data) => syncData(data)}
                data={[
                    {
                        name: "Sheet 1",
                        hide: 0,
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
