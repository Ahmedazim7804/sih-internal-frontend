import React from "react";
import { IconContext } from "react-icons";
import { IoMdAdd } from "react-icons/io";
import { FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ShareScreen() {
    const navigate = useNavigate();

    return (
        <div
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    navigate("/");
                }
            }}
            className="absolute justify-center items-center backdrop-blur-[1px] w-full h-full text-gray-900 bg-transparent bg-opacity-50 z-10 flex"
        >
            <div className="bg-neutral-50 px-4 w-5/12 h-fit flex flex-col overflow-hidden rounded-3xl py-8">
                <div className="text-xl px-2 mb-2">
                    <p>Share SpreadSheet</p>
                </div>
                <div className="flex flex-row items-center gap-1 ">
                    <input
                        className="outline-none border-2 border-yellow-400 h-12 px-4 py-2 rounded-tl-full rounded-bl-full w-full"
                        placeholder="Enter email of the collabrator"
                        // style={{ clipPath: "inset(0 px 0 0" }}
                    ></input>
                    <button className="border-2 border-yellow-400 bg-white hover:bg-yellow-200 h-12 pr-2 pl-1 rounded-tr-full rounded-br-full">
                        <IconContext.Provider
                            value={{ color: "Black", size: "32px" }}
                        >
                            <IoMdAdd />
                        </IconContext.Provider>
                    </button>
                </div>
                <div className="text-xl px-2 my-4">
                    <p>People with access</p>
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        className="flex justify-center items-center gap-1 px-4 py-2 border-stone-900 border-2 rounded-full hover:bg-yellow-200"
                    >
                        <FaLink />
                        <span>Copy Link</span>
                    </button>
                    <button
                        type="button"
                        className="flex bg-yellow-200 justify-center items-center gap-1 px-4 py-2 border-stone-900 border-2 rounded-full hover:bg-yellow-400"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
