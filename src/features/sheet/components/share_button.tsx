import React from "react";
import { FaShareAlt } from "react-icons/fa";
export default function ShareButton() {
    return (
        <button className="px-5 py-2 ml-auto my-2 mx-3 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"

        >
            <div>
                <FaShareAlt className="inline-block" />
                <span className="ml-2">Share</span>
                <style></style>
            </div>
        </button>
    );
}
