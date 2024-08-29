import { Cell } from "@fortune-sheet/core";

export interface ISheetAction {
    type: string;
    payload: Array<Array<Cell | null>>;
}
