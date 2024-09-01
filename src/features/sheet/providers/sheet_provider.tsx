import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CellWithRowAndCol, Op } from "@fortune-sheet/core";

interface ISheetContext {
    sheet: Array<CellWithRowAndCol>;
    previousSheet: Array<CellWithRowAndCol>;
    setSheet: (data: Array<CellWithRowAndCol>) => void;
    updateData: () => void;
    executeOperation: (operation: Op) => void;
    key: number;
}

export const SheetContext = createContext<ISheetContext>({
    sheet: [],
    previousSheet: [],
    key: 0,
    setSheet: (data) => {},
    updateData: () => {},
    executeOperation: (operation) => {},
});

export function SheetProvider({ children }: { children: Array<JSX.Element> }) {
    const sheet = useRef<Array<CellWithRowAndCol>>([]);
    const previousSheet = useRef<Array<CellWithRowAndCol>>([]);

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
        previousSheet.current = sheet.current;

        sheet.current = data;
    }

    function executeOperation(operation: Op) {
        const row = operation.path[1] as number;
        const column = operation.path[2] as number;

        const index = row * 100 + column;

        switch (operation.op) {
            case "add":
                sheet.current[index] = {
                    r: row,
                    c: column,
                    v: operation.value,
                };
                updateData();

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
                sheet.current[index] = {
                    r: row,
                    c: column,
                    v: null,
                };
                updateData();

                break;
            case "replace":
                sheet.current[index] = {
                    r: row,
                    c: column,
                    v: operation.value,
                };

                updateData();
                break;
            default:
                break;
        }
    }

    return (
        <SheetContext.Provider
            value={{
                sheet: sheet.current,
                previousSheet: previousSheet.current,
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
