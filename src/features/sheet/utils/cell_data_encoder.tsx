import { Cell } from "@fortune-sheet/core";

export function encodeCellData(data: Cell | null): string {
    if (data == null) {
        return "";
    }

    let value: string = data.m?.toString() ?? "";

    if (data.bl ?? false) {
        value = "#" + value + "#";
    }

    if (data.it ?? false) {
        value = "*" + value + "*";
    }

    if (data.un ?? false) {
        value = "[" + value + "]";
    }

    if (data.cl ?? false) {
        value = "<" + value + ">";
    }

    return value;
}

export function decodeToCellData(data: string): Cell | null {
    if (data.length == 0) {
        return null;
    }

    const value: Cell = {};

    if (data.startsWith("<") && data.endsWith(">")) {
        value.bl = 1;
        data = data.substring(1, data.length - 1);
    }
    if (data.startsWith("[") && data.endsWith("]")) {
        value.un = 1;
        data = data.substring(1, data.length - 1);
    }

    if (data.startsWith("*") && data.endsWith("*")) {
        value.it = 1;
        data = data.substring(1, data.length - 1);
    }

    if (data.startsWith("#") && data.endsWith("#")) {
        value.bl = 1;
        data = data.substring(1, data.length - 1);
    }

    value.m = data;
    value.v = data;

    value.ct = {
        fa: "General",
        t: "g",
    };

    return value;
}
