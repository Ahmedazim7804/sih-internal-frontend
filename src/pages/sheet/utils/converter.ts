import { Cell, CellWithRowAndCol } from "@fortune-sheet/core";
export function stringToMatrix(text: string, delimiter: string = ",") {
    const rows = text.split("\n");
    const matrix = rows.map((row) => row.split(delimiter));
    return matrix;
}

export function matrixToCellMatrix(matrix: string[][]): CellWithRowAndCol[] {
    const cellMatrix: CellWithRowAndCol[] = [];

    matrix.forEach((row, rowIndex) =>
        row.forEach((cell, cellIndex) =>
            cellMatrix.push({
                r: rowIndex,
                c: cellIndex,
                v: {
                    v: cell,
                    m: cell,
                },
            })
        )
    );
    return cellMatrix;
}
