import React from "react";
import { FaShareAlt } from "react-icons/fa";
export default function ShareButton() {
    return (
        <button className="px-4 ml-auto py-2 my-2 hover:bg-purple-500 hover:-translate-y-1 hover:shadow-[1px_7px_0_0_#3b0764] shadow-[1px_3px_0_0_#3b0764] bg-purple-500 text-white rounded-full">
            <div>
                <FaShareAlt className="inline-block" />
                <span className="ml-2">Share</span>
            </div>
        </button>
    );
}
