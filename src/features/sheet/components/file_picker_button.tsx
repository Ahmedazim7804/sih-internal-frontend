import React from "react";
import { FaShareAlt } from "react-icons/fa";
import { MdFileOpen } from "react-icons/md";
import { useFilePicker } from "use-file-picker";
import useSheet from "../hooks/use_sheet";
import { IconContext } from "react-icons";

export default function FilePickerButton() {
    const { loadDataFromCsv } = useSheet();

    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
        accept: ".csv",
        multiple: false,
        onFilesSuccessfullySelected: (file) => {
            loadDataFromCsv(file.filesContent[0].content);
        },
    });

    return (
        <button className="ml-auto my-2 text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 hover:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2">
            <IconContext.Provider value={{ color: "White", size: "24px" }}>
                <MdFileOpen className="inline-block" />
            </IconContext.Provider>
        </button>
    );
}
