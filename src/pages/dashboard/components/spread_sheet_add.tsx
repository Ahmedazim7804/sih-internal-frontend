import { useMutation } from "@tanstack/react-query";
import { IconContext } from "react-icons";
import { IoIosAdd } from "react-icons/io";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useGetToken } from "../../../hooks/auth/useGetToken";

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
