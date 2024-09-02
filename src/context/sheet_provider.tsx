import { createContext, useContext, useRef } from "react";
import { CellWithRowAndCol, Op, Cell } from "@fortune-sheet/core";
import { WorkbookInstance } from "@fortune-sheet/react";
import { useSocket } from "../hooks/use_socket";

interface ISheetContext {
    sheet: Array<CellWithRowAndCol>;
    setSheet: (data: Array<CellWithRowAndCol>, emit: boolean) => void;
    setWorkBookInstance: (data: WorkbookInstance | null) => void;
    wbInstance: WorkbookInstance | null;
    executeOperation: (operation: Op) => void;
}

export const SheetContext = createContext<ISheetContext>({
    sheet: [],
    setSheet: () => {},
    setWorkBookInstance: () => {},
    wbInstance: null,
    executeOperation: () => {},
});

export function SheetProvider({ children }: { children: Array<JSX.Element> }) {
    const sheet = useRef<Array<CellWithRowAndCol>>([]);
    const wbInstance = useRef<WorkbookInstance | null>(null);

    const { send } = useSocket();

    // useEffect(() => {
    //     const savedSheet = localStorage.getItem("sheet");

    //     if (savedSheet != null) {
    //         sheet.current = JSON.parse(savedSheet);
    //         updateData();
    //     }
    // }, []);

    function setSheet(data: Array<CellWithRowAndCol>, emit: boolean = false) {
        const currentSheet = wbInstance.current?.getSheet();

        if (currentSheet == undefined) {
            return;
        }

        console.log(data);

        wbInstance.current?.updateSheet([
            {
                name: "Sheet 1",
                id: currentSheet.id!,
                celldata: data,
            },
        ]);

        if (emit) {
            send({
                data: {
                    isOps: false,
                    data: data,
                },
                spreadSheetId: currentSheet.id!,
            });
        }
    }

    function setWorkBookInstance(instance: WorkbookInstance | null) {
        if (instance == null) {
            return;
        }
        wbInstance.current = instance;
    }

    function executeOperation(operation: Op) {
        const row = operation.path[1] as number | null | undefined;
        const column = operation.path[2] as number | null | undefined;
        const attr = operation.path[3] as keyof Cell | null | undefined;

        if (
            row == null ||
            row == undefined ||
            column == null ||
            column == undefined
        ) {
            return;
        }

        switch (operation.op) {
            case "add":
                if (attr == null || attr == undefined) {
                    break;
                }

                wbInstance.current?.setCellFormat(
                    row,
                    column,
                    attr,
                    operation.value
                );
                break;
            case "addSheet":
                break;
            case "deleteRowCol":
                break;
            case "deleteSheet":
                break;
            case "insertRowCol":
                break;
            case "remove":
                wbInstance.current?.setCellValue(row, column, null);

                break;
            case "replace":
                console.log(operation);

                wbInstance.current?.setCellValue(row, column, operation.value);

                break;
            default:
                break;
        }
    }

    return (
        <SheetContext.Provider
            value={{
                sheet: sheet.current,
                wbInstance: wbInstance.current,
                setWorkBookInstance,
                executeOperation,
                setSheet,
            }}
        >
            {children}
        </SheetContext.Provider>
    );
}

export function useSheetContext() {
    return useContext(SheetContext);
}
