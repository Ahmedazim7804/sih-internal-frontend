import { useContext } from "react";
// import { useSheetContext } from "../../../context/sheet_provider";

import { Sheet, CellMatrix, CellWithRowAndCol } from "@fortune-sheet/core";
import { useSheetContext } from "../context/sheet_provider";
import {
    stringToMatrix,
    matrixToCellMatrix,
} from "../pages/sheet/utils/converter";
import { useQuery } from "@tanstack/react-query";

export default function useSheet() {
    const { setSheet, wbInstance } = useSheetContext();

    function loadDataFromCsv(data: string) {
        const matrix = stringToMatrix(data);
        const cellMatrix = matrixToCellMatrix(matrix);

        setSheet(cellMatrix, true);

        // saveToLocalStorage(cellMatrix);
        // setSheet(cellMatrix);
    }

    async function saveToLocalStorage(data: CellWithRowAndCol[]) {
        await localStorage.setItem("sheet", JSON.stringify(data));
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
