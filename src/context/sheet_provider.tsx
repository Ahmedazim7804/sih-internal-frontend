import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CellWithRowAndCol, Op } from "@fortune-sheet/core";
import { WorkbookInstance } from "@fortune-sheet/react";

interface ISheetContext {
    sheet: Array<CellWithRowAndCol>;
    setSheet: (data: Array<CellWithRowAndCol>) => void;
    setWorkBookInstance: (data: WorkbookInstance | null) => void;
    updateData: () => void;
    wbInstance: WorkbookInstance | null;
    executeOperation: (operation: Op) => void;
    key: number;
}

export const SheetContext = createContext<ISheetContext>({
    sheet: [],
    key: 0,
    setSheet: (data) => {},
    setWorkBookInstance: (data) => {},
    wbInstance: null,
    updateData: () => {},
    executeOperation: (operation) => {},
});

export function SheetProvider({ children }: { children: Array<JSX.Element> }) {
    const sheet = useRef<Array<CellWithRowAndCol>>([]);

    const wbInstance = useRef<WorkbookInstance | null>(null);

    const [key, updateKey] = useState(0);

    useEffect(() => {
        const savedSheet = localStorage.getItem("sheet");

        if (savedSheet != null) {
            sheet.current = JSON.parse(savedSheet);
            updateData();
        }
    }, []);

    function updateData() {
        updateKey(key + 1);
    }

    function setSheet(data: Array<CellWithRowAndCol>) {
        sheet.current = data;
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
                wbInstance.current?.setCellValue(row, column, operation.value);
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
                key,
                setSheet,
                updateData,
            }}
        >
            {children}
        </SheetContext.Provider>
    );
}

export function useSheetContext() {
    return useContext(SheetContext);
}
