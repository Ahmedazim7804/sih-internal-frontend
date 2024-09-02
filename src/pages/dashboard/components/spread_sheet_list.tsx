import { ThreeDots } from "react-loader-spinner";
import SpreadsheetListItem from "./spreadsheet_list_item";
import SpreadSheetHeaders from "./spread_sheet_headers";
import SpreadSheetAdd from "./spread_sheet_add";
import { IUserSheets } from "../../../types";

export default function SpreadSheetList({
    isPending,
    data,
    error,
}: {
    isPending: boolean;
    data: IUserSheets | undefined;
    error: Error | null;
}) {
    if (isPending) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <ThreeDots color="#facc15" />
            </div>
        );
    }

    if (error != null || !data) {
        return <p>Some Error Occured</p>;
    }

    localStorage.setItem(
        "userSheets",
        JSON.stringify(data.data.map((e) => e.id.toString()))
    );

    return (
        <div className="mt-16 mx-auto w-[750px] sm:w-[75%] md:w-[70%] lg:w-[65%] xl:w-[55%] 2xl:w-[55%]">
            <SpreadSheetHeaders />
            {data &&
                data.data.map((sheet) => (
                    <SpreadsheetListItem spreadSheet={sheet} key={sheet.id} />
                ))}
            <SpreadSheetAdd />
        </div>
    );
}
