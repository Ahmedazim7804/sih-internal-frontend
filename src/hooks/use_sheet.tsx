// import { useSheetContext } from "../../../context/sheet_provider";

import { Sheet, CellMatrix, CellWithRowAndCol } from "@fortune-sheet/core";
import { useSheetContext } from "../context/sheet_provider";
import {
    stringToMatrix,
    matrixToCellMatrix,
} from "../pages/sheet/utils/converter";

export default function useSheet() {
    const { setSheet } = useSheetContext();

    function loadDataFromCsv(data: string) {
        const matrix = stringToMatrix(data);
        const cellMatrix = matrixToCellMatrix(matrix);

        setSheet(cellMatrix, true);

        // saveToLocalStorage(cellMatrix);
        // setSheet(cellMatrix);
    }

    function syncData(data: Sheet[]) {
        const cellMatrix: CellMatrix | undefined = data[0].data;

        if (cellMatrix === undefined) {
            return;
        }

        const cellWithRowAndCol: CellWithRowAndCol[] = [];

        for (let row = 0; row < cellMatrix.length; row++) {
            for (let col = 0; col < cellMatrix[row].length; col++) {
                const cell = cellMatrix[row][col];
                cellWithRowAndCol.push({
                    r: row,
                    c: col,
                    v: cell,
                });
            }
        }

        // setSheet(cellWithRowAndCol);

        // saveToLocalStorage(cellWithRowAndCol);
    }

    return { loadDataFromCsv, syncData };
}
