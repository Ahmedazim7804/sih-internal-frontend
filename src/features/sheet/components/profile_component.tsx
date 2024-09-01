import React from "react";
import { IconContext } from "react-icons";
import { FaUser } from "react-icons/fa";
export default function ProfileComponent({ atEnd = true }: { atEnd: boolean }) {
    return (
        <div
            className={`
        bg-gray-500
        ${
            atEnd ? "ml-auto" : ""
        } border-none hover:border-none active:border-none text-gray-900 font-medium rounded-full text-sm px-5 text-center inline-flex items-center me-2 w-12 h-12 justify-center self-center`}
        >
            <div className="flex justify-center items-center">
                <IconContext.Provider value={{ color: "White", size: "18px" }}>
                    <FaUser className="inline-block" />
                </IconContext.Provider>
            </div>
        </div>
    );
}
