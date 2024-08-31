import React from "react";
import { FaShareAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
export default function ShareButton() {
    return (
        <button className="ml-auto my-2 text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 hover:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2">
            <div className="flex justify-center items-center">
                <IconContext.Provider value={{ color: "White", size: "24px" }}>
                    <FaShareAlt className="inline-block" />
                </IconContext.Provider>
                <span className="ml-2 text-base text-center text-white font-bold">
                    Share
                </span>
            </div>
        </button>
    );
}
