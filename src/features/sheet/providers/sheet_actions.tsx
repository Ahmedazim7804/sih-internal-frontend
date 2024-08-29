import { Cell, CellMatrix } from "@fortune-sheet/core";
import { ISheetAction } from "../interfaces/sheer_action_interface";

export class SheetActions {
    SheetActions() {}

    static setData({ data }: { data: CellMatrix }): ISheetAction {
        const dataAsArray: Array<Array<Cell | null>> = data.map((row) => row);

        return {
            type: "SET_DATA",
            payload: dataAsArray,
        };
    }
}
