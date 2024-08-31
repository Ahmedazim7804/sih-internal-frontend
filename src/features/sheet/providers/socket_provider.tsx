import { createContext, useContext } from "react";
import { useSheetDispatchContext } from "./sheet_provider";
import { Cell } from "@fortune-sheet/core";

export const SocketContext = createContext(undefined);

export function SocketProvider({ children }: { children: Array<JSX.Element> }) {
    const dispatch = useSheetDispatchContext();

    return (
        <SocketContext.Provider value={undefined}>
            {children}
        </SocketContext.Provider>
    );
}
