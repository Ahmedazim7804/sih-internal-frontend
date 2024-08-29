import "@fortune-sheet/react/dist/index.css";
import { Workbook } from "@fortune-sheet/react";
import TopBar from "./top_bar";
import { SheetActions } from "./providers/sheet_actions";
import {
    useSheetContext,
    useSheetDispatchContext,
} from "./providers/sheet_provider";

export default function SheetComponent() {
    const sheet = useSheetContext();
    const dispatch = useSheetDispatchContext();

    if (dispatch == undefined) {
        return <div></div>;
    }

    return (
        <div className="w-full h-full z-0 flex flex-col">
            <TopBar></TopBar>
            <Workbook
                sheetTabContextMenu={["copy", "delete"]}
                onChange={(sheetData) => {
                    console.log(sheetData);

                    if (sheetData[0].data == undefined) {
                        return;
                    }

                    dispatch(
                        SheetActions.setData({
                            data: sheetData[0].data,
                        })
                    );
                }}
                data={[
                    {
                        name: "Sheet 1",
                    },
                ]}
            ></Workbook>
            //{" "}
        </div>
    );
}
