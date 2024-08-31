import React from "react";
import { FaShareAlt } from "react-icons/fa";
import { MdFileOpen } from "react-icons/md";
import { useFilePicker } from "use-file-picker";
import useSheet from "../hooks/use_sheet";

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
        <button
            onClick={() => openFilePicker()}
            className="px-4 ml-auto py-2 my-2 hover:bg-purple-500 hover:-translate-y-1 hover:shadow-[1px_7px_0_0_#3b0764] shadow-[1px_3px_0_0_#3b0764] bg-purple-500 text-white rounded-full"
        >
            <MdFileOpen className="inline-block" />
        </button>
    );
}
