import React from "react";
import { IconContext } from "react-icons";
import { TbFileSpreadsheet } from "react-icons/tb";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import useSheet from "../../../hooks/use_sheet";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/use_auth";
import { useGetToken } from "../../../hooks/auth/useGetToken";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

function createSpreadSheetOnBacked(token: string) {
    return fetch(
        "https://sih-internal-backend-pm7h.onrender.com/spreadsheet/create",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "demo",
            }),
        }
    ).then((res) => res.json());
}

export default function SpreadSheetAdd() {
    const token = useGetToken();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: () => createSpreadSheetOnBacked(token!),
    });

    return (
        <div
            onClick={async () => {
                mutation.mutateAsync().then((val) => {
                    if (val !== null) {
                        navigate(`/sheet/${val.sheetId}`);
                    }
                });
            }}
            className="flex cursor-pointer justify-center flex-row items-center bg-gray-100 py-1 rounded-full hover:bg-yellow-100 active:bg-yellow-100 mb-4"
        >
            {mutation.isPending ? (
                <ThreeDots color="#facc15" />
            ) : (
                <IconContext.Provider
                    value={{
                        size: "48px",
                    }}
                >
                    <IoIosAdd />
                </IconContext.Provider>
            )}
        </div>
    );
}
