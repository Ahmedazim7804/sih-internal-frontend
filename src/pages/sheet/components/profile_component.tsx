import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FaUser } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useAuthContext } from "../../../context/auth_provider";
import { useNavigate } from "react-router-dom";
export default function ProfileComponent({
    atEnd = true,
}: {
    atEnd?: boolean;
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigator = useNavigate();
    const { logout } = useAuthContext();
    return (
        <div className="relative inline-block z-50 text-left">
            <div
                onClick={() => setIsOpen((val) => !val)}
                className={`
            bg-gray-500
            ${
                atEnd ? "ml-auto" : ""
            } border-none hover:border-none active:border-none font-medium rounded-3xl text-sm px-5 text-center inline-flex flex-col items-center me-2 py-2 justify-center self-center text-white`}
            >
                <div className="flex justify-center items-center">
                    <IconContext.Provider
                        value={{ color: "White", size: "24px" }}
                    >
                        <FaUser className="inline-block" />
                        <p className="pl-2">Ajeem Ahmad</p>

                        {isOpen ? <FaCaretUp /> : <FaCaretDown />}
                    </IconContext.Provider>
                </div>
            </div>

            {isOpen ? (
                <div
                    className="absolute flex flex-col right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-gray-500 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    <button
                        className="py-1 px-3"
                        role="none"
                        onClick={() => navigator("/")}
                    >
                        DashBoard
                    </button>
                    <button
                        className="py-1 px-3"
                        role="none"
                        onClick={() => logout()}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>

        //     {isOpen ? (
        //         <div classNameName="flex justify-start items-center w-full">
        //             <IconContext.Provider
        //                 value={{ color: "White", size: "24px" }}
        //             >
        //                 <IoIosLogOut classNameName="inline-block" />
        //                 <p classNameName="pl-2">Logout</p>
        //             </IconContext.Provider>
        //         </div>
        //     ) : (
        //         <></>
        //     )}
        // </div>
    );
}
