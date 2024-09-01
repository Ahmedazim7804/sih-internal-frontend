import React from "react";
import { IconContext } from "react-icons";
import { TbFileSpreadsheet } from "react-icons/tb";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";

export default function SpreadsheetListItem() {
    return (
        <div className="flex cursor-pointer flex-row items-center bg-gray-100 rounded-full py-4 px-4 hover:bg-yellow-100 active:bg-yellow-100 mb-4">
            <IconContext.Provider
                value={{
                    size: "24px",
                }}
            >
                <BsFileEarmarkSpreadsheetFill className="mr-4" />
                <p className="w-[20ch] truncate overflow-hidden">
                    Untitled spreadsheet
                </p>
                <div className="flex-1 flex justify-evenly px-4">
                    <p className="">Owner</p>
                    <p className="">24-08-2024</p>
                </div>
                <div className="relative hover:bg-gray-50 rounded-full p-1">
                    <PiDotsThreeOutlineVerticalFill className="ml-auto hover:bg-gray-50 rounded-full " />
                </div>
            </IconContext.Provider>
        </div>
    );
}
