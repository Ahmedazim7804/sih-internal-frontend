import { useEffect, useState } from "react";
import DashboardTopBar from "./dashboard_top_bar";
import SpreadSheetList from "./components/spread_sheet_list";
import useUserSheets from "../../hooks/use_usersheets";
import { redirect, useNavigate } from "react-router-dom";
import { IUserSheets } from "../../types";
import useAuth from "../../hooks/use_auth";
import { useAuthContext } from "../../context/auth_provider";

export default function DashboardScreen() {
    const { data, isPending, error } = useUserSheets();
    const redirect= useNavigate()
    const [query, setquery] = useState<string>("");
    const [searchData, setSearchData] = useState<IUserSheets>({
        data: [],
        success: false,
    });
    const { user} = useAuthContext();

    useEffect(() => {
        if (!localStorage.getItem("token")) {

            redirect("/");
        }
    }, [user]);

    useEffect(() => {
        if (data) {
            console.log(data)
            setSearchData(data);
        }
    }, [data]);

    const submitsearch = () => {
        if (!data) {
            return;
        }

        if (query === "") {
            setSearchData(data);
        } else {
            setSearchData({
                data: data.data.filter((sheet: any) =>
                    sheet.title.toLowerCase().includes(query.toLowerCase())
                ),
                success: true,
            });
            console.log("connection done");
        }
    };
    return (
        <div className="flex flex-col w-lvw h-lvh font-lexend">
            <DashboardTopBar setquery={setquery} submitsearch={submitsearch} />

            <div className="mt-16">
            <SpreadSheetList
                isPending={isPending}
                error={error}
                data={searchData}
            />
            </div>
        </div>
    );
}
