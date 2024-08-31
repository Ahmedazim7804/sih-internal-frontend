import React, { useEffect } from "react";
import "@fortune-sheet/react/dist/index.css";
import { Workbook } from "@fortune-sheet/react";
import TopBar from "./top_bar";
import { useNavigate } from "react-router-dom";

export default function Sheet() {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         navigate("/auth");
    //     }
    // }, []);
    return (
        <div className="w-full h-full z-0 flex flex-col">
            <TopBar></TopBar>
            <Workbook
                data={[
                    {
                        name: "Sheet 1",
                    },
                ]}
            ></Workbook>
            //{" "}
        </div>
    );
}
