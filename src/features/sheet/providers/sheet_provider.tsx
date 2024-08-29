import { createContext, useContext, useReducer } from "react";
import { ISheetAction } from "../interfaces/sheer_action_interface";
import { Cell } from "@fortune-sheet/core";

export const SheetContext = createContext(Array<Array<Cell | null>>());
export const SheetDispatchContext = createContext<
    React.Dispatch<ISheetAction> | undefined
>(undefined);

export function SheetProvider({ children }: { children: Array<JSX.Element> }) {
    const [sheet, dispatch] = useReducer(
        sheetReducer,
        Array<Array<Cell | null>>()
    );

    return (
        <SheetContext.Provider value={sheet}>
            <SheetDispatchContext.Provider value={dispatch}>
                {children}
            </SheetDispatchContext.Provider>
        </SheetContext.Provider>
    );
}

function sheetReducer(
    data: Array<Array<Cell | null>>,
    action: ISheetAction
): Array<Array<Cell | null>> {
    switch (action.type) {
        case "SET_SHEET":
            return action.payload;
        case "DELETE_SHEET":
            return [];
        default:
            return data;
    }
}

export function useSheetContext() {
    return useContext(SheetContext);
}
export function useSheetDispatchContext() {
    return useContext(SheetDispatchContext);
}
