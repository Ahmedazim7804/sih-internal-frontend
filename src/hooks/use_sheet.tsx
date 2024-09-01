import { useContext } from "react";
import { useSheetContext } from "../../../context/sheet_provider";
import { matrixToCellMatrix, stringToMatrix } from "../utils/converter";
import { Sheet, CellMatrix, CellWithRowAndCol } from "@fortune-sheet/core";

export default function useSheet() {
    const { setSheet, updateData } = useSheetContext();

    function loadDataFromCsv(data: string) {
        const matrix = stringToMatrix(data);
        const cellMatrix = matrixToCellMatrix(matrix);

        saveToLocalStorage(cellMatrix);
        setSheet(cellMatrix);
        updateData();
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

        setSheet(cellWithRowAndCol);

        saveToLocalStorage(cellWithRowAndCol);
    }

    return { loadDataFromCsv, syncData };
}
