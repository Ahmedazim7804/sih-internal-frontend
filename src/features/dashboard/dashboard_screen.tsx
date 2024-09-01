import React from "react";
import DashboardTopBar from "./dashboard_top_bar";
import SpreadsheetListItem from "./components/spreadsheet_list_item";
import SpreadSheetList from "./components/spread_sheet_list";
import SpreadSheetHeaders from "./components/spread_sheet_headers";
import SpreadSheetAdd from "./components/spread_sheet_add";

export default function DashboardScreen() {
    return (
        <div className="flex flex-col w-lvw h-lvh font-lexend">
            <DashboardTopBar />

            <div className="mt-16">
                <SpreadSheetList>
                    <SpreadSheetHeaders />
                    <SpreadsheetListItem />
                    <SpreadsheetListItem />
                    <SpreadSheetAdd />
                </SpreadSheetList>
            </div>
        </div>
    );
}
