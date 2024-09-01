import React, { useEffect, useState } from "react";
import DashboardTopBar from "./dashboard_top_bar";
import SpreadsheetListItem from "./components/spreadsheet_list_item";
import SpreadSheetList from "./components/spread_sheet_list";
import SpreadSheetHeaders from "./components/spread_sheet_headers";
import SpreadSheetAdd from "./components/spread_sheet_add";
import useUserSheets from "./hooks/use_usersheets";
import { IUserSheets } from "./interfaces/user_sheets_interface";

export default function DashboardScreen() {
    const {data , isPending, error} = useUserSheets()
    const [query, setquery] = useState<string>("")
    const [searchData, setSearchData] = useState<IUserSheets>({data: [], success: false})
    useEffect(()=>{
        if( data){
            setSearchData(data)
        }
    }, [data])

    const submitsearch = () => {
        if(!data){
            return
        }
        
        if(query === ""){
            setSearchData(data)
        }
        else{
            setSearchData({data: data.data.filter((sheet: any) => sheet.title.toLowerCase().includes(query.toLowerCase())), success: true})
        }   
    }
    return (
        <div className="flex flex-col w-lvw h-lvh font-lexend">
            <DashboardTopBar setquery={setquery} submitsearch={submitsearch} />


            {/* <div className="mt-16"> */}
            <SpreadSheetList isPending={isPending} error={error} data={searchData} />
            {/* </div> */}
        </div>
    );
}
