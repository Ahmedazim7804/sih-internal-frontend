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
                data={[
                    {
                        name: "Sheet 1",
                        celldata: sheet,
                    },
                ]}
            ></Workbook>
        </div>
    );
}
