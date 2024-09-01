import React from "react";
import { IconContext } from "react-icons";
import { TbFileSpreadsheet } from "react-icons/tb";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import useSheet from "../../../hooks/use_sheet";
import { useQuery } from "@tanstack/react-query";

export default function SpreadSheetAdd() {
    // const { isLoading, isError, data} = useQuery(
    //     {

    //     }
    // );

    return (
        <div className="flex cursor-pointer justify-center flex-row items-center bg-gray-100 py-1 rounded-full hover:bg-yellow-100 active:bg-yellow-100 mb-4">
            <IconContext.Provider
                value={{
                    size: "48px",
                }}
            >
                <IoIosAdd />
            </IconContext.Provider>
        </div>
    );
}
