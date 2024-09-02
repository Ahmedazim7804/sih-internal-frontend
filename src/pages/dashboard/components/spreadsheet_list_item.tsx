import { IconContext } from "react-icons";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IUserSheet } from "../../../types";

export default function SpreadsheetListItem({
    spreadSheet,
}: {
    spreadSheet: IUserSheet;
}) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/sheet/${spreadSheet.id}`)}
            className="flex cursor-pointer flex-row items-center bg-gray-100 rounded-full py-4 px-4 hover:bg-yellow-100 active:bg-yellow-100 mb-4"
        >
            <IconContext.Provider
                value={{
                    size: "24px",
                }}
            >
                <BsFileEarmarkSpreadsheetFill className="mr-4" />
                <p className="w-[20ch] truncate overflow-hidden">
                    {spreadSheet.title}
                </p>
                <div className="flex-1 flex justify-evenly px-4">
                    <p className="">Owner</p>
                    <p className="">{spreadSheet.createdAt}</p>
                </div>
                <div className="relative hover:bg-gray-50 rounded-full p-1">
                    <PiDotsThreeOutlineVerticalFill className="ml-auto hover:bg-gray-50 rounded-full " />
                </div>
            </IconContext.Provider>
        </div>
    );
}
