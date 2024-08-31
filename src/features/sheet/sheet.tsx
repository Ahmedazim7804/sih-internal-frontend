import React, { useEffect } from "react";
import "@fortune-sheet/react/dist/index.css";
import { Workbook } from "@fortune-sheet/react";
import TopBar from "./top_bar";
import { useNavigate } from "react-router-dom";
import { useSheetContext } from "./providers/sheet_provider";

export default function Sheet() {
    const { sheet, key } = useSheetContext();

    return (
        <div className="w-full h-full z-0 flex flex-col">
            <TopBar></TopBar>
            <Workbook
                key={key.toString()}
                showSheetTabs={false}
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
