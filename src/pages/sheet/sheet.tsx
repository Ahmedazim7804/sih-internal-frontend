import { useEffect } from "react";
import "@fortune-sheet/react/dist/index.css";
import { Workbook } from "@fortune-sheet/react";
import TopBar from "./top_bar";
import { useSheetContext } from "../../context/sheet_provider";

import { Op } from "@fortune-sheet/core";
import { useSocket } from "../../hooks/use_socket";
import useSheet from "../../hooks/use_sheet";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ThreeDots } from "react-loader-spinner";
import { useGetToken } from "../../hooks/auth/useGetToken";
import { ISocketRecieveData } from "../../types";

function getSpreadSheetFromBackend(token: string, sheetId: string) {
    return fetch(
        `https://sih-internal-backend-pm7h.onrender.com/sheet/state?SheetId=${sheetId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
        }
    ).then((res) => res.json());
}

export default function Sheet() {
    const navigation = useNavigate();

    const params = useParams();

    const token = useGetToken();

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigation("/");
        }
    }, [navigation]);
    const { executeOperation, setWorkBookInstance, setSheet } =
        useSheetContext();
    const { connect, disconnect, listen, send, subscribe, stopListen } =
        useSocket();
    const { syncData } = useSheet();

    if (params.id == null || params.id == undefined) {
        navigation("/");
    }
    const sheetId = params.id;

    localStorage.setItem("currentSheet", sheetId!);

    const userSheets = localStorage.getItem("userSheets");

    if (userSheets === null || !userSheets.includes(sheetId!)) {
        navigation("/");
    }

    const { isPending, data, error } = useQuery({
        queryKey: [`spreadSheetData${sheetId}`],
        queryFn: () => getSpreadSheetFromBackend(token!, sheetId!),
    });

    console.log(data);

    useEffect(() => {
        connect().then(() => {
            subscribe(sheetId!);

            listen("STATE", ({ data }: { data: ISocketRecieveData }) => {
                if (data.isOps) {
                    data.data.forEach((operation: Op) => {
                        executeOperation(operation);
                    });
                } else {
                    setSheet(data.data, false);
                }
            });
        });

        return () => {
            stopListen();
            disconnect();
        };
    }, []);

    return (
        <div className="w-full h-full z-0 flex flex-col font-lexend">
            {isPending ? (
                <div className="absolute w-full h-full flex items-center justify-center z-10 backdrop-blur-sm">
                    <ThreeDots color="#facc15" />
                </div>
            ) : (
                <></>
            )}
            <TopBar></TopBar>
            <Workbook
                showSheetTabs={false}
                ref={(instance) => {
                    setWorkBookInstance(instance);
                }}
                column={100}
                onOp={(ops) => {
                    const newOps: Op[] = ops.filter(
                        (op) => op.path[3] !== "ct"
                    );

                    if (newOps.length == 0) {
                        return;
                    }

                    send({
                        data: {
                            isOps: true,
                            data: newOps,
                        },
                        spreadSheetId: sheetId!,
                    });
                }}
                onChange={(data) => syncData(data)}
                data={[
                    {
                        name: "Sheet 1",
                        hide: 0,
                        id: sheetId!,
                        celldata: error !== null ? [] : [],
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
