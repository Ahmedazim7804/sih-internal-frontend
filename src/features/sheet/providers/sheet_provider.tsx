import { createContext, useContext, useRef, useState } from "react";
import { ISheetAction } from "../interfaces/sheer_action_interface";
import { Cell, CellWithRowAndCol } from "@fortune-sheet/core";
import useSheet from "../hooks/use_sheet";

interface ISheetContext {
    sheet: Array<CellWithRowAndCol>;
    setSheet: (data: Array<CellWithRowAndCol>) => void;
    updateData: () => void;
    key: number;
}

export const SheetContext = createContext<ISheetContext>({
    sheet: [],
    key: 0,
    setSheet: (data) => {},
    updateData: () => {},
});

export function SheetProvider({ children }: { children: Array<JSX.Element> }) {
    const sheet = useRef<Array<CellWithRowAndCol>>([]);
    const [key, updateKey] = useState(0);

    function updateData() {
        updateKey(key + 1);
    }

    function setSheet(data: Array<CellWithRowAndCol>) {
        sheet.current = data;
    }

    return (
        <SheetContext.Provider
            value={{
                sheet: sheet.current,
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
