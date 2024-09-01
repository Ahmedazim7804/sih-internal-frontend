import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CellWithRowAndCol } from "@fortune-sheet/core";

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
