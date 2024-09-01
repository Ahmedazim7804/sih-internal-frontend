import { MdFileOpen } from "react-icons/md";
import { useFilePicker } from "use-file-picker";
import { IconContext } from "react-icons";
import useSheet from "../../../hooks/use_sheet";

export default function FilePickerButton() {
    const { loadDataFromCsv } = useSheet();

    const { openFilePicker } = useFilePicker({
        accept: ".csv",
        multiple: false,
        onFilesSuccessfullySelected: (file: { filesContent: { content: string; }[]; }) => {
            loadDataFromCsv(file.filesContent[0].content);
        },
    });

    return (
        <button
            onClick={() => openFilePicker()}
            className="border-none hove:border-none active:border-none my-2 text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 hover:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
        >
            <IconContext.Provider value={{ color: "White", size: "24px" }}>
                <MdFileOpen className="inline-block" />
            </IconContext.Provider>
            <span className="ml-2 text-base text-center text-white font-bold">
                File
            </span>
        </button>
    );
}
